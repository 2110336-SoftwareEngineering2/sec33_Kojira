import axios from "axios";
import serverURL from "../Config/serverURL";
import UserType from "../Constants/UserType";
import UserTypeError from "../Constants/ErrorTypes/UserTypeError";

const ReserveService = {
  getReservationsByUserID: async (type, userId) => {
    try {
      let path = "";
      if (type === UserType.NONT_OWNER) {
        path = "/nontowner_id";
      } else if (type === UserType.NONT_SITTER) {
        path = "/nontsitter_id";
      } else {
        throw UserTypeError.UNKNOWN_USER_TYPE;
      }
      const response = await axios.get(
        serverURL + "/reservation" + path + "/" + userId
      );
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
    } catch (error) {
      throw error;
    }
  },

  addReservation: async (body) => {
    try {
      let path = "/reservation/create";
      const response = await axios.post(serverURL + path, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ReserveService;
