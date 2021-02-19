import React, { useState } from "react";
import Router from "./Router/mainRouter";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Contexts from "./Utils/Context/Contexts";
import LoginService from "./Services/LoginService";

const UserContext = Contexts.UserContext;

const App = (props) => {
  const [userInfo, setUserInfo] = useState({
    userType: null,
    email: null,
    login: false,
  });

  const setUserType = (newUserType) =>
    setUserInfo({ ...userInfo, userType: newUserType });

  const setEmail = (newEmail) => setUserInfo({ ...userInfo, email: newEmail });

  const setLogin = (newLogin) => setUserInfo({ ...userInfo, login: newLogin });

  const UpdateUserInfo = () => {
    LoginService.getUserInfo().then((UserInfo) => {
      if (
        userInfo.userType !== UserInfo.userType ||
        userInfo.email !== UserInfo.email ||
        userInfo.login !== UserInfo.login
      )
        setUserInfo({
          userType: UserInfo.userType,
          email: UserInfo.email,
          login: UserInfo.login,
        });
    });
  };

  UpdateUserInfo(); // always get user's info if logged in.

  const userContextValues = {
    userType: userInfo.userType,
    login: userInfo.login,
    email: userInfo.email,
    setUserType: setUserType,
    setEmail: setEmail,
    setLogin: setLogin,
    UpdateUserInfo: UpdateUserInfo,
  };

  return (
    <React.Fragment>
      <UserContext.Provider value={userContextValues}>
        <NavigationBar />
        <Router setUserType={setUserType} />
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default App;
