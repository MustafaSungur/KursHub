using Education.Entity.DTOs.SubCategoryDTO;
using Education.Business.Exeptions;

namespace Education.Business.Services.Abstract
{
	public interface ISubCategoryService
	{
		Task<ServiceResult<SubCategoryResponseDto>> CreateSubCategoryAsync(SubCategoryRequestDto subCategoryRequestDto);
		Task<ServiceResult<SubCategoryResponseDto>> GetSubCategoryByIdAsync(int id);
		Task<ServiceResult<IEnumerable<SubCategoryResponseDto>>> GetAllSubCategoriesAsync();
		Task<ServiceResult<SubCategoryResponseDto>> UpdateSubCategoryAsync(int id, SubCategoryRequestDto subCategoryRequestDto);
		Task<ServiceResult<bool>> DeleteSubCategoryAsync(int id);
	}
}
