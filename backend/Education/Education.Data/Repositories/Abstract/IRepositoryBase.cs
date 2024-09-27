using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Education.Data.Repositories.Abstract
{
	public interface IRepositoryBase<TEntity, TContext, TId>
	  where TEntity : class
	  where TContext : DbContext
	{
		Task<TEntity> CreateAsync(TEntity entity);

		Task<bool> DeleteAsync(TId id);

		IQueryable<TEntity> GetAll();

		Task<TEntity?> GetByIdAsync(TId id);

		Task<TEntity> UpdateAsync(TEntity entity);

		// Dinamik sorgulamalar için: belirli bir şartla sorgulama (özellikle büyük veri setlerinde performans sağlar)
		IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> expression);
	}
}
