using AutoMapper;
using Education.Business.Exeptions;
using Education.Business.Services.Abstract;
using Education.Data.Repositories.Abstract;
using Education.Entity.DTOs.ContentDTO;
using Education.Entity.Models;

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

		// GetTopContents servisi, repository ile veriyi alıp iş mantığını uygular
		public async Task<ServiceResult<IEnumerable<Content>>> GetTopContents(int pageNumber, int pageSize)
		{
			try
			{
				var contents = await _repositoryManager.ContentRepository.GetTopContents(pageNumber, pageSize);
				return ServiceResult<IEnumerable<Content>>.SuccessResult(contents);
			}
			catch (Exception ex)
			{
				return ServiceResult<IEnumerable<Content>>.FailureResult($"An error occurred while fetching top contents: {ex.Message}");
			}
		}

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

		public async Task<ServiceResult<ContentResponseDto>> CreateContentAsync(ContentRequestDto contentRequestDto)
		{
			try
			{
				// Etiket sayısının 1 ile 3 arasında olduğunu kontrol et
				if (contentRequestDto.TagIds.Count < 1 || contentRequestDto.TagIds.Count > 3)
				{
					return ServiceResult<ContentResponseDto>.FailureResult("Etiket sayısı en az 1 en fazla 3 olabilir");
				}

				// İçeriği Content entity'sine dönüştür
				var content = _mapper.Map<Content>(contentRequestDto);
				content.ImageUrl = contentRequestDto.ImageUrl ?? string.Empty;

				// İçeriği veritabanına kaydet
				var createdContent = await _repositoryManager.ContentRepository.CreateAsync(content);

				createdContent.Rating = 0;
				createdContent.RatingCount = 0;

				// Etiketleri ContentTag olarak ekle
				foreach (var tagID in contentRequestDto.TagIds)
				{
					var contentTag = new ContentTag { ContentId = createdContent.Id, TagId = tagID };
					var createdContentTag = await _repositoryManager.ContentTagRepository.CreateAsync(contentTag);
				}
							
				// İçerik bilgilerini ContentResponseDto'ya dönüştür
				var contentResponseDto = _mapper.Map<ContentResponseDto>(createdContent);

				return ServiceResult<ContentResponseDto>.SuccessResult(contentResponseDto);
			}
			catch (Exception ex)
			{
				// Hata durumunda hata mesajı ile birlikte başarısız sonucu döndür
				return ServiceResult<ContentResponseDto>.FailureResult($"İçerik oluşturulurken bir hata oluştu: {ex.Message}");
			}
		}



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

	}
}
