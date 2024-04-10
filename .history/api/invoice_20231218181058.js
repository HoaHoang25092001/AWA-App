// import axios from "axios";
import axios from "../axios";

const API_URL = "https://api-awa-dev.amazingtech.vn";
// export const apiGetAllSoThanhToan = async (currentPage, listNhaMays) => {
//     try {
//         const response = await axios.get(`${API_URL}/api/so-doc-chi-so/get-all-so-thanh-toan?nhaMayIds=${listNhaMays}&pageNumber=${currentPage}&pageSize=10`);
//         return response.data;
//       } catch (error) {
//         console.log("data error", error.response.data);
//         throw error.response.data;
//       }
// };
export const apiGetAllSoThanhToan = (queryParams) => axios({
    url: `so-doc-chi-so/get-all-so-thanh-toan?${queryParams}`,
    method: 'GET'
})

export const apiFilterSoThanhToan = (tenSo, ngayTaoSo, nhaMayIds, pageNumber, pageSize) => axios({
    url: `so-doc-chi-so/filter-so-thanh-toan?TenSo=${tenSo}&NgayTaoSo=${ngayTaoSo}&nhaMayIds=${nhaMayIds}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: 'GET'
})

export const apiGetAllSoThanhToanBySoDoc = (queryParams) => axios({
    url: `hoa-don/get-all-so-thanh-toan?${queryParams}`,
    method: 'GET'
})


export const apiGetInvoiceById = (id) => axios({
    url: `hoa-don/get-single/${id}`,
    method: 'GET',
})

export const apiGetHoaDonChuaThanhToanByMaKhachHang = (maKhachHang) => axios({
    url: `hoa-don/get-all-hoa-don-chua-thanh-toan-by-ma-khach-hang/${maKhachHang}`,
    method: 'GET',
})

export const apiTinhTienHoaDon = (data) => axios({
    url: 'hoa-don/tinh-tien-hoa-don',
    method: 'POST',
    data : data
})