import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";

export const loginApi = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/authenticate`,
      credentials
    );
    console.log("dat1a", response.data);
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("userId", response.data.userId);
    return response.data;
  } catch (error) {
    console.log("data error", error.response.data);
    throw error.response.data;
  }
};

export const apiForgotPassword = (data) =>
  axios({
    url: "auth/forgot-password",
    method: "POST",
    data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "auth/reset-password",
    method: "POST",
    data,
  });

export const soDocChiSoApi = async (filterData) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/so-doc-chi-so/get-all?pageNumber=${filterData.pageNumber}&pageSize=10`
    );
    return response.data;
  } catch (error) {
    console.log("data error", error.response.data);
    throw error.response.data;
  }
};
export const soDocChiSoTheoNMApi = async (filterData) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/so-doc-chi-so/get-so-doc-chi-so-by-nha-may-id?nhaMayId=${filterData.nhaMayId}&pageNumber=${filterData.pageNumber}&pageSize=10`
    );
    console.log("Data get theo nha may id:", response.data.data.items);
    return response.data;
  } catch (error) {
    console.log("data error 111", error.response.data);
    throw error.response.data;
  }
};

export const createNewSoDocApi = async (filterParams) => {
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
};
export const taoNgayTheoKyGhiApi = async (filterParams) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/so-doc-chi-so/tao-ngay-trong-so-doc-theo-ky?id=${filterParams.idKyGhi}&time=${filterParams.time}`
    );
    console.log("Create Successfully taoNgayTheoKyGhiApi", response.data);
    return response.data;
  } catch (error) {
    console.log("Create data error taoNgayTheoKyGhiApi", error.response.data);
    throw error.response.data;
  }
};

export const filterHopDongApi = async (filterParams) => {
  try {
    const tuyenDocId = filterParams.tuyenDocId
      ? `TuyenDocId=${filterParams.tuyenDocId}`
      : "";
    const loaiKH = filterParams.loaiKH ? `LoaiKH=${filterParams.loaiKH}` : "";
    const sdtKH = filterParams.sdtKH
      ? `SoDienThoaiKhachHang=${filterParams.sdtKH}`
      : "";
    const keyIdHopDong = filterParams.keyIdHopDong
      ? `KeyIdHopDong=${filterParams.keyIdHopDong}`
      : "";
    const loaiDH = filterParams.loaiDH ? `LoaiDH=${filterParams.loaiDH}` : "";

    const response = await axios.get(
      `${API_URL}/api/hop-dong/filter-hop-dong-for-create-so-doc?${tuyenDocId}&${loaiKH}&${sdtKH}&${keyIdHopDong}&${loaiDH}&pageNumber=${filterParams.pageNumber}&pageSize=100000`,
      filterParams
    );
    console.log("Filtered hop dong", response.data);
    return response.data.data;
  } catch (error) {
    console.log("Filtered data error", error.response.data);
    throw error.response.data;
  }
};
export const filterCreateMutiSoDoc = async (filterParams) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/tuyen-doc-chua-tao-so/get-all?nhaMayId=${filterParams.nhaMayId}&time=${filterParams.time}`,
      filterParams
    );
    console.log("Filtered Create Muti", response.data.data);
    return response.data;
  } catch (error) {
    console.log("Filtered data error", error.response.data);
    throw error.message;
  }
};
export const filterSoDocApi = async (filterParams) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/so-doc-chi-so/filter`,
      filterParams
    );
    console.log("Filtered data", response.data);
    return response.data;
  } catch (error) {
    console.log("Filtered data error", error.response.data);
    throw error.response.data;
  }
};
export const tuyenDocAllApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/tuyen-doc/get-all`);
    return response.data;
  } catch (error) {
    console.log("data error1", error.response.data);
    throw error.response.data;
  }
};
const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error retrieving token from AsyncStorage:", error);
    throw error;
  }
};
export const kyGhiChiSoAllApi = async () => {
  try {
    const token = await getTokenFromStorage();
    if (!token) {
      // Handle the case where the token is not available
      // (e.g., redirect to login screen)
      console.log("Token is missing. Redirecting to login.");
      return;
    }
    // Now, you can make your API request with the retrieved token
    const response = await axios.get(`${API_URL}/api/ky-ghi-chi-so/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("data error2", error.message);
    throw error.response.data;
  }
};
export const khuVucAllApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/khu-vuc/get-all`);
    return response.data;
  } catch (error) {
    console.log("data error", error.response.data);
    throw error.response.data;
  }
};

//==============================HOA-DON=================================================
// export const apiTinhTienHoaDon = async (data) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/api/hoa-don/tinh-tien-hoa-don`,
//       data
//     );
//     console.log("Calculate Invoice", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("Filtered data error", error.response.data);
//     throw error.response.data;
//   }
// };
