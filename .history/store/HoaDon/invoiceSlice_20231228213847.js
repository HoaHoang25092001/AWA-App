import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction'

export const invoiceSlice = createSlice({
    name: 'hoa-don',
    initialState: {
        invoices: [],
        invoice: [],
        invoiceChuaTTByMaKH: [],
        invoiceForUpdate: null,
        soThanhToan: [],
        soThanhToanBySoDoc: [],
        errMessage: '',
        status: 'idle',
        statusSTT: 'idle',
        statusIF: 'idle',
        statusCTT: 'idle',
    },
    reducers: {
        logout: (state) => {
            state.name = null;
            state.token = null;
            state.noti = "Đăng xuất thành công";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getAllSoThanhToan.pending, (state) => {
            // Bật trạng thái loading
            state.status = 'loading';
        });
        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(actions.getAllSoThanhToan.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin vào store
            state.status = 'succeeded';
            state.soThanhToan = action.payload;
        });
        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(actions.getAllSoThanhToan.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.status = 'failed';
            state.errorMessage = action.payload.message;
        });
        
        //-------------------------------------------------------------------------------------------
        // Bắt đầu thực hiện action (Promise pending)
        builder.addCase(actions.getAllSoThanhToanBySoDoc.pending, (state) => {
            // Bật trạng thái loading
            state.statusSTT = 'loading';
        });
        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(actions.getAllSoThanhToanBySoDoc.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin vào store
            state.statusSTT = 'succeeded';
            state.soThanhToanBySoDoc = action.payload;
        });
        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(actions.getAllSoThanhToanBySoDoc.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.statusSTT = 'failed';
            state.errorMessage = action.payload.message;
        });

        //---------------------------------------------------------------------------------------
        // Bắt đầu thực hiện action (Promise pending)
        builder.addCase(actions.getInvoiceById.pending, (state) => {
            // Bật trạng thái loading
            state.statusIF = 'loading';
        });
        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(actions.getInvoiceById.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin vào store
            state.statusIF = 'succeeded';
            state.invoice = action.payload;
        });
        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(actions.getInvoiceById.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.statusIF = 'failed';
            state.errorMessage = action.payload.message;
        });

        //---------------------------------------------------------------------------------------
        // Bắt đầu thực hiện action (Promise pending)
        builder.addCase(actions.getInvoiceChuaThanhToanByIdKH.pending, (state) => {
            // Bật trạng thái loading
            state.statusCTT = 'loading';
        });
        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(actions.getInvoiceChuaThanhToanByIdKH.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin vào store
            state.statusCTT = 'succeeded';
            state.invoiceChuaTTByMaKH = action.payload;
        });
        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(actions.getInvoiceChuaThanhToanByIdKH.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.statusCTT = 'failed';
            state.errorMessage = action.payload.message;
        });
    }
})

export const { logout } = invoiceSlice.actions;
export default invoiceSlice.reducer;