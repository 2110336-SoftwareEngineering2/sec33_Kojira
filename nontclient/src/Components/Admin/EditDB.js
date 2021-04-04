import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { useParams } from "react-router-dom";
//import { Popconfirm } from "antd";
import Loading from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";
import AdminService from "../../Services/AdminService";
import { Modal } from "react-bootstrap";


const EditDB = (props) => {
    const { dbname, id } = useParams();
    const [data, setData] = useState({});
    const [fetchDataStatus, setFetchDataStatus] = useState(LoadStatus.LOADING);
    //const [banAttribute, setBanAttribute] = useState(["picture", "password"]);
    const [showModal, setShowModal] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let fetchFunction;
            switch (dbname) {
                case "nontOwners":
                    fetchFunction = AdminService.getNontOwnerByID;
                    break;
                case "nontSitters":
                    fetchFunction = AdminService.getNontSitterByID;
                    break;
                case "nonts":
                    fetchFunction = AdminService.getNontByID;
                    break;
                case "reservations":
                    fetchFunction = AdminService.getReservationByID;
                    break;
                case "reviews":
                    fetchFunction = AdminService.getReviewByID;
                    break;
                case "rooms":
                    fetchFunction = AdminService.getRoomByID;
                    break;
                case "shelters":
                    fetchFunction = AdminService.getShelterByID;
                    break;
            }
            try {
                const response = await fetchFunction(id);
                if (response.data) {
                    setData(response.data);
                    setFetchDataStatus(LoadStatus.SUCCESS);
                }
            }
            catch (error) {
                setFetchDataStatus(LoadStatus.FAIL);
                console.error(error.message);
            }
        }
        fetchData();
    }, [dbname, id]);

    const nontOwnerField = ["Email", "Name", "Phone Number", "Bank Account"];
    const nontSitterField = ["Email", "Name", "Phone Number", "Bank Account"];
    const nontField = ["Name", "Type", "Subtype", "Description", "Birthdate", "Nontowner ID", "Exist"];
    const reservationField = ["Nont ID", "Nontowner ID", "Room ID", "Shelter ID", "Nontsitter ID", "Start Date", "End Date", "Price", "Status", "Nontsitter Check In"
        , "Nontsitter Check Out", "Nontowner Check In", "Nontowner Check Out", "Reservation Time", "Payment Time", "Check In Time", "Check Out Time", "Reservation Cancel Time"];
    const reviewField = ["Nontowner ID", "Shelter ID", "Reservation ID", "Rate", "Comment"];
    const roomField = ["Name", "Nont Type", "Amount (capacity)", "Price (per day)", "Shelter ID", "Exist"];
    const shelterField = ["Name", "Description", "Address", "Rate", "Supported Nont Type", "Coordinate", "Phone Number", "Nontsitter ID", "Exist"];

    const updateDB = async (body, updateFunction) => {
        try {
            setShowModal(false);
            const response = await updateFunction(id, body);
            notification.success({
                message: "Document",
                description: `data successfully updated.`,
                placement: "bottomRight",
            });
            setUpdateSuccess(true);
            console.log(response);
        } catch (error) {
            notification.error({
                message: "Document",
                description: `Cannot update data.`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            console.log(error.message);
        }
    }

    let body, updateFunction;

    const updateNontOwner = () => {
        body = {
            email: document.getElementById("Email").value,
            name: document.getElementById("Name").value,
            phoneNumber: document.getElementById("Phone Number").value,
            bankAccount: document.getElementById("Bank Account").value
        };
        updateFunction = AdminService.updateNontOwner;
        console.log(body);
        updateDB(body, updateFunction);
    }

    const updateNontSitter = () => {
        body = {
            email: document.getElementById("Email").value,
            name: document.getElementById("Name").value,
            phoneNumber: document.getElementById("Phone Number").value,
            bankAccount: document.getElementById("Bank Account").value
        };
        updateFunction = AdminService.updateNontSitter;
        console.log(body);
        updateDB(body, updateFunction);
    }

    const updateNont = () => {
        body = {
            name: document.getElementById("Name").value,
            type: document.getElementById("Type").value,
            subtype: document.getElementById("Subtype").value,
            description: document.getElementById("Description").value,
            birth_date: document.getElementById("Birthdate").value,
            nontowner_id: document.getElementById("Nontowner ID").value,
            exist: document.getElementById("Exist").value
        };
        updateFunction = AdminService.updateNont;
        console.log(body);
        updateDB(body, updateFunction);
    }

    const updateReservation = () => {
        body = {
            nont_id: JSON.parse(document.getElementById("Nont ID").value),
            nontowner_id: document.getElementById("Nontowner ID").value,
            room_id: document.getElementById("Room ID").value,
            shelter_id: document.getElementById("Shelter ID").value,
            nontsitter_id: document.getElementById("Nontsitter ID").value,
            start_datetime: document.getElementById("Start Date").value,
            end_datetime: document.getElementById("End Date").value,
            price: Number(document.getElementById("Price").value),
            status: document.getElementById("Status").value,
            nontsitter_check_in: document.getElementById("Nontsitter Check In").value,
            nontsitter_check_out: document.getElementById("Nontsitter Check Out").value,
            nontowner_check_in: document.getElementById("Nontowner Check In").value,
            nontowner_check_out: document.getElementById("Nontowner Check Out").value,
            reserve_datetime: document.getElementById("Reservation Time").value,
            pay_datetime: document.getElementById("Payment Time").value,
            check_in_datetime: document.getElementById("Check In Time").value,
            check_out_datetime: document.getElementById("Check Out Time").value,
            cancel_datetime: document.getElementById("Reservation Cancel Time").value
        };
        updateFunction = AdminService.updateReservation;
        console.log(body);
        updateDB(body, updateFunction);
    }

    const updateReview = () => {
        body = {
            nontowner_id: document.getElementById("Nontowner ID").value,
            shelter_id: document.getElementById("Shelter ID").value,
            reservation_id: document.getElementById("Reservation ID").value,
            rate: Number(document.getElementById("Rate").value),
            comment: document.getElementById("Comment").value,
        };
        updateFunction = AdminService.updateReview;
        console.log(body);
        updateDB(body, updateFunction);
    }

    const updateRoom = () => {
        body = {
            name: document.getElementById("Name").value,
            nont_type: document.getElementById("Nont Type").value,
            amount: Number(document.getElementById("Amount (capacity)").value),
            price: Number(document.getElementById("Price (per day)").value),
            shelter_id: document.getElementById("Shelter ID").value,
            exist: document.getElementById("Exist").value
        };
        updateFunction = AdminService.updateRoom;
        console.log(body);
        updateDB(body, updateFunction);
    }

    const updateShelter = () => {
        body = {
            name: document.getElementById("Name").value,
            description: document.getElementById("Description").value,
            address: document.getElementById("Address").value,
            rate: Number(document.getElementById("Rate").value),
            supported_type: JSON.parse(document.getElementById("Supported Nont Type").value),
            coordinate: JSON.parse(document.getElementById("Coordinate").value),
            phoneNumber: document.getElementById("Phone Number").value,
            nont_sitter_id: document.getElementById("Nontsitter ID").value,
            exist: document.getElementById("Exist").value
        };
        updateFunction = AdminService.updateShelter;
        console.log(body);
        updateDB(body, updateFunction);
    }

    return (
        <div className="container">

            {/* Loading */}
            <Loading status={fetchDataStatus} />
            {/* Content */}

            {fetchDataStatus === LoadStatus.SUCCESS && (
                <div>
                    <div>
                        Edit the document of {dbname}
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        {data._id}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dbname === "nontOwners" &&
                                    nontOwnerField.map((element) => {
                                        let oldVal;
                                        switch (element) {
                                            case "Email":
                                                oldVal = data.email;
                                                break;
                                            case "Name":
                                                oldVal = data.name;
                                                break;
                                            case "Phone Number":
                                                oldVal = data.phoneNumber;
                                                break;
                                            case "Bank Account":
                                                oldVal = data.bankAccount;
                                                break;
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {element}
                                                </td>
                                                <td>
                                                    <input type="text" id={element} defaultValue={oldVal} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                {dbname === "nontSitters" &&
                                    nontSitterField.map((element) => {
                                        let oldVal;
                                        switch (element) {
                                            case "Email":
                                                oldVal = data.email;
                                                break;
                                            case "Name":
                                                oldVal = data.name;
                                                break;
                                            case "Phone Number":
                                                oldVal = data.phoneNumber;
                                                break;
                                            case "Bank Account":
                                                oldVal = data.bankAccount;
                                                break;
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {element}
                                                </td>
                                                <td>
                                                    <input type="text" id={element} defaultValue={oldVal} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                {dbname === "nonts" &&
                                    nontField.map((element) => {
                                        let oldVal;
                                        switch (element) {
                                            case "Name":
                                                oldVal = data.name;
                                                break;
                                            case "Type":
                                                oldVal = data.type;
                                                break;
                                            case "Subtype":
                                                oldVal = data.subtype;
                                                break;
                                            case "Description":
                                                oldVal = data.description;
                                                break;
                                            case "Birthdate":
                                                oldVal = data.birth_date;
                                                break;
                                            case "Nontowner ID":
                                                oldVal = data.nontowner_id;
                                                break;
                                            case "Exist":
                                                oldVal = data.exist;
                                                break;
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {element}
                                                </td>
                                                <td>
                                                    <input type="text" id={element} defaultValue={oldVal} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                {dbname === "reservations" &&
                                    reservationField.map((element) => {
                                        let oldVal;
                                        switch (element) {
                                            case "Nont ID":
                                                oldVal = JSON.stringify(data.nont_id);
                                                break;
                                            case "Nontowner ID":
                                                oldVal = data.nontowner_id;
                                                break;
                                            case "Room ID":
                                                oldVal = data.room_id;
                                                break;
                                            case "Shelter ID":
                                                oldVal = data.shelter_id;
                                                break;
                                            case "Nontsitter ID":
                                                oldVal = data.nontsitter_id;
                                                break;
                                            case "Start Date":
                                                oldVal = data.start_datetime;
                                                break;
                                            case "End Date":
                                                oldVal = data.end_datetime;
                                                break;
                                            case "Price":
                                                oldVal = data.price;
                                                break;
                                            case "Status":
                                                oldVal = data.status;
                                                break;
                                            case "Nontsitter Check In":
                                                oldVal = data.nontsitter_check_in;
                                                break;
                                            case "Nontsitter Check Out":
                                                oldVal = data.nontsitter_check_out;
                                                break;
                                            case "Nontowner Check In":
                                                oldVal = data.nontowner_check_in;
                                                break;
                                            case "Nontowner Check Out":
                                                oldVal = data.nontowner_check_out;
                                                break;
                                            case "Reservation Time":
                                                oldVal = data.reserve_datetime;
                                                break;
                                            case "Payment Time":
                                                oldVal = data.pay_datetime;
                                                break;
                                            case "Check In Time":
                                                oldVal = data.check_in_datetime;
                                                break;
                                            case "Check Out Time":
                                                oldVal = data.check_out_datetime;
                                                break;
                                            case "Reservation Cancel Time":
                                                oldVal = data.cancel_datetime;
                                                break;
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {element}
                                                </td>
                                                <td>
                                                    <input type="text" id={element} defaultValue={oldVal} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                {dbname === "reviews" &&
                                    reviewField.map((element) => {
                                        let oldVal;
                                        switch (element) {
                                            case "Nontowner ID":
                                                oldVal = data.nontowner_id;
                                                break;
                                            case "Shelter ID":
                                                oldVal = data.shelter_id;
                                                break;
                                            case "Reservation ID":
                                                oldVal = data.reservation_id;
                                                break;
                                            case "Rate":
                                                oldVal = data.rate;
                                                break;
                                            case "Comment":
                                                oldVal = data.comment;
                                                break;
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {element}
                                                </td>
                                                <td>
                                                    <input type="text" id={element} defaultValue={oldVal} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                {dbname === "rooms" &&
                                    roomField.map((element) => {
                                        let oldVal;
                                        switch (element) {
                                            case "Name":
                                                oldVal = data.name;
                                                break;
                                            case "Nont Type":
                                                oldVal = data.nont_type;
                                                break;
                                            case "Amount (capacity)":
                                                oldVal = data.amount;
                                                break;
                                            case "Price (per day)":
                                                oldVal = data.price;
                                                break;
                                            case "Shelter ID":
                                                oldVal = data.shelter_id;
                                                break;
                                            case "Exist":
                                                oldVal = data.exist;
                                                break;
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {element}
                                                </td>
                                                <td>
                                                    <input type="text" id={element} defaultValue={oldVal} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                {dbname === "shelters" &&
                                    shelterField.map((element) => {
                                        let oldVal;
                                        switch (element) {
                                            case "Name":
                                                oldVal = data.name;
                                                break;
                                            case "Description":
                                                oldVal = data.description;
                                                break;
                                            case "Address":
                                                oldVal = data.address;
                                                break;
                                            case "Rate":
                                                oldVal = data.rate;
                                                break;
                                            case "Supported Nont Type":
                                                oldVal = JSON.stringify(data.supported_type);
                                                break;
                                            case "Coordinate":
                                                oldVal = JSON.stringify(data.coordinate);
                                                break;
                                            case "Phone Number":
                                                oldVal = data.phoneNumber;
                                                break;
                                            case "Nontsitter ID":
                                                oldVal = data.nont_sitter_id;
                                                break;
                                            case "Exist":
                                                oldVal = data.exist;
                                                break;
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {element}
                                                </td>
                                                <td>
                                                    <input type="text" id={element} defaultValue={oldVal} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <a href={"/infodb/"+dbname} type="button" className="btn" style={{borderColor: "black"}}>
                            back to {dbname}
                        </a>

                        <button type="submit">
                            submit update
                        </button>
                    </form>

                    <div>
                        {updateSuccess && 
                            <div style={{color: "green"}}>
                                Successfully Updated :)
                            </div>
                        }        
                        {updateSuccess===false &&
                            <div style={{color: "red"}}>
                                Unsuccessfully Updated! Please check the type of inputs.
                            </div>
                        }
                    </div>
                </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header className="bg-warning" closeButton>
                    <div className="font-weight-bold" style={{ marginLeft: "185px" }}>
                        !! WARNING !!
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ marginLeft: "97px" }}>
                        The updated data may conflict with other collections.
                        Are you sure to update document using this data?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => {
                        switch (dbname) {
                            case "nontOwners": return updateNontOwner();
                            case "nontSitters": return updateNontSitter();
                            case "nonts": return updateNont();
                            case "reservations": return updateReservation();
                            case "reviews": return updateReview();
                            case "rooms": return updateRoom();
                            case "shelters": return updateShelter();
                        }
                    }}
                        className="btn text-light bg-success border-danger" style={{ marginRight: "60px" }} >
                        YES
                    </button>
                    <button onClick={() => setShowModal(false)} className="btn text-light bg-danger border-danger" style={{ marginRight: "145px" }}>
                        NO
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditDB;

