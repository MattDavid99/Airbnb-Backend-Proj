import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ManageSpots() {

  const spots = useSelector((state) => state.session.spots)
  const currentUser = useSelector((state) => state.session.user);
  console.log(spots);
  console.log(currentUser);

  const userSpots = spots.filter((spot) => currentUser.id === spot.ownerId)
  console.log(userSpots);


  return userSpots && (
    <div>
      {userSpots.map((i) => (
        <img src={i.previewImage} alt="#" />
      ))}
    </div>
  )
}

export default ManageSpots
