import React, {useState} from "react";
import { Popconfirm } from "antd";

const RoomRow = (props) => {    

    return (
        <tr>
            <td scope="row" className="emphasis" style={{textAlign:"center", verticalAlign:"middle"}}>{props.element.name}</td>
            <td scope="row" className="button-text" style={{textAlign:"center", verticalAlign:"middle"}}>{props.element.nont_type}</td>
            <td scope="row" className="button-text" style={{textAlign:"center", verticalAlign:"middle"}}>{props.element.amount}</td>
            <td scope="row" className="button-text" style={{textAlign:"center", verticalAlign:"middle"}}>{props.element.price}</td>
            <td scope="row" style={{width:15}}>
                <a 
                type="button"
                className="btn btn-outline-info btn-block text-light bg-success border-success button-text" 
                href={"/roomUpdate/"+props.element._id}    
                >
                    <i className="fas fa-edit" />
                    {" "}Update
                </a>                
            </td>
            <td scope="row" style={{width:15}}>
                <Popconfirm
                title="Are you sure to delete this room ?"
                onConfirm={()=>props.onDelete(props.element._id, props.element.name)}
                okText="Yes"
                cancelText="No"
                >
                <a
                type="button"
                className="btn btn-outline-info btn-block text-light bg-danger border-danger button-text"
                >
                    <i className="fa fa-trash" />
                    {" "}Delete
                </a>
                </Popconfirm>
            </td>
        </tr>
    );
}

export default RoomRow;