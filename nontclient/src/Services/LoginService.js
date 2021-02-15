import UserType from "../Constants/UserType";
import axios from "axios";
import serverURL from "../Config/serverURL";
import LoginError from "../Constants/ErrorTypes/LoginError";

const LoginService = {
  Login: async function Login(email, password, typeOfUser, component) {
    try {
      var path = "";
      if (typeOfUser !== null) {
        if (typeOfUser === UserType.NONT_OWNER) {
          path = "/nontOwners/login";
        } else if (typeOfUser === UserType.NONT_SITTER) {
          path = "/nontSitters/login";
        } else {
          throw LoginError.USER_TYPE_ERROR;
        }
        try {
          const respond = await axios.post(serverURL + path, {
            email: email,
            password: password,
            userType: typeOfUser,
          });

          if (!respond.data) {
            console.log("error");
          }
          if (respond.data.login) {
            console.log(respond.data);
            localStorage.setItem("access_token", respond.data.token);
            component.props.history.push("/home");
          } else {
            if (respond.data.error) {
              throw respond.data.error;
            }
          }
        } catch (err) {
          throw err;
        }
      } else {
        throw LoginError.NULL_USER_TYPE;
      }
    } catch (err) {
      return err;
    }
    return true;
  },

  checkLoginStatus: async function checkLoginStatus() {
    const token = localStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const respond = await axios.post(serverURL + "/users/auth");
    return respond;
  },

  getUserInfo: async function getUserInfo() {
    try {
      const respond = await this.checkLoginStatus();
      if (respond.status === 200) {
        return {
          login: true,
          email: respond.data.email,
          userType: respond.data.userType,
          err: false,
        };
      } else {
        return { login: false, email: null, userType: null, err: false };
      }
    } catch (err) {
      return { login: false, email: null, userType: null, err: true };
    }
  },
};

export default LoginService;
