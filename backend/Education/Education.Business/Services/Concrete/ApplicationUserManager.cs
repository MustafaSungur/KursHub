using AutoMapper;
using Education.Business.Services.Abstract;
using Education.Business.Exeptions;
using Education.Entity.DTOs.ApplicationUserDTO;
using Education.Entity.Models;
using Microsoft.AspNetCore.Identity;
using Education.Entity.Enums;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace Education.Business.Services.Concrete
{
	public class ApplicationUserManager : IApplicationUserService
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly IMapper _mapper;

		public ApplicationUserManager(UserManager<ApplicationUser> userManager, IMapper mapper)
		{
			_userManager = userManager;
			_mapper = mapper;
		}

		// Yeni bir kullanıcı oluşturma
		public async Task<ServiceResult<ApplicationUserResponseDto>> CreateUserAsync(ApplicationUserRequestDto userRequestDto)
		{
			var user = _mapper.Map<ApplicationUser>(userRequestDto);

			user.Role = UserRole.User;
			user.UserName = user.Email;
			user.Image = userRequestDto.Image ?? string.Empty;
			user.BirthDate = (DateTime)(userRequestDto.BirthDate?.ToUniversalTime())!;

			var result = await _userManager.CreateAsync(user, userRequestDto.Password!);

			if (result.Succeeded)
			{
				await _userManager.AddToRoleAsync(user, UserRole.User.ToString());

				var userResponseDto = _mapper.Map<ApplicationUserResponseDto>(user);
				return ServiceResult<ApplicationUserResponseDto>.SuccessResult(userResponseDto);
			}
			else
			{
				var errors = string.Join(", ", result.Errors.Select(e => e.Description));
				return ServiceResult<ApplicationUserResponseDto>.FailureResult(errors);
			}
		}

		// ID ile kullanıcıyı getirme
		public async Task<ServiceResult<ApplicationUserResponseDto>> GetUserByIdAsync(string id)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
			{
				return ServiceResult<ApplicationUserResponseDto>.FailureResult("Kullanıcı bulunamadı.");
			}

			var userResponseDto = _mapper.Map<ApplicationUserResponseDto>(user);
			return ServiceResult<ApplicationUserResponseDto>.SuccessResult(userResponseDto);
		}

		// Kullanıcı güncelleme
		public async Task<ServiceResult<ApplicationUserResponseDto>> UpdateUserAsync(string id, ApplicationUserRequestDto updatedUserDto)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
			{
				return ServiceResult<ApplicationUserResponseDto>.FailureResult("Kullanıcı bulunamadı.");
			}

			user.FirstName = updatedUserDto.FirstName!;
			user.LastName = updatedUserDto.LastName!;
			user.Image = updatedUserDto.Image ?? string.Empty;
			user.UpdatedDate = DateTime.UtcNow;

			var result = await _userManager.UpdateAsync(user);

			if (result.Succeeded)
			{
				var userResponseDto = _mapper.Map<ApplicationUserResponseDto>(user);
				return ServiceResult<ApplicationUserResponseDto>.SuccessResult(userResponseDto);
			}
			else
			{
				var errors = string.Join(", ", result.Errors.Select(e => e.Description));
				return ServiceResult<ApplicationUserResponseDto>.FailureResult(errors);
			}
		}

		// Kullanıcı silme (soft delete)
		public async Task<ServiceResult<string>> DeleteUserAsync(string id)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
			{
				return ServiceResult<string>.FailureResult("Kullanıcı bulunamadı.");
			}

			user.State = State.Deleted;
			var result = await _userManager.UpdateAsync(user);

			if (result.Succeeded)
			{
				return ServiceResult<string>.SuccessMessageResult("Kullanıcı başarıyla silindi.");
			}
			else
			{
				var errors = string.Join(", ", result.Errors.Select(e => e.Description));
				return ServiceResult<string>.FailureResult(errors);
			}
		}
	}
}
