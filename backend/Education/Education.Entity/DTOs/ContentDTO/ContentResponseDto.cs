using Education.Entity.DTOs.CommentDTO;
using Education.Entity.DTOs.ContentTagDTO;
using Education.Entity.DTOs.RaitingDTO;

namespace Education.Entity.DTOs.ContentDTO
{
	public class ContentResponseDto
	{
		public long Id { get; set; }

		public required string Title { get; set; }

		public string? Description { get; set; }

		public string? VideoUrl { get; set; }

		public long ViewCount { get; set; }

		public string? UserId { get; set; }

		public string? UserName { get; set; }

		public int TopicId { get; set; }

		public string? TopicName { get; set; }

		public int RaitingCount { get; set; }

		public float Rating { get; set; }

		public int SubCategoryId { get; set; }

		public string? SubCategoryName { get; set; }

		public List<CommentResponseDto>? Comments { get; set; }

		public List<ContentTagResponseDto>? ContentTags { get; set; }

	}
}