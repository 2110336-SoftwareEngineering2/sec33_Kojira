import React, { useContext, useEffect, useRef, useState} from "react";
import RoomService from "../../Services/RoomService";
import { useParams } from "react-router-dom";
import {
    VALID,
    INVALID,
    DEFAULT,
} from "../../Constants/FormValidity";

const RoomUpdate = (props) => {
    const { roomID } = useParams();

    const [room, setRoom] = useState({
        name: "",
        nont_type: "",
        amount: 0,
        price: 0,
    });

    const [updateStatus, setUpdateStatus] = useState(DEFAULT);
    const [nameValid, setNameValid] = useState(VALID);
    const [nontTypeValid, setNontTypeValid] = useState(VALID);
    const [amountValid, setAmountValid] = useState(VALID);
    const [priceValid, setPriceValid] = useState(VALID);

    useEffect(() => {
        async function fetchRoomOldData() {
            try {
                const response = await RoomService.getRoomByID(roomID);
                if (response.data) {
                    setRoom({
                        name:response.data.name,
                        nont_type:response.data.nont_type,
                        amount:response.data.amount,
                        price:response.data.price,
                    });
                }
            }
            catch (error) {
                console.error(error.message);
            }
        }
        fetchRoomOldData();
    }, []);

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

    async function handleFormChange(element) {
        
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
                if (validator.validatePrice(parseInt(element.currentTarget.value))){
                     setPriceValid(VALID);
                }
                else
                    setPriceValid(INVALID);
                return;
            case "nont-type-dropdown":
                setNontTypeValid(VALID);
                return;
        }
    }

    async function submitUpdate() {
        const body = {
            name: document.getElementById("name-input").value,
            nont_type: document.getElementById("nont-type-dropdown").value,
            amount: parseInt(document.getElementById("amount-input").value),
            price: parseInt(document.getElementById("price-input").value),
        };
        if (nameValid !== VALID ||
            nontTypeValid !== VALID ||
            amountValid !== VALID ||
            priceValid !== VALID) {
            setUpdateStatus(INVALID);
        }
        else {
            try {
                const response = await RoomService.updateRoom(roomID, body);
                setUpdateStatus(VALID);
            } catch (error) {
                setUpdateStatus(INVALID);
                console.error(error.message);
            }
        }
    }

    return (
        <div className="container">

            {/* Header */}
            <h1 className="my-5 text-center">Update Room</h1>
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
                        onChange={handleFormChange, (e)=>{setRoom({
                            ...room,
                            name: e.target.value,
                        })}}
                        value={room.name}
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
                        onChange={handleFormChange, (e)=>{setRoom({
                            ...room,
                            nont_type: e.target.value,
                        })}}
                        value={room.nont_type}
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
                    <input type="number"
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
                        onChange={handleFormChange, (e)=>{setRoom({
                            ...room,
                            amount: e.target.value,
                        })}}
                        value={room.amount}
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
                    <input type="number"
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
                        onChange={handleFormChange, (e)=>{setRoom({
                            ...room,
                            price: e.target.value,
                        })}}
                        value={room.price}
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
                    onClick={submitUpdate}
                >
                    Update
                    </button>
            </div>
            
            {/* status */}
            {updateStatus === VALID &&
                <div className="m-5" style={{ textAlign: "center" }}>
                    <label>
                        Your room is successfully updated.
                    </label>
                </div>
            }
            {updateStatus === INVALID &&
                <div className="m-5" style={{ textAlign: "center" }}>
                    <label>
                        Cannot update. Please check your input.
                    </label>
                </div>
            }
        </div>
    );
}

export default RoomUpdate;