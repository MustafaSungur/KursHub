
using Education.Data.Repositories.Abstract;
using Education.Entity.Models;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class ContentTagRepository : RepositoryBase<ContentTag, AppDbContext, int>, IContentTagRepository
	{
		public ContentTagRepository(AppDbContext context) : base(context)
		{

		}


		

	}
}
