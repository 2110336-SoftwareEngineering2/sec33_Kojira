import UserType from "../Utils/UserType";
import axios from "axios";
import serverURL from "../Utils/serverURL";
import LoginError from "../Utils/ErrorTypes/LoginError";

const LoginService = {
  Login: async function Login(email, password, typeOfUser, component) {
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
        });
        if (respond.data.login) {
          localStorage.setItem("access_token", respond.data.token);
          component.props.history.push("/home");
        } else {
          throw LoginError.NETWORK_ERROR;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      throw LoginError.NULL_USER_TYPE;
    }
  },

  checkLoginStatus: async function checkLoginStatus() {
    const token = localStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const respond = await axios.post(serverURL + "/users/auth");
    return respond;
  },

  getLoggedInEmail: async function getLoggedInEmail(component) {
    const respond = await this.checkLoginStatus();
    console.log(respond.data.email);
    if (respond.status === 200) {
      component.setState({ loggedIn: true, email: respond.data.email });
    } else {
      component.setState({ loggedIn: false, email: respond.data.email });
    }
  },
};

export default LoginService;
