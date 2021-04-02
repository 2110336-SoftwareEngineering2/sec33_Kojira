import axios from "axios";
import serverURL from "../Config/serverURL";

// responsible for admin work
// db: nontOwners, nontSitters, nonts, reservations, reviews, rooms, shelters, transactions
const AdminService = {
    getNontOwners: async () => {
        try {
            let path = "/nontOwners";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getNontSitters: async () => {
        try {
            let path = "/nontSitters";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getNonts: async () => {
        try {
            let path = "/nont";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getReservations: async () => {
        try {
            let path = "/reservation";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getReviews: async () => {
        try {
            let path = "/review";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getRooms: async () => {
        try {
            let path = "/room";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    getShelters: async () => {
        try {
            let path = "/shelter/allShelters";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    updateNontOwner: async (id, body) => {
        try {
            let path = "/nontOwners/update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    updateNontSitter: async (id, body) => {
        try {
            let path = "/nontSitters/update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
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
    updateReservation: async (id, body) => {
        try {
            let path = "/reservation/update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    updateRoom: async (id, body) => {
        try {
            let path = "/room/update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    updateShelter: async (id, body) => {
        try {
            let path = "/shelter/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    updateReview: async (id, body) => {
        try {
            let path = "/review/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
};

export default AdminService;