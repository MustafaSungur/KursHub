
using Education.Data.Repositories.Abstract;
using Education.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class ContentTagRepository : RepositoryBase<ContentTag, AppDbContext, int>, IContentTagRepository
	{
		public ContentTagRepository(AppDbContext context) : base(context)
		{

		}

		
	}
}
