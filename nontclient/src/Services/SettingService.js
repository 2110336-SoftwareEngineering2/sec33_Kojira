import axios from "axios";
import serverURL from "../Config/serverURL";
import getUserTypePath from "../Utils/ServiceUtils/getUserTypePath";

const SettingService = {
  updateAccount: async (type, data) => {
    try {
      const path = getUserTypePath(type);
      const response = await axios.patch(serverURL + path, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getAccountInfo: async (type, id) => {
    try {
      const path = getUserTypePath(type) + `/${id}`;
      const response = await axios.get(serverURL + path);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default SettingService;