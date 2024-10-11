using Education.Business.MappingProfiles;
using Education.Business.Services.Concrete;
using Education.Data.Repositories.Abstract;
using Education.Data.Repositories.Concrete.EfCore;
using Education.Data;
using Education.Entity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Education.Business.Services.Abstract;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Education.Business.Core.@abstract;
using Education.Business.Core.concrete;

namespace Education.WebApi
{
	public class Program
	{
		public static async Task Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Veritabaný yapýlandýrmasý
			builder.Services.AddDbContext<AppDbContext>(options =>
				options.UseNpgsql(builder.Configuration.GetConnectionString("EducationDBString")
				?? throw new InvalidOperationException("Connection string 'EducationDBString' not found.")));

			// Identity yapýlandýrmasý
			builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
				.AddEntityFrameworkStores<AppDbContext>()
				.AddDefaultTokenProviders();

			// Token yapýlandýrmasý
			builder.Services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = builder.Configuration["Jwt:Issuer"],
					ValidAudience = builder.Configuration["Jwt:Audience"],
					ClockSkew = TimeSpan.Zero,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
					RoleClaimType = ClaimTypes.Role
				};
			});

			// Add configuration for appsettings.json
			builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

			builder.Services.AddControllers();

			// AutoMapper'ý servislere ekliyoruz (Model-DTO dönüþümü için)
			builder.Services.AddAutoMapper(typeof(MappingProfile));


			// Repository'lerin Dependency Injection'a eklenmesi
			builder.Services.AddScoped<IContentRepository, ContentRepository>();
			builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
			builder.Services.AddScoped<ICommentRepository, CommentRepository>();
			builder.Services.AddScoped<ICommentLikeRepository, CommentLikeRepository>();
			builder.Services.AddScoped<IContentTagRepository, ContentTagRepository>();
			builder.Services.AddScoped<IContentUserRepository, ContentUserRepository>();
			builder.Services.AddScoped<IRatingRepository, RatingRepository>();
			builder.Services.AddScoped<ISubCategoryRepository, SubCategoryRepository>();
			builder.Services.AddScoped<ITagRepository, TagRepository>();


			builder.Services.AddScoped<IVideoConversionService, VideoConversionManager>();
			builder.Services.AddScoped<IFileValidatorService, FileValidatorService>();
			builder.Services.AddScoped<ITokenService, TokenManager>();


			// RepositoryBase ve RepositoryManager'ýn Dependency Injection'a eklenmesi
			builder.Services.AddScoped(typeof(IRepositoryBase<,,>), typeof(RepositoryBase<,,>));
			builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();

			// Servislerin Dependency Injection'a eklenmesi
			builder.Services.AddScoped<IContentService, ContentManager>();
			builder.Services.AddScoped<ICategoryService, CategoryManager>();
			builder.Services.AddScoped<ICommentService, CommentManager>();
			builder.Services.AddScoped<ICommentLikeService, CommentLikeManager>();
			builder.Services.AddScoped<IContentTagService, ContentTagManager>();
			builder.Services.AddScoped<IContentUserService, ContentUserManager>();
			builder.Services.AddScoped<IRatingService, RatingManager>();
			builder.Services.AddScoped<ISubCategoryService, SubCategoryManager>();
			builder.Services.AddScoped<ITagService, TagManager>();

			// Service Manager
			builder.Services.AddScoped<IServiceManager, ServiceManager>();

			// Swagger/OpenAPI yapýlandýrmasý
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen(options =>
			{
				options.SwaggerDoc("v1", new OpenApiInfo
				{
					Title = "Education API",
					Version = "v1"
				});

				// JWT Bearer Authorization için Swagger yapýlandýrmasý
				options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					In = ParameterLocation.Header,
					Description = "Please insert JWT with Bearer into field",
					Name = "Authorization",
					Type = SecuritySchemeType.Http,
					BearerFormat = "JWT",
					Scheme = "Bearer"
				});

				options.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
						new OpenApiSecurityScheme
						{
							Reference = new OpenApiReference
							{
								Type = ReferenceType.SecurityScheme,
								Id = "Bearer"
							}
						},
						new string[] { }
					}
				});
			});

			var app = builder.Build();

			// Development ortamý için Swagger yapýlandýrmasý
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI(c =>
				{
					c.SwaggerEndpoint("/swagger/v1/swagger.json", "Education API v1");
				});
			}

			app.UseHttpsRedirection();

			app.UseAuthentication();
			app.UseAuthorization();

			app.MapControllers();

			await DbInitializer.SeedData(app.Services);

			app.Run();
		}
	}
}
