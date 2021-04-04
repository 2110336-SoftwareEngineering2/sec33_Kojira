import axios from "axios";
import serverURL from "../Config/serverURL";

// responsible for admin work
// db: nontOwners, nontSitters, nonts, reservations, reviews, rooms, shelters
const AdminService = {

    // GET nontOwners
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
    getNontOwnerByID: async (id) => {
        try {
            let path = "/nontOwners/"+id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // GET nontSitters
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
    getNontSitterByID: async (id) => {
        try {
            let path = "/nontSitters/"+id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // GET nonts
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
    getNontByID: async (id) => {
        try {
            let path = "/nont/"+id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // GET reservations
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
    getReservationByID: async (id) => {
        try {
            let path = "/reservation/unpop/"+id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // GET reviews
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
    getReviewByID: async (id) => {
        try {
            let path = "/review/"+id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // GET rooms
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
    getRoomByID: async (id) => {
        try {
            let path = "/room/id/"+id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // GET shelters
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
    getShelterByID: async (id) => {
        try {
            let path = "/shelter/id/"+id;
            const response = await axios.get(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // PUT nontOwners
    updateNontOwner: async (id, body) => {
        try {
            let path = "/nontOwners/admin_update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // PUT nontSitters
    updateNontSitter: async (id, body) => {
        try {
            let path = "/nontSitters/admin_update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // PUT nonts
    updateNont: async (id, body) => {
        try {
            let path = "/nont/admin_update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // PUT reservations
    updateReservation: async (id, body) => {
        try {
            let path = "/reservation/admin_update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // PUT rooms
    updateRoom: async (id, body) => {
        try {
            let path = "/room/admin_update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // PUT shelters
    updateShelter: async (id, body) => {
        try {
            let path = "/shelter/admin_update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // PUT reviews
    updateReview: async (id, body) => {
        try {
            let path = "/review/admin_update/" + id;
            const response = await axios.put(serverURL + path, body);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // DELETE nontOwners
    removeNontOwners: async (id) => {
        try {
            let path = "/nontOwners/remove/" + id;
            const response = await axios.delete(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // DELETE nontSitters
    removeNontSitters: async (id) => {
        try {
            let path = "/nontSitters/remove/" + id;
            const response = await axios.delete(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // DELETE nonts
    removeNonts: async (id) => {
        try {
            let path = "/nont/remove/" + id;
            const response = await axios.delete(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // DELETE reservations
    removeReservations: async (id) => {
        try {
            let path = "/reservation/remove/" + id;
            const response = await axios.delete(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // DELETE reviews
    removeReviews: async (id) => {
        try {
            let path = "/review/remove/" + id;
            const response = await axios.delete(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // DELETE rooms
    removeRooms: async (id) => {
        try {
            let path = "/room/remove/" + id;
            const response = await axios.delete(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    // DELETE shelters
    removeShelters: async (id) => {
        try {
            let path = "/shelter/remove/" + id;
            const response = await axios.delete(serverURL + path);
            return response;
        }
        catch (error) {
            throw error;
        }
    },

};

export default AdminService;