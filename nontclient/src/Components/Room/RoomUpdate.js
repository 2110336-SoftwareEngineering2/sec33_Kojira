import React, { useContext, useEffect, useRef, useState} from "react";
import {notification,} from "antd";
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

    const [nameValid, setNameValid] = useState(DEFAULT);
    const [nontTypeValid, setNontTypeValid] = useState(DEFAULT);
    const [amountValid, setAmountValid] = useState(DEFAULT);
    const [priceValid, setPriceValid] = useState(DEFAULT);

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
        if (nameValid !== INVALID && nontTypeValid !== INVALID && amountValid !== INVALID && priceValid !== INVALID) {
            try {
                const response = await RoomService.updateRoom(roomID, body);
                notification.success({
                    message: "Room",
                    description: `Room successfully updated.`,
                    placement: "bottomRight",
                });
            } catch (error) {
                notification.error({ 
                    message: "Shelter",
                    description: `Cannot update room profile.`,
                    placement: "bottomRight",
                });
                console.error(error.message);
            }
        }
    }

    return (
        <div className="container">

            {/* Header */}
            <h1 className="text-center title">Update Room</h1>
            <div className="row">

                {/* Name Form */}
                <div className="col m-2">
                    <label htmlFor="name-input" className="form-label emphasis">
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
                        onChange={(e)=>{setRoom({
                            ...room,
                            name: e.target.value,
                        })
                        handleFormChange(e);
                        }}
                        value={room.name}
                        required />
                    <div id="name-desc" className="form-text" style={{opacity:"50%"}}>
                        Room's name must not longer than 50 characters.
                        </div>
                </div>
            </div>

            <div className="row">

                {/* Nont Type drop down */}
                <div className="col m-2 + col-sm">
                    <label className="emphasis">
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
                        onChange={(e)=>{setRoom({
                            ...room,
                            nont_type: e.target.value,
                        })
                        handleFormChange(e);
                        }}
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
                    <label className="emphasis">
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
                        onChange={(e)=>{setRoom({
                            ...room,
                            amount: e.target.value,
                        })
                        handleFormChange(e);
                        }}
                        value={room.amount}
                        required />
                    <div id="amount-desc" className="form-text" style={{opacity:"50%"}}>
                        Amount must be within 1-20.
                        </div>
                </div>

                {/* Price form */}
                <div className="col m-2 + col-sm">
                    <label className="emphasis">
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
                        onChange={(e)=>{setRoom({
                            ...room,
                            price: e.target.value,
                        })
                        handleFormChange(e);
                        }}
                        value={room.price}
                        required />
                    <div id="price-desc" className="form-text" style={{opacity:"50%"}}>
                        Price must be within 1-3000.
                        </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-3" style={{ textAlign: "center" }}>
                <button
                    type="button"
                    className="btn btn-primary button-text"
                    onClick={submitUpdate}
                >
                    Update
                    </button>
            </div>
        </div>
    );
}

export default RoomUpdate;