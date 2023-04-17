import React from 'react'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getImages } from '../../store/session'
import { useEffect } from 'react'
import "./SpotImagesPage.css"

function SpotImagesPage() {

  const dispatch = useDispatch()
  const spots = useSelector((state) => state.session.spots)

  // const spotImg = useSelector((state) => state.session.spots)



  const fetchImages = async () => {
    await dispatch(getImages());
  };

  useEffect(() => {
    fetchImages()
  }, [dispatch])


  return (
    <div className='spot-image-container'>
      <ul className='spot-image-ul'>
        {spots && spots.map((i) => (
          <div className="preview-image-div" key={i.id}>
            <NavLink to={`spots/${i.id}`}>
              <img className="preview-image-img" src={i.previewImage} alt="#" />
            </NavLink>
            <li key={i.id} className="spot-image-li"><i class="fas fa-map-marker-alt"></i> {i.city}/{i.state}</li>
            <span className='stars'><i class="far fa-star"></i> {i.avgRating ? i.avgRating : "New"}</span>
            <li className="price">${i.price} night</li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default SpotImagesPage
