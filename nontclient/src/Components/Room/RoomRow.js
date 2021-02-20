import React from "react";

const RoomRow = (props) => {
    return (
        <div className="row mt-2 mb-2">            
            {/* room name button */}
            <div className="col-md-8 p-0">
                <a
                className="btn btn-outline-info btn-block"
                style={{textAlign:"left", pointerEvents:"none", fontWeight:"bold"}}
                >
                    {props.element.name}
                </a>
            </div>
            {/* room update button */}
            <div className="col-md-2 p-0">
                <a 
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                href={"/room/update/"+props.element._id}
                >
                    Update
                </a>
            </div>
            {/* room delete button */}
            <div className="col-md-2 p-0">
                <a
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                >
                    Delete
                </a>
            </div>
        </div>
    );
}

export default RoomRow;