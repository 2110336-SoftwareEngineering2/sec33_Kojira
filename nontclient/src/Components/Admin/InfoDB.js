import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Popconfirm } from "antd";
import Loading from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";
import AdminService from "../../Services/AdminService";

const InfoDB = (props) => {
  const { dbname } = useParams();
  const [dbData, setDbData] = useState([]);
  const [fetchDataStatus, setFetchDataStatus] = useState(LoadStatus.LOADING);
  const [columnDisplayStatus, setColumnDisplayStatus] = useState([]);
  const [banAttribute, setBanAttribute] = useState(["picture", "password"]);
  const [attributeList, setAttributeList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [dbname]);

  const fetchData = async () => {
    let fetchFunction = null;
    switch (dbname) {
      case "nontOwners":
        fetchFunction = AdminService.getNontOwners;
        break;
      case "nontSitters":
        fetchFunction = AdminService.getNontSitters;
        break;
      case "nonts":
        fetchFunction = AdminService.getNonts;
        break;
      case "reservations":
        fetchFunction = AdminService.getReservations;
        break;
      case "reviews":
        fetchFunction = AdminService.getReviews;
        break;
      case "rooms":
        fetchFunction = AdminService.getRooms;
        break;
      case "shelters":
        fetchFunction = AdminService.getShelters;
        break;
    }
    if (fetchFunction) {
      try {
        const response = await fetchFunction();
        if (response.data) {
          // db data
          setDbData(response.data);
          // column display status
          const columnDisplayStatus = {};
          for (const [key, value] of Object.entries(Object(response.data[0]))) {
            columnDisplayStatus[key.toString()] = true;
          }
          setColumnDisplayStatus(columnDisplayStatus);
          // attribute list
          setAttributeList(Object.keys(response.data[0]));
          // fetch data status
          setFetchDataStatus(LoadStatus.SUCCESS);
        }
      } catch (error) {
        setFetchDataStatus(LoadStatus.FAIL);
        console.error(error.message);
      }
    }
  };

  const onClickSelectButton = async (key) => {
    const newColumnDisplayStatus = { ...columnDisplayStatus };
    newColumnDisplayStatus[key] = !newColumnDisplayStatus[key];
    setColumnDisplayStatus(newColumnDisplayStatus);
    // console.log(dbData);
  };

  const onDeleteConfirm = async (id) => {};

  return (
    <div className="container-fluid">
      {/* Loading */}
      <Loading status={fetchDataStatus} />

      {fetchDataStatus === LoadStatus.SUCCESS && (
        <div>
          <div className="d-flex flex-column border border-dark border-3 rounded my-2 ">
            <div
              className="flex-fill bg-dark text-white font-weight-bold"
              style={{ textAlign: "center", fontSize: 25 }}
            >
              {dbname}
            </div>
            <div
              className="flex-fill bg-info text-white font-weight-bold"
              style={{ textAlign: "center", fontSize: 20 }}
            >
              Select Field
            </div>
            {/* column select button */}
            <div className="d-flex flex-wrap justify-content-center">
              {dbData !== null &&
                Object.keys(Object(dbData?.[0])).map(
                  (key) =>
                    !banAttribute.includes(key) && (
                      <button
                        key={key}
                        type="button"
                        className={"btn m-2 ".concat(
                          columnDisplayStatus[key]
                            ? "btn-success"
                            : "btn-secondary"
                        )}
                        onClick={() => onClickSelectButton(key)}
                      >
                        {key}
                      </button>
                    )
                )}
            </div>
          </div>

          {/* data table */}
          <div className="d-flex">
            <div className="table-responsive">
              <table className="table table-bordered table-hover m-0">
                <thead>
                  <tr>
                    {dbData !== null &&
                      Object.keys(Object(dbData?.[0])).map(
                        (key) =>
                          !banAttribute.includes(key) && (
                            <th
                              key={key}
                              scope="col"
                              style={{
                                textAlign: "center",
                                fontSize: 20,
                                display: columnDisplayStatus?.[key]
                                  ? ""
                                  : "none",
                              }}
                            >
                              {key}
                            </th>
                          )
                      )}
                    <th
                      scope="col"
                      style={{ textAlign: "center", fontSize: 20 }}
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: "center", fontSize: 20 }}
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dbData !== null &&
                    dbData.map((element, i) => (
                      <tr key={i}>
                        {attributeList.map(
                          (attribute) =>
                            !banAttribute.includes(attribute) && (
                              <td
                                key={attribute}
                                scope="row"
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  fontSize: 18,
                                  display: columnDisplayStatus?.[attribute]
                                    ? ""
                                    : "none",
                                }}
                              >
                                {console.log(
                                  attribute,
                                  typeof element[attribute]
                                )}{" "}
                                {element[attribute] === undefined
                                  ? "none"
                                  : element[attribute] instanceof Object
                                  ? JSON.stringify(element[attribute])
                                  : element[attribute].toString()}
                              </td>
                            )
                        )}
                        <td
                          scope="row"
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            fontSize: 18,
                          }}
                        >
                          <a type="button" className="btn btn-warning" href={"/editdb/"+dbname+"/"+element._id}>
                            Update
                          </a>
                        </td>
                        <td
                          scope="row"
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            fontSize: 18,
                          }}
                        >
                          <Popconfirm
                            title="Are you sure to delete this entry ?"
                            onConfirm={() => onDeleteConfirm(element._id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <a
                              type="button"
                              className="btn btn-danger"
                              href="#"
                            >
                              Delete
                            </a>
                          </Popconfirm>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoDB;
