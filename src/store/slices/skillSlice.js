import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
     name: "skill",
     initialState:{
          loading: false,
          skills: [],
          error: null,
          message: null,
     },
     reducers: {
          getAllSkillsRequest(state, action){
               state.skills = [];
               state.loading = true;
               state.error = null;
          },
          getAllSkillsSuccess(state, action){
               state.skills = action.payload;
               state.loading = false;
               state.error = null;
          },
          getAllSkillsFailed(state, action){
               state.skills = state.skills;
               state.loading = false;
               state.error = action.payload;
          },
          addNewSkillRequest(state, action){
               state.loading = true;
               state.error = null;
               state.message = null;
          },
          addNewSkillSuccess(state, action){
               state.loading = false;
               state.error = null;
               state.message = action.payload;
          },
          addNewSkillFailed(state, action){
               state.loading = false;
               state.error = action.payload;
               state.message = null;
          },
          deleteSkillRequest(state, action){
               state.loading = true;
               state.error = null;
               state.message = null;
          },
          deleteSkillSuccess(state, action){
               state.loading = false;
               state.error = null;
               state.message = action.payload;
          },
          deleteSkillFailed(state, action){
               state.loading = false;
               state.error = action.payload;
               state.message = null;
          },
          udpateSkillRequest(state, action){
               state.loading = true;
               state.error = null;
               state.message = null;
          },
          udpateSkillSuccess(state, action){
               state.loading = false;
               state.error = null;
               state.message = action.payload;
          },
          udpateSkillFailed(state, action){
               state.loading = false;
               state.error = action.payload;
               state.message = null;
          },
          resetSkillSlice(state, action){
               state.error = null;
               state.loading = false;
               state.message = null;
               state.skills = state.skills;
          },
          clearAllErrors(state, action) {
               state.error = null;
               state.skills = state.skills; 
          }
     }
})


export const getAllSkills = () => async(dispatch) => {
     dispatch(skillSlice.actions.getAllSkillsRequest());
     try {
          const {data} = await axios.get("https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/skill/getall",{withCredentials: true});
          dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
          dispatch(skillSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(skillSlice.actions.getAllSkillsFailed(error.response?.data?.error));
     }
}

export const addNewSkill = (data) => async(dispatch) => {
     dispatch(skillSlice.actions.addNewSkillRequest());
     try {
          const response = await axios.post(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/skill/add`,
               data, 
               {withCredentials: true, headers: {"Content-Type": "multipart/form-dats"}}
          );
          dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
          dispatch(skillSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(skillSlice.actions.getAllSkillsFailed(error.response?.data?.error));
     }
}

export const deleteSkill = (id) => async(dispatch) => {
     dispatch(skillSlice.actions.deleteSkillRequest());
     try {
          const {data} = await axios.delete(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/skill/delete/${id}`, {withCredentials: true});
          dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
          dispatch(skillSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(skillSlice.actions.deleteSkillFailed(error.response?.data?.error));
     }
}

export const updateSkill = (id, proficiency) => async(dispatch) => {
     dispatch(skillSlice.actions.udpateSkillRequest());
     try {
          const {data} = await axios.put(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/skill/update/${id}`, {proficiency},
               {
                    withCredentials: true,
                    headers:{"Content-Type": "application/json"}
               }
          )
          dispatch(skillSlice.actions.udpateSkillSuccess(data.message));
          dispatch(skillSlice.actions.clearAllErrors());
     } catch (error) {
          dispatch(skillSlice.actions.udpateSkillFailed(error.response?.data?.error));
     }
}


export const clearAllSkillSliceErrors = () => (dispatch) => {
     dispatch(skillSlice.actions.clearAllErrors());
}

export const resetSkillSlice = () => (dispatch) => {
     dispatch(skillSlice.actions.resetSkillSlice());
}

export default skillSlice.reducer;