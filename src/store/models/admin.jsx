import axios from "../../utils/utils";

export const admin = {
  state: {
    data: "",
  },
  reducers: {
    _setLoginRes(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => {
    const { admin } = dispatch;
    return {
      async login(param) {
        const res = await axios.post("meetingAdmin/login", param);
        // res.data = "登录成功"；
        // 这里后端返回的是一个字符串，"登录成功" | "登录失败"
        admin._setLoginRes(res);
      },
    };
  },
};
