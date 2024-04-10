import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNewSoDocApi, loginApi, soDocChiSoApi } from "../api/user";
import {
  loginSuccess,
  loginStart,
  loginFailure,
  logout,
  sodocStart,
  sodocSuccess,
  sodocFailure,
} from "./appSlice";
import { useSelector } from "react-redux";

export const loginUser = createAsyncThunk(
  "auth/authenticate",
  async (credentials, { dispatch }) => {
    try {
      dispatch(loginStart());
      const data = await loginApi(credentials);
      dispatch(loginSuccess(data));
      // Store the token in AsyncStorage after successful login
    } catch (error) {
      console.log("Errorrrrrrrrr:", error.Message);
      dispatch(loginFailure(error.Message));
    }
  }
);
export const soDocChiSo = createAsyncThunk(
  "so-doc-chi-so/get-all",
  async ({ dispatch }) => {
    try {
      dispatch(sodocStart());
      const data = await soDocChiSoApi();
      dispatch(sodocSuccess(data));
      // Store the token in AsyncStorage after successful login
      console.log("respone data so doc chi so", data.tenSo);
    } catch (error) {
      console.log("Error so doc chi so:", error.Message);
      dispatch(sodocFailure(error.Message));
    }
  }
);
export const createNewSoDocChiSo = createAsyncThunk(
  "so-doc-chi-so/create-new-so-doc-chi-so",
  async ({ dispatch }) => {
    try {
      dispatch(sodocStart());
      const data = await createNewSoDocApi();
      dispatch(sodocSuccess(data));
      // Store the token in AsyncStorage after successful login
      console.log("respone data so doc chi so", data.tenSo);
    } catch (error) {
      console.log("Error so doc chi so:", error.Message);
      dispatch(sodocFailure(error.Message));
    }
  }
);

export const hopDong = createAsyncThunk(
  "hop-dong/get-all",
  async (query, { getState }) => {
    try {
      // Thực hiện yêu cầu GraphQL ở đây, sử dụng Apollo Client hoặc phương thức bạn đã sử dụng.
      const response = await hopDongGraphQL.query({ query });
      console.log("respone GraphQL", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const canBoDoc = createAsyncThunk(
  "can-bo-doc/get-all",
  async (query, { getState }) => {
    try {
      // Thực hiện yêu cầu GraphQL ở đây, sử dụng Apollo Client hoặc phương thức bạn đã sử dụng.
      const response = await canBoDocGraphQL.query({ query });
      console.log("respone canBoDocGraphQL", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUser = () => (dispatch) => {
  dispatch(logout());

  console.log("logged out");
};
