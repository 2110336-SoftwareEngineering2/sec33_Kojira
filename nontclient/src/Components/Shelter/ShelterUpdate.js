import React, { useContext, useState, useEffect } from "react";
import {notification,} from "antd";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import UserType from "../../Constants/UserType";
import {
    VALID,
    INVALID,
    DEFAULT,
    EXIST
} from "../../Constants/FormValidity";
import NameForm from "./ShelterForm/NameForm";
import DescriptionForm from "./ShelterForm/DescriptionForm";
import PhoneNumberForm from "./ShelterForm/PhoneNumberForm";
import LicenseForm from "./ShelterForm/LicenseForm";
import AddressForm from "./ShelterForm/AddressForm";
import PictureForm from "./ShelterForm/PictureForm";
import { Popconfirm } from "antd";

const UserContext = Contexts.UserContext;
const reader = new FileReader();

const ShelterUpdate = (props) => {
    const contextValue = useContext(UserContext);
    const [shelter, setShelter] = useState([]);
    const [rooms, setRooms] = useState([]);
    const {shelterID} = useParams();
    useEffect( () => {
        async function fetchShelter() {
            try {
                if (shelterID){
                    console.log('a')
                    const response = await ShelterService.getShelterByID(shelterID); 
                    if (response.data) {
                        setShelter(response.data);
                        setCurrentPictureList([])
                        setCurrentLicenseList([])
                        for(var p of response.data.picture){
                            let x = Buffer.from(p.img.data).toString()
                            setCurrentPictureList(oldArray => [...oldArray, {name:p.name,url:x,type:p.contentType,status:'done'}])
                        }
                        for(var l of response.data.license){
                            let y = Buffer.from(l.img.data).toString()
                            setCurrentLicenseList(oldArray => [...oldArray, {name:p.name,url:y,type:p.contentType,status:'done'}])
                        }
                    }
                } 
            }
            catch (error) {
                console.error(error.message);
            }
        }     
        fetchShelter();   
    }, [shelterID]);
    
    const value = useContext(UserContext);
    const previousName = shelter.name;
    
    const [license, setLicense] = useState([])
    const [picture, setPicture] = useState([])
    const [registerStatus, setRegisterStatus] = useState(DEFAULT);
    const [nameValid, setNameValid] = useState(DEFAULT);
    const [descriptionValid, setDescriptionValid] = useState(DEFAULT);
    const [phoneNumberValid, setPhoneNumberValid] = useState(DEFAULT);
    const [addressValid, setAddressValid] = useState(DEFAULT);
    const [coordinateValid, setCoordinateValid] = useState(DEFAULT);
    const [licenseValid, setLicenseValid] = useState(DEFAULT);
    const [pictureValid, setPictureValid] = useState(DEFAULT);
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
            if(response.data.exist && value!=previousName) {
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

    // async function validateAll() {
    //
    // }

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

    async function handleFormChange(element) {
        switch (element.currentTarget.id){
            case "name-input":
                if(validator.validateName(element.currentTarget.value)){
                    setNameValid(VALID)
                } else {
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
            let file = f.originFileObj?f.originFileObj:f
            if(f.originFileObj){
                let buffer = await new Promise(resolve => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                });
                setPicture(oldArray => [...oldArray, {name:file.name,img:buffer,contentType:file.type}])
            } else {
                setPicture(oldArray => [...oldArray, {name:file.name,img:file.url,contentType:file.type}])
            }      
        }
    };

    const licenseOnChange = async ({ fileList: newFileList }) => {
        setCurrentLicenseList(newFileList);
        setLicense([])
        for (var f of newFileList){
            let file = f.originFileObj?f.originFileObj:f
            if(f.originFileObj){
                let buffer = await new Promise(resolve => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                });
                setLicense(oldArray => [...oldArray, {name:file.name,img:buffer,contentType:file.type}])
            } else {
                setLicense(oldArray => [...oldArray, {name:file.name,img:file.url,contentType:file.type}])
            }      
        }
    };

    async function submitUpdate() {
        //const validate = this.validateAll
        //if(!validator) return
        let shelterCoordinate = shelter.coordinate
        if(shelter.coordinate.lat===0 && shelter.coordinate.lng===0) {shelterCoordinate={lat:200,lng:200}}
        const body = {
            _id : shelterID,
            name: document.getElementById("name-input").value,
            description: document.getElementById("description-input").value,
            phoneNumber: document.getElementById("phone-input").value,
            address: document.getElementById("address-input").value,
            picture:shelter.picture,
            license:shelter.license,
            rate: shelter.rate,
            nont_sitter_id: value._id
            }
        if (picture.length>0){body.picture = picture}
        if (license.length>0){body.license = license}
        // console.log(shelterID)
        // console.log(body.coordinate)
        // console.log(document.getElementById("name-input").value)
        // console.log(document.getElementById("description-input").value)
        // console.log(document.getElementById("phone-input").value,)
        // console.log(document.getElementById("address-input").value)
        try {
           const response = await ShelterService.updateShelter(body); // change this for update not registeration
           setRegisterStatus(VALID);
           notification.success({
            message: "Shelter",
            description: `Shelter successfully updated.`,
            placement: "bottomRight",
            });
        //    console.log(response);
        } catch (error){
            setRegisterStatus(INVALID);
            notification.error({ 
                message: "Shelter",
                description: `Cannot update shelter profile.`,
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
            <h1 className="my-5 text-center">Update Shelter</h1>
            <NameForm
                onFormChange={handleFormChange}
                defaultValue = {shelter.name}
                validName={nameValid}
                validateName={validator.existingName}
            />
            <DescriptionForm
                onFormChange={handleFormChange}
                defaultValue = {shelter.description}
                validDescription={descriptionValid}
            />
            <AddressForm
                onFormChange={handleFormChange}
                defaultValue = {shelter.address}
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
                            className="btn btn-secondary" 
                            onClick={getLocation}
                        >   
                        <i className="fas fa-map-marker-alt" />
                        {" "}Location
                        </a> 
                    </Popconfirm>
                    {coordinateValid === VALID && <p>Already got location!</p>}
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
            <div className="p-3" style={{ textAlign: "center" }}>
                <button
                type="button"
                className="btn btn-primary"
                onClick={submitUpdate}
                >
                Update
                </button>
            </div>
        </div>
        }
        {registerStatus === VALID &&
                <div className="m-3" style={{ textAlign: "center" }}>
                    <label>
                        Your shelter is successfully updated.
                    </label>
                </div>
            }
        {registerStatus === INVALID &&
            <div className="m-3" style={{ textAlign: "center" }}>
                <label>
                    Cannot update. Please check your input
                </label>
            </div>
        }
        </>
    )
}
export default ShelterUpdate;