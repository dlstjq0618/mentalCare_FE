import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";

type NotificationStoreState = {
  diagnosis: { id?: number };
  shouldNotificate: boolean;
};

const initialState: NotificationStoreState = {
  diagnosis: { id: undefined },
  shouldNotificate: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
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

export const { setDiagnosisIdForNotification } = notificationSlice.actions;

export const selectShouldNotificate = (state: RootState) =>
  state.notification.shouldNotificate;

export default notificationSlice.reducer;
