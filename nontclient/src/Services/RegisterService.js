import UserType from "../Constants/UserType";
import axios from "axios";
import serverURL from "../Config/serverURL";
import RegisterError from "../Constants/ErrorTypes/RegisterError";

function getPath(type) {
  let path = "";
  if (type === UserType.NONT_OWNER) {
    path = "/nontOwners";
  } else if (type === UserType.NONT_SITTER) {
    path = "/nontSitter";
  } else {
    throw RegisterError.UNKNOWN_USER_TYPE;
  }
  return path;
}

const RegisterService = {
  registerAccount: async (type, account) => {
    try {
      const path = getPath(type);
      const response = await axios.post(serverURL + path, account);
      return response;
    } catch (error) {
      throw error;
    }
  },

  checkValidEmail: async (type, email) => {
    try {
      const path = getPath(type);
      const response = await axios.post(serverURL + path + "/check-email", {
        email,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  checkValidName: async (type, name) => {
    try {
      const path = getPath(type);
      const response = await axios.post(serverURL + path + "/check-name", {
        name,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default RegisterService;
