import axios from 'axios';
import AppConfig from '../app-config';

const request = {
  post: (endPoint, data, header = {}) => {
    return axios.post(`${AppConfig.apiUrl}${endPoint}`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        ...header,
      },
    });
  },
  get: (endPoint, header) => {
    return axios.get(`${AppConfig.apiUrl}${endPoint}`, {
      Accept: '*/*',
      'Content-Type': 'application/json',
      ...header,
    });
  },
  put: (endPoint, data, header) => {
    return axios.put(`${AppConfig.apiUrl}${endPoint}`, data, header);
  },
};

export default request;
