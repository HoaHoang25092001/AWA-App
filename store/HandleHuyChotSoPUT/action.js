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

export const fetchHuyChotSo = createAsyncThunk(
  "huyChotSo/fetchHuyChotSo",
  async ({ soDocChiSoId, isStatus, checkedKhoaSo }, { dispatch }) => {
    const apiUrl = `${API_URL}/api/so-doc-chi-so/update/chot-so-so-doc-chi-so?soDocChiSoId=${soDocChiSoId}&isStatus=${isStatus}`;

    try {
      // Retrieve the token from AsyncStorage
      if (checkedKhoaSo !== 1) {
        throw new Error("Phai mo khoa truoc");
      }
      const token = await getTokenFromStorage();

      // Now, you can make your API request with the retrieved token
      const response = await axios.put(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data Huy Chot", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error in fetchHuyChotSo:", error.message);
      throw error;
    }
  }
);
