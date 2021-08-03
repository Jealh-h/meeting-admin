import axios from "../../utils/utils";
import urlConfig from "../../constants/baseUrl";

export const meetingHistory = {
  state: {
    data: [],
  },
  reducers: {
    _getData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => {
    const { meetingHistory } = dispatch;
    return {
      async getSubscribeList(param) {
        const res = await axios.get("subscribeHistory/selectAll");
        meetingHistory._getData(res);
      },
    };
  },
};
