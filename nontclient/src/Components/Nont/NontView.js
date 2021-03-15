import React, { useContext, useState, useEffect } from "react";
import NontService from "../../Services/NontService";
import Contexts from "../../Utils/Context/Contexts";
import { useParams } from "react-router-dom";

const UserContext = Contexts.UserContext;

const NontView = () => {
    const contextValue = useContext(UserContext);
    const [nont, setNont] = useState({});
    const {id} = useParams();
    useEffect( () => {
        async function fetchNont() {
            try {
                if(id) {
                    const response = await NontService.getNontByID(id); 
                    if (response.data) {
                        setNont(response.data);
                    }
                }
            }
            catch (error) {
                console.error(error.message);
            }
        }     
        fetchNont();   
    }, [id]);  
    
    return(
        <div className="container">

            <div className="card mt-3 text-center">
                <div className="card-header text-white bg-success">
                    <h1 className="my-1 font-weight-bold">{nont.name} </h1>
                </div>
                <div className="card-header text-white bg-info">
                    <h4 className="my-1"> Type : {nont.type} </h4>
                    <h4 className="my-1 mt-3"> Breed : {nont.subtype} </h4>
                </div>   
                <div className="card-body">
                    <div className="media">
                    {/* <img className="align-self-start mr-3 w-50" src="https://upload.wikimedia.org/wikipedia/commons/1/15/Gatto_Garfield.jpg" alt="nont image"/> */}
                    <img className="align-self-start mr-3" style={{width:"500px",border:"groove orange 5px"}} src="https://upload.wikimedia.org/wikipedia/commons/1/15/Gatto_Garfield.jpg" alt="nont image"/>
                        <div className="media-body w-50">
                            <div className="mw-100">
                                <h5 className="mb-3 mr-1">Description </h5>
                                <p className="mw-100">{nont.description}</p>
                            <hr/>
                            </div>
                            <div>
                                <h5 className="mb-3 mr-1">Date of birth </h5>
                                <p>{nont.birth_date}</p>
                            <hr className="mw-100"/>
                            </div> 
                            {/* <div>
                                <h5 className="mb-1 mr-1">Medical certificate</h5>
                                <p>{nont.medical_certificate}</p>
                             <hr className="mw-100"/>
                            </div>
                            <div>
                                <h5 className="mb-1 mr-1">Pictures of {nont.name}</h5>
                                <p>{nont.picture}</p>
                            <hr className="mw-100"/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );


};

export default NontView;