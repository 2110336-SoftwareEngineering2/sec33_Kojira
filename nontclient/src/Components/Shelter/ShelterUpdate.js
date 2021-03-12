import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import UserType from "../../Constants/UserType";
import {
    VALID,
    INVALID,
    DEFAULT,
} from "../../Constants/FormValidity";
import NameForm from "./ShelterForm/NameForm";
import DescriptionForm from "./ShelterForm/DescriptionForm";
import PhoneNumberForm from "./ShelterForm/PhoneNumberForm";
import LicenseForm from "./ShelterForm/LicenseForm";
import AddressForm from "./ShelterForm/AddressForm";
import PictureForm from "./ShelterForm/PictureForm";


const UserContext = Contexts.UserContext;
const reader = new FileReader();

const ShelterUpdate = (props) => {
    const contextValue = useContext(UserContext);
    const [shelter, setShelter] = useState([]);
    const [rooms, setRooms] = useState([]);
    const {shelterID} = useParams();
    console.log(shelter?.coordinate?.lat)
    console.log(shelter?.coordinate?.lng)
    useEffect( () => {
        async function fetchShelter() {
            try {
                if (shelterID){
                    const response = await ShelterService.getShelterByID(shelterID); 
                    if (response.data) {
                        setShelter(response.data);
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

    const validator = {
        //Check unique name
        validateName: (value) => {
            if (value.length >= 1 && value.length <= 50) return true;
            else return false;
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
                } else {
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
            case "license-input":
                //console.log(element.currentTarget.files)
                let file = element.currentTarget.files[0]
                reader.onload = async (e) => {
                    let buffer = reader.result
                    //let binaryString = new Buffer(buffer.split(",")[1],"base64");
                    setLicense(oldArray => [...oldArray, {name:file.name,img:buffer,contentType:file.type}])
                    //console.log(typeof arrayBuffer)
                    setLicenseValid(VALID) 
                }
                reader.readAsDataURL(element.currentTarget.files[0])
                return
            case "picture-input":
                let file2 = element.currentTarget.files[0]
                reader.onload = async (e) => {
                    let buffer2 = reader.result
                    setPicture(oldArray => [...oldArray, {name:file2.name,img:buffer2,contentType:file2.type}])
                    setPictureValid(VALID) 
                }
                reader.readAsDataURL(element.currentTarget.files[0])
                return
        }
    }
    
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
            rate: 3,
            nont_sitter_id: value._id
            }
        if (pictureValid){body.picture = picture}
        if (licenseValid){body.license = license}
        console.log(shelterID)
        console.log(body.coordinate)
        console.log(document.getElementById("name-input").value)
        console.log(document.getElementById("description-input").value)
        console.log(document.getElementById("phone-input").value,)
        console.log(document.getElementById("address-input").value)
        try {
           const response = await ShelterService.updateShelter(body); // change this for update not registeration
           setRegisterStatus(VALID)
           console.log(response);
        } catch (error){
            setRegisterStatus(INVALID)
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
            />
            <DescriptionForm
                onFormChange={handleFormChange}
                defaultValue = {shelter.description}
                validDescription={descriptionValid}
            />
            <div className="row">
                <PhoneNumberForm
                    onFormChange={handleFormChange}
                    defaultValue = {shelter.phoneNumber}
                    validPhoneNumber={phoneNumberValid}
                />
                <LicenseForm
                    onFormChange={handleFormChange}
                />
                <PictureForm
                        onFormChange={handleFormChange}
                    />
            </div>
            <AddressForm
                    onFormChange={handleFormChange}
                    defaultValue = {shelter.address}
                    validAddress={addressValid}
            />
            <div className="row">
                <div className="col m-4">
                    <a 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={getLocation}
                    >
                    <i className="fas fa-map-marker-alt" />
                    {" "}Location
                    </a>
                    {coordinateValid === VALID && <p>{shelter.coordinate.lat}, {shelter.coordinate.lng}</p>}
                </div>
            </div>
            <div className="m" style={{ textAlign: "center", paddingBottom: 10 }}>
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