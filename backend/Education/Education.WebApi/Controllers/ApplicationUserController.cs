using Education.Business.Core.@abstract;
using Education.Business.Services.Abstract;
using Education.Entity.DTOs.ApplicationUserDTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Education.WebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ApplicationUserController : ControllerBase
	{
		private readonly IServiceManager _manager;
		private IWebHostEnvironment _webHostEnvironment;
		private readonly IFileValidatorService _fileValidatorService;

		public ApplicationUserController(IServiceManager manager, IWebHostEnvironment webHostEnvironment,IFileValidatorService fileValidatorService)
		{
			_manager = manager;
			_webHostEnvironment = webHostEnvironment;
			_fileValidatorService = fileValidatorService;
		}

		// Yeni kullanıcı oluşturma
		[HttpPost("Create")]
		public async Task<IActionResult> CreateUser([FromForm] ApplicationUserRequestDto userRequestDto, IFormFile? imageFile)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			string? imageUrl=userRequestDto.Image;

			// Resim dosyasını yükleme
			if (imageFile != null && imageFile.Length > 0)
			{

				// Image uzantısın ve boyutunun kontrolü
				if (!_fileValidatorService.IsValidImageFile(imageFile))
				{
					return BadRequest("Geçersiz resim dosyası. Dosya uzantısını ve boyutunu kontrol edin.");
				}

				var imageDirectory = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "profileImages");
				Directory.CreateDirectory(imageDirectory);

				var imageFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
				var imageFilePath = Path.Combine(imageDirectory, imageFileName);

				using (var stream = new FileStream(imageFilePath, FileMode.Create))
				{
					await imageFile.CopyToAsync(stream);
				}

				imageUrl = Path.Combine("uploads", "profileImages", imageFileName);
			}
			
			userRequestDto.Image=imageUrl;

			var result = await _manager.ApplicationUserService.CreateUserAsync(userRequestDto);

			if (result.Success)
			{
				return Ok(result.Data);
			}

			return BadRequest(result.ErrorMessage); 
		}

		// Kullanıcıyı ID ile getirme
		[HttpGet("{id}")]
		public async Task<IActionResult> GetUserById(string id)
		{
			var result = await _manager.ApplicationUserService.GetUserByIdAsync(id);
			if (result.Success)
			{
				return Ok(result.Data); 
			}

			return NotFound(result.ErrorMessage); 
		}

		// Kullanıcı güncelleme
		[HttpPut("Update/{id}")]
		public async Task<IActionResult> UpdateUser(string id, [FromForm] ApplicationUserRequestDto updatedUserDto, IFormFile? imageFile)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			string? imageUrl=updatedUserDto.Image;

			// Resim dosyasını yükleme
			if (imageFile != null && imageFile.Length > 0)
			{
				// Image uzantısın ve boyutunun kontrolü
				if (!_fileValidatorService.IsValidImageFile(imageFile))
				{
					return BadRequest("Geçersiz resim dosyası. Dosya uzantısını ve boyutunu kontrol edin.");
				}

				var imageDirectory = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "profileImages");
				Directory.CreateDirectory(imageDirectory);

				var imageFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
				var imageFilePath = Path.Combine(imageDirectory, imageFileName);

				using (var stream = new FileStream(imageFilePath, FileMode.Create))
				{
					await imageFile.CopyToAsync(stream);
				}

				imageUrl = Path.Combine("uploads", "profileImages", imageFileName);
			}
			
			updatedUserDto.Image = imageUrl;

			var result = await _manager.ApplicationUserService.UpdateUserAsync(id, updatedUserDto);
			if (result.Success)
			{
				return Ok(result.Data);
			}

			return BadRequest(result.ErrorMessage); 
		}

		// Kullanıcı silme
		[HttpDelete("Delete/{id}")]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var result = await _manager.ApplicationUserService.DeleteUserAsync(id);
			if (result.Success)
			{
				return Ok(result.SuccessMessage); // Başarılıysa başarı mesajını döndürür
			}

			return BadRequest(result.ErrorMessage); // Hatalıysa hata mesajını döndürür
		}
	}
}
