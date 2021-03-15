import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import ShelterRow from "./ShelterRow";
import {notification,} from "antd";

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

    const openNotification = (mode, name) => {
        if (mode === "success") {
            notification.success({
                message: "Shelter deleted.",
                description: `Shelter ${name} delete successfully.`,
                placement: "bottomRight",
            })
        }
        else if (mode === "error") {
            notification.error({ 
                message: "Shelter deleted.",
                description: `Cannot delete shelter ${name}.`,
                placement: "bottomRight",
            });
        }        
    };

    const deleteShelter = async (id, name) => {
        try {
            const response = await ShelterService.deleteShelter(id);
            if(response.status===200){
                fetchShelters();
                openNotification("success", name)
            }
        } catch (error){
            openNotification("error", name)
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
            <div className="pb-1">
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