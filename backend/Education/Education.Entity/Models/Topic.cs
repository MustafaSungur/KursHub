using System.ComponentModel.DataAnnotations;

namespace Education.Entity.Models
{
	public class Topic:BaseEntity
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Topic name is required.")]
		[StringLength(100, ErrorMessage = "Topic name cannot exceed 100 characters.")]
		public required string Name { get; set; }

		public List<Content>? Contents { get; set; }
	}
}
