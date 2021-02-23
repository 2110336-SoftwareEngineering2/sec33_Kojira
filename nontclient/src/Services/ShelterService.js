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
    getShelterByID: async (id) => {
        try {
            let path = "/shelter/id/" + id;
            const response = await axios.get(serverURL + path);
            return response
        }
        catch (error) {
            throw error;
        }
    },
    getShelterByNontSitterID: async (id) => {
        try {
            let path = "/shelter/nontsitterid/" + id;
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
    },
    registerShelter: async (body) => {
        try{
            let path = '/shelter'
            const response = await axios.post(serverURL + path, body);
            return response;
        } catch(error) {
            throw error
        }
    },
    updateShelter: async (body) => {
        try{
            let path = '/shelter'
            const response = await axios.put(serverURL + path, body);
            return response;
        } catch(error) {
            throw error
        }
    }
};

export default ShelterService;