import axios from "../../utils/utils";
import { message } from "antd";
export const users = {
  state: {
    data: [],
  },
  reducers: {
    _setUserList(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => {
    const { users } = dispatch;
    return {
      async getUserList() {
        const res = await axios.get("user/getAll");
        users._setUserList(res);
      },
      async deleteUserById(id) {
        //   删除数据
        await axios.get("user/deleteById", {
          params: {
            id: id,
          },
        });
        // 获取新数据
        users.getUserList();
      },
      async addUser(param) {
        message.success({
          content: "添加用户api",
        });
        // await axios.get("user/insert", param);
        // users.getUserList();
      },
    };
  },
};
