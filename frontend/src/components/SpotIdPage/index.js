import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSpotId } from '../../store/session';

import "./SpotIdPage.css"

function SpotIdPage() {

  const dispatch = useDispatch()
  const { id } = useParams()

  // const specificSpot = useSelector((state) => (state.session.spots))
  const specificSpot = useSelector((state) => state.session.spots.find(spot => spot.id === +id));
  console.log(specificSpot);

  // const finder = specificSpot.find((spot) => spot.id + id)
  // console.log(finder);

  // const spot = useSelector((state) => state)
  // console.log(spot);



  // const specificSpot = useSelector((state) => {
  //   const spot = state.session.spots.find((spot) => spot.id === +id);
  //   if (spot) {
  //     return { ...spot, SpotImages: state.session.SpotImages };
  //   }
  //   return null;
  // });
  useEffect(() => {
    dispatch(getSpotId(id))
  }, [dispatch, id])

  // console.log(specificSpot.SpotImages);


  return (
    <div className='spot-id-page-container'>
      <div className='spot-id-page-div'>
        <div className='spot-id-page-header'>
          <h1>{specificSpot.name}</h1>
          <h4>{specificSpot.city}, {specificSpot.state}, {specificSpot.country}</h4>
        </div>

        <div className='spot-id-page-image-div'>
          {specificSpot.SpotImages && specificSpot.SpotImages.map((i) => (

            <img src={i.url} alt="#" className='spot-id-page-image' key={i.id} />
          ))}
        </div>

      </div>
    </div>

  )
}

export default SpotIdPage
