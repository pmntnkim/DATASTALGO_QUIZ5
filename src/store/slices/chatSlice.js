import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getHistoricalFigureApi,
  sendHistoricalMessageApi,
} from '../../services/mockApi';

export const loadFigure = createAsyncThunk('chat/loadFigure', async (_, thunkApi) => {
  try {
    return await getHistoricalFigureApi();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message, thunkApi) => {
  try {
    const assistantReply = await sendHistoricalMessageApi({ message });
    return {
      userMessage: {
        id: `u_${Date.now()}`,
        role: 'user',
        content: message,
      },
      assistantMessage: {
        id: `a_${Date.now() + 1}`,
        role: assistantReply.role,
        content: assistantReply.content,
        refused: assistantReply.refused,
      },
    };
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    figure: null,
    messages: [],
    loadingFigure: false,
    sending: false,
    error: null,
  },
  reducers: {
    clearChatError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFigure.pending, (state) => {
        state.loadingFigure = true;
        state.error = null;
      })
      .addCase(loadFigure.fulfilled, (state, action) => {
        state.loadingFigure = false;
        state.figure = action.payload;
      })
      .addCase(loadFigure.rejected, (state, action) => {
        state.loadingFigure = false;
        state.error = action.payload || 'Failed to load historical figure.';
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        state.messages.push(action.payload.userMessage);
        state.messages.push(action.payload.assistantMessage);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload || 'Failed to send message.';
      });
  },
});

export const { clearChatError } = chatSlice.actions;
export default chatSlice.reducer;
