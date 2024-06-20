import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let refreshTokenRequest = null;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenRequest) {
        refreshTokenRequest = api.get('authentication/refresh-tokens');
      }

      const { data } = await refreshTokenRequest;
      refreshTokenRequest = null;

      localStorage.setItem('accessToken', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
