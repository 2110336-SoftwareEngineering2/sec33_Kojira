import axios from "axios";
import serverURL from "../Config/serverURL";
import getUserTypePath from "../Utils/ServiceUtils/getUserTypePath";

const ReserveService = {
  getReservations: async (type, userId) => {
    try {
      const path = getUserTypePath(type);
      const response = await axios.get(serverURL + "/reservations" + path + "/" + userId);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ReserveService;
