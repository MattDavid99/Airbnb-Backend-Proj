import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newSpot } from '../../store/session'

function CreateNewSpot() {

  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault()
    return null
  }


  return (
    <>
      <form onSubmit={handleSubmit} >

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
        <label >
          Password
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required

          />
        </label>
        <label >
          Confirm Password
          <input
            type="password"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            required

          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default CreateNewSpot
