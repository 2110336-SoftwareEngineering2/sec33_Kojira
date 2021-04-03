import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import UserType from "../../Constants/UserType";
import Loading from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";
import ReviewService from "../../Services/ReviewService";
import ReviewCard from "./ReviewCard";
const UserContext = Contexts.UserContext;
const ShelterView = (props) => {
  const contextValue = useContext(UserContext);
  const [shelter, setShelter] = useState([]);
  const [reviews,setReviews]=useState([]);
  const [rooms, setRooms] = useState([]);
  const { shelterID } = useParams();
  const [fetchRoomStatus, setFetchRoomStatus] = useState(LoadStatus.LOADING);
  const [fetchShelterStatus, setFetchShelterStatus] = useState(
    LoadStatus.LOADING
  );
  const [fetchReviewStatus,setFetchReviewStatus] = useState(LoadStatus.LOADING);

  useEffect(() => {
    async function fetchShelter() {
      try {
        if (shelterID) {
          const response = await ShelterService.getShelterByID(shelterID);
          if (response.data) {
            setShelter(response.data);
            setFetchShelterStatus(LoadStatus.SUCCESS);
          }
        }
        // console.log("---useEffect3----");
        // console.log(shelter?.picture?.[0]?.img);
        // console.log(shelter?.picture?.[0]?.img?.data);
        // console.log(typeof (shelter?.picture?.[0]?.img.data));
      } catch (error) {
        setFetchShelterStatus(LoadStatus.FAIL);
        console.error(error.message);
      }
    }
    fetchShelter();
  }, [shelterID]);
  useEffect(() => {
    async function fetchReview() {
      try {
        if (shelterID) {
          const response = await ReviewService.getReviewByShelterID(shelterID);
          console.log({response});

          if (response.data) {
            setReviews(response.data);
            setFetchReviewStatus(LoadStatus.SUCCESS);
          }
        }
      } catch (error) {
        setFetchReviewStatus(LoadStatus.FAIL);
        console.error(error.message);
      }
    }
    fetchReview();
  }, [shelterID]);
  useEffect(() => {
    async function fetchRooms() {
      try {
        if (shelterID) {
          const response = await RoomService.getRoomByShelterID(shelterID);
          if (response.data) {
            setRooms(response.data);
            setFetchRoomStatus(LoadStatus.SUCCESS);
          }
        }
      } catch (error) {
        setFetchRoomStatus(LoadStatus.FAIL);
        console.error(error.message);
      }
    }
    fetchRooms();
  }, [shelterID]);
  return (
    <div className="container">
        
      {/* Loading */}
      <Loading status={fetchRoomStatus && fetchShelterStatus && fetchReviewStatus} />

      {/* Content */}
      {fetchShelterStatus === LoadStatus.SUCCESS &&
        fetchRoomStatus === LoadStatus.SUCCESS &&
         fetchReviewStatus===LoadStatus.SUCCESS&& (
          <div className="card mt-3">
            <div className="card-header text-white bg-primary ">
              <h1 className="my-1 text-left">{shelter.name} </h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  {shelter?.picture?.length > 0 && (
                    <img
                      className="w-100 p-3"
                      src={`${
                        "data" in shelter?.picture?.[0]?.img &&
                        Buffer.from(shelter?.picture?.[0]?.img?.data).toString()
                      }`}
                      alt="shelter image"
                    />
                  )}
                  {shelter?.picture?.length == 0 && (
                    <img className="w-100 p-3" src="" alt="shelter image" />
                  )}
                </div>
                <div className="col-md-6">
                  <div className="media-body ">
                    <div className="mw-100">
                      <h5 className="mb-1 mr-1">description </h5>
                      <p className="mw-100">{shelter.description}</p>
                      <hr />
                    </div>
                    <div>
                      <h5 className="mb-1 mr-1">phone number </h5>
                      <p>{shelter.phoneNumber}</p>
                      <hr className="mw-100" />
                    </div>
                    <div>
                      <h5 className="mb-1 mr-1">address </h5>
                      <p>{shelter.address}</p>
                      <hr className="mw-100" />
                    </div>
                    <div>
                      <h5 className="mb-1 mr-1">rate </h5>
                      <p>{shelter.rate}</p>

                      <hr className="mw-100" />
                    </div>
                    <div>
                      <h5 className="mb-1 mr-1">coordinate </h5>

                      <p>{"latitude :" + shelter?.coordinate?.lat}</p>
                      <p>{"longtitude:" + shelter?.coordinate?.lng}</p>
                      <hr />
                    </div>
                    <div>
                      <h5 className="mb-1 mr-1">support type </h5>
                      <div>
                        {shelter?.supported_type?.map((type) => {
                          return (
                            <span
                              className="badge badge-primary mr-1"
                              key={type}
                            >
                              {type}
                            </span>
                          );
                        })}
                      </div>
                      <hr className="mw-100" />
                    </div>
                  </div>
                </div>
              </div>
              <ul className="list-group">
                <li className="list-group-item active">room</li>
                {rooms.map((room) => {
                  return (
                    <li className="list-group-item" key={room._id}>
                      <dl className="row">
                        <dt className="col-md-2">name</dt>
                        <dd className="col-md-10">{room.name}</dd>
                        <dt className="col-md-2">nont type</dt>
                        <dd className="col-md-10">
                          <span className="badge badge-primary mr-1">
                            {room.nont_type}
                          </span>
                        </dd>
                        <dt className="col-md-2">amount</dt>
                        <dd className="col-md-10">{room.amount}</dd>
                        <dt className="col-md-2">price</dt>
                        <dd className="col-md-10">{room.price}</dd>
                      </dl>
                      {contextValue.userType === UserType.NONT_OWNER && (
                        <a
                          className="btn btn-primary mt-0"
                          href={"/reserve/" + room._id}
                          role="button"
                        >
                          reserve
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div>
                <h2 className="mt-5 md-0">Review</h2>

                {
                  reviews.map((reviewInfo)=>(
                   
                    <ReviewCard  key={reviewInfo._id} review={reviewInfo}/>
                  ))
                }
                
              </div>
              
            </div>
          </div>
        )}
    </div>
  );
};
export default ShelterView;
