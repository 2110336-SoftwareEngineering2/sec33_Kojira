import React, { useContext, useState, useEffect } from "react";
import Contexts from "../../Utils/Context/Contexts";
import ReservationService from "../../Services/ReservationService";
import UserType from "../../Constants/UserType";

const UserContext = Contexts.UserContext;

const ReserveInfo = (props) => {
    const contextValue = useContext(UserContext);

    return(
        <div>
        {contextValue.userType === UserType.UNKNOWN_USER_TYPE && <h2>You are not logged in </h2>}
        {contextValue.userType !== UserType.UNKNOWN_USER_TYPE &&  
            <div>
            <h1>You are gay</h1>
            
            </div>    
        }
        </div>
    );
}

export default ReserveInfo;