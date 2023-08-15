import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chattingData: [],
    },
    reducers: {
        setChattingData: (state, action) => {
            state.chattingData = action.payload;
        },
    },
});

export const { setChattingData } = chatSlice.actions;

export default chatSlice.reducer;