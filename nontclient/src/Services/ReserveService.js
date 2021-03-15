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
  
  getReservationsByRoomID: async (roomID) => {
    try {
      const path = "/reservation/room_id/" + roomID;
      const response = await axios.get(serverURL + path);
      return response;
    }
    catch (error) {
      throw error;
    }
  },

  addReservation: async (body) => {
    try{
        let path = '/reservation/create';
        const response = await axios.post(serverURL + path, body);
        return response;
    } catch (error){
        throw error;
    }
},
};

export default ReserveService;