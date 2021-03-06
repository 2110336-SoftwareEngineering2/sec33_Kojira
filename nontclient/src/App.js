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
    name: null,
    _id: null,
    createdAt: null,
    updatedAt: null,
    err: false,
  });

  const UpdateUserInfo = () => {
    LoginService.getUserInfo().then((UserInfo) => {
      if (
        userInfo.login !== UserInfo.login ||
        userInfo.name !== UserInfo.name
      ) {
        setUserInfo(UserInfo);
      }
    });
  };

  UpdateUserInfo(); // always get user's info if logged in.

  const userContextValues = {
    userType: userInfo.userType,
    login: userInfo.login,
    email: userInfo.email,
    _id: userInfo._id,
    name: userInfo.name,
    createdAt: userInfo.createdAt,
    updatedAt: userInfo.updatedAt,
    UpdateUserInfo: UpdateUserInfo,
  };

  return (
    <React.Fragment>
      <UserContext.Provider value={userContextValues}>
        <NavigationBar />
        <Router />
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default App;
