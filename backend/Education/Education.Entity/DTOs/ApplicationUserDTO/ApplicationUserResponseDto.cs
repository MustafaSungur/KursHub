﻿using System;
using Education.Entity.DTOs.TagDTO;
using Education.Entity.Enums;

namespace Education.Entity.DTOs.ApplicationUserDTO
{
	public class ApplicationUserResponseDto
	{
		public required string Id { get; set; }

		public required string FirstName { get; set; }

		public required string LastName { get; set; }

		public Genre Gender { get; set; }

		public DateTime BirthDate { get; set; }

		public DateTime RegisterDate { get; set; }

		public DateTime? UpdatedDate { get; set; }

		public required string Email { get; set; }

		public required State State { get; set; }
		
		public required UserRole Role { get; set; }

		public required string Image { get; set; }


    }
}
