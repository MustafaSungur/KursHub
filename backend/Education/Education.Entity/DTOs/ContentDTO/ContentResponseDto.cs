using Education.Entity.DTOs.ApplicationUserDTO;
using Education.Entity.DTOs.CommentDTO;
using Education.Entity.DTOs.ContentTagDTO;
using Education.Entity.DTOs.TopicDTO;
using Education.Entity.Models;

namespace Education.Entity.DTOs.ContentDTO
{
	public class ContentResponseDto
	{
		public long Id { get; set; }

		public required string Title { get; set; }

		public required string? Description { get; set; }

		public string? VideoUrl { get; set; }

		public string? ImageUrl { get; set; }

		public long ViewCount { get; set; }

		public int RatingCount { get; set; }

		public float Rating { get; set; }

		public DateTime CreatedDate { get; set; }

		public ApplicationUserResponseDto? CreatedUser { get; set; }
	

		public required TopicResponseDto  Topic { get; set; }

		public List<CommentResponseDto>? Comments { get; set; }

		public List<ContentTagResponseDto>? ContentTags { get; set; }

	}
}