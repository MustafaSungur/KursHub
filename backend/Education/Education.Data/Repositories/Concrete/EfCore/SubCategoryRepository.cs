
using Education.Data.Repositories.Abstract;
using Education.Entity.Models;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class SubCategoryRepository : RepositoryBase<SubCategory, AppDbContext, int>, ISubCategoryRepository
	{
		public SubCategoryRepository(AppDbContext context) : base(context)
		{
		}
	}
}
