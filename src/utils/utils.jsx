import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
});

// 请求超时时间为12秒
instance.defaults.timeout = 12000;

// axios请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 发送前做处理
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// axios响应拦截器
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    const { response } = err;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      if (response.status === 504 || response.status === 404) {
        // message.error("Not Found.");
      } else if (response.status === 403) {
        // message.error("Unauthorized!");
      } else {
        // message.error("Unknown Error!");
      }
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        // TODO store 中处理断网事件
        // message.error("Network Error!");
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
