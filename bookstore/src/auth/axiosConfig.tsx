import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    if(config.url !== 'http://localhost:8081/api/transaction' && config.url !== 'https://api.ipify.org/?format=json'){
    const token = document.cookie.match('(^|;)\\s*' + "accessToken" + '\\s*=\\s*([^;]+)')?.pop() || '';
    if (token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
    return config;
  // }
  },
  (error) => {
    return Promise.reject(error);
  }
);