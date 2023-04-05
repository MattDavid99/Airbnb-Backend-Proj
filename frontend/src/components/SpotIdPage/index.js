import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSpotId } from '../../store/session';

import "./SpotIdPage.css"

function SpotIdPage() {

  const dispatch = useDispatch()
  const { id } = useParams()

  const specificSpot = useSelector((state) => state.session.spots.find(spot => spot.id === +id));
  console.log(specificSpot);

  useEffect(() => {
    dispatch(getSpotId(id))
  }, [dispatch, id])



  return (
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

            <h4 className='spot-id-page-host-h3'>Description: {specificSpot.description}</h4>
          </div>
        )}

      </div>
    </div>


  )
}

export default SpotIdPage
