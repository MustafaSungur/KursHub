using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Education.Entity.DTOs.ContentUserDTO
{
	public class ContentUserResponseDto
	{
		public string? UserId { get; set; } 
		public string? UserName { get; set; } 

		public long ContentId { get; set; }
		public string? ContentTitle { get; set; } 
		public DateTime ViewedAt { get; set; } // İçeriğin ne zaman izlendiği (optional)
	}

}
