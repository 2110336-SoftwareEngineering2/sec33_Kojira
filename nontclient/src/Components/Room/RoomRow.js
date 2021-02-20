import React from "react";

const RoomRow = (props) => {
    return (
        <div className="row mt-2 mb-2">            
            {/* room name button */}
            <div className="col-md-8 p-0">
                <button
                className="btn btn-outline-info btn-block"
                style={{textAlign:"left", pointerEvents:"none", fontWeight:"bold"}}
                >
                    {props.element.name}
                </button>
            </div>
            {/* room update button */}
            <div className="col-md-2 p-0">
                <button 
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                >
                    Update
                </button>
            </div>
            {/* room delete button */}
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

export default RoomRow;