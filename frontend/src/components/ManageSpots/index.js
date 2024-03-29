import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom"
import { removeSpot, getImages } from '../../store/session'
import "./ManageSpots.css"
import DeleteSpotModal from './DeleteSpotModal'

function ManageSpots() {

  const dispatch = useDispatch()

  const spots = useSelector((state) => state.session.spots)
  const currentUser = useSelector((state) => state.session.user);

  const userSpots = spots.filter((spot) => currentUser.id === spot.ownerId)

  const [showModal, setShowModal] = useState(false);
  const [spotToDelete, setSpotToDelete] = useState(null);

  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])



  const handleDelete = (id) => {
    setSpotToDelete(id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalDelete = async () => {

    await dispatch(removeSpot(spotToDelete));
    setShowModal(false);
  };


  return userSpots && (
    <>

      <DeleteSpotModal
        showModal={showModal}
        onClose={handleModalClose}
        onDelete={handleModalDelete}
      />

      <div className='manage-spots-wrapper'>

        <div className='manage-spots-header'>
          <i className='fas fa-wrench'></i>
          <h2 className='manage-spots-header-h2'>Manage your Spots</h2>
        </div>

        <div className='manage-spots-container'>

          {userSpots.length === 0 && (
            <button className='create-spot-button'><NavLink to="/create-spot" className="create_spot_link">Create a New Spot</NavLink></button>
          )}

          {userSpots.map((i) => (
            <div className='manage-spots-image-div' key={i.id}>
              <Link to={`/spots/${i.id}`} key={i.previewImage}><img src={i.previewImage} alt="#" className='manage-spots-image' /></Link>
              <div className='manage-spots-info'>
                <div>{i.city}, {i.state}</div>
                <div><i class="far fa-star"></i> {i.avgRating ? i.avgRating : "New"}</div>
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
