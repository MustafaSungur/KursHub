

using Education.Entity.DTOs.CategoryDTO;
using Education.Entity.DTOs.TopicDTO;

namespace Education.Entity.DTOs.SubCategoryDTO
{
	public class SubCategoryResponseDto
	{
		public int Id { get; set; }

		public string? Name { get; set; }

        public List<TopicResponseDto>? Topics { get; set; }

        public int CategoryId { get; set; }
    }
}
