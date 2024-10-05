import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
     name: "application",
     initialState: {
          softwareApplications: [],
          loading: false,
          error: null,
          message: null,
     },
     reducers: {
          getAllSoftwareApplicationsRequest(state, action){
               state.softwareApplications = [];
               state.loading = true;
               state.error = null;
          },
          getAllSoftwareApplicationsSuccess(state, action){
               state.softwareApplications = action.payload;
               state.loading = false;
               state.error = null;
          },
          getAllSoftwareApplicationsFailed(state, action){
               state.softwareApplications = state.softwareApplications;
               state.loading = false;
               state.error = action.payload;
          },
          addNewsoftwareApplicationsRequest(state, action){
               state.loading = true;
               state.error = null;
               state.message = null;
          },
          addNewsoftwareApplicationsSuccess(state, action){
               state.loading = false;
               state.error = null;
               state.message = action.payload;
          },
          addNewsoftwareApplicationsFailed(state, action){
               state.loading = false;
               state.error = action.payload;
               state.message = null;
          },
          deleteSoftwareApplicationRequest(state, action){
               state.loading = true;
               state.error = null;
               state.message = null;
          },
          deleteSoftwareApplicationSuccess(state, action){
               state.loading = false;
               state.error = null;
               state.message = action.payload;
          },
          deleteSoftwareApplicationFailed(state, action){
               state.loading = false;
               state.error = action.payload;
               state.message = null;
          },
          resetSoftwareApplicationSlice(state, action){
               state.error = null;
               state.loading = false;
               state.message = null;
               state.softwareApplications = state.softwareApplications;
          },
          clearAllErrors(state, action) {
               state.error = null;
               state.softwareApplications = state.softwareApplications; 
          }
     }
})


export const getAllSoftwareApplications = () => async(dispatch) => {
     dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest());
     try {
          const response = await axios.get("https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/softwareapplication/getall",{withCredentials: true});
          dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(response.data.softwareApplication));
          dispatch(softwareApplicationSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(error.response?.data?.error));
     }
}

export const addNewSoftwareApplication = (data) => async(dispatch) => {
     dispatch(softwareApplicationSlice.actions.addNewsoftwareApplicationsRequest());
     try {
          const response = await axios.post(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/softwareapplication/add`,
               data, 
               {withCredentials: true, headers: {"Content-Type": "multipart/form-dats"}}
          );
          dispatch(softwareApplicationSlice.actions.addNewsoftwareApplicationsSuccess(response.data.message));
          dispatch(softwareApplicationSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(softwareApplicationSlice.actions.addNewsoftwareApplicationsFailed(error.response?.data?.error));
     }
}

export const deleteSoftwareApplication = (id) => async(dispatch) => {
     dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationRequest());
     try {
          const {data} = await axios.delete(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/softwareapplication/delete/${id}`, {withCredentials: true});
          dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationSuccess(data.message));
          dispatch(softwareApplicationSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(error.response?.data?.error));
     }
}

export const clearAllApplicationSliceErrors = () => (dispatch) => {
     dispatch(softwareApplicationSlice.actions.clearAllErrors());
}

export const resetApplicationSlice = () => (dispatch) => {
     dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
}

export default softwareApplicationSlice.reducer;