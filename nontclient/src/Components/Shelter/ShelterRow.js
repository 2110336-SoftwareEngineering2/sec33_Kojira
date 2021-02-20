import React from "react";
import "./ShelterRow.css";

const ShelterRow = (props) => {
    return (
        <div className="row mt-2 mb-2">
            {/* shelter view button */}
            <div className="col-md-6 p-0">
                <button 
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"left"}}
                onClick={props.onClick_shelter_view}
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
                onClick={props.onClick_room_manage}
                >
                    Room Manage
                </button>
            </div>
            {/* shelter update button */}
            <div className="col-md-2 p-0">
                <button 
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                onClick={props.onClick_shelter_update}
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
                onClick={props.onClick_shelter_delete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ShelterRow;