import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postReviewForSpot, getReviewForSpot } from '../../store/session'
import "./ReviewModal.css"

function ReviewModal({ isOpen, onClose, spotId }) {

  const [review, setReview] = useState("")
  const [stars, setStars] = useState(0)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const reviewData = {
      review,
      stars
    }
    const newReview = await dispatch(postReviewForSpot(spotId, reviewData))
    if (newReview) {
      dispatch(getReviewForSpot(spotId));
      onClose()
    }
  }
  if (!isOpen) {
    return null
  }
  const handleStarClick = (i) => {
    setStars(i)
  }
  const renderStars = () => {
    const starsArr = []
    for (let i = 1; i <= 5; i++) {
      starsArr.push(<i key={i} className={`fa${stars >= i ? 's' : 'r'} fa-star`} onClick={() => handleStarClick(i)} />)
    }
    return starsArr
  }

  return (
    <div className='review-modal-overlay' onClick={onClose}>
      <div className='review-modal' onClick={(e) => e.stopPropagation()}>
        <form className='post-review-form' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
          <h3 className='post-review-form-h3'>How was your stay</h3>
          <label className='post-review-form-label'>
            <textarea
              type="text"
              placeholder='Leave your review here...'
              className='post-review-form-textarea'
              rows="10"
              cols="50"
              onChange={(e) => setReview(e.target.value)}
              value={review}
            />
          </label>
          <div className='post-review-form-star'>{renderStars()} Stars</div>

          <button className='post-review-form-button' disabled={stars < 1 || review.length < 10}>Submit Your Review</button>
        </form>
      </div>
    </div>
  )
}

export default ReviewModal
