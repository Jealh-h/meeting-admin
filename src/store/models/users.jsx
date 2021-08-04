import axios from "../../utils/utils";

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
        await axios.get("user/deleteById", { id: id });
        // 获取新数据
        users.getUserList();
      },
    };
  },
};
