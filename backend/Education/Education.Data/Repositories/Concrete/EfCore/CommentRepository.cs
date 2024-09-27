
using Education.Data.Repositories.Abstract;
using Education.Entity.Models;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class CommentRepository : RepositoryBase<Comment, AppDbContext, long>,ICommentRepository
	{
		public CommentRepository(AppDbContext context) : base(context)
		{
		}
	}
}
