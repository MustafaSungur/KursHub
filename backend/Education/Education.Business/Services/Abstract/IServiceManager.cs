

namespace Education.Business.Services.Abstract
{
	public interface IServiceManager
	{
		IContentService ContentService { get; }
		ICategoryService CategoryService { get; }
		ICommentService CommentService { get; }
		ICommentLikeService CommentLikeService { get; }
		IContentTagService ContentTagService { get; }
		IContentUserService ContentUserService { get; }
		IRatingService RatingService { get; }
		ISubCategoryService SubCategoryService { get; }
		ITagService TagService { get; }
		IApplicationUserService ApplicationUserService { get; }
		ITopicService TopicService { get; }
	}

}
