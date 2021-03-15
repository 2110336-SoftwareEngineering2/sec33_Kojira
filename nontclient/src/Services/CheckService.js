import axios from "axios";
import serverURL from "../Config/serverURL";
import getUserTypePath from "../Utils/ServiceUtils/getUserTypePath";

const CheckService = {

  checkValidEmail: async (type, email) => {
    try {
      const path = getUserTypePath(type);
      const response = await axios.post(serverURL + path + "/check-email", {
        email,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  checkValidName: async (type, name) => {
    try {
      const path = getUserTypePath(type);
      const response = await axios.post(serverURL + path + "/check-name", {
        name,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  
};

export default CheckService;
