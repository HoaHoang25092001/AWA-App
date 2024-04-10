import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
export const fetchCreateNewSoDoc = createAsyncThunk(
  "createNewSoDoc/fetchCreateNewSoDoc",
  async ({ filterParams }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/so-doc-chi-so/create-new-so-doc-chi-so`,
        filterParams
      );
      console.log("Create Successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Create data error", error.response.data);
      throw error.response.data;
    }
  }
);
