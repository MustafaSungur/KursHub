using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Education.Data.Repositories.Abstract
{
	public interface IRepositoryManager
	{
		IProductRepository ProductRepository { get; }
		IStockRepository StockRepository { get; }
		Task SaveAsync();
	}
}
