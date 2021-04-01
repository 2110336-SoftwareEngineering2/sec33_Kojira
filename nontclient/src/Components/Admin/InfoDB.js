import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";
import AdminService from "../../Services/AdminService";

const InfoDB = (props) => {
    const { dbname } = useParams();
    const [dbData, setDbData] = useState([]);
    const [fetchDataStatus, setFetchDataStatus] = useState(LoadStatus.LOADING);

    useEffect(() => {
        fetchData();
    }, [dbname]);

    const fetchData = async () => {
        let fetchFunction = null;
        switch (dbname) {
            case "nontOwners":
                fetchFunction = AdminService.getNontOwners;
                break;
            case "nontSitters":
                fetchFunction = AdminService.getNontSitters;
                break;
            case "nonts":
                fetchFunction = AdminService.getNonts;
                break;
            case "reservations":
                fetchFunction = AdminService.getReservations;
                break;
            case "reviews":
                fetchFunction = AdminService.getReviews;
                break;
            case "rooms":
                fetchFunction = AdminService.getRooms;
                break;
            case "shelters":
                fetchFunction = AdminService.getShelters;
                break;
        }
        if (fetchFunction) {
            const response = await fetchFunction();
            if (response.data) {
                response.data.forEach(element => {
                    for (const [key, value] of Object.entries(element)) {
                        console.log(key, typeof(value), value);
                    }
                });                
            }
        }        
    };

    return(
        <div className="container-fluid">
            {dbname}
            
            {/* Loading */}
            {/* <Loading status={fetchDataStatus} /> */}
            {/* <table className="table table-responsive-md table-bordered">
                <thead>
                    <tr className="">
                        <th scope="col" style={{textAlign:"center", fontSize:20}}>Name</th>
                        <th scope="col" style={{textAlign:"center", fontSize:20}}>Nont Type</th>
                        <th scope="col" style={{textAlign:"center", fontSize:20, display:"none"}}>Amount</th>
                        <th scope="col" style={{textAlign:"center", fontSize:20}}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                        <td style={{textAlign:"center", fontSize:20}}>1</td>
                        <td style={{textAlign:"center", fontSize:20}}>2</td>
                        <td style={{textAlign:"center", fontSize:20, display:"none"}}>3</td>
                        <td style={{textAlign:"center", fontSize:20}}>4</td>
                    </tr>
                    <tr className="">
                        <td style={{textAlign:"center", fontSize:20}}>5</td>
                        <td style={{textAlign:"center", fontSize:20}}>6</td>
                        <td style={{textAlign:"center", fontSize:20, display:"none"}}>7</td>
                        <td style={{textAlign:"center", fontSize:20}}>8</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
};

export default InfoDB;