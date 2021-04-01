import React, { useContext, useState, useEffect } from "react";
import { notification } from "antd";
import NontService from "../../Services/NontService";
import Contexts from "../../Utils/Context/Contexts";
import NontRow from "./NontRow";
import Loading from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";

const UserContext = Contexts.UserContext;

const NontManage = (props) => {
    const contextValue = useContext(UserContext);
    const [nonts, setNonts] = useState([]);
    const [fetchNontStatus, setFetchNontStatus] = useState(LoadStatus.LOADING);

    useEffect( () => {
        async function fetchNonts() {
            try {
                if (contextValue._id){
                    const response = await NontService.getNontByNontOwnerID(contextValue._id); 
                    if (response.data) {
                        setNonts(response.data.filter((nont) => nont.exist === true));
                        setFetchNontStatus(LoadStatus.SUCCESS);
                    }
                } 
            }
            catch (error) {
                setFetchNontStatus(LoadStatus.FAIL);
                console.error(error.message);
            }
        }     
        fetchNonts();   
    },[contextValue]);

    const cancelNont = async (id) => {
        try {
            const response = await NontService.cancelNont(id);
            if(response.status===200) setNonts(nonts.filter((nont) => nont._id !== id));
            notification.success({
                message: "Nont",
                description: `Nont deleted successfully.`,
                placement: "bottomRight",
            });
        } catch (error){
            notification.error({
                message: "Nont",
                description: `Cannot delete Nont.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }       
    }

    const deleteNont = async (id) => {    //DELETE
        try {
            const response = await NontService.deleteNont(id);
            if(response.status===200) setNonts(nonts.filter((nont) => nont._id !== id));
            notification.success({
                message: "Nont",
                description: `Nont deleted successfully.`,
                placement: "bottomRight",
            });
        } catch (error){
            notification.error({
                message: "Nont",
                description: `Cannot delete Nont.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }
    }


    return (
        <div className="container">
            {/* Header */}
            <h1 className="my-5 text-center font-weight-bold">Nont Management</h1>

            {/* Loading */}
            <Loading status={fetchNontStatus} />

            {/* User */}
            {
                fetchNontStatus === LoadStatus.SUCCESS &&
                (
                    <h2 className="my-5 text-center text-body">Name: {contextValue.name}</h2>
                )
            }            

            {/* Nont Register Button */}
            {
                fetchNontStatus === LoadStatus.SUCCESS &&
                (
                    <div className="row">
                        <div className="col">
                            <a
                            type="button"
                            style={{backgroundColor:"blueviolet"}}
                            className="btn btn-outline-light text-light border-success text-center float-left"
                            href={"/nont/create"}>
                                Add Nont
                            </a>
                        </div>            
                    </div>
                )
            }            

            {/* Nont Row Button */}
            {
                fetchNontStatus === LoadStatus.SUCCESS &&
                (
                    <div>
                        {
                            nonts.map( (nont) => (
                                <NontRow
                                element={nont}
                                key={nont._id}
                                onDelete={cancelNont}
                                />
                            ))
                        }
                    </div>
                )
            }
            
        </div>
    );
};

export default NontManage;