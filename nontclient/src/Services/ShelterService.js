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
            const response = await axios.patch(serverURL + path, body);
            return response;
        } catch(error) {
            throw error
        }
    },

    deleteShelter: async (id) => {
        try{
            let path = "/shelter/delete/" + id;
            const response = await axios.patch(serverURL + path);
            return response;
        } catch(error){
            throw error
        }
    },

    checkValidName: async (name) => {
        try {
            let path = "/shelter/check-name";
            const response = await axios.post(serverURL + path, {name,});
            return response;
        } catch (error) {
            throw error;
        }
    },

    findShelter: async (query={}) => {
        try {
            let path = "/shelter/findShelters?"
            for (const key in query) {
                if (Array.isArray(query[key])) {
                    for (const value of query[key]) {
                        path = path + `${key}=${value}&`;
                    }
                }
                else if (typeof query[key] === "string") {
                    if (query[key].length > 0) {
                        path = path + `${key}=${query[key]}&`;
                    }
                }
                else if (typeof query[key] === "number") {
                    path = path + `${key}=${query[key]}&`;
                }
                else if (query[key] === null || query[key] === undefined) {
                    continue;
                }
                else {
                    throw new Error("Invalid query");
                }
            }
            const response = await axios.get(serverURL + path);
            return response
        } catch (error) {
            throw error;
        }
    },

};

export default ShelterService;