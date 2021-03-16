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

    const toDate = (date) => {
        switch(date.substr(5,2)){
            case '01': return date.substr(8,2)+' January '+date.substr(0,4);
            case '02': return date.substr(8,2)+' February '+date.substr(0,4);
            case '03': return date.substr(8,2)+' March '+date.substr(0,4); 
            case '04': return date.substr(8,2)+' April '+date.substr(0,4);
            case '05': return date.substr(8,2)+' May '+date.substr(0,4);
            case '06': return date.substr(8,2)+' June '+date.substr(0,4);
            case '07': return date.substr(8,2)+' July '+date.substr(0,4);
            case '08': return date.substr(8,2)+' August '+date.substr(0,4);
            case '09': return date.substr(8,2)+' September '+date.substr(0,4);
            case '10': return date.substr(8,2)+' October '+date.substr(0,4);
            case '11': return date.substr(8,2)+' November '+date.substr(0,4);
            case '12': return date.substr(8,2)+' December '+date.substr(0,4);
        }
    }
    
    return(
        <div className="container">

            <div className="card mt-3 text-center">
                <div className="card-header bg-success">
                    <h1 className="my-1 font-weight-bold text-white">{nont.name} </h1>
                </div>
                <div className="card-header bg-info">
                    <h4 className="my-1 text-white"> <b>Type :</b>  {nont.type} </h4>
                    <h4 className="my-1 mt-3 text-white"> <b>Breed :</b> {nont.subtype} </h4>
                </div>   
                <div className="card-body">
                    <div className="media">
                        {(nont?.picture?.length>0) && <img className="align-self-start mr-3" style={{width:"500px",border:"groove orange 5px"}} src={`${'data' in nont?.picture?.[0]?.img&&Buffer.from((nont?.picture?.[0]?.img?.data)).toString()}`} alt="nont image"/>}
                        {(nont?.picture?.length==0 )&&
                            <div style={{position:"relative"}}>
                                <img className="align-self-start mr-3" style={{width:"480px", border:"groove orange 5px"}} src="https://previews.123rf.com/images/vasilyrosca/vasilyrosca1808/vasilyrosca180800001/107234907-tv-no-signal-background-illustration-no-signal-television-screen-graphic-broadcast-design-.jpg" alt="nont no image"/> 
                                <b> <h1 style={{position:"absolute", top:150, left:89}}> No Image Found </h1> </b>
                            </div>
                        }

                        <div className="media-body w-50">
                            <div className="mw-100">
                                <h5 className="mb-3 mr-1"> <b> Description </b> </h5>
                                <h6> {nont.description} </h6>
                                <hr/>
                            </div>
                            <div>
                                <h5 className="mb-3 mr-1"> <b> Date of birth </b></h5>
                                <p>{nont.birth_date && toDate(nont.birth_date)}</p>
                                <hr className="mw-100"/>
                            </div> 
                            <div>
                                <h5 className="mb-1 mr-1"> <b> Medical certificate </b></h5>
                                <br/>
                                {(nont?.medical_certificate?.length>0) && <img  style={{width:"240px",border:"groove yellow 2px"}} src={`${'data' in nont?.medical_certificate?.[0]?.img&&Buffer.from((nont?.medical_certificate?.[0]?.img?.data)).toString()}`} alt="nont medic"/>}
                                 &nbsp; &nbsp; {(nont?.medical_certificate?.length>1) && <img  style={{width:"240px",border:"groove yellow 2px"}} src={`${'data' in nont?.medical_certificate?.[1]?.img&&Buffer.from((nont?.medical_certificate?.[1]?.img?.data)).toString()}`} alt="nont medic"/>}
                                <br/>
                                <hr className="mw-100"/>
                                
                             </div>
                    
                            {/*
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