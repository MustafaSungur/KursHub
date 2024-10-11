
using Education.Entity.DTOs.ContentDTO;

namespace Education.Entity.DTOs.TopicDTO
{
	public class TopicResponseDto
	{
		public int Id { get; set; }

		public required string Name { get; set; }

		public int SubCategoryId { get; set; }

		public string? SubCategoryName { get; set; }

		public List<ContentResponseDto>? Contents { get; set; }
	}
}
