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
                message: "Data successfully updated.",
                description: ``,
                placement: "bottomRight",
            });
            setUpdateSuccess(true);
            console.log(response);
        } catch (error) {
            notification.error({
                message: "Cannot update data",
                description: `Some type of inputs is wrong`,
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
        try {
            var parsed_nont_id = JSON.parse(document.getElementById("Nont ID").value);
        } catch(error) {
            notification.error({
                message: "Cannot update data",
                description: `Nont ID must be JSON array of ObjectID string(s)`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            setShowModal(false);
            console.log(error.message);
            return;
        }
  
        const price = Number(document.getElementById("Price").value);
        if(Number.isNaN(price)) {
            notification.error({
                message: "Cannot update data",
                description: `Price must be number`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            setShowModal(false);
            console.log("Price must be number");  
            return;          
        }
        body = {
            nont_id: parsed_nont_id,
            nontowner_id: document.getElementById("Nontowner ID").value,
            room_id: document.getElementById("Room ID").value,
            shelter_id: document.getElementById("Shelter ID").value,
            nontsitter_id: document.getElementById("Nontsitter ID").value,
            start_datetime: document.getElementById("Start Date").value,
            end_datetime: document.getElementById("End Date").value,
            price: price,
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
        const rate = Number(document.getElementById("Rate").value)
        if(Number.isNaN(rate)) {
            notification.error({
                message: "Cannot update data",
                description: `Rate must be number`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            setShowModal(false);
            console.log("Rate must be number");  
            return;          
        }   
        body = {
            nontowner_id: document.getElementById("Nontowner ID").value,
            shelter_id: document.getElementById("Shelter ID").value,
            reservation_id: document.getElementById("Reservation ID").value,
            rate: rate,
            comment: document.getElementById("Comment").value,
        };     
        updateFunction = AdminService.updateReview;
        console.log(body);
        updateDB(body, updateFunction);
        
    }

    const updateRoom = () => {
        const amount = Number(document.getElementById("Amount (capacity)").value);
        if(Number.isNaN(amount)) {
            notification.error({
                message: "Cannot update data",
                description: `Amount must be number`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            setShowModal(false);
            console.log("Amount must be number");  
            return;       
        } 
        const price = Number(document.getElementById("Price (per day)").value);  
        if(Number.isNaN(price)) {
            notification.error({
                message: "Cannot update data",
                description: `Price must be number`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            setShowModal(false);
            console.log("Price must be number");  
            return;          
        } 
        body = {
            name: document.getElementById("Name").value,
            nont_type: document.getElementById("Nont Type").value,
            amount: amount,
            price: price,
            shelter_id: document.getElementById("Shelter ID").value,
            exist: document.getElementById("Exist").value
        };
        updateFunction = AdminService.updateRoom;
        console.log(body);
        updateDB(body, updateFunction);
    }

    const updateShelter = () => {
        const rate = Number(document.getElementById("Rate").value);
        if(Number.isNaN(rate)) {
            notification.error({
                message: "Cannot update data",
                description: `Rate must be number`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            setShowModal(false);
            console.log("Rate must be number");  
            return;          
        } 
        try {
            var parsed_supported_type = JSON.parse(document.getElementById("Supported Nont Type").value);
        } catch (error) {
            notification.error({
                message: "Cannot update data",
                description: `Supported Nont Type must be JSON array`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            setShowModal(false);
            console.log(error.message); 
            return;           
        }
        try {
            var parsed_coordinate = JSON.parse(document.getElementById("Coordinate").value);
        } catch (error) {
            notification.error({
                message: "Cannot update data",
                description: `Coordinate must be JSON object`,
                placement: "bottomRight",
            });
            setUpdateSuccess(false);
            setShowModal(false);
            console.log(error.message);  
            return;            
        }
        body = {
            name: document.getElementById("Name").value,
            description: document.getElementById("Description").value,
            address: document.getElementById("Address").value,
            rate: rate,
            supported_type: parsed_supported_type,
            coordinate: parsed_coordinate,
            phoneNumber: document.getElementById("Phone Number").value,
            nont_sitter_id: document.getElementById("Nontsitter ID").value,
            exist: document.getElementById("Exist").value
        };
        updateFunction = AdminService.updateShelter;
        console.log(body);
        updateDB(body, updateFunction);
    }

    return (
        <div className="container-fluid">

            {/* Loading */}
            <Loading status={fetchDataStatus} />
            {/* Content */}

            {fetchDataStatus === LoadStatus.SUCCESS && (
                <div className="text-center">
                    <div className="title text-dark text-center font-weight-bold bg-warning py-1">
                        Edit the document of {dbname}
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}>
                        <div className="table-responsive">
                            <div>
                                <table className="table table-sm table-striped table-success table-hover table-bordered" style={{ borderWidth: 12 }}>
                                    <thead className="header">
                                        <tr style={{ height: 53 }}>
                                            <th style={{ borderWidth: 2, width: "25%", verticalAlign: "middle" }}>
                                                ID
                                            </th>
                                            <th style={{ borderWidth: 2, verticalAlign: "middle" }}>
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
                                                        <td className="emphasis" style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            {element}
                                                        </td>
                                                        <td style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            <input type="text" id={element} defaultValue={oldVal} className="form-control text-center" />
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
                                                        <td className="emphasis" style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            {element}
                                                        </td>
                                                        <td style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            <input type="text" id={element} defaultValue={oldVal} className="form-control text-center" />
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
                                                        <td className="emphasis" style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            {element}
                                                        </td>
                                                        <td style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            <input type="text" id={element} defaultValue={oldVal} className="form-control text-center" />
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
                                                        <td className="emphasis" style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            {element}
                                                        </td>
                                                        <td style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            <input type="text" id={element} defaultValue={oldVal} className="form-control text-center" />
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
                                                        <td className="emphasis" style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            {element}
                                                        </td>
                                                        <td style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            <input type="text" id={element} defaultValue={oldVal} className="form-control text-center" />
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
                                                        <td className="emphasis" style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            {element}
                                                        </td>
                                                        <td style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            <input type="text" id={element} defaultValue={oldVal} className="form-control text-center" />
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
                                                        <td className="emphasis" style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            {element}
                                                        </td>
                                                        <td style={{ borderWidth: 2, verticalAlign: "middle" }}>
                                                            <input type="text" id={element} defaultValue={oldVal} className="form-control text-center" />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <a href={"/infodb/" + dbname} className="button-text font-weight-bold"> 
                                    <i className="fa fa-backward m-2" />
                                    back to {dbname}
                                </a>
                            </div>
                            <div className="col">
                                <button type="submit" className="button-text btn btn-warning text-dark border-dark">
                                    submit update
                        </button>
                            </div>
                        </div>
                    </form>

                    <div >
                        {updateSuccess &&
                            <div className="emphasis mt-4 text-success">
                                Successfully Updated :)
                            </div>
                        }
                        {updateSuccess === false &&
                            <div className="emphasis mt-4 text-danger">
                                Unsuccessfully Updated! Please check the type of inputs.
                            </div>
                        }
                    </div>
                </div>
            )}

            <Modal show={showModal} centered onHide={() => setShowModal(false)}>
                <Modal.Header className="bg-warning justify-content-center"> {/*no close button*/}
                    <div className="header text-danger">
                        !! WARNING !!
                    </div>
                </Modal.Header>
                <Modal.Body style={{ margin: "auto" }}>
                    <div>
                        The updated data may conflict with other documents.
                    </div>
                    <div>
                        - Are you sure to update document using this data? -
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
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
                        className="btn bg-success text-light border-danger">
                        YES
                    </button>
                    <button onClick={() => setShowModal(false)} className="btn bg-danger text-light border-danger ml-5">
                        NO
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditDB;

