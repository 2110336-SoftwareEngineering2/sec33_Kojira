import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import {notification,} from "antd";
import ReviewService from "../../Services/ReviewService";
import styles from "./Reserve.module.css";

const Review =(props)=>{
    const [starRating, setstarRating] = useState(3);
    const [starHover,setstarHover]= useState(0);
    const [comment, setcomment] = useState(" ");
    const [commentValid,setcommentValid]=useState(true);
    const [reviewID,setReviewID]=useState();
    const [haveReview,setHaveReview]=useState(false);
    const owner_id=props.owner._id;
    const shelter_id=props.shelter._id;
    const reservation_id=props.reserveId;
    useEffect(() => {
      fetchReivew();
  }, [reservation_id]);

    const fetchReivew = async ()=>{
      try{
       if(reservation_id){
         let response = await ReviewService.getReviewByReservationID(reservation_id);
         console.log({response});
         if(response.data){
            console.log(response.data[0].comment);
            setcomment(response.data[0].comment);
            console.log(response.data[0].rate);
            setstarRating(response.data[0].rate);
            console.log(response.data[0]._id);
            setReviewID(response.data[0]._id);
           
            setHaveReview(true);
         }        
       }
      }catch(error){
        console.error(error.message);
       }

       }
    
    
    const handleClick = value => {
        setstarRating(value)
      }
    
      const handleMouseOver = value => {
        setstarHover(value)
      };
    
      const handleMouseLeave = () => {
        setstarHover(0)
      }
      const handleComment = e=>{
          let comment = e.target.value;
          if(comment.length>=0 && comment.length<=500){
             setcomment(String(comment)); 
             setcommentValid(true);
          }
          
          else{
            setcommentValid(false);

          }
      }
      const submitreview = async()=>{
          const body ={
            nontowner_id: owner_id,
            shelter_id: shelter_id,
            reservation_id:reservation_id,
            rate:starRating,
            comment:String(" "+comment)
          }
          
          if(commentValid){
            if(!haveReview){
                try{
                  console.log({body});
                  const addReviwresponse = await ReviewService.addReview(body);
                  console.log(addReviwresponse.data._id);
                  const newReview_ID=addReviwresponse.data._id;
                  setReviewID(newReview_ID);
                  setcomment(addReviwresponse.data.comment);
                  setstarRating(addReviwresponse.data.rate);
                  setHaveReview(true);

                  notification.success({
                    message: "Review",
                    description: `successfully post review.`,
                    placement: "bottomRight",
                });                  
                }
                catch(error){
                  notification.error({ 
                    message: "Review",
                    description: `Cannot post review.`,
                    placement: "bottomRight",
                  });
                  console.error(error.message);
                }

            }
            else{
              const updatebody={
                _id:reviewID,
                rate:starRating,
                comment:String(" "+comment)
              }
              try{
                
                console.log(updatebody);
                const response = await ReviewService.updateReview(updatebody);
                console.log(response);
                setHaveReview(true);

                notification.success({
                  message: "Review",
                  description: `successfully update review.`,
                  placement: "bottomRight",
              });                  
              }
              catch(error){
                console.log({updatebody});
                notification.error({ 
                  message: "Review",
                  description: `Cannot update review.`,
                  placement: "bottomRight",
                });
                console.error(error.message);
              }

            }

          }
          else{
            notification.error({ 
                message: "Review",
                description: `Cannot post review because comment is invalid.`,
                placement: "bottomRight",
            });

          }
      }
      const cancelreview = async()=>{
        try{
            if(haveReview){
              const response = await ReviewService.removeReview(reviewID);
              console.log({response});
              setHaveReview(false);
              notification.success({
                message: "Review",
                description: `successfully delete review.`,
                placement: "bottomRight",
            });   

            }
            else{
              notification.error({ 
                message: "Review",
                description: `Cannot delete review because there is no reivew.`,
                placement: "bottomRight",
            });

            }
        }catch(error){
          console.log(error.message);
          notification.error({ 
            message: "Review",
            description: `Cannot delete review.`,
            placement: "bottomRight",
        });
        }
      }

    return(
        <div>               
        
        <h1>Review</h1>
        <div>
        <h3 >Rating: 
        {[1,2,3,4,5].map((i)=>{
          return (
            < FaStar
            key = {i}
            size={24}
            onClick={() => handleClick(i)}
            onMouseOver={() => handleMouseOver(i)}
            onMouseLeave={handleMouseLeave}
            color={ ((starHover || starRating) >= i)?"#ffe135":"#a9a9a9"}
            />
            );                                                       
        })} </h3>
        </div>
        <div>
        <h2 >comment</h2>
        <div className="form-group">

            <textarea className={" text-left w-100 form-control ".concat(commentValid?"":"is-invalid" )
            }
            rows="4"
            placeholder={comment}
           
            onChange={(e)=>handleComment(e)}
          />
        { !commentValid&&
        <div className="invalid-feedback">
        comment must not longer than 500 characters.
        </div>
        }
        </div>

        </div>
          <div style={{ textAlign: "center"}}>
          <input className="my-1 btn btn-primary" type="button"   value="review"
          onClick={submitreview}
          
          />
          <input className="my-1 mx-2 btn btn-danger" type="button"   value="cancel review"
          onClick={cancelreview}
          
          />
          </div>

        </div>
        
    );
}
export default Review;
