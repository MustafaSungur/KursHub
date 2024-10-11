using Education.Business.Services.Abstract;
using Education.Entity.DTOs.ContentDTO;
using Microsoft.AspNetCore.Mvc;

using Education.Business.Core.@abstract;

namespace Education.WebApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ContentController : ControllerBase
	{
		private readonly IServiceManager _manager;
		private readonly IVideoConversionService _videoConversionService;
		private readonly IFileValidatorService _fileValidatorService;
		private readonly IWebHostEnvironment _webHostEnvironment;

		public ContentController(IServiceManager manager, IVideoConversionService videoConversionService, IFileValidatorService fileValidatorService, IWebHostEnvironment webHostEnvironment)
		{
			_manager = manager;
			_videoConversionService = videoConversionService;
			_fileValidatorService = fileValidatorService;
			_webHostEnvironment = webHostEnvironment;
		}

		// En yüksek rating'e sahip içerikleri döndüren API endpoint'i
		[HttpGet("GetTopContents")]
		public async Task<IActionResult> GetTopContents(int pageNumber = 1, int pageSize = 10)
		{
			var result = await _manager.ContentService.GetTopContents(pageNumber, pageSize);

			if (result.Success)
			{
				return Ok(result.Data);
			}

			return BadRequest(result.ErrorMessage);
		}

		// İçerik bilgilerini ID'ye göre getiren endpoint
		[HttpGet("{id}")]
		public async Task<IActionResult> GetContentById(long id)
		{
			var result = await _manager.ContentService.GetContentByIdAsync(id);

			if (result.Success)
			{
				return Ok(result.Data);
			}

			return NotFound(result.ErrorMessage); 
		}


		// İçerik oluşturma ve video/görsel yükleme için endpoint
		[HttpPost("Create")]
		public async Task<IActionResult> PostContent([FromForm] ContentRequestDto contentRequestDto, IFormFile videoFile, IFormFile? imageFile )
		{
			string? videoUrl;
			string? imageUrl = contentRequestDto.ImageUrl;
			
			// Video dosyasını yükleme ve dönüştürme
			if (videoFile != null && videoFile.Length > 0)
			{
				// Video uzantısın ve boyutunun kontrolü
				if (!_fileValidatorService.IsValidVideoFile(videoFile))
				{
					return BadRequest("Geçersiz video dosyası. Dosya uzantısını ve boyutunu kontrol edin.");
				}

				var videoDirectory = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "videos");
				Directory.CreateDirectory(videoDirectory);

				var originalFileName = Guid.NewGuid().ToString() + Path.GetExtension(videoFile.FileName);
				var originalFilePath = Path.Combine(videoDirectory, originalFileName);

				using (var stream = new FileStream(originalFilePath, FileMode.Create))
				{
					await videoFile.CopyToAsync(stream);
				}

				// Videoyu H.264 formatına dönüştür
				var convertedFileName = Guid.NewGuid().ToString() + ".mp4";
				var convertedFilePath = Path.Combine(videoDirectory, convertedFileName);

				//bool isConverted = await _videoConversionService.ConvertToH264(originalFilePath, convertedFilePath);
				//if (!isConverted)
				//{
				//	return BadRequest("Video H.264 formatına dönüştürülemedi.");
				//}

				videoUrl = Path.Combine("uploads", "videos", convertedFileName);
			}
			else
			{
				return BadRequest("Video dosyası gerekli. Lütfen bir video dosyası yükleyin.");

			}

			// Resim dosyasını yükleme
			if (imageFile != null && imageFile.Length > 0)
			{

				// Image uzantısın ve boyutunun kontrolü
				if (!_fileValidatorService.IsValidImageFile(imageFile))
				{
					return BadRequest("Geçersiz resim dosyası. Dosya uzantısını ve boyutunu kontrol edin.");
				}

				var imageDirectory = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "images");
				Directory.CreateDirectory(imageDirectory);

				var imageFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
				var imageFilePath = Path.Combine(imageDirectory, imageFileName);

				using (var stream = new FileStream(imageFilePath, FileMode.Create))
				{
					await imageFile.CopyToAsync(stream);
				}

				imageUrl = Path.Combine("uploads", "images", imageFileName);
			}
			
			// Dosya URL'lerini DTO'ya ekleyip ContentManager'a gönderiyoruz
			contentRequestDto.VideoUrl = videoUrl!;
			contentRequestDto.ImageUrl = imageUrl;

			var result = await _manager.ContentService.CreateContentAsync(contentRequestDto);

			if (result.Success)
			{
				return Ok(result.Data); // Başarılıysa içerik bilgilerini döndür
			}
			else
			{
				return BadRequest(result.ErrorMessage); // Başarısızsa hata mesajını döndür

			}

		}


		// İçerik güncelleme için endpoint
		[HttpPut("Update/{id}")]
		public async Task<IActionResult> UpdateContent(int id, [FromForm] ContentRequestDto contentRequestDto, IFormFile? imageFile)
		{
			string? imageUrl = contentRequestDto.ImageUrl;								

			
			// Resim dosyasını yükleme
			if (imageFile != null && imageFile.Length > 0)
			{
				// Image uzantısın ve boyutunun kontrolü
				if (!_fileValidatorService.IsValidImageFile(imageFile))
				{
					return BadRequest("Geçersiz resim dosyası. Dosya uzantısını ve boyutunu kontrol edin.");
				}

				var imageDirectory = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "images");
				Directory.CreateDirectory(imageDirectory);

				var imageFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
				var imageFilePath = Path.Combine(imageDirectory, imageFileName);

				using (var stream = new FileStream(imageFilePath, FileMode.Create))
				{
					await imageFile.CopyToAsync(stream);
				}

				imageUrl = Path.Combine("uploads", "images", imageFileName);
			}

			// Güncellenen URL'leri DTO'ya ekleyip ContentManager'a gönderiyoruz
			contentRequestDto.ImageUrl = imageUrl;

			var result = await _manager.ContentService.UpdateContentAsync(id, contentRequestDto);

			if (result.Success)
			{
				return Ok(result.Data); 
			}
			else
			{
				return BadRequest(result.ErrorMessage); 
			}
		}


		// İçeriği ID'ye göre silen endpoint
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteContent(long id)
		{
			var result = await _manager.ContentService.DeleteContentAsync(id);

			if (result.Success)
			{
				return Ok(result.Data); // Başarılıysa silinen içerik bilgilerini döndür
			}

			return NotFound(result.ErrorMessage); // Başarısızsa 404 Not Found döndür
		}

	}
}
