import React from "react";
import UpdateAccount from "./UpdateAccount/UpdateAccount";

const UserSetting = () => {
  return (
    <div className="container">
      <h1 className="text-center m-4">Setting</h1>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="update-account-tab"
            data-bs-toggle="tab"
            data-bs-target="#update-account"
            type="button"
            role="tab"
            aria-controls="update-account"
            aria-selected="true"
          >
            Update Account
          </button>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="update-account"
          role="tabpanel"
          aria-labelledby="update-account-tab"
        >
          <UpdateAccount />
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
