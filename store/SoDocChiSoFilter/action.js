import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
export const fetchSoDocChiSoFilter = createAsyncThunk(
  "soDocChiSoFilter/fetchSoDocChiSoFilter",
  async ({
    service,
    currentPage,
    thangSoDoc,
    canboDocId,
    tuyenDocId,
    trangThaiSoDoc,
    khuVucId,
    kyGhiChiSoId,
    tenSo,
  }) => {
    let apiUrl = "";
    const nhaMayIdParams = Array.isArray(service)
      ? service.map((nhaMayId) => `nhaMayIds=${nhaMayId}`).join("&")
      : `nhaMayIds=${service}`;
    if (nhaMayIdParams.length > 1) {
      apiUrl = `${API_URL}/api/so-doc-chi-so/filter?ThangSoDoc=${thangSoDoc}&TuyenDocId=${tuyenDocId}&TrangThaiSoDoc=${trangThaiSoDoc}&KhuVucId=${khuVucId}&KyGhiChiSoId=${kyGhiChiSoId}&TenSo=${tenSo}&${nhaMayIdParams}&pageNumber=${currentPage}&pageSize=10`;
      console.log("URL: ", apiUrl);
    } else {
      apiUrl = `${API_URL}/api/so-doc-chi-so/filter?ThangSoDoc=${thangSoDoc}&CanboDocId=${canboDocId}&TuyenDocId=${tuyenDocId}&TrangThaiSoDoc=${trangThaiSoDoc}&KhuVucId=${khuVucId}&KyGhiChiSoId=${kyGhiChiSoId}&TenSo=${tenSo}&NhaMayIds=${service}&pageNumber=${currentPage}&pageSize=10`;
    }
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
);
