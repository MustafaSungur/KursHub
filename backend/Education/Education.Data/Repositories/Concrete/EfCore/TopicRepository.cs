using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Education.Data.Repositories.Abstract;
using Education.Entity.Enums;
using Education.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class TopicRepository : RepositoryBase<Topic, AppDbContext, int>, ITopicRepository
	{
		public TopicRepository(AppDbContext context) : base(context)
		{
		}

		

	}
}
