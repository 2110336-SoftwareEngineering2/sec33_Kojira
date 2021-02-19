import axios from "axios";
import serverURL from "../Config/serverURL";


const ShelterService = {
    getShelters: async () => {
        try {
            let path = "/shelter";
            const response = await axios.get(serverURL + path);
            return response
        }
        catch (error) {
            throw error;
        }
    },
    getSheltersByEmail: async (email) => {        
        try {            
            let path = "/shelter/email/" + email;
            const response = await axios.get(serverURL + path);
            return response
        }
        catch (error) {
            throw error;
        }
    }
};

export default ShelterService;