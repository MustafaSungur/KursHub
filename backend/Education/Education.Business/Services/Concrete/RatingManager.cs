using AutoMapper;
using Education.Business.Services.Abstract;
using Education.Business.Exeptions;
using Education.Data.Repositories.Abstract;
using Education.Entity.Models;
using Education.Entity.DTOs.RaitingDTO;


namespace Education.Business.Services.Concrete
{
	public class RatingManager : IRatingService
	{
		private readonly IRepositoryManager _repositoryManager;
		private readonly IMapper _mapper;

		public RatingManager(IRepositoryManager repositoryManager, IMapper mapper)
		{
			_repositoryManager = repositoryManager;
			_mapper = mapper;
		}

		// Rating oluşturma işlemi
		public async Task<ServiceResult<RatingResponseDto>> CreateRatingAsync(RatingRequestDto ratingRequestDto)
		{
			var rating = _mapper.Map<Rating>(ratingRequestDto);
			var createdRating = await _repositoryManager.RatingRepository.CreateAsync(rating);

			var ratingResponseDto = _mapper.Map<RatingResponseDto>(createdRating);
			return ServiceResult<RatingResponseDto>.SuccessResult(ratingResponseDto);
		}
	}
}
