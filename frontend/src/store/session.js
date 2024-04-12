import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const RETRIVE_SPOTS = "session/getSpots"
const CREATE_SPOT = "session/createSpot"
const GET_SPOT_ID = 'session/getSpotId'
const GET_REVIEWS_FOR_SPOT = 'session/setReviewsForSpot';
const POST_REVIEW_FOR_SPOT = 'session/postReviewForSpot'
const DELETE_SPOT = 'session/deleteSpot'
const UPDATE_SPOT = "session/updateSpot"
const DELETE_REVIEW = "session/deleteReview"


const deleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    id
  }
}

const deleteSpot = (id) => {
  return {
    type: DELETE_SPOT,
    id
  }
}

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  }
}

const postReview = (review, spotId) => {
  return {
    type: POST_REVIEW_FOR_SPOT,
    review,
    spotId
  };
};

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
    spot: spot
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
  dispatch(setUser(data.user));
  return response;
};

export const editSpot = (spotId, updatedSpotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedSpotData),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot));
  } else {
    throw new Error('Failed to update the spot');
  }
}

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
    dispatch(setUser(data)); 
    return true
  }
  else {
    return false
  }
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
  dispatch(retriveSpots(data.Spots))
  return response
}

export const newSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const spot = await response.json()
    dispatch(createSpot(spot))
    return spot.id
  }
}

export const getSpotId = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}`)
  const data = await response.json()
  console.log('Received spot data:', data);
  dispatch(getSpotbyId(data))
}

export const getReviewForSpot = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}/reviews`);
  const data = await response.json();
  dispatch(getReview({ spotId: id, reviews: data }));
};

export const postReviewForSpot = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(postReview({ ...newReview, spotId }));
    return newReview;
  } else {
    return false;
  }
};

export const removeSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteSpot(id));
  }
};

export const removeReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  })
  if (response.ok) {
    dispatch(deleteReview(id))
  }
}

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
      return newState;

    case CREATE_SPOT:
      newState = Object.assign({}, state)
      newState.spots = [...state.spots, action.spot]
      return newState

    case GET_SPOT_ID:
      newState = Object.assign({}, state);
      const existingSpotIndex = newState.spots.findIndex(spot => spot.id === action.spot.id);
      if (existingSpotIndex !== -1) {
        newState.spots[existingSpotIndex] = action.spot;
      } else {
        newState.spots.push(action.spot);
      }
      return newState;

    case GET_REVIEWS_FOR_SPOT:
      newState = Object.assign({}, state);
      newState.reviews = {
        ...newState.reviews,
        [action.payload.spotId]: action.payload.reviews
      };
      return newState;

    case POST_REVIEW_FOR_SPOT:
      newState = Object.assign({}, state);
      const spotId = action.review.spotId;
      if (!newState.reviews[spotId]) {
        newState.reviews[spotId] = { Reviews: [] };
      }
      newState.reviews[spotId].Reviews = [...newState.reviews[spotId].Reviews, action.review];
      return newState;

    case DELETE_SPOT:
      newState = Object.assign({}, state);
      newState.spots = newState.spots.filter((spot) => spot.id !== action.id);
      return newState;

    case UPDATE_SPOT:
      newState = Object.assign({}, state);
      const updatedSpotsList = newState.spots.map((i) =>
        i.id === action.spot.id ? action.spot : i
      );
      newState.spots = updatedSpotsList;
      return newState;

    case DELETE_REVIEW:
      newState = Object.assign({}, state);
      const spotIdForDelete = Object.keys(newState.reviews).find(key => newState.reviews[key].Reviews.find(review => review.id === action.id));
      if (spotIdForDelete) {
        newState.reviews[spotIdForDelete].Reviews = newState.reviews[spotIdForDelete].Reviews.filter((review) => review.id !== action.id);
      }
      return newState;

    default:
      return state;
  }
};

export default sessionReducer;
