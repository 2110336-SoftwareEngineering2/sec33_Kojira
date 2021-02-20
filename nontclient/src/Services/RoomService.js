import NontType from "../Constants/nontTypes";
import axios from "axios";
import serverURL from "../Config/serverURL";

const RoomService = {
    registerRoom: async (body) => {
        try{
            let path = '/room';
            const response = await axios.post(serverURL + path, body);
            return response;
        } catch (error){
            throw error;
        }
    },
    getRoomByID: async (id) => {
        try {
            let path = "/room/id/" + id;
            const response = await axios.get(serverURL + path);
            return response
        }
        catch (error) {
            throw error;
        }
    },
    getRoomByShelterID: async (id) => {
        try {
            let path = "/room/shelterid/" + id;
            const response = await axios.get(serverURL + path);
            return response
        }
        catch (error) {
            throw error;
        }
    },
    updateRoom: async (id, body) => {
        try {
            let path = "/room/update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response
        }
        catch (error) {
            throw error;
        }
    }
};

export default RoomService;