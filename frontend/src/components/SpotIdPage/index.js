import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSpotId, getReviewForSpot } from '../../store/session';
import ReviewModal from '../ReviewModal';

import "./SpotIdPage.css"

function SpotIdPage() {

  const dispatch = useDispatch()
  const { id } = useParams()

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)


  const specificSpot = useSelector((state) => state.session.spots.find(spot => spot.id === +id));
  const reviews = useSelector((state) => state.session.reviews[id] || []);
  const currentUser = useSelector((state) => state.session.user)

  console.log(specificSpot);
  console.log(reviews);
  console.log(currentUser);



  const openReviewModal = () => {
    setIsReviewModalOpen(true)
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };


  useEffect(() => {

    dispatch(getSpotId(id))
    dispatch(getReviewForSpot(id));

  }, [id, dispatch])





  return (

    specificSpot && (
      <div className='spot-id-page-container'>
        <div className='spot-id-page-div'>
          <div className='spot-id-page-header'>

            <h1>{specificSpot.name}</h1>
            <h4>{specificSpot.city}, {specificSpot.state}, {specificSpot.country}</h4>
          </div>

          <div className='spot-id-page-image-div'>
            {specificSpot.SpotImages && specificSpot.SpotImages.map((i, index) => (

              <img src={i.url} alt="#" className={index === 0 ? 'spot-id-page-first-image' : 'spot-id-page-image'} key={i.id} />
            ))}
          </div>



          {specificSpot.Owner && (
            <div className='spot-id-page-host-div'>

              <div className='spot-id-page-host-reserve-box'>
                <h4 className='spot-id-page-host-reserve-box-h4'>${specificSpot.price}/night</h4>
                <h5 className='spot-id-page-host-reserve-box-h5'>⭐{specificSpot.avgStarRating ? parseFloat(specificSpot.avgStarRating).toFixed(1) : "New"}</h5>
                <h5 className='spot-id-page-host-reserve-box-h5'>📝{specificSpot.numReviews}</h5>
              </div>

              <button className='spot-id-page-host-reserve-box-button' onClick={() => window.alert("Feature coming soon")}>Reserve</button>

              <h3 className='spot-id-page-host-h3'>
                Hosted by: {specificSpot.Owner.firstName === null ? 'Matthew David' : specificSpot.Owner.firstName}
              </h3>

              <h4 className='spot-id-page-host-h3'>Description:</h4>
              <p className='spot-id-page-host-p'>Discover a slice of paradise at this stunning tropical spot on Airbnb, nestled amidst swaying palm trees and glistening turquoise waters. This luxurious retreat offers you an unparalleled experience of serenity and relaxation in a lush, tropical setting. The beautifully designed beachfront villa boasts floor-to-ceiling windows that fill the space with natural light and provide breathtaking views of the ocean. The interior is tastefully decorated with a blend of modern and traditional elements.</p>
            </div>
          )}


          <div className='spot-id-page-reviews-div'>
            <div className="spot-id-page-reviews-container">
              <h4 className='spot-id-page-reviews-h4-star'>⭐ {specificSpot.avgStarRating ? parseFloat(specificSpot.avgStarRating).toFixed(1) : "New"}</h4>
              {specificSpot.numReviews > 0 && (
                <>
                  <span className='centered-dot'>·</span>
                  <h4 className='spot-id-page-reviews-h4-num'>📝 {specificSpot.numReviews} {specificSpot.numReviews === 1 ? 'Review' : 'Reviews'}</h4>
                </>
              )}
            </div>
            <button onClick={openReviewModal} className="spot-id-page-reviews-button">Leave a Review</button>

            {/* {isReviewModalOpen && <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onSubmitReview={handleNewReview} spotId={id} />} */}
            {isReviewModalOpen && (
              <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={closeReviewModal}
                spotId={id}
              />
            )}

            {
              reviews && reviews.Reviews && reviews.Reviews.length > 0 ? (
                reviews.Reviews
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((review, index) => {
                    const createdAtDate = new Date(review.createdAt);
                    const month = createdAtDate.toLocaleString('default', { month: 'long' });
                    const day = createdAtDate.getDate();

                    return (
                      <div className='spot-id-page-reviews-info' key={index}>
                        <span className='spot-id-page-reviews-span'></span>
                        <h5 className='spot-id-page-reviews-h5'>User: {review.User?.firstName || 'Anonymous'}</h5>
                        <h6 className='spot-id-page-reviews-h6'>{`${month} ${day}`}</h6>
                        <p className='spot-id-page-reviews-p'>Review: {review.review}</p>
                        <p className='spot-id-page-reviews-p'>Stars: {review.stars}</p>
                      </div>
                    );
                  })
              ) : currentUser && currentUser.id !== specificSpot.Owner?.id ? (
                <div className="spot-id-page-reviews-info">
                  <p>Be the first to post a review!</p>
                </div>
              ) : null
            }
          </div>

        </div>
      </div>

    )
  )
}

export default SpotIdPage
