

namespace Education.Entity.DTOs.SubCategoryDTO
{
	public class SubCategoryResponseDto
	{
		public int Id { get; set; }

		public string? Name { get; set; }

		public int CategoryId { get; set; }

		public string? CategoryName { get; set; } // İsteğe bağlı olarak kategori ismi

	}
}
