import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error retrieving token from AsyncStorage:", error);
    throw error;
  }
};
const API_URL = "https://api-awa-dev.amazingtech.vn";
export const updateTheDienLuc = createAsyncThunk(
  "updateIdDienLuc/updateTheDienLuc",
  async ({ khachHangId, idTheDienLuc }, { dispatch }) => {
    const apiUrl = `${API_URL}/api/khach-hang/update-the-dien-luc`;

    try {
      const token = await getTokenFromStorage();

      // Prepare the data to be sent in the request body
      const requestData = {
        khachHangId: khachHangId,
        idTheDienLuc: idTheDienLuc,
      };

      // Now, you can make your API request with the retrieved token and request data
      const response = await axios.put(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("Error in the dien luc:", error.response?.status);
      return { statusCode: error.response?.status };
    }
  }
);
