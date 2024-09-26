
using Education.Entity.Enums;

namespace Education.Entity.DTOs.ApplicationUserDTO
{
	public class ApplicationUserRequestDto
	{
		public required string FirstName { get; set; }

		public required string LastName { get; set; }

		public Genre Gender { get; set; } = Genre.NotSpecified;

		public required DateTime BirthDate { get; set; }

		public string? Password { get; set; }

		public string? ConfirmPassword { get; set; }

		public required string Email { get; set; }

	}
}
