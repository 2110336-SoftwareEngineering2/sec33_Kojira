import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import ShelterRow from "./ShelterRow";
import { Link } from 'react-router-dom';

const UserContext = Contexts.UserContext;

const ShelterManage = (props) => {
    const contextValue = useContext(UserContext);
    const [shelters, setShelters] = useState([]);

    useEffect( () => {
        async function fetchShelters() {
            try {
                if (contextValue._id){
                    const response = await ShelterService.getShelterByNontSitterID(contextValue._id); 
                    if (response.data) {
                        setShelters(response.data);
                    }
                } 
            }
            catch (error) {
                console.error(error.message);
            }
        }     
        fetchShelters();   
    }, [contextValue]);

    return (
        <div className="container">
            {/* Header */}
            <h1 className="my-5 text-center">Shelter Management</h1>

            {/* Shelter Register Button */}
            <div className="row">
                <Link to="./shelterRegister">
                <button
                className="btn btn-lg mt-2 mb-2"
                id="shelter-register-button"
                >
                    
                    <a 
                    className="fa fa-plus"></a>
                </button>
                </Link>
            </div>

            {/* Shelter Row Button */}
            <div>
                {
                    shelters.map( (element) => (
                        <ShelterRow
                        element={element}
                        key={element._id}
                        />
                    ) )
                }
            </div>
        </div>
    );
}

export default ShelterManage;