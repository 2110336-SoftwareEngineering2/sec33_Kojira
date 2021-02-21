import React from "react";

const RoomRow = (props) => {
    return (
        <div className="row justify-content-center mt-2 mb-2">            
            {/* room name button */}
            <div className="col col-md-8 p-0">
                <a
                className="btn btn-outline-info btn-block"
                style={{textAlign:"left", pointerEvents:"none", fontWeight:"bold"}}
                >
                    {props.element.name}
                </a>
            </div>
            {/* room update button */}
            <div className="col col-auto p-0">
                <a 
                type="button"
                className="btn btn-outline-info btn-block" 
                href={"/room/update/"+props.element._id}
                style={{color:"white", backgroundColor:"#27ae60", borderColor:"#27ae60"}}
                >
                    <i className="fas fa-edit" />
                    {" "}Update
                </a>
            </div>
            {/* room delete button */}
            <div className="col col-md-1 p-0">
                <a
                type="button"
                className="btn btn-outline-info btn-block"
                style={{color:"white", backgroundColor:"#c0392b", borderColor:"#c0392b"}}
                >
                    <i className="fa fa-trash" />
                    {" "}Delete
                </a>
            </div>
        </div>
    );
}

export default RoomRow;