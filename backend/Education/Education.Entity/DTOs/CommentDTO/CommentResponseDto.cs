

namespace Education.Entity.DTOs.CommentDTO
{
	public class CommentResponseDto
	{
		public long Id { get; set; }

		public required string Description { get; set; }

		public required string UserId { get; set; }

		public string? UserName { get; set; } 

		public long ContentId { get; set; }

		public string? ContentTitle { get; set; } 

		public List<CommentRequestDto>? Likes { get; set; }

		public int LikeCount { get; set; }
	}
}
