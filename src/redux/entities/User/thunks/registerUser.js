import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAxios } from "../../../../utils/axiosOptions";
import { notificationToggled } from "../../../UI/Notification/notificationSlice";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, userName, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await userAxios.post("/signup", {
        email,
        userName,
        password,
      });
      const { data: userData } = response;
      const payload = {
        userData,
        savedAnimes: [],
      };
      return payload;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 409) {
        throw rejectWithValue(response);
      } else {
        dispatch(
          notificationToggled({
            color: "red",
            message: "Не удалось зарегистрироваться",
          })
        );
        throw err;
      }
    }
  }
);
