
using Education.Business.Exeptions;
using Education.Entity.DTOs.ApplicationUserDTO;
using Microsoft.AspNetCore.Identity;

namespace Education.Business.Services.Abstract
{
	public interface IApplicationUserService
	{
		  Task<ServiceResult<ApplicationUserResponseDto>> CreateUserAsync(ApplicationUserRequestDto applicationUserRequestDto);
		  Task<ServiceResult<ApplicationUserResponseDto>> GetUserByIdAsync(string id);
		  Task<ServiceResult<ApplicationUserResponseDto>> UpdateUserAsync(string id, ApplicationUserRequestDto applicationUserRequestDto);
		  Task<ServiceResult<string>> DeleteUserAsync(string id);
	}
}
