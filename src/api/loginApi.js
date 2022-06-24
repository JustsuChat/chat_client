import axiosClient from './axiosClient';

const BASE_URL = 'http://localhost:5000'

const loginApi = {
  login: (username, password) => {
    const url = `${BASE_URL}/auth/login`;
    return axiosClient.post(url, { username, password });
  },

  registry: (username, password,firstname,lastname) => {
    const url = `${BASE_URL}/auth/registry`;
    return axiosClient.post(url, { username, password,firstname,lastname });
  },
};

export default loginApi;
