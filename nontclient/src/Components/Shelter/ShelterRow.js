import React from "react";

const ShelterRow = (props) => {
    return (
        <div className="row">
            {/* shelter view button */}
            <div className="col m-4">
                <button 
                type="button"
                className="btn btn-primary" 
                style={{textAlign:"left"}}
                onClick={props.onClick_shelter_view}
                >
                    {props.element.name}
                </button>
            </div>
            {/* room manage button */}
            <div className="col m-4">
                <button 
                type="button"
                className="btn btn-primary" 
                style={{textAlign:"center"}}
                onClick={props.onClick_room_manage}
                >
                    Room Manage
                </button>
            </div>
            {/* shelter update button */}
            <div className="col m-4">
                <button 
                type="button"
                className="btn btn-primary" 
                style={{textAlign:"center"}}
                onClick={props.onClick_shelter_update}
                >
                    Update
                </button>
            </div>
            {/* shelter delete button */}
            <div className="col m-4">
                <button 
                type="button"
                className="btn btn-primary" 
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