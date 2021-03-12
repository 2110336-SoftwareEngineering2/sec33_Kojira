import React from "react";
import { Popconfirm } from "antd";

const ShelterRow = (props) => {
    return (
        <div className="row mt-2 mb-2 justify-content-center">
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
                className="btn btn-outline-info btn-block bg-warning text-dark border-warning" 
                >
                    <i className="fas fa-cat" />
                    {" "}Room Manage
                </a>
            </div>
            {/* shelter update button */}
            <div className="col col-md-auto p-0">
                <a
                href={"/shelterUpdate/"+props.element._id}
                type="button"
                className="btn btn-outline-info btn-block text-light bg-success border-success" 
                >
                    <i className="fas fa-edit" />
                    {" "}Update
                </a>
            </div>
            {/* shelter delete button */}
            <div className="col col-md-1 p-0">
                <Popconfirm
                title="Are you sure to delete this shelter ?"
                onConfirm={()=>props.onDelete(props.element._id)}
                okText="Yes"
                cancelText="No"
                >
                <a
                type="button"
                className="btn btn-outline-info btn-block text-light bg-danger border-danger"
                >
                    <i className="fa fa-trash" />
                    {" "}Delete
                </a>
                </Popconfirm>
            </div>
        </div>
    );
}

export default ShelterRow;