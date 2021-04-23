import UserType from "../Constants/UserType";
import {axios, updateToken} from "../Utils/ServiceUtils/axios";
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
        } else if (typeOfUser === UserType.ADMIN) {
          path = "/admin/login";
        } else {
          throw LoginError.USER_TYPE_ERROR;
        }
        try {
          const respond = await axios.post(serverURL + path, {
            email: email,
            password: password,
            userType: typeOfUser,
          });

          // console.log(respond.data);

          if (!respond.data) {
            console.log("error");
          } else if (respond.data.login) {
            localStorage.setItem("access_token", respond.data.token);
            updateToken();
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
      return err; // the error will be returned if there's any error.
    }
    return true;
  },

  checkLoginStatus: async function checkLoginStatus() {
    // const token = localStorage.getItem("access_token");
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
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
          name: respond.data.name,
          _id: respond.data._id,
          createdAt: respond.data.createdAt,
          updatedAt: respond.data.updatedAt,
          err: false,
          loaded: true,
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
