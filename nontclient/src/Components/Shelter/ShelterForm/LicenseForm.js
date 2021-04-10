import React from "react";
import styles from "../Shelter.module.css";
import { Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const LicenseForm = (props) => {
    return(
        <div className="row">
        <div className="col m-4">
            <label htmlFor="picture-input"  className="form-label">
                License
            </label>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                onChange={props.onFormChange}
                fileList={props.listFile}
                onPreview={props.onPreview}
            > 
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>
        </div>
    </div>
    )
}

export default LicenseForm