import UserType from "../Constants/UserType";
import axios from "axios";
import serverURL from "../Config/serverURL";
import UserTypeError from "../Constants/ErrorTypes/UserTypeError";

function getPath(type) {
  let path = "";
  if (type === UserType.NONT_OWNER) {
    path = "/nontOwners";
  } else if (type === UserType.NONT_SITTER) {
    path = "/nontSitters";
  } else {
    throw UserTypeError.UNKNOWN_USER_TYPE;
  }
  return path;
}

const UserProfileService = {
  getUserInfo: async (type, id) => {
    try {
      const path = getPath(type) + `/${id}`;
      const response = await axios.get(serverURL + path);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default UserProfileService;
