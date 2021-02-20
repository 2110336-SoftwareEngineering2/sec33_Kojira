import React, { useContext, useState, Component } from "react";
import ShelterService from "../../Services/ShelterService";
import {
    VALID,
    INVALID,
    DEFAULT,
} from "../../Constants/FormValidity";
import NameForm from "./NameForm";
import DescriptionForm from "./DescriptionForm";
import PhoneNumberForm from "./PhoneNumberForm";
import LicenseForm from "./LicenseForm";
import AddressForm from "./AddressForm";
import PictureForm from "./PictureForm";
import Contexts from "../../Utils/Context/Contexts";

const UserContext = Contexts.UserContext;

//let file = {name:"",img:[]};
//optional can be empty
const ShelterRegistration  = (props) => {
    const [shelter, setShelter] = useState({
        name: "",
        description: "",
        phoneNumber: "",
        address: "",
        coordinate: {lat:0,lng:0},
        license: {name:"",img:[]},
        picture: {name:"",img:[]},
    })

    const value = useContext(UserContext);
    
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

    async function validateAll() {

    }

    async function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
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
                // file.name = element.currentTarget.files[0].name
                // const reader = new FileReader();
                // reader.onload = function(){
                //     let dataBuffer = reader.result;
                //     file.img = dataBuffer
                //     console.log(file.img)
                //     console.log(file.name)
                // };
                // reader.readAsDataURL(element.currentTarget.files[0]);
                // console.log(element.currentTarget.files[0])
                return
            case "picture-input":
                return
        }
    }
    
    async function submitRegistration() {
        //const validate = this.validateAll
        //if(!validator) return
        console.log(UserContext)
        const body = {
            name: document.getElementById("name-input").value,
            description: document.getElementById("description-input").value,
            phoneNumber: document.getElementById("phone-input").value,
            address: document.getElementById("address-input").value,
            coordinate: shelter.coordinate,
            picture: [],
            license: [],
            supported_type: ["cat"],
            rate: 3,
            nont_sitter_id: value._id
        }
        try {
            const response = await ShelterService.registerShelter(body);
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
            <h1 className="my-5 text-center">Register Shelter</h1>
            <NameForm
                onFormChange={handleFormChange}
                validName={nameValid}
            />
            <DescriptionForm
                onFormChange={handleFormChange}
                validDescription={descriptionValid}
            />
            <div className="row">
                <PhoneNumberForm
                    onFormChange={handleFormChange}
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
                    validAddress={addressValid}
            />
            <div className="row">
                <div className="col m-4">
                    <button type="button" 
                        className="btn btn-secondary" 
                        onClick={getLocation}
                    >
                    Location
                    </button>
                </div>
            </div>
            <div className="m-5" style={{ textAlign: "center" }}>
                <button
                type="button"
                className="btn btn-primary"
                onClick={submitRegistration}
                >
                Register
                </button>
            </div>
        </div>
        }
        </>
    )
}

export default ShelterRegistration

