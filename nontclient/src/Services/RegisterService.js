import UserType from "../Constants/UserType";
import axios from "axios";
import serverURL from "../Config/serverURL";
import RegisterError from "../Constants/ErrorTypes/RegisterError";

const RegisterService = {
  registerAccount: async (type, account) => {
    let path = "";
    if (type === UserType.NONT_OWNER) {
      path = "/nontOwners";
    } else if (type === UserType.NONT_SITTER) {
      path = "/nontSitter";
    } else {
      throw RegisterError.UNKNOWN_USER_TYPE;
    }
    try {
      const response = await axios.post(serverURL + path, account);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default RegisterService;
