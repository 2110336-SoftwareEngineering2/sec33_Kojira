import React, { useState } from "react";
import axios from "axios";
import serverURL from "../../Config/serverURL";

var QRCode = require("qrcode.react");

const QRcode = (props) => {
  const [IpAddress, setIpAddress] = useState("");
  const [code, setCode] = useState("");

  if (IpAddress === "") {
    axios.post(serverURL + "/payment/getCode").then((respond) => {
      console.log(respond.data.code);
      setCode(respond.data.code);
    });

    axios.get(serverURL + "/payment/getServerIpAddress").then((respond) => {
      setIpAddress(respond.data.ip);
    });
  }

  return (
    <QRCode
      value={
        "http://" +
        IpAddress +
        ":5000/payment/QR?reserveId=" +
        props.reserveId +
        "&code=" +
        code
      }
      size={props.size}
    />
  );
};

export default QRcode;
