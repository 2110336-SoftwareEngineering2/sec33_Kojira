import React, { useState, useEffect } from "react";
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
    loaded: false,
  });

  const UpdateUserInfo = () => {
    LoginService.getUserInfo().then((UserInfo) => {
      try {
        if (
          userInfo.login !== UserInfo.login ||
          userInfo.name !== UserInfo.name
        ) {
          setUserInfo(UserInfo);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      UpdateUserInfo(); // always get user's info if logged in.
    } else {
      if (!userInfo.loaded) {
        setUserInfo({ ...userInfo, loaded: true });
      }
    }
  }, []);

  const userContextValues = {
    userType: userInfo.userType,
    login: userInfo.login,
    email: userInfo.email,
    _id: userInfo._id,
    name: userInfo.name,
    loaded: userInfo.loaded,
    createdAt: userInfo.createdAt,
    updatedAt: userInfo.updatedAt,
    UpdateUserInfo: UpdateUserInfo,
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      <UserContext.Provider value={userContextValues}>
        <NavigationBar />
        <Router />
      </UserContext.Provider>
    </div>
  );
};

export default App;
