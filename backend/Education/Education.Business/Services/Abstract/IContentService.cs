﻿
using Education.Business.Exeptions;
using Education.Entity.DTOs.ContentDTO;
using Education.Entity.DTOs.ContentFilterRequestDTO;
using Education.Entity.Models;

namespace Education.Business.Services.Abstract
{
	public interface IContentService
	{
		Task<ServiceResult<IEnumerable<ContentResponseDto>>>GetTopContents(int pageNumber,int PageSize);
		Task<ServiceResult<ContentResponseDto>> CreateContentAsync(ContentRequestDto contentRequestDto);
		Task<ServiceResult<ContentResponseDto>> UpdateContentAsync(int id, ContentRequestDto contentRequestDto);
		Task<ServiceResult<ContentResponseDto>> GetContentByIdAsync(long id);
		Task<ServiceResult<bool>> DeleteContentAsync(long id);
		Task<ServiceResult<IEnumerable<ContentResponseDto>>> FilterContents(ContentFilterRequestDto filterRequest);
	}
}
