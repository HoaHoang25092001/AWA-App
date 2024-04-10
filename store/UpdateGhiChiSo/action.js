import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";

// async action creator for token refresh
const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error retrieving token from AsyncStorage:", error);
    throw error;
  }
};

export const fecthUpdateGhiChiSo = createAsyncThunk(
  "updateGhiChiSo/fecthUpdateGhiChiSo",
  async ({ formData }, { dispatch }) => {
    const apiUrl = `${API_URL}/api/so-doc-chi-so/chi-so-dong-ho/ghi-chi-so`;

    try {
      const token = await getTokenFromStorage();

      // Now, you can make your API request with the retrieved token
      const response = await axios.put(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data Update ghi chi so", response.data.data);
      return response.data;
    } catch (error) {
      console.log("Error in fecthUpdateGhiChiSo:", error.response?.status);
      return { statusCode: error.response?.status };
    }
  }
);
