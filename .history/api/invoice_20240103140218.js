import axios from "../axios";

export const apiGetAllSoThanhToan = (queryParams) => axios({
    url: `so-doc-chi-so/get-all-so-thanh-toan?${queryParams}`,
    method: 'GET'
})

export const apiFilterSoThanhToan = (tenSo, ngayTaoSo, nhaMayIds, pageNumber) => axios({
    url: `so-doc-chi-so/filter-so-thanh-toan?TenSo=${tenSo}&NgayTaoSo=${ngayTaoSo}&nhaMayIds=${nhaMayIds}&pageNumber=${pageNumber}&pageSize=10`,
    method: 'GET'
})

export const apiGetAllSoThanhToanBySoDoc = (queryParams) => axios({
    url: `hoa-don/get-all-so-thanh-toan?${queryParams}`,
    method: 'GET'
})

export const apiFilterHoaDon = (tenKhachHang, trangThaiThanhToan, sanLuong, soDienThoai, nhaMayIds, soDocChiSoId, pageNumber) => axios({
    url: `hoa-don/filter-so-thanh-toan?TenKhachHang=${tenKhachHang}&trangThaiThanhToan=${trangThaiThanhToan}&SanLuong=${sanLuong}&SoDienThoai=${soDienThoai}&nhaMayIds=${nhaMayIds}&soDocChiSoId=${soDocChiSoId}&pageNumber=${pageNumber}&pageSize=10`,
    method: 'GET'
})

export const apiFilterSoDocChiSo = (thangSoDoc, canBoDocId, tuyenDocId, trangThaiSoDoc, khuVucId, kyGhiChiSoId, nhaMayIds, tenSo, pageNumber) => axios({
    url: `so-doc-chi-so/filter?ThangSoDoc=${thangSoDoc}&CanboDocId=${canBoDocId}&TuyenDocId=${tuyenDocId}&TrangThaiSoDoc=${trangThaiSoDoc}&KhuVucId=${khuVucId}&KyGhiChiSoId=${kyGhiChiSoId}&NhaMayIds=${nhaMayIds}&TenSo=${tenSo}&pageNumber=${pageNumber}&pageSize=10`,
    method: 'GET'
})

export const apiGetHoaDonChuaThanhToanByIDTheDienLuc = (id) => axios({
    url: `hoa-don/get-all-hoa-don-chua-thanh-toan-by-id-the-dien-luc/${id}`,
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