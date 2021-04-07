import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import {notification,} from "antd";
import ReviewService from "../../Services/RoomService";
import RoomService from "../../Services/RoomService";

const ReviewCard =(props)=>{
    const [fetchRoom,setFetchRoom]=useState(false);
    const [RoomName,setRoomName]=useState("Room is no longer exist");
    const {nontowner_id,rate,comment,updatedAt,reservation_id}=props.review;
    console.log({props,nontowner_id,rate,comment});
    const {name}=nontowner_id;
    const RoomID=((reservation_id)&&"room_id" in reservation_id)? reservation_id.room_id:"";
    useEffect(()=>{
        async function fetchRoom (){
            try{
                if(RoomID){
                    const response = await RoomService.getRoomByID(RoomID);
                    if(response.data){
                        setRoomName(response.data.name);
                        setFetchRoom(true);
                    }
                }

            }catch(error){
                console.error(error.message);
            }
        }
        fetchRoom();
    })

    return(
        <div>               
        <hr/>
        <h5><b>@{RoomName}</b></h5>
        <h5>{`${comment}`}</h5>
        <div>
        <h5 >Rating: 
        {[1, 2, 3, 4, 5].map((rating) => {
        if (rate + 0.25 >= rating)
          return (
            <span key={rating}>
              <i className={"fas fa-star "}style={{"color":"#ffe135"}}></i>
            </span>
          );
        else if (rate + 0.25 >= rating - 0.5) {
          return (
            <span key={rating}>
              <i className={"fas fa-star-half-alt "} style={{"color":"#ffe135"}}></i>
            </span>
          );
        } else
          return (
            <span key={rating}>
              <i className={"far fa-star "} style={{"color":"#ffe135"}}> </i>
            </span>
          );
      })} </h5>
        <h5 className="text-right" style={{}}><b>{`${name}`}</b></h5>

      <p className="text-right" style={{"opacity": "0.75"}}>{`at ${updatedAt.slice(11, 19)} date ${updatedAt.slice(0, 10)}`}</p>

        </div>


        </div>
        
    );
}
export default ReviewCard;
