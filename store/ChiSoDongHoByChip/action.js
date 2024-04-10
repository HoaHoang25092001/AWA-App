import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";

export const fetchChiSoDongHoByChip = createAsyncThunk(
  "chiSoDongHoByChip/fetchChiSoDongHoByChip",
  async ({ idChipDongHo, thangTaoSoDoc }, thunkAPI) => {
    try {
      const apiUrl = `${API_URL}/api/chi-so-dong-ho/get-chi-so-dong-ho-by-chip-dong-ho-nuoc-and-thang-tao-so/${idChipDongHo}?thangTaoSoDoc=${thangTaoSoDoc}`;
      console.log("API URL:", apiUrl);
      const response = await axios.get(apiUrl);
      console.log("Data returned: ", response.data.data);
      return response.data.data;
    } catch (error) {
      // You can log the error or handle it in any way you want
      console.error("Error fetching data:", error);

      // You can also use rejectWithValue to pass the error to the rejected action
      return error;
    }
  }
);
