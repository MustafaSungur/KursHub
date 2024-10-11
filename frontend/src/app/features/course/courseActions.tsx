import {
  createContent,
  deleteContent,
  getContentById,
  getContentUsersByUserId,
  getTopContents,
  updateContent,
} from "@/api/course.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopContents = createAsyncThunk(
  "contents/fetchTopContents",
  async ({ pageNumber = 1, pageSize = 12 }: any, { rejectWithValue }) => {
    try {
      const response = await getTopContents({ pageNumber, pageSize });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchContentById = createAsyncThunk(
  "content/fetchContentById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getContentById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchContentUsersByUserId = createAsyncThunk(
  "contentUser/fetchContentUsersByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getContentUsersByUserId(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createContentAction = createAsyncThunk(
  "content/createContent",
  async ({ content, videoFile, imageFile }: any, { rejectWithValue }) => {
    try {
      const response = await createContent(content, videoFile, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateContentAction = createAsyncThunk(
  "content/updateContent",
  async ({ id, contentRequestDto, imageFile }: any, { rejectWithValue }) => {
    try {
      const response = await updateContent(id, contentRequestDto, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContentAction = createAsyncThunk(
  "content/deleteContent",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteContent(id);
      return response; // Başarılıysa silinen içerik bilgilerini döner
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
