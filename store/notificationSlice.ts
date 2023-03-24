import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";

type NotificationStoreState = {
  diagnosis: { id?: number };
  shouldNotificate: boolean;
  all_list: any;
  imageUrl: any;
};

const initialState: NotificationStoreState = {
  diagnosis: { id: undefined },
  shouldNotificate: false,
  all_list: "",
  imageUrl: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationAllList(
      // 검색용, 모든 리스트 정보
      state,
      action: PayloadAction<NotificationStoreState["all_list"]>
    ) {
      state.all_list = action.payload;
    },

    setNoticeImage(
      state,
      action: PayloadAction<NotificationStoreState["imageUrl"]>
    ) {
      state.imageUrl = action.payload;
    },

    setDiagnosisIdForNotification(
      state,
      action: PayloadAction<
        NotificationStoreState["diagnosis"]["id"] | undefined
      >
    ) {
      if (action.payload === undefined) return;

      let lastItem = state.diagnosis.id;

      if (lastItem !== action.payload) {
        state.diagnosis.id = action.payload;
        state.shouldNotificate = true;
      } else {
        state.shouldNotificate = false;
      }
    },
  },
});

export const {
  setDiagnosisIdForNotification,
  setNotificationAllList,
  setNoticeImage,
} = notificationSlice.actions;

export const selectShouldNotificate = (state: RootState) =>
  state.notification.shouldNotificate;

export const selectNotificationAllList = (state: RootState) =>
  state.notification.all_list;
export const selectNoticeImage = (state: RootState) =>
  state.notification.imageUrl;

export default notificationSlice.reducer;
