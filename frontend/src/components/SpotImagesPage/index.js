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
    <div className='spot-image-container'>
      <ul className='spot-image-ul'>
        {spots && spots.map((i) => (
          <div className="preview-image-div" key={i.id}>
            <NavLink to={`spots/${i.id}`}><img className="preview-image-img" src={i.previewImage} alt="#" /></NavLink>
            <li key={i.id} className="spot-image-li">{i.city}/{i.state}</li>
            <span className='stars'>⭐{i.avgRating}</span>
            <li className="price">${i.price} night</li>
            {/* <span className='distance'><i className="fas fa-car" /></span> */}
          </div>
        ))}
      </ul>
    </div>

    // WHEN YOU GET BACK FIX THIS ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ Change all of the styled (<li> <ul> etc.) tags to classNames in the other components
    // <div className="spot-image-container">
    //   <ul className="spot-image-ul">
    //     {spots &&
    //       spots.map((i) => (
    //         <li key={i.id} className="spot-image-li">
    //           <div className="spot-info">
    //             <strong>ID:</strong> {i.id}
    //             <div className='images'><img src={i.previewImage} alt="pic" /></div>
    //           </div>
    //           <div className="spot-info">
    //             <strong>Owner ID:</strong> {i.ownerId}
    //             <div className='images'><img src={i.previewImage} alt="pic" /></div>
    //           </div>
    //           <div className="spot-info">
    //             <strong>Address:</strong> {i.address}
    //             <div className='images'><img src={i.previewImage} alt="pic" /></div>
    //           </div>
    //           <div className="spot-info">
    //             <strong>City:</strong> {i.city}
    //             <div className='images'><img src={i.previewImage} alt="pic" /></div>
    //           </div>
    //           <div className="spot-info">
    //             <strong>State:</strong> {i.state}
    //             <div className='images'><img src={i.previewImage} alt="pic" /></div>
    //           </div>
    //           <div className="spot-info">
    //             <strong>Country:</strong> {i.country}
    //             <div className='images'><img src={i.previewImage} alt="pic" /></div>
    //           </div>
    //           <div className="spot-info">
    //             <strong>Lat:</strong> {i.lat}
    //             <div className='images'><img src={i.previewImage} alt="pic" /></div>
    //           </div>
    //           <div className="spot-info">
    //             <strong>Lng:</strong> {i.lng}
    //             <div className='images'><img src={i.previewImage} alt="pic" /></div>
    //           </div>
    //         </li>
    //       ))}
    //   </ul>
    // </div>
  )
}

export default SpotImagesPage
