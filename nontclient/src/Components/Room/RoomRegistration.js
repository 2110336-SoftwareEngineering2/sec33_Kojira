import React, { Component } from "react";
import RoomService from "../../Services/RoomService";
import {
    VALID,
    INVALID,
    DEFAULT,
} from "../../Constants/FormValidity";

const nontTypes = [
    { label: "Large Dog", value: "large dog" },
    { label: "Medium Dog", value: "medium dog" },
    { label: "Small Dog", value: "small dog" },
    { label: "Cat", value: "cat" },
    { label: "Hamster", value: "hamster" },
    { label: "Rabbit", value: "rabbit" },
    { label: "Bird", value: "bird" },
]

const validator = {
    validateName: (value) => {
        if (value.length >= 1 && value.length <= 50) return true;
        else return false;
    },
    validateAmount: (value) => {
        if (value >= 1 && value <= 20) return true;
        else return false;
    },
    validatePrice: (value) => {
        if (value >= 1 && value <= 3000) return true;
        else return false;
    },
};

class RoomRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {
                name: "",
                nont_type: "",
                amount: 0,
                price: 0,
            },
            register_status: DEFAULT,
            valid:{
                name: DEFAULT,
                nont_type: DEFAULT,
                amount: DEFAULT,
                price: DEFAULT,
            },
        };
    }

    handleFormChange = async (element) => {
        switch (element.currentTarget.id){
            case "name-input":
                if(validator.validateName(element.currentTarget.value)) this.setState({
                    valid:{
                        ...this.state.valid,
                        name: VALID,
                    }
                });
                else this.setState({
                    valid:{
                        ...this.state.valid,
                        name: INVALID,
                    }
                });
                return;
            case "amount-input":
                if(validator.validateAmount(parseInt(element.currentTarget.value))) this.setState({
                    valid:{
                        ...this.state.valid,
                        amount: VALID,
                    }
                });
                else this.setState({
                    valid:{
                        ...this.state.valid,
                        amount: INVALID,
                    }
                });
                return;
            case "price-input":
                if(validator.validatePrice(parseInt(element.currentTarget.value))) this.setState({
                    valid:{
                        ...this.state.valid,
                        price: VALID,
                    }
                });
                else this.setState({
                    valid:{
                        ...this.state.valid,
                        price: INVALID,
                    }
                });
                return;
            case "nont-type-dropdown":
                this.setState({
                    valid:{
                        ...this.state.valid,
                        nont_type: VALID,
                    }
                });
                return;
        }
    }  

    submitRegistration = async () => {
        const body = {
            name: document.getElementById("name-input").value,
            nont_type: document.getElementById("nont-type-dropdown").value,
            amount: parseInt(document.getElementById("amount-input").value),
            price: parseInt(document.getElementById("price-input").value),
        };        
        try {
            const response = await RoomService.registerRoom(body);
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

    render() {
        return (
            <div className="container">

                {/* Header */}
                <h1 className="my-5 text-center">Register Room</h1>
                <div className="row">

                    {/* Name Form */}
                    <div className="col m-2">
                        <label htmlFor="name-input" className="form-label">
                            Name{" "}
                            <abbr className="required" title="required">
                                *
                            </abbr>
                        </label>
                        <input type="text"
                            className={"form-control ".concat(
                                this.state.valid.name === DEFAULT
                                ? ""
                                : this.state.valid.name === VALID
                                ? "is-valid"
                                : "is-invalid"
                            )}
                            id="name-input"
                            name="name"
                            aria-describedby="name-desc"
                            onChange={this.handleFormChange}
                            required />
                        <div id="name-desc" className="form-text">
                            Room's name must not longer than 50 characters.
                        </div>
                    </div>
                </div>

                <div className="row">

                    {/* Nont Type drop down */}
                    <div className="col m-2 + col-sm">
                        <label>
                            Nont Type{" "}
                            <abbr className="required" title="required">
                                *
                            </abbr>
                        </label>
                        <select 
                        id="nont-type-dropdown"
                        name="nont-type" 
                        className={"form-control ".concat(
                            this.state.valid.nont_type === DEFAULT
                            ? ""
                            : this.state.valid.nont_type === VALID
                            ? "is-valid"
                            : "is-invalid"
                        )}
                        onChange={this.handleFormChange}
                        defaultValue={"default"}
                        >
                            <option hidden disabled value="default">Select Nont Type</option>
                            <option value="large dog">Large Dog</option>
                            <option value="medium dog">Medium Dog</option>
                            <option value="small dog">Small Dog</option>
                            <option value="cat">Cat</option>
                            <option value="hamster">Hamster</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="bird">Bird</option>
                        </select>
                    </div>

                    {/* Amount form */}
                    <div className="col m-2 + col-sm">
                        <label>
                            Amount{" "}
                            <abbr className="required" title="required">
                                *
                            </abbr>
                        </label>
                        <input type="text"
                            className={"form-control ".concat(
                                this.state.valid.amount === DEFAULT
                                ? ""
                                : this.state.valid.amount === VALID
                                ? "is-valid"
                                : "is-invalid"
                            )}
                            id="amount-input"
                            name="amount"
                            aria-describedby="amount-desc"
                            onChange={this.handleFormChange}
                            required />
                        <div id="amount-desc" className="form-text">
                            Amount must be within 1-20.
                        </div>
                    </div>

                    {/* Price form */}
                    <div className="col m-2 + col-sm">
                        <label>
                            Price{" "}
                            <abbr className="required" title="required">
                                *
                            </abbr>
                        </label>
                        <input type="text"
                            className={"form-control ".concat(
                                this.state.valid.price === DEFAULT
                                ? ""
                                : this.state.valid.price === VALID
                                ? "is-valid"
                                : "is-invalid"
                            )}
                            id="price-input"
                            name="price"
                            aria-describedby="price-desc"
                            onChange={this.handleFormChange}
                            required />
                        <div id="price-desc" className="form-text">
                            Price must be within 1-3000.
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="m-5" style={{ textAlign: "center" }}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.submitRegistration}
                    >
                        Register
                    </button>
                </div>
                {this.state.register_status === VALID &&
                <div className="m-5" style={{textAlign: "center"}}>
                    <label>
                        Your room is successfully registered.
                    </label>
                </div>
                }
                {this.state.register_status === INVALID &&
                <div className="m-5" style={{textAlign: "center"}}>
                    <label>
                        Cannot register. Please check your input.
                    </label>
                </div>
                }
            </div>
        );
    }
}

export default RoomRegistration;