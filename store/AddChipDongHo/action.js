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

export const fetchAddChipDongHo = createAsyncThunk(
  "addChipDongHo/fetchAddChipDongHo",
  async ({ filterParam }, { dispatch }) => {
    const apiUrl = `${API_URL}/api/dong-ho-nuoc/add-chip-dong-ho-nuoc-vao-dong-ho`;

    try {
      const token = await getTokenFromStorage();

      // Now, you can make your API request with the retrieved token
      console.log("Token ne", token);
      const response = await axios.put(apiUrl, filterParam, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json", // Correct key for Accept header
        },
      });

      console.log("Data Add Chip Dong ho", response.data.data);
      return response.data;
    } catch (error) {
      return { statusCode: error.response?.status };
    }
  }
);
