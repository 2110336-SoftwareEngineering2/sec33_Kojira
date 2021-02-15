import React, { useState } from "react";
import Router from "./Router/mainRouter";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Contexts from "./Utils/Context/Contexts";

const userTypeContext = Contexts.userTypeContext;

const App = (props) => {
  const [userType, setUserType] = useState(null);

  return (
    <>
      <userTypeContext.Provider
        value={{ userType: userType, setUserType: setUserType }}
      >
        <NavigationBar />
        <Router setUserType={setUserType} />
      </userTypeContext.Provider>
    </>
  );
};

export default App;
