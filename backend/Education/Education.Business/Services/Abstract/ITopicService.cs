using Education.Business.Exeptions;
using Education.Entity.DTOs.TopicDTO;

namespace Education.Business.Services.Abstract
{
	public interface ITopicService
	{
		Task<ServiceResult<TopicResponseDto>> CreateTopicAsync(TopicRequestDto topicRequestDto);

		Task<ServiceResult<TopicResponseDto>> GetTopicByIdAsync(int id);

		Task<ServiceResult<IEnumerable<TopicResponseDto>>> GetAllTopicsAsync();

		Task<ServiceResult<TopicResponseDto>> UpdateTopicAsync(int id, TopicRequestDto topicRequestDto);

		Task<ServiceResult<bool>> DeleteTopicAsync(int id);
	}
}