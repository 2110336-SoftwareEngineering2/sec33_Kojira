import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import ShelterRow from "./ShelterRow";
import { notification, } from "antd";
import Loading from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";

const UserContext = Contexts.UserContext;

const ShelterManage = (props) => {
    const contextValue = useContext(UserContext);
    const [shelters, setShelters] = useState([]);
    const [fetchShelterStatus, setFetchShelterStatus] = useState(LoadStatus.LOADING);
    
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
                    setFetchShelterStatus(LoadStatus.SUCCESS);
                }
            }
        }
        catch (error) {
            setFetchShelterStatus(LoadStatus.FAIL);
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

            {/* Back Button and Add Button */}
            <div className="d-flex justify-content-between mt-2"
            >
                {/* Back Button */}
                <a
                type="button"
                className="btn btn-outline-light text-dark bg-light border-dark button-text"
                href={"/dashboard"}>
                    Back to dashboard
                </a>
                {/* Add Button */}
                <a
                type="button"
                className="btn btn-outline-light text-light bg-success border-success button-text"
                href={"/shelterRegister"}>
                    Add
                </a>
            </div>
            
            {/* Loading */}
            <Loading status={fetchShelterStatus} />

            {/* User */}
            {
                fetchShelterStatus === LoadStatus.SUCCESS &&
                (
                    <div className="my-2 col-md-12 title"
                        style={{backgroundColor:"#c8d6e5", color:"#222f3e"}}>
                            Shelter Management | {contextValue.name}
                    </div>
                )
            }    

            {/* Shelter Row Button */}
            {
                fetchShelterStatus === LoadStatus.SUCCESS &&
                (
                    <div>
                        <table className="table table-responsive-md table-hover table-bordered" style={{borderWidth:"5px"}}>
                            <thead>
                                <tr>
                                    <th scope="col" className="header" style={{textAlign:"center"}}>Name</th>
                                    <th scope="col" className="header" style={{textAlign:"center"}}>Description</th>
                                    <th scope="col" className="header" style={{textAlign:"center"}}>Rate</th>
                                    <th colSpan="3" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                shelters.map( (element) => (
                                    <ShelterRow
                                    element={element}
                                    key={element._id}
                                    onDelete={deleteShelter}
                                    />
                                ) )
                                }
                            </tbody>
                        </table>                        
                    </div>
                )
            }
                        
        </div>
    );
}

export default ShelterManage;