import React, { useState } from "react";
import Router from "./Router/mainRouter";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Contexts from "./Utils/Context/Contexts";

const userContext = Contexts.userContext;

const App = (props) => {
  const [userType, setUserType] = useState(null);

  return (
    <>
      <userContext.Provider
        value={{ userType: userType, setUserType: setUserType }}
      >
        <NavigationBar />
        <Router setUserType={setUserType} />
      </userContext.Provider>
    </>
  );
};

export default App;
