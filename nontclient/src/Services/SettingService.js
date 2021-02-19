import axios from "axios";
import serverURL from "../Config/serverURL";
import { getUserTypePath } from "../Utils/ServiceUtils";

const SettingService = {
  updateAccount: async (type, data) => {
    try {
      const path = getUserTypePath(type);
      const response = await axios.put(serverURL + path, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
}

export default SettingService;