import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
     name: "project",
     initialState: {
          projects: [],
          loading: false,
          error: null,
          message: null,
     },
     reducers:{
          getAllProjectsRequest(state, action){
               state.projects = [];
               state.error = null;
               state.loading = true;
          },
          getAllProjectsSuccess(state, action){
               state.projects = action.payload;
               state.error = null;
               state.loading = false;
          },
          getAllProjectsFailed(state, action){
               state.projects = state.projects;
               state.error = action.payload;
               state.loading = false;
          },
          addNewProjectRequest(state, action){
               state.loading = true;
               state.error = null;
               state.message = null;
          },
          addNewProjecSuccess(state, action){
               state.message = action.payload;
               state.loading = false;
               state.error = null;
          },
          addNewProjectFailed(state, action){
               state.message = null; 
               state.loading = false;
               state.error = action.payload;
          }, 
          deleteProjectRequest(state, action){
               state.loading = true;
               state.error = null;
               state.message = null;
          },
          deleteProjecSuccess(state, action){
               state.message = action.payload;
               state.loading = false;
               state.error = null;
          },
          deleteProjectFailed(state, action){
               state.message = null; 
               state.loading = false;
               state.error = action.payload;
          },
          updateProjectRequest(state, action){
               state.loading = true;
               state.error = null;
               state.message = null;
          },
          updateProjecSuccess(state, action){
               state.message = action.payload;
               state.loading = false;
               state.error = null;
          },
          updateProjectFailed(state, action){
               state.message = null; 
               state.loading = false;
               state.error = action.payload;
          },
          resetProjectSlice(state,action){
               state.error = null;
               state.message = null;
               state.projects = state.projects;
               state.loading = false;
          },
          clearAllErrors(state,action){
               state.error = null;
               state.projects = state.projects;
          }
     }
})

export const getAllProjects = () => async(dispatch)=>{
     dispatch(projectSlice.actions.getAllProjectsRequest());
     try {
          const {data} = await axios.get("https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/project/getall", {withCredentials: true});
          dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
          dispatch(projectSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(projectSlice.actions.getAllProjectsFailed(error.response?.data?.error));
     }
}

export const addNewProject = (data) => async(dispatch)=>{
     dispatch(projectSlice.actions.addNewProjectRequest());
     try {
          const response = await axios.post("https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/project/add", data, {
               withCredentials: true,
               headers:{"Content-Type": "multipart/form-data"}
          });
          dispatch(projectSlice.actions.addNewProjecSuccess(response.data.message));
          dispatch(projectSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(projectSlice.actions.addNewProjectFailed(error.response?.data?.error));
     }
}

export const deleteProject = (id) => async (dispatch)=>{
     dispatch(projectSlice.actions.deleteProjectRequest());
     try {
          const { data } = await axios.delete(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/project/delete/${id}`,{withCredentials: true,})
          dispatch(projectSlice.actions.deleteProjecSuccess(data.message));
          dispatch(projectSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(projectSlice.actions.deleteProjectFailed(error.response?.data?.error));
     }
}

export const updateProject =(id, newData) => async(dispatch) => {
     dispatch(projectSlice.actions.updateProjectRequest());
     try {
          const { data } = await axios.put(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/project/update/${id}`,newData,
               {
                    withCredentials: true,
                    headers: {"Content-Type": "multipart/form-data"}
               })
          dispatch(projectSlice.actions.updateProjecSuccess(data.message));
          dispatch(projectSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(projectSlice.actions.updateProjectFailed(error.response?.data?.error));
     }
}

export const clearAllProjectSliceErrors = () => (dispatch) => {
     dispatch(projectSlice.actions.clearAllErrors());
}

export const resetProjectSlice = () => (dispatch) => {
     dispatch(projectSlice.actions.resetProjectSlice());
}


export default projectSlice.reducer