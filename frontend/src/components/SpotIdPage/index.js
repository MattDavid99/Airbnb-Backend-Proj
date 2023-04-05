import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSpotId, getReviewForSpot } from '../../store/session';

import "./SpotIdPage.css"

function SpotIdPage() {

  const dispatch = useDispatch()
  const { id } = useParams()

  const specificSpot = useSelector((state) => state.session.spots.find(spot => spot.id === +id));
  const spotReviews = useSelector((state) => state.session.reviews[id]);
  console.log(specificSpot);
  console.log(spotReviews);

  useEffect(() => {

    dispatch(getSpotId(id))
    dispatch(getReviewForSpot(id));

  }, [id, dispatch])

  // useEffect(() => {
  // }, [dispatch, id]);



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
              <h3 className='spot-id-page-host-h3'>
                Hosted by: {specificSpot.Owner.firstName === null ? 'Matthew David' : specificSpot.Owner.firstName}
              </h3>

              <h4 className='spot-id-page-host-h3'>Description:</h4>
              <p className='spot-id-page-host-p'>One of the most stunning spots you can find on Airbnb is a cozy cabin nestled in the heart of the Rocky Mountains. This beautiful cabin boasts breathtaking views of snow-capped peaks, pristine lakes, and towering pine trees. The interior of the cabin is warm and inviting, with a rustic fireplace, comfortable furnishings, and charming decor. You'll feel right at home as you take in the natural beauty that surrounds you from the comfort of your own private hot tub on the deck. Whether you're looking to disconnect and unwind, or you're an adventurous traveler eager to explore the great outdoors, this Airbnb spot is the perfect destination for your next vacation.</p>
            </div>
          )}

          <div className='spot-id-page-reviews-div'>
            {spotReviews && spotReviews.Reviews && spotReviews.Reviews.map((review, index) => (
              <div key={index} className='review'>
                <h4>User: {review.User.firstName || 'Anonymous'}</h4>
                <p>Review: {review.review}</p>
                <p>Stars: {review.stars}</p>
                <div className='review-images'>
                  {review.ReviewImages.map((image, i) => (
                    <img key={i} src={image.url} alt={`Review ${index + 1} image ${i + 1}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    )
  )
}

export default SpotIdPage
