
using Education.Entity.DTOs.SubCategoryDTO;

namespace Education.Entity.DTOs.CategoryDTO
{
	public class CategoryResponseDto
	{
		public int Id { get; set; }

		public required string Name { get; set; }

		public List<SubCategoryResponseDto>? SubCategories { get; set; }
	}
}
