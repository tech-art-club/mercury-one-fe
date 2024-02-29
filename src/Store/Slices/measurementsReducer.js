import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

export const fetchMeasurements = createAsyncThunk(
  'measurements/fetchMeasurements',
  async (url) => {
    const accessToken = localStorage.getItem('access');
    const headers = {};

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const res = await axios.get(url);
    return res.data;
  }
);

const measurementsSlice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMeasurements.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectMeasurements = (state) => state.measurements;

export default measurementsSlice.reducer;
