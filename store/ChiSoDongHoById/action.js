import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
export const fetchChiSoDongHoById = createAsyncThunk(
  "chiSoDongHoById/fetchChiSoDongHoById",
  async ({ selectedItemId }) => {
    const apiUrl = `${API_URL}/api/chi-so-dong-ho/get-chi-so-dong-ho-by-id/${selectedItemId}`;
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
);
