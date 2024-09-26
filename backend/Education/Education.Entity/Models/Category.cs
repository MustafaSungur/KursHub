using System.ComponentModel.DataAnnotations;

namespace Education.Entity.Models
{
	public class Category : BaseEntity
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Category name is required.")]
		[StringLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
		public required string Name { get; set; }

		public List<SubCategory>? SubCategories { get; set; }
	}
}
