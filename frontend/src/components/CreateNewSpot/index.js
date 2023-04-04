import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newSpot } from '../../store/session'
import "./CreateNewSpot.css"

function CreateNewSpot() {

  // const dispatch = useDispatch()
  const [country, setCountry] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState([])



  const handleSubmit = (e) => {
    e.preventDefault()
    return null
  }


  return (
    <div className='create-new-spot-container'>

      <div className='create-new-spot-header-container'>

        <h1 className='create-new-spot-h1'>Create a new Spot</h1>

        <h3 className='create-new-spot-h3'>Where's your place located?</h3>

        <p className='create-new-spot-p'>Guests will only get your exact address once they booked a
          reservation.
        </p>
      </div>

      <div className='form-container'>

        <form onSubmit={handleSubmit} className='create-spot-form' >

          <label className='create-new-spot-label'>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder='Country'
              className='create-new-spot-input'
            />
          </label>
          <label className='create-new-spot-label'>
            Street Address
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              placeholder='Street Address'
              className='create-new-spot-input'
            />
          </label>


          <label className='create-new-spot-label'>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder='City'
              className='create-new-spot-input'
            />
          </label>

          <label className='create-new-spot-label'>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder='State'
              className='create-new-spot-input'
            />
          </label>



          <div className='line'></div>


          <label className='create-new-spot-label'>
            Description
            <textarea
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder='Tell us something about your spot...'
              className='create-new-spot-input'
              rows="10"
              cols="50"
            />
          </label>


          <div className='line'></div>


          <label className='create-new-spot-label'>
            Create a Title for your Spot
            <input
              type="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='Name your Spot'
              className='create-new-spot-input'
            />
          </label>




          <label className='create-new-spot-label'>
            Set a price for your Spot
            <input
              type="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder='Price per night (USD)'
              className='create-new-spot-input'
            />
          </label>


          <div className='line'></div>


          <p>Add Images</p>

          <label className='create-new-spot-label'>
            <input
              type="preview-image"
              placeholder='Preview Image URL'
              className='create-new-spot-input'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label className='create-new-spot-label'>
            <input
              type="url"
              placeholder='Image URL'
              className='create-new-spot-input'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label className='create-new-spot-label'>
            <input
              type="url"
              placeholder='Image URL'
              className='create-new-spot-input'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label className='create-new-spot-label'>
            <input
              type="url"
              placeholder='Image URL'
              className='create-new-spot-input'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label className='create-new-spot-label'>

            <input
              type="url"
              placeholder='Image URL'
              className='create-new-spot-input'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>



          <button type="submit">Create Spot</button>
        </form>
      </div>
    </div>
  )
}

export default CreateNewSpot
