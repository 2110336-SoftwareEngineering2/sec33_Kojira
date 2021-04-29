import React from "react";
import { Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const PictureForm = (props) => {
    return(
        <div className="row">
        <div className="col m-4">
            <label htmlFor="picture-input"  className="emphasis form-label">
                Picture
            </label>
            <Upload
                beforeUpload={() => false}
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

export default PictureForm