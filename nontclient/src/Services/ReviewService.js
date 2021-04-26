import {axios} from '../Utils/ServiceUtils/axios';
import serverURL from "../Config/serverURL";

const ReviewService = {
  getReviewByReservationID: async (reservationID) => {
    try {
      const path = "/review/reservationid/" + reservationID;
      const response = await axios.get(serverURL + path);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getReviewByShelterID: async (shelterID) => {
    try {
      const path = "/review/shelterid/" + shelterID;
      const response = await axios.get(serverURL + path);
      return response;
    } catch (error) {
      throw error;
    }
  },
  addReview: async (body) => {
    try {
      let path = "/review/";
      const response = await axios.post(serverURL + path, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateReview: async (body) => {
    try {
      let path = "/review/";
      const response = await axios.patch(serverURL + path, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
  removeReview: async (reviewid) => {
    try {
      let path = "/review/remove/" + reviewid;
      const response = await axios.delete(serverURL + path);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ReviewService;
