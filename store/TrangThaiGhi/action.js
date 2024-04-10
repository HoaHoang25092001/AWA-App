import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
export const fetchTrangThaiGhi = createAsyncThunk(
  "trangThaiGhi/fetchTrangThaiGhi",
  async (nhaMayIdParams) => {
    const apiUrl = `${API_URL}/api/trang-thai-ghi/get-all?${nhaMayIdParams}`;
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
);
