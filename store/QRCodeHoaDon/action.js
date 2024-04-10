import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
export const fetchHoaDonByIdDienLuc = createAsyncThunk(
  "hoaDonByIdDienLuc/fetchHoaDonByIdDienLuc",
  async ({ idTheDienLuc }) => {
    const apiUrl = `${API_URL}/api/hoa-don/get-all-hoa-don-chua-thanh-toan-by-id-the-dien-luc/${idTheDienLuc}`;
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
);
