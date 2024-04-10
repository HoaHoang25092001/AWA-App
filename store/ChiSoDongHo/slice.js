import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchChiSoDongHoByIdSoDoc } from "./action";

const chiSoDongHoSlice = createSlice({
  name: "chiSoDongHo",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChiSoDongHoByIdSoDoc.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchChiSoDongHoByIdSoDoc.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchChiSoDongHoByIdSoDoc.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk as well as the reducer
export default chiSoDongHoSlice.reducer;
