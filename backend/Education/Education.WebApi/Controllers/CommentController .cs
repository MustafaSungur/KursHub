using Education.Business.Services.Abstract;
using Education.Entity.DTOs.CommentDTO;
using Microsoft.AspNetCore.Mvc;

namespace Education.WebApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CommentController : ControllerBase
	{
		private readonly IServiceManager _manager;

		public CommentController(IServiceManager manager)
		{
			_manager = manager;
		}

		// Yorum oluşturma
		[HttpPost("Create")]
		public async Task<IActionResult> CreateComment([FromBody] CommentRequestDto commentRequestDto)
		{
			var result = await _manager.CommentService.CreateCommentAsync(commentRequestDto);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return BadRequest(result.ErrorMessage);
		}

		// ID'ye göre yorum getirme
		[HttpGet("{id}")]
		public async Task<IActionResult> GetCommentById(long id)
		{
			var result = await _manager.CommentService.GetCommentByIdAsync(id);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// Tüm yorumları getirme
		[HttpGet("GetAll")]
		public async Task<IActionResult> GetAllComments()
		{
			var result = await _manager.CommentService.GetAllCommentsAsync();
			return Ok(result.Data);
		}

		// Kullanıcı ID'ye göre yorumları getirme
		[HttpGet("GetByUser/{userId}")]
		public async Task<IActionResult> GetCommentsByUserId(string userId)
		{
			var result = await _manager.CommentService.GetCommentsByUserIdAsync(userId);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// İçerik ID'ye göre yorumları getirme
		[HttpGet("GetByContent/{contentId}")]
		public async Task<IActionResult> GetCommentsByContentId(long contentId)
		{
			var result = await _manager.CommentService.GetCommentsByContentIdAsync(contentId);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// Yorum ID ve Kullanıcı ID'ye göre yorumu getirme
		[HttpGet("GetByUserAndComment/{commentId}/{userId}")]
		public async Task<IActionResult> GetCommentByUserAndCommentId(long commentId, string userId)
		{
			var result = await _manager.CommentService.GetCommentByUserAndCommentIdAsync(commentId, userId);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// Yorum güncelleme
		[HttpPut("Update/{id}")]
		public async Task<IActionResult> UpdateComment(long id, [FromBody] CommentRequestDto commentRequestDto)
		{
			var result = await _manager.CommentService.UpdateCommentAsync(id, commentRequestDto);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// Yorum silme
		[HttpDelete("Delete/{id}")]
		public async Task<IActionResult> DeleteComment(long id)
		{
			var result = await _manager.CommentService.DeleteCommentAsync(id);
			if (result.Success)
			{
				return Ok("Yorum başarıyla silindi.");
			}
			return NotFound(result.ErrorMessage);
		}
	}
}
