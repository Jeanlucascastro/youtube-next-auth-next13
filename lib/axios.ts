import axios from 'axios';
import { tokenVar } from '../src/app/api/auth/[...nextauth]/route';


const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    if (tokenVar) {
      const tokenVas = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6IkNhc3RybyIsImV4cCI6MTY5OTEzMzczNSwiY29tcGFueSI6Mn0.oKKeRLbHRB7CpIbwHaMTrt6SRoxV77X1Gg6WoOp9ijg"
      config.headers.Authorization = `Bearer ${tokenVas}`;
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
      console.log('axios ====<>', tokenVar)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;