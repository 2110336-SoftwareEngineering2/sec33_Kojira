import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import { Popconfirm } from "antd";
import Loading from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";
import AdminService from "../../Services/AdminService";
import {Modal} from "react-bootstrap";


const EditDB = (props) => {
    const { dbname, id } = useParams();
    const [document, setDocument] = useState({});
    const [fetchDataStatus, setFetchDataStatus] = useState(LoadStatus.LOADING);
    const [banAttribute, setBanAttribute] = useState(["picture", "password"]);

    useEffect(() => {
        const fetchDocument = async () => {
            let fetchFunction;
            switch (dbname) {
                case "nontOwners":
                    fetchFunction = AdminService.getNontOwnerByID;
                    break;
                case "nontSitters":
                    fetchFunction = AdminService.getNontSitterByID;
                    break;
                case "nonts":
                    fetchFunction = AdminService.getNontByID;
                    break;
                case "reservations":
                    fetchFunction = AdminService.getReservationByID;
                    break;
                case "reviews":
                    fetchFunction = AdminService.getReviewByID;
                    break;
                case "rooms":
                    fetchFunction = AdminService.getRoomByID;
                    break;
                case "shelters":
                    fetchFunction = AdminService.getShelterByID;
                    break;
            }
            try {
                const response = await fetchFunction(id);
                if(response.data) {
                    setDocument(response.data);
                    setFetchDataStatus(LoadStatus.SUCCESS);
                }
            } 
            catch(error) {
                setFetchDataStatus(LoadStatus.FAIL);
                console.error(error.message);
            }
        }
        fetchDocument();
    }, [dbname, id]);

    return (
        <div className="container">
        
            {/* Loading */}
            <Loading status={fetchDataStatus} />
  
            {/* Content */}
            {fetchDataStatus === LoadStatus.SUCCESS && (
                JSON.stringify(document)
            )}
        
        </div>
    );
};

export default EditDB;