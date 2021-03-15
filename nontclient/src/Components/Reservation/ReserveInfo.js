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
            <div className="container mt-5">
            <div className="card">
                <div className="card-header text-white bg-primary "><h1 className="text-white my-1 ">Reservation Information</h1></div>
                <div className="card-body">
                    <dl className ="row">
                        <dt className="col-sm-2"><h5>ShelterName:</h5></dt>
                        <dd className="col-sm-10"><h5>bangkok sheltet</h5></dd>
                        <dt className="col-sm-2"><h5>Nontowner:</h5></dt>
                        <dd className="col-sm-10"><h5>porntanat tatiwong</h5></dd>
                        <dt className="col-sm-2"><h5>Nont:</h5></dt>
                        <dd className="col-sm-10"><h5>nan,eew,rgrg</h5></dd>
                        <dt className="col-sm-2"><h5>price</h5></dt>
                        <dd className="col-sm-10"><h5>500</h5></dd>
                        <dt className="col-sm-2"><h5>Room:</h5></dt>
                        <dd className="col-sm-10"><h5>39 rooms</h5></dd>
                        <dt className="col-sm-2"><h5>CheckIn Date:</h5></dt>
                        <dd className="col-sm-10"><h5>24/34/5535</h5></dd>
                        <dt className="col-sm-2"><h5>CheckOut Date:</h5></dt>
                        <dd className="col-sm-10"><h5>45/67/2568</h5></dd>
                        <dt className="col-sm-2"><h5>status:</h5></dt>
                        <dd className="col-sm-10"><h5>Godmode</h5></dd>
                    </dl>
                        <div >
                            <div>
                                {contextValue.userType === UserType.NONT_OWNER && 
                                <input className="my-1 btn btn-danger" type="button" value="cancel"/>
                                
                                }
                            </div>
                            <div>
                                <input className="d-flex align-content-center my-1 btn btn-primary" type="button"  value="checkin"/>
                            </div>
                            <div>
                                <input className="my-1 btn btn-primary" type="button"  value="checkout"/>
                            </div>
                            <div>
                                <input className="my-1 btn btn-primary" type="button"  value="review"/>
                            </div>
                        </div>
                </div>

            </div>
            
            </div>    
        }
        </div>
    );
}

export default ReserveInfo;