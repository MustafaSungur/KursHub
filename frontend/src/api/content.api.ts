import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/Content", // baseURL'nin doğru olduğundan emin olun

  headers: {
    "Content-Type": "application/json",
  },
});

// İçeriği ID ile getirme
export const getContentById = async (id: number) => {
  try {
    console.log("contetn id: ", id);
    const response = await api.get(`/${id}`);
    console.log("contetn response: ", response.data);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const filterContents = async (filterRequest: any) => {
  try {
    console.log("api-filter-request: ", filterRequest);
    const response = await api.post("/FilterContents", filterRequest);
    console.log("api-filter-response: ", response.data);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

// En yüksek rating'e sahip içerikleri getirme
export const getTopContents = async ({
  pageNumber = 1,
  pageSize = 12,
}: {
  pageNumber?: number;
  pageSize?: number;
}): Promise<unknown> => {
  try {
    console.log("api-topcontent-req", pageSize, pageNumber);

    const response = await api.get("/GetTopContents", {
      params: { pageNumber, pageSize },
    });
    console.log("api-topcontent", response.data);
    return response.data;
  } catch (error: any) {
    console.log("api: ", error);

    throw error.response?.data?.message || error.message;
  }
};

// Belirli bir kullanıcıya göre içerik kullanıcılarını getirme
export const getContentUsersByUserId = async (userId: string) => {
  try {
    const response = await api.get(`/GetByUser/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

// İçerik oluşturma
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

  // Video ve resim dosyalarını ekle
  if (videoFile) {
    formData.append("videoFile", videoFile);
  } else {
    throw new Error("Video dosyası gerekli. Lütfen bir video dosyası seçin.");
  }

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  try {
    const response = await api.post("/Create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

// İçerik güncelleme
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
    const response = await api.put(`/Update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

// İçerik silme
export const deleteContent = async (id: number) => {
  try {
    const response = await api.delete(`/Delete/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
