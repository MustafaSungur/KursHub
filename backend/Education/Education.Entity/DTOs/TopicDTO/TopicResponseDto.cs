
using Education.Entity.DTOs.ContentDTO;
using Education.Entity.DTOs.SubCategoryDTO;

namespace Education.Entity.DTOs.TopicDTO
{
	public class TopicResponseDto
	{
		public int Id { get; set; }

		public required string Name { get; set; }

        public int  SubcategoryId { get; set; }

        public List<ContentResponseDto>? Contents { get; set; }
	}
}
