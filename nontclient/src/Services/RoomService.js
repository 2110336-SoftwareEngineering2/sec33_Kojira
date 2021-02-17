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
    }
};

export default RoomService;