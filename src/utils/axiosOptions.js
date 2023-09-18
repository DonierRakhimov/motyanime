import axios from 'axios';
import { anilibriaBase, userBase } from './baseUrls';
import { store } from '../redux/store';
import { userLoggedOut } from '../redux/entities/User/actionCreators';
import { router } from '../components/App/App';
import { notificationToggled } from '../redux/UI/Notification/actionCreators';

axios.defaults.transformResponse = [(data) => JSON.parse(data)];

export const axiosInstance = axios.create({
  baseURL: anilibriaBase,
});

export const userAxios = axios.create({
  baseURL: userBase,
  withCredentials: true,
});

userAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      try {
        const response = await axios.get('/refresh', {
          baseURL: userBase,
          withCredentials: true,
        });
        return axios.request(error.config);
      } catch (err) {
        if (response && response.status === 401) {
          store.dispatch(userLoggedOut());
          store.dispatch(
            notificationToggled({
              color: 'red',
              message: 'Необходима авторизация',
            })
          );
          router.navigate('/signin');
        }
      }
    }
    throw error;
  }
);
