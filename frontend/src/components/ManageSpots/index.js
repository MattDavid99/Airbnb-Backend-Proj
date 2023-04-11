import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import "./ManageSpots.css"
import { removeSpot, getImages } from '../../store/session'

function ManageSpots() {

  const dispatch = useDispatch()

  const spots = useSelector((state) => state.session.spots)
  const currentUser = useSelector((state) => state.session.user);
  console.log(spots);
  console.log(currentUser);

  const userSpots = spots.filter((spot) => currentUser.id === spot.ownerId)
  console.log(userSpots);

  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])


  const handleDelete = async (id) => {

    console.log("Deleting a spot with ID", id);
    await dispatch(removeSpot(id))
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
              <Link to={`/spots/${i.id}`} key={i.previewImage}><img src={i.previewImage} alt="#" className='manage-spots-image' /></Link>
              <div className='manage-spots-info'>
                <div>{i.city}, {i.state}</div>
                <div>⭐ {i.avgRating ? i.avgRating : "New"}</div>
              </div>
              <div className='manage-spots-price'>${i.price}/night</div>

              <div className='manage-spots-update_delete'>
                <button className='manage-spots-update-button'><Link to={`/update-spot/${i.id}`} className="manage-spots-update-link">Update</Link></button>
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
