// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const RETRIVE_SPOTS = "session/getSpots"
const CREATE_SPOT = "session/createSpot"
const GET_SPOT_ID = 'session/getSpotId'
const GET_REVIEWS_FOR_SPOT = 'session/setReviewsForSpot';

const getReview = ({ spotId, reviews }) => {
  return {
    type: GET_REVIEWS_FOR_SPOT,
    payload: {
      spotId,
      reviews
    }
  }
}

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const retriveSpots = (spots) => {
  return {
    type: RETRIVE_SPOTS,
    payload: spots
  }
}

export const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

export const getSpotbyId = (spot) => {
  return {
    type: GET_SPOT_ID,
    spot
  }
}


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();

  if (response.ok) {
    dispatch(setUser(data.user));
    return true
  }
  else {
    return false
  }

};



export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();

  if (response.ok) {
    dispatch(setUser(data)); // <<-- data.user broke it
    return true
  }

  else {
    return false
  }
  // return response;
};




export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


export const getImages = () => async (dispatch) => {
  const response = await fetch('/api/spots')
  const data = await response.json()
  console.log(data.Spots);
  dispatch(retriveSpots(data.Spots))
  return response
}


export const newSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  const spot = await response.json()
  dispatch(createSpot(spot))

}

export const getSpotId = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}`)
  const data = await response.json()
  console.log(data);
  dispatch(getSpotbyId(data))
  // return response
}

export const getReviewForSpot = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}/reviews`);
  const data = await response.json();
  console.log(data);
  dispatch(getReview({ spotId: id, reviews: data }));
};


const initialState = { user: null, spots: [], reviews: {} };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;

    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;

    case RETRIVE_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      console.log(newState)
      return newState;


    case CREATE_SPOT:
      newState = Object.assign({}, state)
      newState.spots = [...state.spots, action.spot]
      return newState

    // Had to change this a whole lot⬇️⬇️⬇️
    case GET_SPOT_ID:
      newState = Object.assign({}, state)
      console.log(newState);
      // newState.spots = action.spot;
      const updatedSpots = newState.spots.map(spot => (spot.id === action.spot.id ? action.spot : spot));
      newState.spots = updatedSpots;
      console.log(newState);
      return newState;


    case GET_REVIEWS_FOR_SPOT:
      newState = Object.assign({}, state);
      newState.reviews = {
        ...newState.reviews,
        [action.payload.spotId]: action.payload.reviews
      };
      console.log(newState.reviews);
      return newState;


    default:
      return state;
  }
};

export default sessionReducer;
