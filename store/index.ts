import { configureStore } from "@reduxjs/toolkit";
import { diagnosisApi } from "~/services/diagnosis";
import { doctorApi } from "~/services/doctor";
import { fileApi } from "~/services/fileUpload";
import diagnosisDetailReducer from "~/store/diagnosisDetailSlice";
import diagnosisListReducer from "~/store/diagnosisListSlice";
import doctorReducer from "~/store/doctorInfoForChangeSlice";
import notificationReducer from "~/store/notificationSlice";
import pageReducer from "~/store/pageSlice";
import registerFormReducer from "~/store/registerFormSlice";
import settingsReducer from "~/store/settingsSlice";
import calendarReducer from "~/store/calendarDetailSlice";

export const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    settings: settingsReducer,
    diagnosisDetail: diagnosisDetailReducer,
    diagnosisList: diagnosisListReducer,
    registerForm: registerFormReducer,
    notification: notificationReducer,
    calendarDetail: calendarReducer,
    page: pageReducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [diagnosisApi.reducerPath]: diagnosisApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(doctorApi.middleware)
      .concat(diagnosisApi.middleware)
      .concat(fileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
