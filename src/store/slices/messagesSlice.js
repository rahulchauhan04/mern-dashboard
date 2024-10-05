import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
     name: "messages",
     initialState: {
          loading: false,
          messages: [],
          error: null,
          message: null
     },
     reducers: {
          getAllMessagesRequest(state,action){
               state.messages = [];
               state.error = null;
               state.loading = true;
          },
          getAllMessagesSuccess(state,action){
               state.messages = action.payload;
               state.error = null;
               state.loading = true;
          },
          getAllMessagesFailed(state,action){
               state.messages = state.message;
               state.error = action.payload;
               state.loading = false;
          },
          deleteMessageRequest(state,action){
               state.message = null;
               state.error = null;
               state.loading = true;
          },
          deleteMessageSuccess(state,action){
               state.message = action.payload;
               state.error = null;
               state.loading = true;
          },
          deleteMessageFailed(state,action){
               state.message = null;
               state.error = action.payload;
               state.loading = false;
          },
          resetMessageSlice(state, action){
               state.error = null;
               state.messages = state.messages;
               state.message = null;
               state.loading = false; 
          },
          clearAllErrors(state,action){
               state.error = null;
               state.messages = state.messages;
          }
     }
})

export const getAllMessages = () => async(dispatch) => {
     dispatch(messageSlice.actions.getAllMessagesRequest());
     try {
          const {data} = await axios.get("https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/message/getall",{withCredentials: true});
          dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
          dispatch(messageSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(messageSlice.actions.getAllMessagesFailed(error.response?.data?.message));
     }
}

export const deleteMessage = (id) => async(dispatch) => {
     dispatch(messageSlice.actions.deleteMessageRequest());
     try {
          const {data} = await axios.delete(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/message/delete/${id}`, {withCredentials: true});
          dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
          dispatch(messageSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(messageSlice.actions.deleteMessageFailed(error.response?.data?.message));
     }
}

export const clearAllMessageErrors = () => async(dispatch) =>{
     dispatch(messageSlice.actions.clearAllErrors());
}

export const resetMessageSlice = () => async(dispatch) => {
     dispatch(messageSlice.actions.resetMessageSlice());
}

export default messageSlice.reducer;