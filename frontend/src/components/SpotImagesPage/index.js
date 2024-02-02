import React from 'react'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getImages } from '../../store/session'
import { useEffect } from 'react'
import { Tooltip } from "react-tooltip"
import 'react-tooltip/dist/react-tooltip.css'
import "./SpotImagesPage.css"

function SpotImagesPage() {
  const dispatch = useDispatch()
  const spots = useSelector((state) => state.session.spots)

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch, getImages])

  return (
    <div className='spot-image-container'>
      <ul className='spot-image-ul'>
        {spots && spots
          .filter(i => i.price !== 123)
          .map((i) => (
            <div className="preview-image-div" key={i.id}>
              <NavLink to={`spots/${i.id}`}>
                <img className="preview-image-img" src={i.previewImage} alt="#" data-tooltip-id={i.id} data-tooltip-content={i.name} />
                <Tooltip id={i.id} className='spot-image-tooltip' />
              </NavLink>
              <li key={i.id} className="spot-image-li"><i className="fas fa-map-marker-alt"></i> {i.city}/{i.state}</li>
              <span className='stars'><i className="far fa-star"></i> {i.avgRating ? i.avgRating : "New"}</span>
              <li className="price">${i.price} night</li>
            </div>
          ))}
      </ul>
    </div>
  )
}

export default SpotImagesPage
