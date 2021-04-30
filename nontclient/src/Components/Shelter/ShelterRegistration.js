import React, { useContext, useState, Component, useEffect } from "react";
import {notification, Popconfirm} from "antd";
import ShelterService from "../../Services/ShelterService";
import {
    VALID,
    INVALID,
    DEFAULT,
    EXIST,
} from "../../Constants/FormValidity";
import NameForm from "./ShelterForm/NameForm";
import DescriptionForm from "./ShelterForm/DescriptionForm";
import PhoneNumberForm from "./ShelterForm/PhoneNumberForm";
import LicenseForm from "./ShelterForm/LicenseForm";
import AddressForm from "./ShelterForm/AddressForm";
import PictureForm from "./ShelterForm/PictureForm";
import Contexts from "../../Utils/Context/Contexts";
import styles from "./Shelter.module.css";

const UserContext = Contexts.UserContext;
const reader = new FileReader();

//optional can be empty
const ShelterRegistration  = (props) => {
    const [shelter, setShelter] = useState({
        name: "",
        description: "",
        phoneNumber: "",
        address: "",
        coordinate: {lat:0,lng:0},
    })
    
    const value = useContext(UserContext);
    
    const [license, setLicense] = useState([])
    const [picture, setPicture] = useState([])
    const [registerStatus, setRegisterStatus] = useState(DEFAULT);
    const [nameValid, setNameValid] = useState(DEFAULT);
    const [descriptionValid, setDescriptionValid] = useState(DEFAULT);
    const [phoneNumberValid, setPhoneNumberValid] = useState(DEFAULT);
    const [addressValid, setAddressValid] = useState(DEFAULT);
    const [coordinateValid, setCoordinateValid] = useState(DEFAULT);
    const [currentPictureList, setCurrentPictureList] = useState([]);
    const [currentLicenseList, setCurrentLicenseList] = useState([]);

    const validator = {
        //Check unique name
        validateName: (value) => {
            if (value.length >= 1 && value.length <= 50) return true;
            else return false;
        },
        existingName: async () => {
            let value = document.getElementById("name-input").value
            if(value.length==0) return
            let response = await ShelterService.checkValidName(value)
            if(response.data.exist) {
                setNameValid(EXIST)
            }
            return
        },
        validateDescriptionAddress: (value) => {
            if (value.length >= 1 && value.length <= 500) return true;
            else return false;
        },
        validatePhoneNumber: (value) => {
            const REGEX = /^[0-9]+$/;
            if (value.length == 10 && REGEX.test(value)) return true;
            else return false;
        },
    };

    async function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                setCoordinateValid(VALID)
                setShelter({
                    ...shelter,
                    coordinate: {lat:position.coords.latitude,lng:position.coords.longitude}
                })
            });
        } else { 
          console.log("Geolocation is not supported by this browser.")
        }
    }

    // const fileToDataURL = (file) => {
    //     let reader = new FileReader();
    //     reader.onload = async (e) => {
    //         let buffer = reader.result
    //         setLicense(oldArray => [...oldArray, {name:file.name,img:buffer,contentType:file.type}])
    //         setLicenseValid(VALID) 
    //         console.log(file)
    //     }
    //     reader.readAsDataURL(file)
    // }

    async function handleFormChange(element) {
        switch (element.currentTarget.id){
            case "name-input":
                if(validator.validateName(element.currentTarget.value)){
                    setNameValid(VALID)
                }else{
                    setNameValid(INVALID)
                }
                return;
            case "description-input":
                if(validator.validateDescriptionAddress(element.currentTarget.value)){
                    setDescriptionValid(VALID)
                } else if(document.getElementById("description-input").value.length==0){
                    setDescriptionValid(DEFAULT)
                }else {
                    setDescriptionValid(INVALID)
                }
                return
            case "phone-input":
                if(validator.validatePhoneNumber(element.currentTarget.value)){
                    setPhoneNumberValid(VALID)
                } else if(document.getElementById("phone-input").value.length==0) {
                    setPhoneNumberValid(DEFAULT)
                } else {
                    setPhoneNumberValid(INVALID)
                }
                return
            case "address-input":
                if(validator.validateDescriptionAddress(element.currentTarget.value)){ 
                    setAddressValid(VALID)
                } else {
                    setAddressValid(INVALID)
                }
                return
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
              setPicture(oldArray => [...oldArray, {name:file.name,img:buffer,contentType:file.type}])
        }
    };

    const licenseOnChange = async ({ fileList: newFileList }) => {
        setCurrentLicenseList(newFileList);
        setLicense([])
        for (var f of newFileList){
            let file = f.originFileObj
            let buffer = await new Promise(resolve => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
              });
              setLicense(oldArray => [...oldArray, {name:file.name,img:buffer,contentType:file.type}])
        }
    };
    
    async function submitRegistration() {
        console.log(picture)
        console.log(license)
        //console.log(document.getElementById("picture-input").value)
        let shelterCoordinate = shelter.coordinate
        if(shelter.coordinate.lat===0 && shelter.coordinate.lng===0) {shelterCoordinate={lat:200,lng:200}}
        const body = {
            name: document.getElementById("name-input").value,
            description: document.getElementById("description-input").value,
            phoneNumber: document.getElementById("phone-input").value,
            address: document.getElementById("address-input").value,
            coordinate: shelterCoordinate,
            picture: picture,
            license: license,
            supported_type: [],
            rate: 0,
            nont_sitter_id: value._id
        }
        console.log(body.coordinate)
        try {
            const response = await ShelterService.registerShelter(body);
            setRegisterStatus(VALID);            
            notification.success({
                message: "Shelter",
                description: `Shelter successfully created.`,
                placement: "bottomRight",
            });
            console.log(response);
        } catch (error){
            setRegisterStatus(INVALID);
            notification.error({ 
                message: "Shelter",
                description: `Cannot create shelter profile.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }
    }

    return(
        <>
        {value.userType !== "Nont Sitter" && <h2>You are not logged in as Nont Sitter</h2>}
        {value.userType === "Nont Sitter" && 
        <div className="container">
            <h1 className="title my-5 text-center">Register Shelter</h1>
            <NameForm
                onFormChange={handleFormChange}
                defaultValue = ""
                validName={nameValid}
                validateName={validator.existingName}
            />
            <DescriptionForm
                onFormChange={handleFormChange}
                defaultValue = ""
                validDescription={descriptionValid}
            />
            <AddressForm
                    onFormChange={handleFormChange}
                    defaultValue = ""
                    validAddress={addressValid}
            />
            <div className="row">
                <PhoneNumberForm
                    onFormChange={handleFormChange}
                    defaultValue = ""
                    validPhoneNumber={phoneNumberValid}
                />
                <div className="col m-4">
                    <div className="mb-2" style={{color:"red"}}>
                            * Location is required based on your current location
                        </div>
                    <Popconfirm
                        placement="rightBottom"
                        title={<>
                                <p>Your current location is</p>
                                <p>{coordinateValid !== VALID?"waiting...":(shelter.coordinate.lat+", "+shelter.coordinate.lng)}</p>
                            </>}
                        okText="Ok"
                        cancelText="Cancel"
                    >
                        <a 
                            type="button" 
                            className="button-text btn btn-secondary" 
                            onClick={getLocation}
                        >   
                        <i className="fas fa-map-marker-alt" />
                        {" "}Location
                        </a> 
                    </Popconfirm>
                    {coordinateValid === VALID && <p style={{color:"gray"}}>Already got location!</p>}
                </div>
            </div>
            {/* <div className="row justify-content-end">
                <div className="col-12 col-sm-8 text-left">
                    <div style={{paddingLeft:"25px", color:"red"}}>
                        Overall pictures and licenses size must less than 3MB (image files only)
                    </div>
                </div>
            </div> */}
            <PictureForm
                onFormChange={pictureOnChange}
                listFile={currentPictureList}
                onPreview={onPreview}
            />
            <LicenseForm
                onFormChange={licenseOnChange}
                listFile={currentLicenseList}
                onPreview={onPreview}
            />
            <div className="p-3" style={{ textAlign: "center"}}>
                <button
                type="button"
                className="button-text btn btn-primary"
                onClick={submitRegistration}
                >
                Register
                </button>
            </div>
        </div>
        }
        {registerStatus === VALID &&
            <div className="emphasis m-3" style={{ textAlign: "center" }}>
                <label>
                    Your shelter is successfully registered.
                </label>
            </div>
        }
        {registerStatus === INVALID &&
            <div className="emphasis m-3" style={{ textAlign: "center" }}>
                <label>
                    Cannot register. Please check your input.
                </label>
            </div>
        }
        </>
    )
}

export default ShelterRegistration