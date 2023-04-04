import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newSpot } from '../../store/session'
import "./CreateNewSpot.css"

function CreateNewSpot() {

  const dispatch = useDispatch()

  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [image4, setImage4] = useState("")
  const [image5, setImage5] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    country: [],
    address: [],
    city: [],
    state: [],
    description: [],
    name: [],
    price: [],
    image1: [],
    image2: [],
    image3: [],
    image4: [],
    image5: []
  })

  const validateFileExtension = (url) => {
    const allowedExtensions = ['.png', '.jpeg', '.jpg'];
    const fileExtension = url.slice(url.lastIndexOf('.'));

    return allowedExtensions.includes(fileExtension);
  };


  useEffect(() => {

    if (hasSubmitted) {

      const validationErrors = { country: [], address: [], city: [], state: [], description: [], name: [], price: [], image1: [], image2: [], image3: [], image4: [], image5: [] }

      if (!country.length) validationErrors.country.push("Country is required")
      if (!address.length) validationErrors.address.push("Address is required")
      if (!city.length) validationErrors.city.push("City is required")
      if (!state.length) validationErrors.state.push("State is required")
      if (description.length < 30) validationErrors.description.push("Description needs a minimum of 30 characters")
      if (!name.length) validationErrors.name.push("Name is required")
      if (!price.length) validationErrors.price.push("Price is required")
      if (!validateFileExtension(image1)) validationErrors.image1.push("Image URL must end in .png, .jpg, or .jpeg")
      if (!validateFileExtension(image2) && image2.length > 0) validationErrors.image2.push("Image URL must end in .png, .jpg, or .jpeg")
      if (!validateFileExtension(image3) && image3.length > 0) validationErrors.image3.push("Image URL must end in .png, .jpg, or .jpeg")
      if (!validateFileExtension(image4) && image4.length > 0) validationErrors.image4.push("Image URL must end in .png, .jpg, or .jpeg")
      if (!validateFileExtension(image5) && image5.length > 0) validationErrors.image5.push("Image URL must end in .png, .jpg, or .jpeg")

      setErrors(validationErrors)

    }

  }, [hasSubmitted, country, address, city, state, description, name, price, image1, image2, image3, image4, image5])



  const handleSubmit = (e) => {
    e.preventDefault()

    const parsedPrice = parseFloat(price)

    const createNewSpotForm = {
      country,
      address,
      city,
      state,
      description,
      name,
      price: parsedPrice,
      image1,
      image2,
      image3,
      image4,
      image5,
    };

    console.log(createNewSpotForm);
    dispatch(newSpot(createNewSpotForm))

    setCountry("")
    setAddress("")
    setCity("")
    setState("")
    setDescription("")
    setName("")
    setPrice("")
    setImage1("")
    setImage2("")
    setImage3("")
    setImage4("")
    setImage5("")
    setHasSubmitted(true)
    setErrors({
      country: [],
      address: [],
      city: [],
      state: [],
      description: [],
      name: [],
      price: [],
      image1: [],
      image2: [],
      image3: [],
      image4: [],
      image5: []
    })

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
              onChange={(e) => setCountry(e.target.value)}
              value={country}

              placeholder='Country'
              className='create-new-spot-input'
            />
            {hasSubmitted && errors.country.length > 0 && errors.country.map((error, idx) => (
              <ul key={idx} className='create-new-spot-error-ul'>
                <li className='create-new-spot-error-li'>* {error}</li>
              </ul>
            ))}

          </label>
          <label className='create-new-spot-label'>
            Street Address
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}

              placeholder='Street Address'
              className='create-new-spot-input'
            />
          </label>

          {hasSubmitted && errors.address.length > 0 && errors.address.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <label className='create-new-spot-label'>
            City
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}

              placeholder='City'
              className='create-new-spot-input'
            />
          </label>

          {hasSubmitted && errors.city.length > 0 && errors.city.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}

          <label className='create-new-spot-label'>
            State
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}

              placeholder='State'
              className='create-new-spot-input'
            />
          </label>

          {hasSubmitted && errors.state.length > 0 && errors.state.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}



          <div className='line'></div>


          <label className='create-new-spot-label'>
            Description
            <textarea
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}

              placeholder='Tell us something about your spot...'
              className='create-new-spot-input'
              rows="10"
              cols="50"
            />
          </label>

          {hasSubmitted && errors.description.length > 0 && errors.description.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <div className='line'></div>


          <label className='create-new-spot-label'>
            Create a Title for your Spot
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}

              placeholder='Name your Spot'
              className='create-new-spot-input'
            />
          </label>

          {hasSubmitted && errors.name.length > 0 && errors.name.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}



          <label className='create-new-spot-label'>
            Set a price for your Spot
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}

              placeholder='Price per night (USD)'
              className='create-new-spot-input'
            />
          </label>

          {hasSubmitted && errors.price.length > 0 && errors.price.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <div className='line'></div>


          <p>Add Images</p>

          <label className='create-new-spot-label'>
            <input
              type="text"
              placeholder='Preview Image URL'
              className='create-new-spot-input'
              onChange={(e) => setImage1(e.target.value)}
              value={image1}
            />
          </label>

          {hasSubmitted && errors.image1.length > 0 && errors.image1.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <label className='create-new-spot-label'>
            <input
              type="text"
              placeholder='Image URL'
              className='create-new-spot-input'
              onChange={(e) => setImage2(e.target.value)}
              value={image2}
            />
          </label>

          {hasSubmitted && errors.image2.length > 0 && errors.image2.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}

          <label className='create-new-spot-label'>
            <input
              type="text"
              placeholder='Image URL'
              className='create-new-spot-input'
              onChange={(e) => setImage3(e.target.value)}
              value={image3}
            />
          </label>

          {hasSubmitted && errors.image3.length > 0 && errors.image3.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <label className='create-new-spot-label'>
            <input
              type="text"
              placeholder='Image URL'
              className='create-new-spot-input'
              onChange={(e) => setImage4(e.target.value)}
              value={image4}
            />
          </label>

          {hasSubmitted && errors.image4.length > 0 && errors.image4.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}

          <label className='create-new-spot-label'>

            <input
              type="text"
              placeholder='Image URL'
              className='create-new-spot-input'
              onChange={(e) => setImage5(e.target.value)}
              value={image5}
            />
          </label>

          {hasSubmitted && errors.image5.length > 0 && errors.image5.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <button type="submit" disabled={Object.values(errors).flat().length > 0}>Create Spot</button>
        </form>
      </div>
    </div >
  )
}

export default CreateNewSpot
