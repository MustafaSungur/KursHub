
using Education.Data.Repositories.Abstract;
using Education.Entity.Enums;
using Education.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class CategoryRepository : RepositoryBase<Category, AppDbContext, int>, ICategoryRepository
	{
		public CategoryRepository(AppDbContext context) : base(context)
		{
		}

		public override IQueryable<Category> GetAll()
		{
			return _context.Categories
				.Include(c => c.SubCategories)!
					.ThenInclude(s => s!.Topics)
				.Where(c => c.State != State.Deleted &&
							c.SubCategories!.All(s => s.State != State.Deleted) &&
							c.SubCategories!.All(s => s.Topics!.All(t => t.State != State.Deleted)));
		}

	}
}
