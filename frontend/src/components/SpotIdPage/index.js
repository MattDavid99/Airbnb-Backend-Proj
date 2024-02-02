import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSpotId, getReviewForSpot, removeReview } from '../../store/session';
import ReviewModal from '../ReviewModal';
import "./SpotIdPage.css"
import DeleteReviewModal from '../DeleteReviewModal';

function SpotIdPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState({ open: false, reviewId: null });

  const specificSpot = useSelector((state) => {
    const spot = state.session.spots.find((spot) => spot.id === +id);
    return spot ? { ...spot } : null;
  });
  const reviews = useSelector((state) => state.session.reviews[id] || []);
  const currentUser = useSelector((state) => state.session.user);

  const openReviewModal = () => {
    setIsReviewModalOpen(true)
  };
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  const openConfirmDeleteModal = (reviewId) => {
    setIsConfirmDeleteModalOpen({ open: true, reviewId });
  };
  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen({ open: false, reviewId: null });
  };

  useEffect(() => {
    dispatch(getSpotId(id))
    dispatch(getReviewForSpot(id));
  }, [id, dispatch])

  const userCanPostReview = () => {
    if (!currentUser) return false
    if (currentUser.id == specificSpot.ownerId) return false
    const userReview = reviews.Reviews?.find((review) => review.User?.id == currentUser?.id)
    if (userReview) return false
    return true
  }

  const deleteReviewForId = async (reviewId) => {
    await dispatch(removeReview(reviewId, id))
  }
  
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
                <h5 className='spot-id-page-host-reserve-box-h5'><i class="far fa-star"></i> {specificSpot.avgStarRating ? parseFloat(specificSpot.avgStarRating).toFixed(1) : "New"}</h5>
                <h5 className='spot-id-page-host-reserve-box-h5'><i class="fas fa-pencil-alt"></i> {specificSpot.numReviews}</h5>
              </div>
              <button className='spot-id-page-host-reserve-box-button' onClick={() => window.alert("Feature coming soon!")}>Reserve</button>
              <h3 className='spot-id-page-host-h3'>
                Hosted by: {specificSpot.Owner.firstName === null ? 'Matthew David' : specificSpot.Owner.firstName}
              </h3>
              <h4 className='spot-id-page-host-h3'>Description:</h4>
              <p className='spot-id-page-host-p'>Discover a slice of paradise at this stunning tropical spot on Airbnb, nestled amidst swaying palm trees and glistening turquoise waters. This luxurious retreat offers you an unparalleled experience of serenity and relaxation in a lush, tropical setting. The beautifully designed beachfront villa boasts floor-to-ceiling windows that fill the space with natural light and provide breathtaking views of the ocean. The interior is tastefully decorated with a blend of modern and traditional elements.</p>
            </div>
          )}

          <div className='spot-id-page-reviews-div'>
            <div className="spot-id-page-reviews-container">
              <h4 className='spot-id-page-reviews-h4-star'><i class="far fa-star"></i> {specificSpot.avgStarRating ? parseFloat(specificSpot.avgStarRating).toFixed(1) : "New"}</h4>
              {specificSpot.numReviews > 0 && (
                <>
                  <span className='centered-dot'>·</span>
                  <h4 className='spot-id-page-reviews-h4-num'><i class="fas fa-pencil-alt"></i> {specificSpot.numReviews} {specificSpot.numReviews === 1 ? 'Review' : 'Reviews'}</h4>
                </>
              )}
            </div>

            {userCanPostReview() && (
              <button onClick={openReviewModal} className="spot-id-page-reviews-button">
                Post Your Review
              </button>
            )}

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
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((review, index) => {
                    const createdAtDate = new Date(review.createdAt);
                    const month = createdAtDate.toLocaleString('default', { month: 'long' });
                    const day = createdAtDate.getDate();

                    return (
                      <div className='spot-id-page-reviews-info' key={index}>
                        <span className='spot-id-page-reviews-span'></span>
                        <h5 className='spot-id-page-reviews-h5'><i className="fas fa-user-edit"></i> {review.User?.firstName || review.User?.email || 'Anonymous'}</h5>
                        <h6 className='spot-id-page-reviews-h6'>{`${month} ${day}`}</h6>
                        <p className='spot-id-page-reviews-p'>Review: {review.review}</p>
                        <p className='spot-id-page-reviews-p'>Stars: {review.stars}</p>

                        {currentUser?.id === review.User?.id && (
                          <button onClick={() => openConfirmDeleteModal(review.id)} className='spot-id-page-reviews-delete-button'>
                            <i class="fas fa-trash-alt fa-lg"></i>
                          </button>
                        )}
                        <DeleteReviewModal
                          isOpen={isConfirmDeleteModalOpen.open}
                          onClose={closeConfirmDeleteModal}
                          onDelete={deleteReviewForId}
                          reviewId={isConfirmDeleteModalOpen.reviewId}
                        />
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
