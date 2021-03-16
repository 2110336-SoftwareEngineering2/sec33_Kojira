import React, {useState} from "react";
import { Popconfirm } from "antd";

const RoomRow = (props) => {    

    return (
        <tr>
            <th scope="row" style={{textAlign:"center", verticalAlign:"middle", fontSize:18}}>{props.element.name}</th>
            <td scope="row" style={{textAlign:"center", verticalAlign:"middle", fontSize:18}}>{props.element.nont_type}</td>
            <td scope="row" style={{textAlign:"center", verticalAlign:"middle", fontSize:18}}>{props.element.amount}</td>
            <td scope="row" style={{textAlign:"center", verticalAlign:"middle", fontSize:18}}>{props.element.price}</td>
            <td scope="row" style={{width:15}}>
                <a 
                type="button"
                className="btn btn-outline-info btn-block text-light bg-success border-success" 
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
                className="btn btn-outline-info btn-block text-light bg-danger border-danger"
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