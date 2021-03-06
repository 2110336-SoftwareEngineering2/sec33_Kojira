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

  const [loading, setLoading] = useState(true);

  const UpdateUserInfo = () => {
    LoginService.getUserInfo().then((UserInfo) => {
      try {
        if (
          userInfo.login !== UserInfo.login ||
          userInfo.name !== UserInfo.name
        ) {
          setUserInfo(UserInfo);
        }
        if (loading) {
          setTimeout(() => setLoading(false), 1000);
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
        console.log("yes");
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
    <UserContext.Provider value={userContextValues}>
      <NavigationBar />
      {/* {loading && <h1>Loading</h1>} */}
      <Router />
    </UserContext.Provider>
  );
};

export default App;
