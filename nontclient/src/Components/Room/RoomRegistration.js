import React, { useContext, useState } from "react";
import RoomService from "../../Services/RoomService";
import {
    VALID,
    INVALID,
    DEFAULT,
} from "../../Constants/FormValidity";
import { useParams } from "react-router-dom";
import nontTypes from "../../Constants/nontTypes";

const RoomRegistration = (props) => {
    const [room, setRoom] = useState({
        name: "",
        nont_type: "",
        amount: 0,
        price: 0,
    });
    const {shelterID} = useParams();

    const [registerStatus, setRegisterStatus] = useState(DEFAULT);
    const [nameValid, setNameValid] = useState(DEFAULT);
    const [nontTypeValid, setNontTypeValid] = useState(DEFAULT);
    const [amountValid, setAmountValid] = useState(DEFAULT);
    const [priceValid, setPriceValid] = useState(DEFAULT);

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
    }

    async function handleFormChange (element) {
        switch (element.currentTarget.id) {
            case "name-input":
                if (validator.validateName(element.currentTarget.value)) 
                    setNameValid(VALID);
                else
                    setNameValid(INVALID);                    
                return;
            case "amount-input":
                if (validator.validateAmount(parseInt(element.currentTarget.value)))
                    setAmountValid(VALID);
                else                     
                    setAmountValid(INVALID);
                return;
            case "price-input":
                if (validator.validatePrice(parseInt(element.currentTarget.value)))
                    setPriceValid(VALID);
                else
                    setPriceValid(INVALID);
                return;
            case "nont-type-dropdown":
                setNontTypeValid(VALID);
                return;
        }
    }

    async function submitRegistration () {
        const body = {
            name: document.getElementById("name-input").value,
            nont_type: document.getElementById("nont-type-dropdown").value,
            amount: parseInt(document.getElementById("amount-input").value),
            price: parseInt(document.getElementById("price-input").value),
            shelter_id:shelterID,
        };
        try {
            const response = await RoomService.registerRoom(body);
            setRegisterStatus(VALID);
            console.log(response);
        } catch (error) {
            setRegisterStatus(INVALID);
            console.error(error.message);
        }
    }

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
                            nameValid === DEFAULT
                                ? ""
                                : nameValid === VALID
                                    ? "is-valid"
                                    : "is-invalid"
                        )}
                        id="name-input"
                        name="name"
                        aria-describedby="name-desc"
                        onChange={handleFormChange}
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
                            nontTypeValid === DEFAULT
                                ? ""
                                : nontTypeValid === VALID
                                    ? "is-valid"
                                    : "is-invalid"
                        )}
                        onChange={handleFormChange}
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
                            amountValid === DEFAULT
                                ? ""
                                : amountValid === VALID
                                    ? "is-valid"
                                    : "is-invalid"
                        )}
                        id="amount-input"
                        name="amount"
                        aria-describedby="amount-desc"
                        onChange={handleFormChange}
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
                            priceValid === DEFAULT
                                ? ""
                                : priceValid === VALID
                                    ? "is-valid"
                                    : "is-invalid"
                        )}
                        id="price-input"
                        name="price"
                        aria-describedby="price-desc"
                        onChange={handleFormChange}
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
                    onClick={submitRegistration}
                >
                    Register
                    </button>
            </div>
            {registerStatus === VALID &&
                <div className="m-5" style={{ textAlign: "center" }}>
                    <label>
                        Your room is successfully registered.
                    </label>
                </div>
            }
            {registerStatus === INVALID &&
                <div className="m-5" style={{ textAlign: "center" }}>
                    <label>
                        Cannot register. Please check your input.
                    </label>
                </div>
            }
        </div>
    );
}

export default RoomRegistration;