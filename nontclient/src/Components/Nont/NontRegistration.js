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
        birth_date: "",
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
    const [currentPictureList, setCurrentPictureList] = useState([]);
    const [currentMedcerList, setCurrentMedcerList] = useState([]);

    const validator = {
        //Check unique name
        validateName: (value) => {
            if (value.length >= 1 && value.length <= 32) return true;
            else return false;
        },
        validateType: (value) => {
            const types = Object.values(nontTypes); //array
            if (types.some((type) => type == value)) return true;
            else return false;
        },
        validateSubtype: (value) => {
            if (value.length == 0 || value.length <= 50) return true;
            else return false;
        },
        validateDescription: (value) => {
            if (value.length == 0 || value.length <= 500) return true;
            else return false;
        },
        validateBirthDate: (value) => {
            if (value.length == 0) return false;
            else return true;
        },


    };

    async function handleFormChange(element) {
        switch (element.currentTarget.id) {
            case "name-input":
                if (validator.validateName(element.currentTarget.value)) {
                    setNameValid(VALID);
                } else {
                    setNameValid(INVALID);
                }
                return;
            case "type-input":
                if (validator.validateType(element.currentTarget.value)) {
                    setTypeValid(VALID);
                } else {
                    setTypeValid(INVALID);
                }
                return;
            case "subtype-input":
                if (validator.validateSubtype(element.currentTarget.value)) {
                    setSubtypeValid(VALID);
                } else {
                    setSubtypeValid(INVALID);
                }
                return;
            case "description-input":
                if (validator.validateDescription(element.currentTarget.value)) {
                    setDescriptionValid(VALID);
                } else {
                    setDescriptionValid(INVALID);
                }
                return;
            case "birth_date-input":
                if (validator.validateBirthDate(element.currentTarget.value)) {
                    setBirthDateValid(VALID);
                } else {
                    setBirthDateValid(INVALID);
                }
                return;
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
        } catch (error) {
            setRegisterStatus(INVALID);
            notification.error({
                message: "Nont",
                description: `Cannot create nont profile.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }
    }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };

    const pictureOnChange = async ({ fileList: newFileList }) => {
        setCurrentPictureList(newFileList);
        setPicture([])
        for (var f of newFileList){
            let file = f.originFileObj
            let buffer = await new Promise(resolve => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
              });
              setPicture(oldArray => [...oldArray, {img:buffer}])
        }
    };

    const medCerOnChange = async ({ fileList: newFileList }) => {
        setCurrentMedcerList(newFileList);
        setMedcer([])
        for (var f of newFileList){
            let file = f.originFileObj
            let buffer = await new Promise(resolve => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
              });
              setMedcer(oldArray => [...oldArray, {name:file.name,img:buffer}])
        }
    };

    return (
        <>
            {value.userType !== "Nont Owner" && <h2>You are not logged in as Nont Owner</h2>}
            {value.userType === "Nont Owner" &&
                <div className="container">
                    <div className="title my-5 text-center">Register Nont</div>
                    <div className="emphasis text-danger">
                        * required
                    </div>
                    <form className="form" onSubmit={(e) => {
                        e.preventDefault();
                        submitRegistration();
                    }}
                    >
                        <div className="row">
                            <NameForm
                                onChange={handleFormChange}
                                valid={nameValid}
                            />
                            <BirthDateForm
                                onChange={handleFormChange}
                                valid={birthDateValid}
                            />   
                        </div>
                        <DescriptionForm
                            onChange={handleFormChange}
                            valid={descriptionValid}
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
                        
                        {/* {<div className="text-danger" style={{ paddingLeft: "50%" }}>
                            Overall pictures and medical certificates size must less than 3MB (image files only)
                        </div>} */}
                        <PictureForm
                            onFormChange={pictureOnChange}
                            listFile={currentPictureList}
                            onPreview={onPreview}
                        />
                        <MedicalCertificateForm
                            onFormChange={medCerOnChange}
                            listFile={currentMedcerList}
                            onPreview={onPreview}
                        />
                        <div className="m-5 text-center">
                            <button
                                className="button-text btn btn-primary"
                                type="submit"
                            >
                                save and submit
                            </button>
                        </div>
                    </form>

                    {registerStatus === VALID &&
                        <div className="emphasis m-5 text-center text-success">
                            <label>
                                Your Nont is successfully registered :)
                            </label>
                        </div>
                    }

                    {registerStatus === INVALID &&
                        <div className="emphasis m-5 text-center text-danger">
                            <label>
                                Cannot register! Please check your input.
                             </label>
                        </div>
                    }
                </div>
            }
        </>
    )
};

export default NontRegistration;