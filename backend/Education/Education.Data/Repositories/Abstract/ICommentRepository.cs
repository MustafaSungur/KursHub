
using Education.Entity.Models;

namespace Education.Data.Repositories.Abstract
{
	public interface ICommentRepository : IRepositoryBase<Comment, AppDbContext, long>
	{
	}
}
