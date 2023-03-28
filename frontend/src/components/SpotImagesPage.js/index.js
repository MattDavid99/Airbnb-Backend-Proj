import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getImages } from '../../store/session'
import { useEffect } from 'react'
import "./SpotImagesPage.css"

function SpotImagesPage() {

  const dispatch = useDispatch()
  const spots = useSelector((state) => state.session.spots)
  console.log(spots);
  // ⬆️⬆️ = [
  // {
  //   id: 1,
  //   ownerId: 1,
  //   address: '123 Main St',
  //   city: 'San Francisco',
  //   state: 'California',
  //   country: 'USA',
  //   lat: 37.49,
  //   lng: 22.94,
  // }
  // ]

  const fetchImages = async () => {
    await dispatch(getImages());
  };

  useEffect(() => {
    fetchImages()
  }, [])

  // // We are console.logging to see all of our spots

  return (
    // <div className='spot-image-container'>
    //   <ul className='spot-image-ul'>
    //     {spots && spots.map((i) => (
    //       <li key={i.id} className="spot-image-li">{i.address}</li>
    //     ))}
    //   </ul>
    // </div>

    // WHEN YOU GET BACK FIX THIS ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ Change all of the styled (<li> <ul> etc.) tags to classNames
    <div className="spot-image-container">
      <ul className="spot-image-ul">
        {spots &&
          spots.map((i) => (
            <li key={i.id} className="spot-image-li">
              <div className="spot-info">
                <strong>ID:</strong> {i.id}
              </div>
              <div className="spot-info">
                <strong>Owner ID:</strong> {i.ownerId}
              </div>
              <div className="spot-info">
                <strong>Address:</strong> {i.address}
              </div>
              <div className="spot-info">
                <strong>City:</strong> {i.city}
              </div>
              <div className="spot-info">
                <strong>State:</strong> {i.state}
              </div>
              <div className="spot-info">
                <strong>Country:</strong> {i.country}
              </div>
              <div className="spot-info">
                <strong>Lat:</strong> {i.lat}
              </div>
              <div className="spot-info">
                <strong>Lng:</strong> {i.lng}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SpotImagesPage
