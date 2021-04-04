import axios from "axios";
import serverURL from "../Config/serverURL";


const NontService = {
    getNont: async () => {
        try {
            let path = "/nont";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getNontByID: async (id) => {
        try {
            let path = "/nont/" + id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getNontByName: async (name) => {
        try {
            let path = "/nont/name/" + name;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getNontByType: async (type) => {        
        try {            
            let path = "/nont/type/" + type;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getNontByNontOwnerID: async (id) => {
        try {            
            let path = "/nont/nontowner_id/" + id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    createNont: async (body) => {
        try{
            let path = '/nont/create'
            const response = await axios.post(serverURL + path, body);
            return response;
        } catch(error) {
            throw error
        }
    },
    updateNont: async (id, body) => {
        try {
            let path = "/nont/update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    deleteNont: async (id) => {
        try{
            let path = "/nont/delete/" + id;
            const response = await axios.patch(serverURL + path);
            return response;
        }
        catch(error){
            throw error;
        }
    },
    removeNont: async (id) => {
        try {
            let path = "/nont/remove/" + id;
            const response = await axios.delete(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};

export default NontService;