// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const RETRIVE_SPOTS = "session/getSpots"
const CREATE_SPOT = "session/createSpot"

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
// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();

//   dispatch(setUser(data.user));
//   return response;
// };


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


// export const signup = (user) => async (dispatch) => {
//   const { username, firstName, lastName, email, password } = user;
//   const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       username,
//       firstName,
//       lastName,
//       email,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data)); // <<-- data.user broke it
//   return response;
// };



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
  const response = await fetch('/api/spots', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  const spot = await response.json()
  dispatch(createSpot(spot))
}



const initialState = { user: null, spots: [] };

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

    default:
      return state;
  }
};

export default sessionReducer;
