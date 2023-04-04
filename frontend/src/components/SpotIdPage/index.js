import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

function SpotIdPage() {

  const { id } = useParams()

  const specificSpot = useSelector((state) => (
    state.session.spots.find((spot) => spot.id === +id)
  ))


  return (
    <div className='spot-id-page-container'>
      <div className='spot-id-page-div'>
        <div className='spot-id-page-header'>
          <h1>{specificSpot.name}</h1>
          <h4>{specificSpot.city}, {specificSpot.state}, {specificSpot.country}</h4>
        </div>

        <div className='spot-id-page-image-div'>
          <img src={specificSpot.previewImage} alt="#" />
        </div>
      </div>
    </div>
  )
}

export default SpotIdPage
