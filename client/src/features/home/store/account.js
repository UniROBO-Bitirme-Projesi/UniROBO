import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../../helpers/api-config';

const initialState = {
  data: [],
};

export const sendSMS = createAsyncThunk(
  'sendSMS',
  async ({ phone, deviceId }, { rejectWithValue }) => {
    try {
      const response = await request.post(
        `smsOtp/sendSmsOtp`,
        {
          phone: encodeURIComponent(phone),
          deviceId
        }
      );
      return response;
    } catch (err) {
      return rejectWithValue('Oops, there seems to be an error');
    }
  },
);

export const checkSMS = createAsyncThunk(
  'checkSMS',
  async ({ otp, deviceId }, { rejectWithValue }) => {
    try {
      const response = await request.post(
        `smsOtp/checkSmsOtp`,
        {
          otp,
          deviceId
        });
      return response;
    } catch (err) {
      return rejectWithValue('Oops, there seems to be an error');
    }
  },
);

export const checkAccount = createAsyncThunk(
  'checkAccount',
  async ({ deviceId, payload, token }, { rejectWithValue }) => {
    try {
      const response = await request.post(
        `account/check-account`,
        {
          deviceId,
          payload,
          token
        });
      return response;
    } catch (err) {
      return rejectWithValue('Oops, there seems to be an error');
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {}
});


export default accountSlice.reducer;
