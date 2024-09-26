
using Education.Entity.DTOs.ContentDTO;

namespace Education.Entity.DTOs.TopicDTO
{
	public class TopicResponseDto
	{
		public int Id { get; set; }

		public string? Name { get; set; }

		public List<ContentResponseDto>? Contents { get; set; } // İsteğe bağlı olarak içerikler
	}
}
