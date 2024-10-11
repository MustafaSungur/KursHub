using AutoMapper;
using Education.Business.Services.Abstract;
using Education.Business.Exeptions;
using Education.Data.Repositories.Abstract;
using Education.Entity.DTOs.CategoryDTO;
using Education.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Business.Services.Concrete
{
	public class CategoryManager : ICategoryService
	{
		private readonly IRepositoryManager _repositoryManager;
		private readonly IMapper _mapper;

		public CategoryManager(IRepositoryManager repositoryManager, IMapper mapper)
		{
			_repositoryManager = repositoryManager;
			_mapper = mapper;
		}

		// Kategori oluşturma
		public async Task<ServiceResult<CategoryResponseDto>> CreateCategoryAsync(CategoryRequestDto categoryRequestDto)
		{
			try
			{
				var category = _mapper.Map<Category>(categoryRequestDto);
				var createdCategory = await _repositoryManager.CategoryRepository.CreateAsync(category);

				var categoryResponseDto = _mapper.Map<CategoryResponseDto>(createdCategory);
				return ServiceResult<CategoryResponseDto>.SuccessResult(categoryResponseDto);
			}
			catch (Exception ex)
			{
				return ServiceResult<CategoryResponseDto>.FailureResult($"Kategori oluşturulurken bir hata oluştu: {ex.Message}");
			}
		}

		// ID'ye göre kategori getir
		public async Task<ServiceResult<CategoryResponseDto>> GetCategoryByIdAsync(int id)
		{
			var category = await _repositoryManager.CategoryRepository.GetByIdAsync(id);
			if (category == null)
			{
				return ServiceResult<CategoryResponseDto>.FailureResult("Kategori bulunamadı.");
			}

			var categoryResponseDto = _mapper.Map<CategoryResponseDto>(category);
			return ServiceResult<CategoryResponseDto>.SuccessResult(categoryResponseDto);
		}

		// Tüm kategorileri getir
		public async Task<ServiceResult<IEnumerable<CategoryResponseDto>>> GetAllCategoriesAsync()
		{
			var categories = await _repositoryManager.CategoryRepository.GetAll().ToListAsync();

			var categoryResponseDtos = _mapper.Map<IEnumerable<CategoryResponseDto>>(categories);

			return ServiceResult<IEnumerable<CategoryResponseDto>>.SuccessResult(categoryResponseDtos);
		}

		// Kategori güncelle
		public async Task<ServiceResult<CategoryResponseDto>> UpdateCategoryAsync(int id, CategoryRequestDto categoryRequestDto)
		{
			var existingCategory = await _repositoryManager.CategoryRepository.GetByIdAsync(id);
			if (existingCategory == null)
			{
				return ServiceResult<CategoryResponseDto>.FailureResult("Kategori bulunamadı.");
			}

			existingCategory.Name = categoryRequestDto.Name;
			await _repositoryManager.CategoryRepository.UpdateAsync(existingCategory);

			var categoryResponseDto = _mapper.Map<CategoryResponseDto>(existingCategory);
			return ServiceResult<CategoryResponseDto>.SuccessResult(categoryResponseDto);
		}

		// Kategori sil
		public async Task<ServiceResult<bool>> DeleteCategoryAsync(int id)
		{
			var category = await _repositoryManager.CategoryRepository.GetByIdAsync(id);
			if (category == null)
			{
				return ServiceResult<bool>.FailureResult("Kategori bulunamadı.");
			}

			await _repositoryManager.CategoryRepository.DeleteAsync(id);
			return ServiceResult<bool>.SuccessResult(true);
		}
	}
}
