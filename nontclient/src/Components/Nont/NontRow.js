import React, {useState} from "react";
import {Modal} from "react-bootstrap";


const NontRow = (props) => {
    const [showModal, setShowModal] = useState(false);
    const onDelete = props.onDelete;
    const id = props.element._id;
    return (
        <div className="row mt-2 mb-2 justify-content-center">
            {/* nont view button */}
            <div className="col-md-6 p-0">
                <a
                href={"/nont/"+props.element._id}
                type="button"
                className="button-text btn btn-outline-info btn-block font-weight-bold text-center" 
                >
                    {props.element.name}
                </a>
            </div>
            <div className="col col-md-auto p-0">
                <a
                href={"/nont/update/"+props.element._id}
                type="button"
                className="button-text btn btn-outline-info btn-block text-light bg-success border-success" 
                >

                    <i className="fas fa-edit" />
                    {" "}Update
                </a>
            </div>
            {/* nont delete button */}
            <div className="col-md-1 p-0">
                <button
                className="button-text btn btn-outline-info btn-block text-light bg-danger border-danger" 
                onClick={() => setShowModal(true)}
                >
                    <i className="fa fa-trash" />
                    {" "}Delete
                </button>

                {/* Modal */}
                <Modal show={showModal} centered onHide={() => setShowModal(false)}>
                    <Modal.Header className="bg-warning justify-content-center"> {/*no close button*/}
                        <div className="header text-danger">
                            !! WARNING !! 
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ margin: "auto" }}>
                        <div>
                            Are you sure to delete this nont profile?
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <button onClick={()=>onDelete(id)} className="btn text-light bg-success border-danger">
                            YES
                        </button>
                        <button onClick={()=>setShowModal(false)} className="btn text-light bg-danger border-danger ml-5"> 
                            NO
                        </button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}

export default NontRow;