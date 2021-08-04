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
      // 获取房间列表
      async getList() {
        const res = await axios.get("meetingRoom/getAll");
        console.log(res);
        meetingRoom._setRoomList(res);
      },
      // 删除房间
      async deleteRoom(id) {
        await axios.get("meetingRoom/deleteById", { id: id });
      },
      //   添加房间
      async addRoom(param) {
        console.log(param);
        //   请求接口
        // await axios.get("meetingRoom/insert", param);
        // // 更新数据
        // meetingRoom.getList();
      },
      //   更新房间信息
      async updateRoom(param) {
        console.log(param);
        // await axios.get("meetingRoom/update", param);
      },
    };
  },
};
