import axios from 'axios';
import { anilibriaBase, userBase } from './baseUrls';
import { router } from '../components/App/App';
import { logoutUser } from '../redux/entities/User/thunks/logoutUser';
import { notificationToggled } from '../redux/UI/Notification/notificationSlice';

axios.defaults.transformResponse = [(data) => JSON.parse(data)];

export const axiosInstance = axios.create({
  baseURL: anilibriaBase,
});

export const userAxios = axios.create({
  baseURL: userBase,
  withCredentials: true,
});

export const setInterceptor = (store) => {
  userAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;
      if (response && response.status === 401) {
        try {
          await axios.get('/refresh', {
            baseURL: userBase,
            withCredentials: true,
          });
          return axios.request(error.config);
        } catch (err) {
          if (response && response.status === 401) {
            store.dispatch(logoutUser.fulfilled());
            store.dispatch(
              notificationToggled({
                color: 'red',
                message: 'Для этого действия нужна авторизация',
              })
            );
            router.navigate('/signin');
          }
        }
      }
      throw error;
    }
  );
};
