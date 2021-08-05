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
    _add(state, payload) {
      return {
        ...payload,
      };
    },
  },
  effects: (dispatch) => {
    const { meetingHistory } = dispatch;
    return {
      async getSubscribeList() {
        const res = await axios.get("subscribeHistory/selectAll");
        meetingHistory._getData(res);
      },
      async deleteHistory(id) {
        await axios.get("subscribeHistory/delete", {
          params: {
            id: id,
          },
        });
        meetingHistory.getSubscribeList();
      },
    };
  },
};
