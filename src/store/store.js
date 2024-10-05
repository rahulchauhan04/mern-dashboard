import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
import messagesReducer from "./slices/messagesSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
     reducer:{
          user: userReducer,
          forgotPassword: forgotResetPasswordReducer,
          messages: messagesReducer,
          timeline: timelineReducer,
          skill: skillReducer,
          application: softwareApplicationReducer,
          project: projectReducer
     },
})