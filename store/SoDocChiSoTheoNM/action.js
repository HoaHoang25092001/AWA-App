import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
export const fetchSoDocChiSoByNhaMayId = createAsyncThunk(
  "soDocChiSo/fetchSoDocChiSoByNhaMayId",
  async ({ service, currentPage, userId }) => {
    const getTokenFromStorage = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        return token;
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
        throw error;
      }
    };
    let apiUrl = "";
    const nhaMayIdParams = Array.isArray(service)
      ? service.map((nhaMayId) => `nhaMayIds=${nhaMayId}`).join("&")
      : `nhaMayIds=${service}`;

    if (nhaMayIdParams.length > 1) {
      const queryParams = [
        nhaMayIdParams,
        `userId=${userId}`,
        `pageNumber=${currentPage}`,
        "pageSize=10",
      ].join("&");
      apiUrl = `${API_URL}/api/so-doc-chi-so/get-so-doc-chi-so-by-nha-may-id?${queryParams}`;
    } else {
      apiUrl = `${API_URL}/api/so-doc-chi-so/get-so-doc-chi-so-by-nha-may-id?nhaMayIds=${service}&userId=${userId}&pageNumber=${currentPage}&pageSize=10`;
    }

    try {
      const token = await getTokenFromStorage();
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the authorization header
        },
      });

      return response.data.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);
