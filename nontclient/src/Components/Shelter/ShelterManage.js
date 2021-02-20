import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import ShelterRow from "./ShelterRow";

const UserContext = Contexts.UserContext;

const ShelterManage = (props) => {
    const contextValue = useContext(UserContext);
    const [shelters, setShelters] = useState([]);

    function onClick_shelter_view() {

    }
    function onClick_room_manage() {

    }
    function onClick_shelter_update() {

    }
    function onClick_shelter_delete() {

    }

    useEffect( () => {
        async function fetchShelters() {
            try {             
                const response = await ShelterService.getSheltersByEmail(contextValue.email);  
                setShelters(response.data);
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

            {/* Shelter Regsiter Button */}
            <div className="row">
                <button 
                className="btn btn-lg mt-2 mb-2"
                id="shelter-register-button"
                >
                    <a
                    className="fa fa-plus" />
                </button>
            </div>

            {/* Shelter Row Button */}
            <div>
                {
                    shelters.map( (element) => (
                        <ShelterRow
                        element={element}
                        key={element._id}
                        onClick_shelter_view = {onClick_shelter_view}
                        onClick_room_manage = {onClick_room_manage}
                        onClick_shelter_update = {onClick_shelter_update}
                        onClick_shelter_delete = {onClick_shelter_delete} 
                        />
                    ) )
                }
            </div>
        </div>
    );
}

export default ShelterManage;