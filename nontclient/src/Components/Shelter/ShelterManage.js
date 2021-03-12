import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import ShelterRow from "./ShelterRow";

const UserContext = Contexts.UserContext;

const ShelterManage = (props) => {
    const contextValue = useContext(UserContext);
    const [shelters, setShelters] = useState([]);
    
    useEffect( () => {  
        fetchShelters();   
    }, [contextValue]);

    const nontSitterID = contextValue._id;

    const fetchShelters = async () => {
        try {
            if (nontSitterID) {
                const response = await ShelterService.getShelterByNontSitterID(nontSitterID);
                if (response.data) {
                    setShelters(response.data);
                }
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    const deleteShelter = async (id) => {
        try {
            const response = await ShelterService.deleteShelter(id);
            if(response.status===200){
                fetchShelters();
            }
        } catch (error){
            console.error(error.message);
        }
    };

    return (
        <div className="container">
            {/* Header */}
            <h1 className="my-5 text-center">Shelter Management</h1>

            {/* User */}
            <h2 className="my-5 text-center">Name: {contextValue.name}</h2>

            {/* Shelter Register Button */}
            <div className="row">
            <button
                className="btn btn-lg mt-2 mb-2"
                id="shelter-register-button"
                >
                    <a 
                    href={"/shelterRegister"}
                    className="fa fa-plus"
                    style={{textDecoration:"none"}}
                    title="Add New Shelter"
                    />
                    <label
                    className="pl-3"
                    style={{color:"#2980b9"}}
                    >
                        Add
                    </label>
                </button>
            </div>

            {/* Shelter Row Button */}
            <div>
                {
                    shelters.map( (element) => (
                        <ShelterRow
                        element={element}
                        key={element._id}
                        onDelete={deleteShelter}
                        />
                    ) )
                }
            </div>
        </div>
    );
}

export default ShelterManage;