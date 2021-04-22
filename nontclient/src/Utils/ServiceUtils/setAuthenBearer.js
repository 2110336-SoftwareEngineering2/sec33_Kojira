import axios from "axios";

const setAuthenBearer = () => {
    const token = localStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export default setAuthenBearer;