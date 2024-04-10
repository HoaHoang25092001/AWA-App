import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCreateNewSoDoc } from "./action";

const createNewSoDocSlice = createSlice({
  name: "createNewSoDoc",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateNewSoDoc.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCreateNewSoDoc.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchCreateNewSoDoc.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk as well as the reducer
export default createNewSoDocSlice.reducer;
