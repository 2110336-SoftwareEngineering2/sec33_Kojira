import UserType from "../Utils/UserType";
import axios from "axios";
import serverURL from "../Utils/serverURL";

const LoginService = {
  Login: async function Login(email, password, typeOfUser) {
    var path = "";
    if (typeOfUser !== null) {
      if (typeOfUser === UserType.NONT_OWNER) {
        path = "/nontOwners/login";
      } else if (typeOfUser === UserType.NONT_SITTER) {
        path = "/nontSitters/login";
      } else {
        throw TypeError("no such user type!");
      }
      try {
        const respond = await axios.post(serverURL + path, {
          email: email,
          password: password,
        });
        console.log(respond.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      throw "user type cannot be null";
    }
  },
};

export default LoginService;
