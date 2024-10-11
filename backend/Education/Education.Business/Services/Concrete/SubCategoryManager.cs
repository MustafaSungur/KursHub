using AutoMapper;
using Education.Business.Services.Abstract;
using Education.Business.Exeptions;
using Education.Data.Repositories.Abstract;
using Education.Entity.DTOs.SubCategoryDTO;
using Education.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Business.Services.Concrete
{
	public class SubCategoryManager : ISubCategoryService
	{
		private readonly IRepositoryManager _repositoryManager;
		private readonly IMapper _mapper;

		public SubCategoryManager(IRepositoryManager repositoryManager, IMapper mapper)
		{
			_repositoryManager = repositoryManager;
			_mapper = mapper;
		}

		// Alt kategori oluşturma
		public async Task<ServiceResult<SubCategoryResponseDto>> CreateSubCategoryAsync(SubCategoryRequestDto subCategoryRequestDto)
		{
			var subCategory = _mapper.Map<SubCategory>(subCategoryRequestDto);
			var createdSubCategory = await _repositoryManager.SubCategoryRepository.CreateAsync(subCategory);

			var subCategoryResponseDto = _mapper.Map<SubCategoryResponseDto>(createdSubCategory);
			return ServiceResult<SubCategoryResponseDto>.SuccessResult(subCategoryResponseDto);
		}

		// ID'ye göre alt kategori getirme
		public async Task<ServiceResult<SubCategoryResponseDto>> GetSubCategoryByIdAsync(int id)
		{
			var subCategory = await _repositoryManager.SubCategoryRepository.GetByIdAsync(id);
			if (subCategory == null)
			{
				return ServiceResult<SubCategoryResponseDto>.FailureResult("Alt kategori bulunamadı.");
			}

			var subCategoryResponseDto = _mapper.Map<SubCategoryResponseDto>(subCategory);
			return ServiceResult<SubCategoryResponseDto>.SuccessResult(subCategoryResponseDto);
		}

		// Tüm alt kategorileri getirme
		public async Task<ServiceResult<IEnumerable<SubCategoryResponseDto>>> GetAllSubCategoriesAsync()
		{
			var subCategories = await _repositoryManager.SubCategoryRepository.GetAll().ToListAsync();
			var subCategoryResponseDtos = _mapper.Map<IEnumerable<SubCategoryResponseDto>>(subCategories);

			return ServiceResult<IEnumerable<SubCategoryResponseDto>>.SuccessResult(subCategoryResponseDtos);
		}

		// Alt kategori güncelleme
		public async Task<ServiceResult<SubCategoryResponseDto>> UpdateSubCategoryAsync(int id, SubCategoryRequestDto subCategoryRequestDto)
		{
			var subCategory = await _repositoryManager.SubCategoryRepository.GetByIdAsync(id);
			if (subCategory == null)
			{
				return ServiceResult<SubCategoryResponseDto>.FailureResult("Alt kategori bulunamadı.");
			}

			_mapper.Map(subCategoryRequestDto, subCategory);
			var updatedSubCategory = await _repositoryManager.SubCategoryRepository.UpdateAsync(subCategory);

			var subCategoryResponseDto = _mapper.Map<SubCategoryResponseDto>(updatedSubCategory);
			return ServiceResult<SubCategoryResponseDto>.SuccessResult(subCategoryResponseDto);
		}

		// Alt kategori silme
		public async Task<ServiceResult<bool>> DeleteSubCategoryAsync(int id)
		{
			var success = await _repositoryManager.SubCategoryRepository.DeleteAsync(id);
			if (!success)
			{
				return ServiceResult<bool>.FailureResult("Alt kategori bulunamadı veya silindi.");
			}

			return ServiceResult<bool>.SuccessResult(true);
		}
	}
}
