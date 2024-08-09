import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//dev server
// const apiUrl = 'https://zelomeetings.com:9094/mrroom';
 
//local server
// const apiUrl = 'http://192.168.1.143:9092/mrroom';

//Live server
const apiUrl = 'https://zelo.zelomeetings.com/mrroom';



const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =   await AsyncStorage.getItem('user_token');
    const language= await AsyncStorage.getItem('language');
    
    if (token) {
      config.headers.Authorization = `${token}`;
      config.headers['Accept-Language'] =  language || 'en';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;



