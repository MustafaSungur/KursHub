using System.ComponentModel.DataAnnotations;

namespace Education.Entity.DTOs.TopicDTO
{
	public class TopicRequestDto
	{
		public required string Name { get; set; }

		public required int SubCategoryId { get; set; }
	}
}
