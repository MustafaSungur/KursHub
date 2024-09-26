

namespace Education.Entity.DTOs.CommentLikeDTO
{
	public class CommentLikeResponseDto
	{
		public required long Id { get; set; }

		public required string UserId { get; set; }

		public string? UserName { get; set; } 

		public required long CommentId { get; set; }

		public string? CommentDescription { get; set; } 
	}
}
