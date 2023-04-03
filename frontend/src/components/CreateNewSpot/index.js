import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newSpot } from '../../store/session'
import "./CreateNewSpot.css"

function CreateNewSpot() {

  const dispatch = useDispatch()




  const handleSubmit = (e) => {
    e.preventDefault()
    return null
  }


  return (
    <>
      <form onSubmit={handleSubmit} className='create-spot-form' >

        <label >
          Country
          <input
            type="text"
            // value={email}
            // onChange={}
            required

          />
        </label>
        <label >
          Street Address
          <input
            type="text"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            required

          />
        </label>
        <div className='city-state-div'>

          <label >
            City
            <input
              type="text"
              // value={firstName}
              // onChange={(e) => setFirstName(e.target.value)}
              required

            />
          </label>
          <label >
            State
            <input
              type="text"
              // value={lastName}
              // onChange={(e) => setLastName(e.target.value)}
              required

            />
          </label>
        </div>

        <label >
          Description
          <textarea
            type="description"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required

          />
        </label>
        <label >
          Create a Title for your Spot
          <input
            type="title"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            required

          />
        </label>
        <label >
          Set a price for your Spot
          <input
            type="price"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            required

          />
        </label>



        <button type="submit">Create Spot</button>
      </form>
    </>
  )
}

export default CreateNewSpot
