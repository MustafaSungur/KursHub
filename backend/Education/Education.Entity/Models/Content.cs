
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Entity.Models
{
	public class Content:BaseEntity
	{
		public long Id { get; set; }

		[Required(ErrorMessage = "Title is required.")]
		[StringLength(50, ErrorMessage = "Title cannot exceed 50 characters.")]
		public required string Title { get; set; }

		[Required(ErrorMessage = "Description is required.")]
		[StringLength(300, ErrorMessage = "Description cannot exceed 300 characters.")]
		public required string Description { get; set; }

		public string? VideoUrl { get; set; }

		public long ViewCount { get; set; } = 0;

		[Required(ErrorMessage = "UserId is required.")]
		public required string UserId { get; set; }

		[ForeignKey(nameof(UserId))]
		public ApplicationUser? CreatedUser { get; set; }

		public List<Comment>? Comments { get; set; }

		public List<ContentTag>? ContentTags { get; set; } 

        public List<Rating>? Ratings { get; set; }

		public int RaitingCount { get; set; }

		public float Rating { get; set; }

		public int TopicId { get; set; }

		[ForeignKey(nameof(TopicId))]
		public Topic? Topic { get; set; }

		public int SubCategoryId { get; set; }

		[ForeignKey(nameof(SubCategoryId))]
		public SubCategory? SubCategory { get; set; }

        public List<ContentUser>? ViewedUsers { get; set; }
    }
}
