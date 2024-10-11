using Education.Business.Services.Abstract;
using Education.Entity.DTOs.TopicDTO;
using Microsoft.AspNetCore.Mvc;

namespace Education.WebApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TopicController : ControllerBase
	{
		private readonly IServiceManager _manager;

		public TopicController(IServiceManager manager)
		{
			_manager = manager;
		}

		// Yeni Topic oluşturma
		[HttpPost("Create")]
		public async Task<IActionResult> CreateTopic([FromBody] TopicRequestDto topicRequestDto)
		{
			var result = await _manager.TopicService.CreateTopicAsync(topicRequestDto);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return BadRequest(result.ErrorMessage);
		}

		// ID'ye göre Topic getirme
		[HttpGet("{id}")]
		public async Task<IActionResult> GetTopicById(int id)
		{
			var result = await _manager.TopicService.GetTopicByIdAsync(id);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// Tüm Topic'leri getirme
		[HttpGet("GetAll")]
		public async Task<IActionResult> GetAllTopics()
		{
			var result = await _manager.TopicService.GetAllTopicsAsync();
			return Ok(result.Data);
		}

		// Topic güncelleme
		[HttpPut("Update/{id}")]
		public async Task<IActionResult> UpdateTopic(int id, [FromBody] TopicRequestDto topicRequestDto)
		{
			var result = await _manager.TopicService.UpdateTopicAsync(id, topicRequestDto);
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return NotFound(result.ErrorMessage);
		}

		// Topic silme
		[HttpDelete("Delete/{id}")]
		public async Task<IActionResult> DeleteTopic(int id)
		{
			var result = await _manager.TopicService.DeleteTopicAsync(id);
			if (result.Success)
			{
				return Ok("Topic başarıyla silindi.");
			}
			return NotFound(result.ErrorMessage);
		}
	}
}
