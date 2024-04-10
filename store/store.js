import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./appSlice";
import soDocChiSoReducer from "./SoDocChiSoTheoNM/slice";
import huyChotSoReducer from "./HandleHuyChotSoPUT/slice";
import moKhoaReducer from "./HandleMoKhoa/slice";
import khoaSoReducer from "./HandleKhoaSo/slice";
import chiSoDongHoReducer from "./ChiSoDongHo/slice";
import invoiceSlice from "./HoaDon/invoiceSlice";
import createNewSoDocReducer from "./CreateNewSoDoc/slice.js";
import trangThaiGhiReducer from "./TrangThaiGhi/slice.js";
import updateGhiChiSoReducer from "./UpdateGhiChiSo/slice.js";
import chiSoDongHoByIdReducer from "./ChiSoDongHoById/slice.js";
import addChipDongHoReducer from "./AddChipDongHo/slice.js";
import chiSoDongHoByChipReducer from "./ChiSoDongHoByChip/slice.js";
import updateTheDienLucReducer from "./AddIdDienLuc/slice.js";
import hoaDonByIdDienLucReducer from "./QRCodeHoaDon/slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    soDocChiSo: soDocChiSoReducer,
    huyChotSo: huyChotSoReducer,
    moKhoa: moKhoaReducer,
    khoaSo: khoaSoReducer,
    chiSoDongHo: chiSoDongHoReducer,
    chiSoDongHoById: chiSoDongHoByIdReducer,
    createNewSoDoc: createNewSoDocReducer,
    invoice: invoiceSlice,
    trangThaiGhi: trangThaiGhiReducer,
    updateGhiChiSo: updateGhiChiSoReducer,
    addChipDongHo: addChipDongHoReducer,
    chiSoDongHoByChip: chiSoDongHoByChipReducer,
    updateTheDienLuc: updateTheDienLucReducer,
    hoaDonByIdDienLuc: hoaDonByIdDienLucReducer,
  },
});

export default store;
