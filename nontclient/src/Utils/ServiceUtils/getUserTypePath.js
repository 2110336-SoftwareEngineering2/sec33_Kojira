import UserType from "../../Constants/UserType";
import UserTypeError from "../../Constants/ErrorTypes/UserTypeError";

const getUserTypePath = (type) => {
  let path = "";
  if (type === UserType.NONT_OWNER) {
    path = "/nontOwners";
  } else if (type === UserType.NONT_SITTER) {
    path = "/nontSitters";
  } else {
    throw UserTypeError.UNKNOWN_USER_TYPE;
  }
  return path;
};

export default getUserTypePath;