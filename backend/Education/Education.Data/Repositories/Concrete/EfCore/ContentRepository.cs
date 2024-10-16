
using Education.Data.Repositories.Abstract;
using Education.Entity.DTOs.ContentDTO;
using Education.Entity.DTOs.ContentTagDTO;
using Education.Entity.Enums;
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
			// Tüm ilişkili verileri çekiyoruz ve Deleted olmayan içerikleri getiriyoruz
			var contents = await _context.Contents
				.Include(content => content.ContentTags)!
					.ThenInclude(contentTag => contentTag.Tag)
				.Include(content => content.CreatedUser) // Kullanıcı bilgilerini ekle
				.Include(content => content.Topic) 
				.Include(content => content.Ratings) // Rating bilgilerini ekle
				.Include(content => content.ViewedUsers) // Görüntülenme bilgilerini ekle
				.Where(content => content.State != State.Deleted) // Sadece Deleted olmayanları getir
				.ToListAsync();

			var sortByRatingContents = contents
				.OrderByDescending(x => x.Rating) // Rating ortalamasına göre sırala
				.ThenByDescending(x => x.RatingCount) // Rating sayısına göre sırala
				.ThenByDescending(x => x.CreatedDate) // Son oluşturulma tarihine göre sırala
				.Skip((pageNumber - 1) * pageSize) // Sayfa atlama
				.Take(pageSize) // Sayfa başına içerik sayısı
				.ToList();

			return sortByRatingContents;
		}




		public override IQueryable<Content> GetAll()
		{
			return base.GetAll()
				.Include(c => c.ContentTags) 
				.Include(c => c.Topic) 
				.Include(c => c.ViewedUsers) 
				.Include(c=>c.CreatedUser)
				.Where(c=>c.State != State.Deleted);
		}



		public override async Task<Content?> GetByIdAsync(long id)
		{
			var contentData = await _context.Contents
				.Where(c => c.Id == id && c.State!=State.Deleted)
				.Include(content => content.Topic)			
				.Include(content => content.ContentTags)!
					.ThenInclude(contentTag => contentTag.Tag)
				.Include(content => content.CreatedUser)
				.Select(c => new
				{
					Content = c,
					ViewCount = _context.ContentUsers.Count(v => v.ContentId == id), // Count ViewUsers entries by ContentId
					RatingCount = _context.Ratings.Count(r => r.ContentId == id),   // Count Ratings entries by ContentId
					RatingAverage = _context.Ratings
									.Where(r => r.ContentId == id)
									.Average(r => (double?)r.RatingValue) ?? 0      // Calculate average for Ratings by ContentId
				})
				.FirstOrDefaultAsync();

			// Check if the content was found
			if (contentData == null)
				return null;

			// Map calculated properties to the Content entity
			//contentData.Content.ViewCount = contentData.ViewCount;
			contentData.Content.RatingCount = contentData.RatingCount;
			contentData.Content.Rating = (float)contentData.RatingAverage;

			return contentData.Content;

		}



	}
}
