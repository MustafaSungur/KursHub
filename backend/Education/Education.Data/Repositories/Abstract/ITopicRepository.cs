using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Education.Entity.Models;

namespace Education.Data.Repositories.Abstract
{
	public interface ITopicRepository: IRepositoryBase<Topic,AppDbContext,int>
	{
	}
}
