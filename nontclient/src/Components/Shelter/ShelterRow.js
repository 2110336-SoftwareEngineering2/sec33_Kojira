import React from "react";

const ShelterRow = (props) => {
    return (
        <div className="row mt-2 mb-2">
            {/* shelter view button */}
            <div className="col-md-6 p-0">
                <button 
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"left"}}
                >
                    {props.element.name}
                </button>
            </div>
            {/* room manage button */}
            <div className="col-md-2 p-0">
                <button 
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                >
                    <a href={"/room/manage/"+props.element._id}
                    >
                        Room Manage
                    </a>
                </button>
            </div>
            {/* shelter update button */}
            <div className="col-md-2 p-0">
                <button 
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                >
                    Update
                </button>
            </div>
            {/* shelter delete button */}
            <div className="col-md-2 p-0">
                <button 
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ShelterRow;