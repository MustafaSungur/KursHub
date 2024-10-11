using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Education.Entity.Models;

namespace Education.Entity.Models
{
	public class SubCategory:BaseEntity
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Subcategory name is required.")]
		[StringLength(100, ErrorMessage = "Subcategory name cannot exceed 100 characters.")]
		public required string Name { get; set; }

		[Required(ErrorMessage = "CategoryId is required.")]
		public required int CategoryId { get; set; }

		[ForeignKey(nameof(CategoryId))]
		public Category? Category { get; set; }

		public List<Topic>? Topics { get; set; }

	}
}