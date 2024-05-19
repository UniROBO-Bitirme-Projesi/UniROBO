import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../../helpers/api-config';

const initialState = {
  rooms: {
    data: [],
    loading: false,
    error: null,
  },
  chat: {
    data: [],
    loading: false,
    error: null,
  }
};

export const getRoom = createAsyncThunk(
  'dashboard/list-room',
  async (_, { rejectWithValue }) => {
    try {
      const response = await request.get('rooms/list-rooms');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch room details');
    }
  },
);

export const getChat = createAsyncThunk(
  'dashboard/list-chat',
  async ({ roomId }, { rejectWithValue }) => {
    try {
      const response = await request.get(`rooms/room-messages/${roomId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch room details');
    }
  },
);


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoom.pending, (state) => {
        state.rooms.loading = true;
        state.rooms.error = null;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.rooms.loading = false;
        state.rooms.data = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.rooms.loading = false;
        state.rooms.error = action.payload;
      })
      .addCase(getChat.pending, (state) => {
        state.chat.loading = true;
        state.chat.error = null;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.chat.loading = false;
        state.chat.data = action.payload;
      })
      .addCase(getChat.rejected, (state, action) => {
        state.chat.loading = false;
        state.chat.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;