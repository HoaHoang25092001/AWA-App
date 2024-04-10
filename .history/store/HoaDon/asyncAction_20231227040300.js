import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../api'
import axios from "axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
// export const getAllSoThanhToan = createAsyncThunk("so-doc-chi-so/get-all-so-thanh-toan", async ({currentPage, service}, { rejectWithValue }) => {
//     let apiUrl = "";
//     const nhaMayIdParams = Array.isArray(service)
//       ? service.map((nhaMayId) => `nhaMayIds=${nhaMayId}`).join("&")
//       : `nhaMayIds=${service}`;
//     if (nhaMayIdParams.length > 1) {
//       const queryParams = [
//         nhaMayIdParams,
//         `pageNumber=${currentPage}`,
//         "pageSize=10",
//       ].join("&");
//       apiUrl = `${API_URL}/api/so-doc-chi-so/get-all-so-thanh-toan?nhaMayIds=${queryParams}`;
//     } else {
//       apiUrl = `${API_URL}/api/so-doc-chi-so/get-all-so-thanh-toan?nhaMayIds=${service}&pageNumber=${currentPage}&pageSize=10`;
//     }
//     const response = await axios.get(apiUrl);
//     return response.data.data;
// })

export const getAllSoThanhToan = createAsyncThunk("so-doc-chi-so/get-all-so-thanh-toan", async ({ currentPage, service, userId }, { rejectWithValue }) => {
    let response = "";
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
        response = await apis.apiGetAllSoThanhToan(queryParams)
        console.log(response.data)

        // Nếu bị lỗi thì reject
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data
    } else {
        const queryParams = [
            nhaMayIdParams,
            `userId=${userId}`,
            `pageNumber=${currentPage}`,
            "pageSize=10",
        ].join("&");
        response = await apis.apiGetAllSoThanhToan(queryParams)
        console.log(response.data)

        // Nếu bị lỗi thì reject
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data
    }
})

export const getAllSoThanhToanBySoDoc = createAsyncThunk("hoa-don/get-all-so-thanh-toan", async ({ paymentRecordID, currentPage, service }, { rejectWithValue }) => {
    let response = "";
    const nhaMayIdParams = Array.isArray(service)
        ? service.map((nhaMayId) => `nhaMayIds=${nhaMayId}`).join("&")
        : `nhaMayIds=${service}`;
    if (nhaMayIdParams.length > 1) {
        const queryParams = [
            nhaMayIdParams,
            `soDocChiSoId=${paymentRecordID}`,
            `pageNumber=${currentPage}`,
            "pageSize=10",
        ].join("&");
        response = await apis.apiGetAllSoThanhToanBySoDoc(queryParams)
        console.log(response.data)

        // Nếu bị lỗi thì reject
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data
    } else {
        const queryParams = [
            nhaMayIdParams,
            `soDocChiSoId=${paymentRecordID}`,
            `pageNumber=${currentPage}`,
            "pageSize=10",
        ].join("&");
        response = await apis.apiGetAllSoThanhToanBySoDoc(queryParams)
        console.log(response.data)

        // Nếu bị lỗi thì reject
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data
    }
})

export const getInvoiceById = createAsyncThunk("hoa-don/get-single", async (id, { rejectWithValue }) => {
    const response = await apis.apiGetInvoiceById(id)
    console.log(response.data)

    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }

    return response.data
})

export const getInvoiceChuaThanhToanByIdKH = createAsyncThunk("hoa-don/get-all-hoa-don-chua-thanh-toan-by-ma-khach-hang", async (maKhachHang, { rejectWithValue }) => {
    const response = await apis.apiGetHoaDonChuaThanhToanByMaKhachHang(maKhachHang)
    console.log(response.data)

    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }

    return response.data
})