import React, { useState } from "react";
import axios from "axios";

//var localIpV4Address = require("local-ipv4-address");

var QRCode = require("qrcode.react");

const QRcode = (props) => {
  // const api_key = "047f51c0d25f2a17a533ce4531131f2a0f4968146a0d9c59e10f0071";
  const [IpAddress, setIpAddress] = useState("");
  // axios
  //   .get("https://api.ipdata.co?api-key=" + api_key)
  //   .then((response) => {
  //     console.log(response.data);
  //     setIpAddress(response.data.ip);
  //   })
  //   .catch((error) => {});

  // localIpV4Address().then(function (address) {
  //   console.log(address);
  //   setIpAddress(address);
  // });

  return <QRCode value={"http://" + IpAddress + ":5000/payment/QR"} />;
};

export default QRcode;
