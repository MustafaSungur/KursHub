

namespace Education.Entity.DTOs.ContentDTO
{
	public class ContentRequestDto
	{
		public string? Title { get; set; }

		public string? Description { get; set; }

		public string? VideoUrl { get; set; }

		public string? UserId { get; set; }

		public int TopicId { get; set; }

		public int SubCategoryId { get; set; }
	}
}
