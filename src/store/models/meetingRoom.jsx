import axios from "../../utils/utils";

export const meetingRoom = {
  state: {
    data: [],
  },
  reducers: {
    _setRoomList(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => {
    const { meetingRoom } = dispatch;
    return {
      async getList(param) {
        const res = await axios.get("meetingRoom/getAll");
        console.log(res);
        meetingRoom._setRoomList(res);
      },
    };
  },
};
