import React, { useState } from "react";
import LoginFields from "../LoginLogout/LoginFields";
import UserType from "../../Constants/UserType";
import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className={styles.center + " " + styles.fullDiv}>
          <h2 id={styles.LoginHeader} className={"mt-3 " + styles.textCenter}>
            Admin Login
        </h2>
        </div>
        <div className={styles.fullDiv + " " + styles.center}>
          <LoginFields UserType={UserType.ADMIN} />
        </div>
        <div className={styles.fullDiv + " " + styles.center}>
          <p>
            Are you an admin but has no account yet? Contact the database admin...
        </p>
        </div>
        <div className={styles.fullDiv + " " + styles.center}>
          <p className="mr-3">
            or if you have the secret code, click the button below for info
        </p>
        </div>
        <div className={styles.fullDiv + " " + styles.center}>
          <button
            className={"btn btn-info " + styles.hereButton}
            onClick={() => {
              setShowInfo(!showInfo);
            }}
          >
            {showInfo ? "Close" : "Info"}
          </button>
        </div>

        {showInfo && (
          <React.Fragment>
            <div className={styles.fullDiv + " " + styles.center}>
              <p>
                If you have the secret code, do a POST request to
                `serverURL/admin/create` with these fields in body to create your
                admin account
            </p>
            </div>
            <div className={styles.fullDiv + " " + styles.center}>
              <div id={styles.codeBackground}>
                <span>
                  {"{"} <br />
                &emsp; email : '-your admin email-', <br />
                &emsp; password: '-your admin password-', <br />
                &emsp; userType: 'admin', <br />
                &emsp; secret: '-the secret code provided by database admin-'{" "}
                  <br />
                  {"}"}
                </span>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default AdminLogin;
