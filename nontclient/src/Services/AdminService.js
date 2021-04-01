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
            let path = "/shelter";
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
};

export default AdminService;