import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/Content",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getContentById = async (id: number) => {
  try {
    const response = await api.get(`/GetContentById/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const getTopContents = async ({
  pageNumber = 1,
  pageSize = 12,
}: {
  pageNumber?: number;
  pageSize?: number;
}): Promise<unknown> => {
  try {
    const response = await api.get("/GetTopContents", {
      params: { pageNumber, pageSize },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const getContentUsersByUserId = async (userId: string) => {
  try {
    const response = await api.get(`/GetByUser/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const createContent = async (
  content: any,
  videoFile: File,
  imageFile: File
) => {
  const formData = new FormData();

  // FormData'ya içerik bilgilerini ekle
  formData.append("Title", content.Title);
  formData.append("Description", content.Description);
  formData.append("ImageUrl", content.ImageUrl || "");
  formData.append("Topic", content.Topic);
  formData.append("UserId", content.userId);

  // Etiketleri FormData'ya ekle
  content.TagIds.forEach((tagId: any) => {
    formData.append("TagIds", tagId);
  });

  if (videoFile) {
    formData.append("videoFile", videoFile);
  } else {
    throw new Error("Video dosyası gerekli. Lütfen bir video dosyası seçin.");
  }

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  try {
    const response = await api.post("/Create", formData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const updateContent = async (
  id: number,
  content: any,
  imageFile: File
) => {
  const formData = new FormData();

  // İçerik bilgilerini FormData'ya ekle
  formData.append("Title", content.Title);
  formData.append("Description", content.Description);
  formData.append("ImageUrl", content.ImageUrl || "");
  formData.append("Topic", content.Topic || "");

  content.TagIds.forEach((tagId: any) => {
    formData.append("TagIds", tagId);
  });

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  try {
    const response = await api.put(`Update/${id}`, formData); // Endpoint'i kontrol edin ve güncelleyin
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteContent = async (id: number) => {
  try {
    const response = await api.delete(`/Delete/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
