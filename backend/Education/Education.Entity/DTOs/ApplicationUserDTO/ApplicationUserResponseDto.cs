using System;

using Education.Entity.Enums;

namespace Education.Entity.DTOs.ApplicationUserDTO
{
	public class ApplicationUserResponseDto
	{
		public required string Id { get; set; } // Kullanıcının IdentityUser Id'si

		public required string FirstName { get; set; }

		public required string LastName { get; set; }

		public Genre Gender { get; set; }

		public DateTime BirthDate { get; set; }

		public DateTime RegisterDate { get; set; }

		public DateTime? UpdatedDate { get; set; }

		public required string Email { get; set; }

		public required State State { get; set; }
		
		public required UserRole Role { get; set; }

	}
}
