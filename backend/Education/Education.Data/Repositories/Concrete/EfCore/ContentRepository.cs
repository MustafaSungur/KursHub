
using Education.Data.Repositories.Abstract;
using Education.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Data.Repositories.Concrete.EfCore
{
	public class ContentRepository : RepositoryBase<Content, AppDbContext, long>, IContentRepository
	{
		public ContentRepository(AppDbContext context) : base(context)
		{
		}

		public async Task<IEnumerable<Content>> GetTopContents(int pageNumber, int pageSize)
		{
			// Önce veritabanından gerekli tüm veriyi al
			var contents = await _context.Contents
				.Select(content => new
				{
					Content = content,
					Ratings = _context.Ratings
						.Where(r => r.ContentId == content.Id)
						.Select(r => (double)r.RatingValue)
						.ToList() // Veriyi bellek içine alır
				})
				.ToListAsync(); 

			// Bellekte rating hesaplamalarını yap
			var contentsWithRatings = contents
				.Select(x => new
				{
					x.Content,
					AverageRating = x.Ratings.Count != 0 ? x.Ratings.Average() : 0, // Rating varsa ortalamayı al, yoksa 0
					RatingCount = x.Ratings.Count
				});

			// Sıralama ve sayfalama işlemlerini bellek içinde gerçekleştir
			var sortedContents = contentsWithRatings
				.OrderByDescending(x => x.AverageRating)
				.ThenByDescending(x => x.RatingCount)
				.ThenByDescending(x => x.Content.CreatedDate)
				.Skip((pageNumber - 1) * pageSize)
				.Take(pageSize)
				.Select(x => x.Content); // Sadece Content nesnesini seç

			return sortedContents;
		}





	}
}
