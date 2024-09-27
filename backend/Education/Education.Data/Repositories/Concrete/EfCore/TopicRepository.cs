

using Education.Data.Repositories.Abstract;
using Education.Entity.Models;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class TopicRepository : RepositoryBase<Topic, AppDbContext, int>, ITopicRepository
	{
		public TopicRepository(AppDbContext context) : base(context)
		{
		}
	}
}
