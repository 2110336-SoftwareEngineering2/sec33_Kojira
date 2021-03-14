import axios from "axios";
import serverURL from "../Config/serverURL";
import getUserTypePath from "../Utils/ServiceUtils/getUserTypePath";

const RegisterService = {
  registerAccount: async (type, account) => {
    try {
      const path = getUserTypePath(type);
      const response = await axios.post(serverURL + path, account);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default RegisterService;
