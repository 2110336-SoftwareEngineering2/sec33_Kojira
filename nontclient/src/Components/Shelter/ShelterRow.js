import React from "react";
import { Popconfirm } from "antd";

const ShelterRow = (props) => {
    return (
        <tr>
            <td scope="row" className="emphasis table-content">{(props.element.name)? props.element.name: ""}</td>
            <td scope="row" className="button-text table-content">{(props.element.description)? props.element.description: ""}</td>
            <td scope="row" className="button-text table-content">{(props.element.rate)? props.element.rate: ""}</td>
            <td scope="row" style={{width:"15px"}}>
                <a
                href={"/room/manage/"+props.element._id}
                type="button"
                className="btn btn-outline-info btn-block bg-warning text-dark border-warning button-text" 
                >
                    <i className="fas fa-cat" />
                    {" "}Room Manage
                </a>           
            </td>
            <td scope="row" style={{width:"15px"}}>
                <a 
                type="button"
                className="btn btn-outline-info btn-block text-light bg-success border-success button-text" 
                href={"/roomUpdate/"+props.element._id}    
                >
                    <i className="fas fa-edit" />
                    {" "}Update
                </a>                
            </td>
            <td scope="row" style={{width:"15px"}}>
                <Popconfirm
                title="Are you sure to delete this shelter ?"
                onConfirm={()=>props.onDelete(props.element._id,props.element.name)}
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

export default ShelterRow;