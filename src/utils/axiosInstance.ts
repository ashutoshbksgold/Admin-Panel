import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ELocalStorageKeys } from 'src/common/enums';
import { BACKEND_API } from 'src/config';

const axiosInstance = axios.create({
  baseURL: BACKEND_API,
});

// Where you would set stuff like your 'Authorization' header, etc ...

if (
  localStorage.getItem(ELocalStorageKeys.ACCESS_TOKEN) ||
  localStorage.getItem(ELocalStorageKeys.REGISTER_TOKEN)
) {
  const accessToken = localStorage.getItem(ELocalStorageKeys.ACCESS_TOKEN);
  const registerToken = localStorage.getItem(ELocalStorageKeys.REGISTER_TOKEN);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken || registerToken}`;
}

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error('Something went wrong!, please contact admin@bksgold.com');
      localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
      // window.location.href = '/auth/login';
    }
    //   return error;

    return Promise.resolve(error.response);
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
