import React, { useContext, useState, Component } from "react";
import { notification } from "antd";
import NontService from "../../Services/NontService";
import Contexts from "../../Utils/Context/Contexts";
import {
    VALID,
    INVALID,
    DEFAULT,
} from "../../Constants/FormValidity";
import nontTypes from "../../Constants/nontTypes";
import NameForm from "./NontForm/NameForm";
import TypeForm from "./NontForm/TypeForm";
import SubtypeForm from "./NontForm/SubtypeForm";
import DescriptionForm from "./NontForm/DescriptionForm";
import BirthDateForm from "./NontForm/BirthDateForm";
import MedicalCertificateForm from "./NontForm/MedicalCertificateForm";
import PictureForm from "./NontForm/PictureForm";

const UserContext = Contexts.UserContext;
const reader = new FileReader();

const NontRegistration = (props) => {
    const [nont, setNont] = useState({
        name: "",
        type: "",
        subtype: "",
        description: "",
        birth_date: "" ,
    })
    
    const value = useContext(UserContext);
    
    const [medcer, setMedcer] = useState([])
    const [picture, setPicture] = useState([])
    const [registerStatus, setRegisterStatus] = useState(DEFAULT);
    const [nameValid, setNameValid] = useState(DEFAULT);
    const [typeValid, setTypeValid] = useState(DEFAULT);
    const [subtypeValid, setSubtypeValid] = useState(DEFAULT);
    const [descriptionValid, setDescriptionValid] = useState(DEFAULT);
    const [birthDateValid, setBirthDateValid] = useState(DEFAULT);
    const [medcerValid, setMedcerValid] = useState(DEFAULT);
    const [pictureValid, setPictureValid] = useState(DEFAULT);

    const validator = {
        //Check unique name
        validateName: (value) => {
            if (value.length >= 1 && value.length <= 32) return true;
            else return false;
        },
        validateType: (value) => {
            const types = Object.values(nontTypes); //array
            if (types.some((type) => type==value)) return true;
            else return false;
        },
        validateSubtype: (value) => {
            if(value.length == 0 || value.length <= 50) return true;
            else return false;
        },
        validateDescription: (value) => {
            if(value.length == 0 || value.length <= 500) return true;
            else return false;
        },       
        validateBirthDate: (value) => {
            if(value.length == 0) return false;
            else return true;
        },

        
    };

    async function handleFormChange(element) {
        switch (element.currentTarget.id){
            case "name-input":
                if(validator.validateName(element.currentTarget.value)){
                    setNameValid(VALID);
                } else {
                    setNameValid(INVALID);
                }
                return;
            case "type-input":
                if(validator.validateType(element.currentTarget.value)){
                    setTypeValid(VALID);
                } else {
                    setTypeValid(INVALID);
                }   
                return;
            case "subtype-input":
                if(validator.validateSubtype(element.currentTarget.value)){
                    setSubtypeValid(VALID);
                } else {
                    setSubtypeValid(INVALID);
                }   
                return;
            case "description-input":
                if(validator.validateDescription(element.currentTarget.value)){
                    setDescriptionValid(VALID);
                } else {
                    setDescriptionValid(INVALID);
                }
                return;
            case "birth_date-input":
                if(validator.validateBirthDate(element.currentTarget.value)){
                    setBirthDateValid(VALID);
                } else {
                    setBirthDateValid(INVALID);
                }
                return;
            case "medical_certificate-input":
                //console.log(element.currentTarget.files)
                let file = element.currentTarget.files[0]
                reader.onload = async (e) => {
                    let buffer = reader.result
                    //let binaryString = new Buffer(buffer.split(",")[1],"base64");
                    //setMedcer([...medcer, {name:file.name,img:buffer}])
                    setMedcer(oldArray => [...oldArray, {name:file.name,img:buffer}]);
                    //console.log(typeof arrayBuffer)
                    setMedcerValid(VALID) 
                }
                reader.readAsDataURL(element.currentTarget.files[0]);
                return
            case "picture-input":
                let file2 = element.currentTarget.files[0];
                if (file2 instanceof Blob) {
                    reader.onload = async (e) => {
                        let buffer2 = reader.result;
                        //setPicture([...picture, {img:buffer2}]);
                        setPicture(oldArray => [...oldArray, {img:buffer2}]);
                        setPictureValid(VALID);
                    }
                    reader.readAsDataURL(element.currentTarget.files[0]);
                }                
                return
        }
    }

    async function submitRegistration() {    //POST
        const body = {
            name: document.getElementById("name-input").value,
            type: document.getElementById("type-input").value,
            subtype: document.getElementById("subtype-input").value,
            description: document.getElementById("description-input").value,
            birth_date: document.getElementById("birth_date-input").value,
            medical_certificate: medcer,
            picture: picture,
            nontowner_id: value._id
        }
        try {
            const response = await NontService.createNont(body);
            setRegisterStatus(VALID);
            notification.success({
                message: "Nont",
                description: `Nont ${body.name} created successfully.`,
                placement: "bottomRight",
            });
            console.log(response);
        } catch (error){
            setRegisterStatus(INVALID);
            notification.error({ 
                message: "Nont",
                description: `Cannot create nont profile.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }
    }

    return(
        <>
        {value.userType !== "Nont Owner" && <h2>You are not logged in as Nont Owner</h2>}
        {value.userType === "Nont Owner" && 
        <div className="container">
            <h1 className="my-5 text-center">Register Nont</h1>
            <div style={{color:"red"}}>
                * required
            </div>
            <form className="form" onSubmit={(e) => {
            e.preventDefault();
            submitRegistration();}}
            >
                <NameForm
                    onChange={handleFormChange}
                    valid={nameValid}
                />
                <div className="row">
                    <TypeForm
                        onChange={handleFormChange}
                        valid={typeValid}
                    />       
                    <SubtypeForm
                        onChange={handleFormChange}
                        valid={subtypeValid}
                    />  
                </div>    
                <DescriptionForm
                    onChange={handleFormChange}
                    valid={descriptionValid}
                />
                <div className="row">
                    <BirthDateForm
                        onChange={handleFormChange}
                        valid={birthDateValid}
                    />
                    <MedicalCertificateForm
                        onChange={handleFormChange}
                    />
                    <PictureForm
                        onChange={handleFormChange}
                    />
                </div>
                <div style={{paddingLeft:404, color:"red"}}>
                    Overall pictures and medical certificates size must less than 3MB (image files only)
                </div>
                <div className="m-5" style={{ textAlign: "center" }}>
                    <button
                    className="btn btn-primary"
                    type="submit"
                    >
                    save and submit
                    </button>
                </div>
            </form>
        </div>
        }
        
        {registerStatus === VALID &&
                <div className="m-5" style={{ textAlign: "center", color:"green" }}>
                    <label>
                        Your Nont is successfully registered.
                    </label>
                </div>
            }
        
        {registerStatus === INVALID &&
            <div className="m-5" style={{ textAlign: "center", color:"red"}}>
                <label>
                    Cannot register! Please check your input.
                </label>
            </div>
        }
        </>
    )


};

export default NontRegistration;