import axios from "axios";
import { apiBase } from "../../../../utils/baseUrls";
import { userAxios } from "../../../../utils/axiosOptions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationToggled } from "../../../UI/Notification/notificationSlice";

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { dispatch }) => {
    try {
      const refreshResponse = await axios.get("/refresh", {
        baseURL: apiBase,
        withCredentials: true,
      });
      const savedAnimesRespone = await userAxios.get("/savedAnimes");
      const { data: userData } = refreshResponse;
      const { data: savedAnimes } = savedAnimesRespone;
      const payload = {
        userData,
        savedAnimes,
      };
      return payload;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 401) {
        throw err;
      } else {
        dispatch(
          notificationToggled({
            color: "red",
            message: "Не удалось авторизоваться",
          })
        );
        throw err;
      }
    }
  }
);
