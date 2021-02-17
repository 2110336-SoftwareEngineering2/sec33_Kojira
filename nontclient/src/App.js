import React, { useState } from "react";
import Router from "./Router/mainRouter";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Contexts from "./Utils/Context/Contexts";
import LoginService from "./Services/LoginService";

const UserContext = Contexts.UserContext;

const App = (props) => {
  const [userType, setUserType] = useState(null);
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState(null);

  const UpdateUserInfo = () => {
    LoginService.getUserInfo().then((userInfo) => {
      if (userType !== userInfo.userType) {
        setUserType(userInfo.userType);
      }
      if (login !== userInfo.login) {
        setLogin(userInfo.login);
      }
      if (email !== userInfo.email) {
        setEmail(userInfo.email);
      }
    });
  };

  UpdateUserInfo(); // always get user's info if logged in.

  const userContextValues = {
    userType: userType,
    setUserType: setUserType,
    login: login,
    setLogin: setLogin,
    email: email,
    setEmail: setEmail,
    UpdateUserInfo: UpdateUserInfo,
  };

  return (
    <>
      <UserContext.Provider value={userContextValues}>
        <NavigationBar />
        <Router setUserType={setUserType} />
      </UserContext.Provider>
    </>
  );
};

export default App;
