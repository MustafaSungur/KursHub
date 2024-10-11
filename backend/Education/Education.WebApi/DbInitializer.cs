using Education.Data;
using Education.Entity.Enums;
using Education.Entity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Education.WebApi
{
	public static class DbInitializer
	{
		public static async Task SeedData(IServiceProvider serviceProvider)
		{
			using (var scope = serviceProvider.CreateScope())
			{
				var scopedServiceProvider = scope.ServiceProvider;
				var context = scopedServiceProvider.GetRequiredService<AppDbContext>();
				var roleManager = scopedServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
				var userManager = scopedServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

				await context.Database.MigrateAsync();

				// Rolleri oluştur
				string[] roleNames = ["Admin", "User", "UserAndInstructor"];
				foreach (var roleName in roleNames)
				{
					if (!await roleManager.RoleExistsAsync(roleName))
					{
						await roleManager.CreateAsync(new IdentityRole(roleName));
					}
				}

				// Admin kullanıcı oluştur
				var adminEmail = "admin@admin.com";
				var adminUser = await userManager.FindByEmailAsync(adminEmail);
				if (adminUser == null)
				{
					adminUser = new ApplicationUser
					{
						UserName = "admin",
						Email = adminEmail,
						FirstName = "Admin",
						LastName = "User",
						EmailConfirmed = true,
						BirthDate = new DateTime(1999, 1, 12).ToUniversalTime(),
						Role = UserRole.Admin,
						State = State.Active
					};

					string adminPassword = "Admin123!";
					var createAdminResult = await userManager.CreateAsync(adminUser, adminPassword);

					if (createAdminResult.Succeeded)
					{
						await userManager.AddToRoleAsync(adminUser, "Admin");
					}
					else
					{
						var errors = string.Join(", ", createAdminResult.Errors.Select(e => e.Description));
						throw new Exception($"Admin kullanıcı oluşturulamadı: {errors}");
					}
				}

				// Kategorileri ve Alt Kategorileri oluştur
				if (!await context.Categories.AnyAsync())
				{
					var categories = new List<Category>
					{
						new Category { Name = "Programlama" },
						new Category { Name = "Tasarım" },
						new Category { Name = "İş Dünyası" },
						new Category { Name = "Pazarlama" },
						new Category { Name = "Fotoğrafçılık" }
					};

					await context.Categories.AddRangeAsync(categories);
					await context.SaveChangesAsync();

					// Alt Kategorileri ekleyelim
					var subCategories = new List<SubCategory>
					{
						new SubCategory { Name = "Web Geliştirme", CategoryId = categories[0].Id },
						new SubCategory { Name = "Mobil Geliştirme", CategoryId = categories[0].Id },
						new SubCategory { Name = "Grafik Tasarım", CategoryId = categories[1].Id },
						new SubCategory { Name = "UI/UX Tasarımı", CategoryId = categories[1].Id },
						new SubCategory { Name = "Girişimcilik", CategoryId = categories[2].Id },
						new SubCategory { Name = "Finans", CategoryId = categories[2].Id },
						new SubCategory { Name = "Dijital Pazarlama", CategoryId = categories[3].Id },
						new SubCategory { Name = "Sosyal Medya", CategoryId = categories[3].Id },
						new SubCategory { Name = "Portre Fotoğrafçılığı", CategoryId = categories[4].Id },
						new SubCategory { Name = "Manzara Fotoğrafçılığı", CategoryId = categories[4].Id }
					};

					await context.SubCategories.AddRangeAsync(subCategories);
					await context.SaveChangesAsync();

					// Topic (Başlık) ekleyelim
					var topics = new List<Topic>
					{
						new Topic { Name = "HTML & CSS", SubCategoryId = subCategories[0].Id },
						new Topic { Name = "JavaScript", SubCategoryId = subCategories[0].Id },
						new Topic { Name = "Android Geliştirme", SubCategoryId = subCategories[1].Id },
						new Topic { Name = "iOS Geliştirme", SubCategoryId = subCategories[1].Id },
						new Topic { Name = "Adobe Illustrator", SubCategoryId = subCategories[2].Id },
						new Topic { Name = "Logo Tasarımı", SubCategoryId = subCategories[2].Id },
						new Topic { Name = "Kullanıcı Araştırması", SubCategoryId = subCategories[3].Id },
						new Topic { Name = "Prototipleme", SubCategoryId = subCategories[3].Id },
						new Topic { Name = "Girişimcilik 101", SubCategoryId = subCategories[4].Id },
						new Topic { Name = "Finansal Planlama", SubCategoryId = subCategories[5].Id },
						new Topic { Name = "SEO Temelleri", SubCategoryId = subCategories[6].Id },
						new Topic { Name = "İçerik Pazarlama", SubCategoryId = subCategories[6].Id },
						new Topic { Name = "Sosyal Medya Stratejisi", SubCategoryId = subCategories[7].Id },
						new Topic { Name = "Etkileyici Pazarlama", SubCategoryId = subCategories[7].Id },
						new Topic { Name = "Portre Aydınlatma", SubCategoryId = subCategories[8].Id },
						new Topic { Name = "Portre Düzenleme", SubCategoryId = subCategories[8].Id },
						new Topic { Name = "Manzara Kompozisyonu", SubCategoryId = subCategories[9].Id },
						new Topic { Name = "Drone Fotoğrafçılığı", SubCategoryId = subCategories[9].Id }
					};

					await context.Topics.AddRangeAsync(topics);
					await context.SaveChangesAsync();
				}

				// Etiketleri oluştur
				if (!await context.Tags.AnyAsync())
				{
					var tags = new List<Tag>
					{
						new Tag { Name = "C#" },
						new Tag { Name = "JavaScript" },
						new Tag { Name = "Python" },
						new Tag { Name = "Adobe Photoshop" },
						new Tag { Name = "Makine Öğrenimi" },
						new Tag { Name = "Fotoğrafçılık" },
						new Tag { Name = "UI Tasarımı" },
						new Tag { Name = "Pazarlama Stratejisi" },
						new Tag { Name = "Girişimcilik" },
						new Tag { Name = "Finans Yönetimi" }
					};

					await context.Tags.AddRangeAsync(tags);
					await context.SaveChangesAsync();
				}
			}
		}
	}
}
