using AutoMapper;
using Education.Business.Exeptions;
using Education.Business.Services.Abstract;
using Education.Data.Repositories.Abstract;
using Education.Entity.DTOs.ContentDTO;
using Education.Entity.DTOs.ContentFilterRequestDTO;
using Education.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Business.Services.Concrete
{
	public class ContentManager : IContentService
	{
		private readonly IRepositoryManager _repositoryManager;
		private readonly IMapper _mapper;

		public ContentManager(IRepositoryManager repositoryManager, IMapper mapper)
		{
			_repositoryManager = repositoryManager;
			_mapper = mapper;
		}

		// En yüksek puanlı içerikleri sayfa numarasına ve sayfa boyutuna göre getirir.
		public async Task<ServiceResult<IEnumerable<ContentResponseDto>>> GetTopContents(int pageNumber, int pageSize)
		{
			try
			{
				var contents = await _repositoryManager.ContentRepository.GetTopContents(pageNumber, pageSize);
				var contentsDto = contents.Select(_mapper.Map<ContentResponseDto>).ToList();

				return ServiceResult<IEnumerable<ContentResponseDto>>.SuccessResult(contentsDto);
			}
			catch (Exception ex)
			{
				return ServiceResult<IEnumerable<ContentResponseDto>>.FailureResult($"En yüksek puanlı içerikleri getirirken bir hata oluştu: {ex.Message}");
			}
		}

		// ID'ye göre içerik detaylarını getirir.
		public async Task<ServiceResult<ContentResponseDto>> GetContentByIdAsync(long id)
		{
			try
			{
				var content = await _repositoryManager.ContentRepository.GetByIdAsync(id);
				if (content == null)
				{
					return ServiceResult<ContentResponseDto>.FailureResult("İçerik bulunamadı.");
				}

				var contentResponseDto = _mapper.Map<ContentResponseDto>(content);
				return ServiceResult<ContentResponseDto>.SuccessResult(contentResponseDto);
			}
			catch (Exception ex)
			{
				return ServiceResult<ContentResponseDto>.FailureResult($"İçerik getirilirken bir hata oluştu: {ex.Message}");
			}
		}

		// Yeni bir içerik oluşturur ve veritabanına kaydeder.
		public async Task<ServiceResult<ContentResponseDto>> CreateContentAsync(ContentRequestDto contentRequestDto)
		{
			try
			{
				if (contentRequestDto.TagIds.Count < 1 || contentRequestDto.TagIds.Count > 3)
				{
					return ServiceResult<ContentResponseDto>.FailureResult("Etiket sayısı en az 1 en fazla 3 olabilir");
				}

				var content = _mapper.Map<Content>(contentRequestDto);
				content.ImageUrl = contentRequestDto.ImageUrl ?? string.Empty;

				var createdContent = await _repositoryManager.ContentRepository.CreateAsync(content);

				createdContent.Rating = 0;
				createdContent.RatingCount = 0;

				// Etiketleri ContentTag olarak ekle
				foreach (var tagID in contentRequestDto.TagIds)
				{
					var contentTag = new ContentTag { ContentId = createdContent.Id, TagId = tagID };
					var createdContentTag = await _repositoryManager.ContentTagRepository.CreateAsync(contentTag);
				}

				var contentResponseDto = _mapper.Map<ContentResponseDto>(createdContent);

				return ServiceResult<ContentResponseDto>.SuccessResult(contentResponseDto);
			}
			catch (Exception ex)
			{
				return ServiceResult<ContentResponseDto>.FailureResult($"İçerik oluşturulurken bir hata oluştu: {ex.Message}");
			}
		}

		// Var olan bir içeriği günceller.
		public async Task<ServiceResult<ContentResponseDto>> UpdateContentAsync(int id, ContentRequestDto contentRequestDto)
		{
			try
			{
				var existingContent = await _repositoryManager.ContentRepository.GetByIdAsync(id);
				if (existingContent == null)
				{
					return ServiceResult<ContentResponseDto>.FailureResult("İçerik bulunamadı.");
				}

				existingContent.Title = contentRequestDto.Title ?? existingContent.Title;
				existingContent.Description = contentRequestDto.Description ?? existingContent.Description;
				existingContent.ImageUrl = contentRequestDto.ImageUrl ?? existingContent.ImageUrl;
				existingContent.UpdatedDate = DateTime.UtcNow;

				await _repositoryManager.ContentRepository.UpdateAsync(existingContent);

				var contentResponseDto = _mapper.Map<ContentResponseDto>(existingContent);
				return ServiceResult<ContentResponseDto>.SuccessResult(contentResponseDto);
			}
			catch (Exception ex)
			{
				return ServiceResult<ContentResponseDto>.FailureResult($"İçerik güncellenirken bir hata oluştu: {ex.Message}");
			}
		}

		// ID'ye göre içeriği siler.
		public async Task<ServiceResult<bool>> DeleteContentAsync(long id)
		{
			try
			{
				var content = await _repositoryManager.ContentRepository.GetByIdAsync(id);
				if (content == null)
				{
					return ServiceResult<bool>.FailureResult("İçerik bulunamadı.");
				}

				await _repositoryManager.ContentRepository.DeleteAsync(id);
				return ServiceResult<bool>.SuccessResult(true);
			}
			catch (Exception ex)
			{
				return ServiceResult<bool>.FailureResult($"İçerik silinirken bir hata oluştu: {ex.Message}");
			}
		}

		// İçerikleri filtre kriterlerine göre getirir.
		public async Task<ServiceResult<IEnumerable<ContentResponseDto>>> FilterContents(ContentFilterRequestDto filterRequest)
		{
			var query = _repositoryManager.ContentRepository.GetAll();

			// Kategori filtresi
			if (filterRequest.CategoryId.HasValue)
			{
				query = query.Where(c => c.Topic!.SubCategory!.CategoryId == filterRequest.CategoryId.Value);
			}

			// Alt kategori filtresi
			if (filterRequest.SubCategoryId.HasValue)
			{
				query = query.Where(c => c.Topic!.SubCategoryId == filterRequest.SubCategoryId.Value);
			}

			// Konu filtresi
			if (filterRequest.TopicId.HasValue)
			{
				query = query.Where(c => c.TopicId == filterRequest.TopicId.Value);
			}

			// Etiket filtresi
			if (filterRequest.TagIds != null && filterRequest.TagIds.Count != 0)
			{
				query = query.Where(c => c.ContentTags!.Any(ct => filterRequest.TagIds.Contains(ct.TagId)));
			}

			// Arama filtresi (Title'a göre arama yap)
			if (!string.IsNullOrEmpty(filterRequest.SearchTerm))
			{
				query = query.Where(c => c.Title.Contains(filterRequest.SearchTerm));
			}

			// Sayfalama ve listeye dönüştürme işlemi
			var contents = await query
				.Skip((filterRequest.PageNumber - 1) * filterRequest.PageSize)
				.Take(filterRequest.PageSize)
				.ToListAsync();

			var contentDtos = contents.Select(_mapper.Map<ContentResponseDto>).ToList();

			return ServiceResult<IEnumerable<ContentResponseDto>>.SuccessResult(contentDtos);
		}

	}
}
