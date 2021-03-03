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
                className="btn btn-outline-info btn-block font-weight-bold" 
                style={{textAlign:"center",backgroundColor:"silver",fontSize:18}}
                >
                    {props.element.name}
                </a>
            </div>
            <div className="col col-md-auto p-0">
                <a
                href={"/nont/update/"+props.element._id}
                type="button"
                className="btn btn-outline-info btn-block text-light bg-success border-success" 
                >

                    <i className="fas fa-edit" />
                    {" "}Update
                </a>
            </div>
            {/* nont delete button */}
            <div className="col-md-1 p-0">
                <button
                className="btn btn-outline-info btn-block text-light bg-danger border-danger" 
                onClick={() => setShowModal(true)}
                >
                    <i className="fa fa-trash" />
                    {" "}Delete
                </button>

                {/* Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header className="bg-warning" closeButton>
                        <div className="font-weight-bold" style={{marginLeft:"185px"}}>
                            !! WARNING !! 
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{marginLeft:"97px"}}>
                            Are you sure to delete this nont profile?
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={()=>onDelete(id)} className="btn text-light bg-success border-danger" style={{marginRight:"60px"}} >
                            YES
                        </button>
                        <button onClick={()=>setShowModal(false)} className="btn text-light bg-danger border-danger" style={{marginRight:"145px"}}> 
                            NO
                        </button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}

export default NontRow;