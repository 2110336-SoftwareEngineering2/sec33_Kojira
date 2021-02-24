import React, { useContext, useState, useEffect } from "react";
import NontService from "../../Services/NontService";
import Contexts from "../../Utils/Context/Contexts";
import NontRow from "./NontRow";

const UserContext = Contexts.UserContext;

const NontManage = (props) => {
    const contextValue = useContext(UserContext);
    const [nonts, setNonts] = useState([]);

    useEffect( () => {
        async function fetchNonts() {
            try {
                if (contextValue._id){
                    const response = await NontService.getNontByNontOwnerID(contextValue._id); 
                    if (response.data) {
                        setNonts(response.data);
                    }
                } 
            }
            catch (error) {
                console.error(error.message);
            }
        }     
        fetchNonts();   
    },[contextValue]);

    const deleteNont = async (id) => {    //DELETE
        try {
            const response = await NontService.deleteNont(id);
            if(response.status===200) setNonts(nonts.filter((nont) => nont._id !== id));
        } catch (error){
            console.error(error.message);
        }
    }


    return (
        <div className="container">
            {/* Header */}
            <h1 className="my-5 text-center">Nont Management</h1>

            {/* User */}
            <h2 className="my-5 text-center">Name: {contextValue.name}</h2>

            {/* Nont Register Button */}
            <div className="row">
            <button
                className="btn btn-lg mt-2 mb-2"
                id="nont-register-button"
                >
                    <a 
                    href={"/nont/create"}
                    className="fa fa-plus"
                    style={{textDecoration:"none"}}
                    title="Add New Nont"
                    />
                    <label
                    className="pl-3"
                    style={{color:"#2980b9"}}
                    >
                        Add Nont
                    </label>
                </button>
            </div>

            {/* Nont Row Button */}
            <div>
                {
                    nonts.map( (nont) => (
                        <NontRow
                        element={nont}
                        key={nont._id}
                        onDelete={deleteNont}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default NontManage;