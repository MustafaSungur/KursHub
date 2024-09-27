
using Education.Data.Repositories.Abstract;
using Education.Entity.Models;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class ContentRepository : RepositoryBase<Content, AppDbContext, long>, IContentRepository
	{
		public ContentRepository(AppDbContext context) : base(context)
		{
		}
	}
}
