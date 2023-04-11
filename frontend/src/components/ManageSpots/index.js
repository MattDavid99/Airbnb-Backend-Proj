import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./ManageSpots.css"
import { removeSpot } from '../../store/session'

function ManageSpots() {

  const dispatch = useDispatch()

  const spots = useSelector((state) => state.session.spots)
  const currentUser = useSelector((state) => state.session.user);
  console.log(spots);
  console.log(currentUser);

  const userSpots = spots.filter((spot) => currentUser.id === spot.ownerId)
  console.log(userSpots);


  const handleDelete = async (spotId) => {

    console.log("Deleting a spot with ID", spotId);
    return await dispatch(removeSpot(spotId))
  }


  return userSpots && (
    <>
      <div className='manage-spots-wrapper'>

        <div className='manage-spots-header'>
          <i className='fas fa-wrench'></i>
          <h2 className='manage-spots-header-h2'>Manage your Spots</h2>
        </div>

        <div className='manage-spots-container'>
          {userSpots.map((i) => (
            <div className='manage-spots-image-div' key={i.id}>
              <img src={i.previewImage} alt="#" className='manage-spots-image' />

              <div className='manage-spots-info'>
                <div>{i.city}, {i.state}</div>
                <div>⭐ {i.avgRating ? i.avgRating : "New"}</div>
              </div>
              <div className='manage-spots-price'>${i.price}/night</div>

              <div className='manage-spots-update_delete'>
                <button className='manage-spots-update-button'>Update</button>
                <button className='manage-spots-delete-button' onClick={() => handleDelete(i.id)}>Delete</button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default ManageSpots