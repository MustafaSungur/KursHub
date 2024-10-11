using AutoMapper;
using Education.Business.Exeptions;
using Education.Business.Services.Abstract;
using Education.Data.Repositories.Abstract;
using Education.Entity.DTOs.TopicDTO;
using Education.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Business.Services.Concrete
{
	public class TopicManager : ITopicService
	{
		private readonly IRepositoryManager _repositoryManager;
		private readonly IMapper _mapper;

		public TopicManager(IRepositoryManager repositoryManager, IMapper mapper)
		{
			_repositoryManager = repositoryManager;
			_mapper = mapper;
		}

		// Topic oluşturma işlemi
		public async Task<ServiceResult<TopicResponseDto>> CreateTopicAsync(TopicRequestDto topicRequestDto)
		{
			var topic = _mapper.Map<Topic>(topicRequestDto);
			var createdTopic = await _repositoryManager.TopicRepository.CreateAsync(topic);

			var topicResponseDto = _mapper.Map<TopicResponseDto>(createdTopic);
			return ServiceResult<TopicResponseDto>.SuccessResult(topicResponseDto);
		}

		// ID'ye göre Topic getirme işlemi
		public async Task<ServiceResult<TopicResponseDto>> GetTopicByIdAsync(int id)
		{
			var topic = await _repositoryManager.TopicRepository.GetByIdAsync(id);
			if (topic == null)
			{
				return ServiceResult<TopicResponseDto>.FailureResult("Topic bulunamadı.");
			}

			var topicResponseDto = _mapper.Map<TopicResponseDto>(topic);
			return ServiceResult<TopicResponseDto>.SuccessResult(topicResponseDto);
		}

		// Tüm Topic'leri getirme işlemi
		public async Task<ServiceResult<IEnumerable<TopicResponseDto>>> GetAllTopicsAsync()
		{
			var topics = await _repositoryManager.TopicRepository.GetAll().ToListAsync();
			var topicResponseDtos = _mapper.Map<IEnumerable<TopicResponseDto>>(topics);

			return ServiceResult<IEnumerable<TopicResponseDto>>.SuccessResult(topicResponseDtos);
		}

		// Topic güncelleme işlemi
		public async Task<ServiceResult<TopicResponseDto>> UpdateTopicAsync(int id, TopicRequestDto topicRequestDto)
		{
			var topic = await _repositoryManager.TopicRepository.GetByIdAsync(id);
			if (topic == null)
			{
				return ServiceResult<TopicResponseDto>.FailureResult("Topic bulunamadı.");
			}

			_mapper.Map(topicRequestDto, topic);
			var updatedTopic = await _repositoryManager.TopicRepository.UpdateAsync(topic);

			var topicResponseDto = _mapper.Map<TopicResponseDto>(updatedTopic);
			return ServiceResult<TopicResponseDto>.SuccessResult(topicResponseDto);
		}

		// Topic silme işlemi
		public async Task<ServiceResult<bool>> DeleteTopicAsync(int id)
		{
			var result = await _repositoryManager.TopicRepository.DeleteAsync(id);
			if (!result)
			{
				return ServiceResult<bool>.FailureResult("Topic silinemedi.");
			}

			return ServiceResult<bool>.SuccessResult(true);
		}
	}
}
