import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
     name: "timeline",
     initialState: {
          loading: false,
          timeline: [],
          error: null,
          message: null
     },
     reducers: {
          getAllTimeLineRequest(state,action){
               state.timeline = [];
               state.error = null;
               state.loading = true;
          },
          getAllTimeLineSuccess(state,action){
               state.timeline = action.payload;
               state.error = null;
               state.loading = true;
          },
          getAllTimeLineFailed(state,action){
               state.timeline = state.timeline;
               state.error = action.payload;
               state.loading = false;
          },
          deleteTimeLineRequest(state,action){
               state.message = null;
               state.error = null;
               state.loading = true;
          },
          deleteTimeLineSuccess(state,action){
               state.message = action.payload;
               state.error = null;
               state.loading = true;
          },
          deleteTimeLineFailed(state,action){
               state.message = null;
               state.error = action.payload;
               state.loading = false;
          },
          addTimeLineRequest(state,action){
               state.message = null; 
               state.error = null;
               state.loading = true;
          },
          addTimeLineSuccess(state,action){
               state.message = action.payload;
               state.error = null;
               state.loading = true;
          },
          addTimeLineFailed(state,action){
               state.message = null;
               state.error = action.payload;
               state.loading = false;
          },
          resetTimelineSlice(state, action){
               state.error = null;
               state.timeline = state.timeline;
               state.message = null;
               state.loading = false; 
          },
          clearAllErrors(state,action){
               state.error = null;
               state.timeline = state.timeline;
          }
     }
})

export const getAllTimeLine = () => async(dispatch) => {
     dispatch(timelineSlice.actions.getAllTimeLineRequest());
     try {
          const {data} = await axios.get("https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/timeline/getall",{withCredentials: true});
          dispatch(timelineSlice.actions.getAllTimeLineSuccess(data.timelines));
          dispatch(timelineSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(timelineSlice.actions.getAllTimeLineFailed(error.response?.data?.error));
     }
}

export const deleteTimeLine = (id) => async(dispatch) => {
     dispatch(timelineSlice.actions.deleteTimeLineRequest());
     try {
          const {data} = await axios.delete(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/timeline/delete/${id}`, {withCredentials: true});
          dispatch(timelineSlice.actions.deleteTimeLineSuccess(data.message));
          dispatch(timelineSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(timelineSlice.actions.deleteTimeLineFailed(error.response?.data?.error));
     }
}

export const addNewTimeLine = (timelineData) => async(dispatch) => {
     dispatch(timelineSlice.actions.addTimeLineRequest());
     try {
          const {data} = await axios.post(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/timeline/add`,
               timelineData, 
               {withCredentials: true, headers: {"Content-Type": "application/json"}}
          );
          dispatch(timelineSlice.actions.addTimeLineSuccess(data.message));
          dispatch(timelineSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(timelineSlice.actions.addTimeLineFailed(error.response?.data?.error));
     }
}

export const clearAllTimelineErrors = () => async(dispatch) =>{
     dispatch(timelineSlice.actions.clearAllErrors());
}

export const resetTimelineSlice = () => async(dispatch) => {
     dispatch(timelineSlice.actions.resetTimelineSlice());
}

export default timelineSlice.reducer;