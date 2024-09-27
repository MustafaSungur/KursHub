
using Education.Entity.Models;

namespace Education.Data.Repositories.Abstract
{
	public interface IContentRepository : IRepositoryBase<Content, AppDbContext, long>
	{
	}
}
