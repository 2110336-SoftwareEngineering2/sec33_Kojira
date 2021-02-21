import React from "react";

const ShelterRow = (props) => {
    return (
        <div className="row mt-2 mb-2">
            {/* shelter view button */}
            <div className="col-md-6 p-0">
                <a
                href={"/shelterView/"+props.element._id}
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"left"}}
                >
                    {props.element.name}
                </a>
            </div>
            {/* room manage button */}
            <div className="col-md-2 p-0">
                <a
                href={"/room/manage/"+props.element._id}
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                >
                    Room Manage
                </a>
            </div>
            {/* shelter update button */}
            <div className="col-md-2 p-0">
                <a
                type="button"
                className="btn btn-outline-info btn-block" 
                style={{textAlign:"center"}}
                >
                    Update
                </a>
            </div>
            {/* shelter delete button */}
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

export default ShelterRow;