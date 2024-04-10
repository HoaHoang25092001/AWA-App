import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
export const fetchChiSoDongHoByIdSoDoc = createAsyncThunk(
  "chiSoDongHo/fetchChiSoDongHoByIdSoDoc",
  async ({ itemId }) => {
    const apiUrl = `${API_URL}/api/chi-so-dong-ho/get-chi-so-dong-ho-by-so-doc-chi-so-id?SoDocChiSoId=${itemId}&pageNumber=1&pageSize=1000000`;
    const response = await axios.get(apiUrl);
    return response.data.data.items;
  }
);
