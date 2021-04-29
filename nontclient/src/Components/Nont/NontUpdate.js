import React, { useContext, useState, useEffect } from "react";
import {notification, Popconfirm} from "antd";
import { useParams } from "react-router-dom";
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

const NontUpdate = (props) => {
    const { id } = useParams();

    const value = useContext(UserContext);

    const [nont, setNont] = useState([]);
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
    const [currentPictureList, setCurrentPictureList] = useState([]);
    const [currentMedcerList, setCurrentMedcerList] = useState([]);

    useEffect(() => {
        async function fetchNontOldData() {
            try {
                if (id) {
                    const response = await NontService.getNontByID(id);
                    if (response.data) {
                        setNont(response.data);
                        setMedcer(response.data.medical_certificate.map((image) => {
                            return {
                                name: image.name,
                                img: Buffer.from(image.img.data).toString()
                            };
                        }));
                        setPicture(response.data.picture.map((image) => {
                            return {
                                img: Buffer.from(image.img.data).toString()
                            };
                        }));
                        setCurrentMedcerList([])
                        setCurrentPictureList([])
                        setCurrentMedcerList(response.data.medical_certificate.map((image) => {
                            return {
                                name: image.name,
                                url: Buffer.from(image.img.data).toString(),
                                status:'done'
                            };
                        }));
                        setCurrentPictureList(response.data.picture.map((image) => {
                            return {
                                url: Buffer.from(image.img.data).toString(),
                                status:'done'
                            };
                        }));
                        console.log(response.data.medical_certificate);
                    }
                }
            }
            catch (error) {
                console.error(error.message);
            }
        }
        fetchNontOldData();
    }, [id]);
    console.log(medcer);

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
        setPictureValid(VALID)
        setCurrentPictureList(newFileList);
        setPicture([])
        for (var f of newFileList){
            let file = f.originFileObj?f.originFileObj:f
            if(f.originFileObj){
                let buffer = await new Promise(resolve => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                });
                setPicture(oldArray => [...oldArray, {img:buffer}])
            } else {
                setPicture(oldArray => [...oldArray, {img:file.url}])
            }      
        }
    };

    const medCerOnChange = async ({ fileList: newFileList }) => {
        setMedcerValid(VALID)
        setCurrentMedcerList(newFileList);
        setMedcer([])
        for (var f of newFileList){
            let file = f.originFileObj?f.originFileObj:f
            if(f.originFileObj){
                let buffer = await new Promise(resolve => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                });
                setMedcer(oldArray => [...oldArray, {name:file.name,img:buffer}])
            } else {
                setMedcer(oldArray => [...oldArray, {name:file.name,img:file.url}])
            }      
        }
    };

    async function submitUpdate() {
        const body = {
            //_id: nontID,
            name: document.getElementById("name-input").value,
            type: document.getElementById("type-input").value,
            subtype: document.getElementById("subtype-input").value,
            description: document.getElementById("description-input").value,
            birth_date: document.getElementById("birth_date-input").value,
            medical_certificate: nont.medical_certificate,
            picture: nont.picture,
            nontowner_id: value._id
        }
        if (medcerValid) { body.medical_certificate = medcer }
        if (pictureValid) { body.picture = picture }
        //if(birthDateValid===VALID) { console.log(birthDateValid);body.birth_date = document.getElementById("birth_date-input").value }
        try {
            const response = await NontService.updateNont(id, body);
            setRegisterStatus(VALID);
            notification.success({
                message: "Nont",
                description: `Nont successfully updated.`,
                placement: "bottomRight",
            });
            console.log(response);
        } catch (error) {
            setRegisterStatus(INVALID);
            notification.error({
                message: "Nont",
                description: `Cannot update nont profile.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }
    }

    return (
        <>
            {value.userType !== "Nont Owner" && <h2>You are not logged in as Nont Owner</h2>}
            {value.userType === "Nont Owner" &&
                <div className="container">
                    <div className="title my-5 text-center">Update Nont</div>
                    <div className="emphasis text-danger">
                        * required
                    </div>
                    <form className="form" onSubmit={(e) => {
                        e.preventDefault();
                        submitUpdate();
                    }}
                    >
                        <div className="row">
                            <NameForm
                                onChange={handleFormChange}
                                defaultValue={nont.name}
                                valid={nameValid}
                            />
                            <BirthDateForm
                                onChange={handleFormChange}
                                defaultValue={nont.birth_date}
                                valid={birthDateValid}
                            />
                        </div>
                        <DescriptionForm
                            onChange={handleFormChange}
                            defaultValue={nont.description}
                            valid={descriptionValid}
                        />
                        <div className="row">
                            <TypeForm
                                onChange={handleFormChange}
                                defaultValue={nont.type}
                                valid={typeValid}
                            />
                            <SubtypeForm
                                onChange={handleFormChange}
                                defaultValue={nont.subtype}
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
                                save and update
                            </button>
                        </div>
                    </form>
                    {registerStatus === VALID &&
                        <div className="emphasis m-5 text-center text-success">
                            <label>
                                Your Nont is successfully updated :)
                            </label>
                        </div>
                    }

                    {registerStatus === INVALID &&
                        <div className="emphasis m-5 text-center text-danger">
                            <label>
                                Cannot update! Please check your input.
                            </label>
                        </div>
                    }
                </div>
            }
        </>
    )
};

export default NontUpdate;