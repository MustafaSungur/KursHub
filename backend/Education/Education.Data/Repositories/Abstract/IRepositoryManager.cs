

namespace Education.Data.Repositories.Abstract
{
	public interface IRepositoryManager
	{
		ICategoryRepository CategoryRepository { get; }
		ICommentLikeRepository CommentLikeRepository { get; }
		IContentRepository ContentRepository { get; }
		IRatingRepository RaitingRepository { get; }
		ICommentRepository CommentRepository { get; }
		ISubCategoryRepository SubCategoryRepository { get; }	
		ITagRepository TagRepository { get; }
		IContentTagRepository ContentTagRepository { get; }
		ITopicRepository TopicRepository { get; }
		IContentUserRepository ContentUserRepository { get; }

		Task SaveAsync();
	}
}
