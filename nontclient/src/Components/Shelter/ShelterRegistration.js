import React, { Component } from "react";
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

let file = {name:"",img:[]};
//optional can be empty
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

class ShelterRegistration extends Component {
    constructor(props){
        super(props)
        this.state = {
            shelter: {
                name: "",
                description: "",
                phoneNumber: "",
                address: "",
                coordinate: {lat:0,lng:0},
                license: {name:"",img:[]}
            },
            register_status: DEFAULT,
            valid:{
                name: DEFAULT,
                description: DEFAULT,
                phoneNumber: DEFAULT,
                address: DEFAULT,
                coordinate: DEFAULT
            },
        };
    }

    validateAll = async () => {

    }

    getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                this.setState({shelter:{
                    ...this.state.shelter,
                    coordinate: {lat:position.coords.latitude,lng:position.coords.longitude}
                }})
            });
        } else { 
          console.log("Geolocation is not supported by this browser.")
        }
    }

    handleFormChange = async (element) => {
        switch (element.currentTarget.id){
            case "name-input":
                if(validator.validateName(element.currentTarget.value)){
                    this.setState({valid:{
                        ...this.state.valid,
                        name: VALID
                    }})
                } else {
                    this.setState({valid:{
                        ...this.state.valid,
                        name: INVALID
                    }})
                }
                return;
            case "description-input":
                if(validator.validateDescriptionAddress(element.currentTarget.value)){
                    this.setState({valid:{
                        ...this.state.valid,
                        description: VALID
                    }})
                } else {
                    this.setState({valid:{
                        ...this.state.valid,
                        description: INVALID
                    }})
                }
                return
            case "phone-input":
                if(validator.validatePhoneNumber(element.currentTarget.value)){
                    this.setState({valid:{
                        ...this.state.valid,
                        phoneNumber: VALID
                    }})
                } else {
                    this.setState({valid:{
                        ...this.state.valid,
                        phoneNumber: INVALID
                    }})
                }
                return
            case "address-input":
                if(validator.validateDescriptionAddress(element.currentTarget.value)){
                    this.setState({valid:{
                        ...this.state.valid,
                        address: VALID
                    }})
                } else {
                    this.setState({valid:{
                        ...this.state.valid,
                        address: INVALID
                    }})
                }
                return
            case "license-input":
                file.name = element.currentTarget.files[0].name
                const reader = new FileReader();
                reader.onload = function(){
                    let dataBuffer = reader.result;
                    file.img = dataBuffer
                    console.log(file.img)
                    console.log(file.name)
                };
                reader.readAsDataURL(element.currentTarget.files[0]);
                console.log(element.currentTarget.files[0])
                return
        }
    }
    
    submitRegistration = async () => {
        //const validate = this.validateAll
        //if(!validator) return
        const body = {
            name: document.getElementById("name-input").value,
            description: document.getElementById("description-input").value,
            phoneNumber: document.getElementById("phone-input").value,
            address: document.getElementById("address-input").value,
            coordinate: this.state.shelter.coordinate,
            picture: [],
            license: [],
            supported_type: ["cat"],
            rate: 3
        }
        try {
            const response = await ShelterService.registerShelter(body);
            this.setState({
                register_status: VALID
            });
            console.log(response);
        } catch (error){
            this.setState({
                register_status: INVALID
            });
            console.error(error.message);
        }
    }

    render(){
        return(
            <div className="container">
                <h1 className="my-5 text-center">Register Shelter</h1>
                <NameForm
                    onFormChange={this.handleFormChange}
                    validName={this.state.valid.name}
                />
                <DescriptionForm
                    onFormChange={this.handleFormChange}
                    validDescription={this.state.valid.description}
                />
                <div className="row">
                    <PhoneNumberForm
                        onFormChange={this.handleFormChange}
                        validPhoneNumber={this.state.valid.phoneNumber}
                    />
                    <LicenseForm
                        onFormChange={this.handleFormChange}
                    />
                </div>
                <AddressForm
                        onFormChange={this.handleFormChange}
                        validAddress={this.state.valid.address}
                />
                <div className="row">
                    <div className="col m-4">
                        <button type="button" 
                            className="btn btn-secondary" 
                            onClick={this.getLocation}
                        >
                        Location
                        </button>
                    </div>
                </div>
                <div className="m-5" style={{ textAlign: "center" }}>
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.submitRegistration}
                    >
                    Register
                    </button>
                </div>
            </div>
        )
    }
}

export default ShelterRegistration

