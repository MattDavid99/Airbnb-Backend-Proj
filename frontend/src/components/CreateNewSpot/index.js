import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { newSpot } from '../../store/session'
import "./CreateNewSpot.css"

function CreateNewSpot() {

  const dispatch = useDispatch()
  const history = useHistory()

  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [previewImage, setPreviewImage] = useState("")
  const [url1, setUrl1] = useState("")
  const [url2, setUrl2] = useState("")
  const [url3, setUrl3] = useState("")
  const [url4, setUrl4] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    country: [],
    address: [],
    city: [],
    state: [],
    description: [],
    name: [],
    price: [],
    previewImage: [],
    url1: [],
    url2: [],
    url3: [],
    url4: [],
  })

  const validateFileExtension = (url) => {
    const allowedExtensions = ['.png', '.jpeg', '.jpg'];
    const fileExtension = url.slice(url.lastIndexOf('.'));

    return allowedExtensions.includes(fileExtension);
  };


  useEffect(() => {

    if (hasSubmitted) {

      const validationErrors = { country: [], address: [], city: [], state: [], description: [], name: [], price: [], previewImage: [], url1: [], url2: [], url3: [], url4: [] }

      if (!country.length) validationErrors.country.push("Country is required")
      if (!address.length) validationErrors.address.push("Address is required")
      if (!city.length) validationErrors.city.push("City is required")
      if (!state.length) validationErrors.state.push("State is required")
      if (description.length < 30) validationErrors.description.push("Description needs a minimum of 30 characters")
      if (!name.length) validationErrors.name.push("Name is required")
      if (!price.length) validationErrors.price.push("Price is required")
      if (!validateFileExtension(previewImage)) validationErrors.previewImage.push("Image URL must end in .png, .jpg, or .jpeg")
      if (!validateFileExtension(url1) && url1.length > 0) validationErrors.url1.push("Image URL must end in .png, .jpg, or .jpeg")
      if (!validateFileExtension(url2) && url2.length > 0) validationErrors.url2.push("Image URL must end in .png, .jpg, or .jpeg")
      if (!validateFileExtension(url3) && url3.length > 0) validationErrors.url3.push("Image URL must end in .png, .jpg, or .jpeg")
      if (!validateFileExtension(url4) && url4.length > 0) validationErrors.url4.push("Image URL must end in .png, .jpg, or .jpeg")

      setErrors(validationErrors)

    }

  }, [hasSubmitted, country, address, city, state, description, name, price, previewImage, url1, url2, url3, url4])



  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const parsedPrice = parseFloat(price)

    const createNewSpotForm = {
      country,
      address,
      city,
      state,
      description,
      name,
      price: parsedPrice,
      previewImage,
      url1,
      url2,
      url3,
      url4,
    };

    const newSpotId = await dispatch(newSpot(createNewSpotForm))
    history.push(`/spots/${newSpotId}`)


    setCountry("")
    setAddress("")
    setCity("")
    setState("")
    setDescription("")
    setName("")
    setPrice("")
    setPreviewImage("")
    setUrl1("")
    setUrl2("")
    setUrl3("")
    setUrl4("")
    setHasSubmitted(true)
    setErrors({
      country: [],
      address: [],
      city: [],
      state: [],
      description: [],
      name: [],
      price: [],
      previewImage: [],
      url1: [],
      url2: [],
      url3: [],
      url4: [],
    })


  }


  return (
    <div className='create-new-spot-container'>

      <div className='create-new-spot-header-container'>
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
            Describe your place to guests
            <span className='create-new-spot-span'>- Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</span>
            <textarea
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}

              placeholder='Please write at least 30 characters'
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
            <span className='create-new-spot-span'>- Catch guests' attention with a spot title that highlights what makes your place special.</span>
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
            <span className='create-new-spot-span'>- Competitive pricing can help your listing stand out and rank higher in search results.</span>
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


          <p>Liven up your spot with photos</p>

          <span className='create-new-spot-span'>- Submit a link to at least one photo to publish your spot</span>

          <label className='create-new-spot-label'>
            <input
              type="text"
              placeholder='Preview Image URL'
              className='create-new-spot-input'
              onChange={(e) => setPreviewImage(e.target.value)}
              value={previewImage}
            />
            <img src={previewImage} alt='Preview' className='create-new-spot-preview-image' />

          </label>

          {hasSubmitted && errors.previewImage.length > 0 && errors.previewImage.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <label className='create-new-spot-label'>
            <input
              type="text"
              placeholder='Image URL'
              className='create-new-spot-input'
              onChange={(e) => setUrl1(e.target.value)}
              value={url1}
            />
            <img src={url1} alt='Preview' className='create-new-spot-preview-image' />
          </label>

          {hasSubmitted && errors.url1.length > 0 && errors.url1.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}

          <label className='create-new-spot-label'>
            <input
              type="text"
              placeholder='Image URL'
              className='create-new-spot-input'
              onChange={(e) => setUrl2(e.target.value)}
              value={url2}
            />
            <img src={url2} alt='Preview' className='create-new-spot-preview-image' />
          </label>

          {hasSubmitted && errors.url2.length > 0 && errors.url2.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <label className='create-new-spot-label'>
            <input
              type="text"
              placeholder='Image URL'
              className='create-new-spot-input'
              onChange={(e) => setUrl3(e.target.value)}
              value={url3}
            />
            <img src={url3} alt='Preview' className='create-new-spot-preview-image' />
          </label>

          {hasSubmitted && errors.url3.length > 0 && errors.url3.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}

          <label className='create-new-spot-label'>

            <input
              type="text"
              placeholder='Image URL'
              className='create-new-spot-input'
              onChange={(e) => setUrl4(e.target.value)}
              value={url4}
            />
            <img src={url4} alt='Preview' className='create-new-spot-preview-image' />
          </label>

          {hasSubmitted && errors.url4.length > 0 && errors.url4.map((error, idx) => (
            <ul key={idx} className='create-new-spot-error-ul'>
              <li className='create-new-spot-error-li'>* {error}</li>
            </ul>
          ))}


          <button type="submit" disabled={Object.values(errors).flat().length > 0} className='create-new-spot-button'>Create Spot</button>
        </form>
      </div>
    </div >
  )
}

export default CreateNewSpot
