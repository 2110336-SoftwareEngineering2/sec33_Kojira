import React, { useState } from "react";
import { axios } from "../../Utils/ServiceUtils/axios";
import serverURL from "../../Config/serverURL";

var QRCode = require("qrcode.react");

const QRcode = (props) => {
  const [IpAddress, setIpAddress] = useState("");
  const [code, setCode] = useState("");

  if (code === "") {
    axios.post(serverURL + "/payment/getCode").then((respond) => {
      setCode(respond.data.code);
    });
  }

  return (
    <QRCode
      value={
        serverURL + "/payment/QR?reserveId=" + props.reserveId + "&code=" + code
      }
      size={props.size}
    />
  );
};

export default QRcode;
