using Education.Entity.Enums;

namespace Education.Entity.Models
{
	public class BaseEntity
	{
        public DateTime RegisterDate { get; set; } = DateTime.Now;

		public DateTime? UpdatedDate { get; set; }

		public State State { get; set; } = State.Active;
	}
}
