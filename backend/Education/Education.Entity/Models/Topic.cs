
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Education.Entity.Models
{
	public class Topic:BaseEntity
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Topic name is required.")]
		[StringLength(100, ErrorMessage = "Topic name cannot exceed 100 characters.")]
		public required string Name { get; set; }

		[Required(ErrorMessage = "SubCategoryId is required.")]
		public required int SubCategoryId { get; set; }

		[ForeignKey(nameof(SubCategoryId))]
		public SubCategory? SubCategory { get; set; }

		public List<Content>? Contents { get; set; }
	}
}
