using Education.Business.Services.Abstract;
using Education.Entity.DTOs.SubCategoryDTO;
using Microsoft.AspNetCore.Mvc;

namespace Education.WebApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class SubCategoryController : ControllerBase
	{
		private readonly IServiceManager _manager;

		public SubCategoryController(IServiceManager manager)
		{
			_manager = manager;
		}

		// Alt kategori oluşturma
		[HttpPost("Create")]
		public async Task<IActionResult> CreateSubCategory([FromBody] SubCategoryRequestDto subCategoryRequestDto)
		{
			var result = await _manager.SubCategoryService.CreateSubCategoryAsync(subCategoryRequestDto);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return BadRequest(result.ErrorMessage);
		}

		// ID'ye göre alt kategori getirme
		[HttpGet("{id}")]
		public async Task<IActionResult> GetSubCategoryById(int id)
		{
			var result = await _manager.SubCategoryService.GetSubCategoryByIdAsync(id);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// Tüm alt kategorileri getirme
		[HttpGet("GetAll")]
		public async Task<IActionResult> GetAllSubCategories()
		{
			var result = await _manager.SubCategoryService.GetAllSubCategoriesAsync();
			return Ok(result.Data);
		}

		// Alt kategori güncelleme
		[HttpPut("Update/{id}")]
		public async Task<IActionResult> UpdateSubCategory(int id, [FromBody] SubCategoryRequestDto subCategoryRequestDto)
		{
			var result = await _manager.SubCategoryService.UpdateSubCategoryAsync(id, subCategoryRequestDto);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// Alt kategori silme
		[HttpDelete("Delete/{id}")]
		public async Task<IActionResult> DeleteSubCategory(int id)
		{
			var result = await _manager.SubCategoryService.DeleteSubCategoryAsync(id);
			if (result.Success)
			{
				return Ok("Alt kategori başarıyla silindi.");
			}
			return NotFound(result.ErrorMessage);
		}
	}
}
