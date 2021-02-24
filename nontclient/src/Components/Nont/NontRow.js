import React from "react";


const NontRow = (props) => {
    const onDelete = props.onDelete;
    const id = props.element._id;
    return (
        <div className="row mt-2 mb-2 justify-content-center">
            {/* nont view button */}
            <div className="col-md-6 p-0">
                <a
                href={"/nont/"+props.element._id}
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"left"}}
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
                onClick={() => onDelete(id)}
                >
                    <i className="fa fa-trash" />
                    {" "}Delete
                </button>
            </div>
        </div>
    );
}

export default NontRow;