import axios from 'axios';

// ACTION TYPES
const SET_ZIPCODE = 'SET_ZIPCODE';
const REMOVE_LOCATION = 'REMOVE_LOCATION';

// ACTION CREATORS
const setCurrentLocation = (location) => ({
  type: SET_ZIPCODE,
  location
});

const removeCurrentZipcode = () => ({
  type: REMOVE_LOCATION
});

// THUNK

export const getCurrentZipcode = (lat, lng) =>
  dispatch => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${AIzaSyCPlxbijQCwg2pLSN_B_j8V9nbptG65AVM}`)
      .then(res => {
        dispatch(setCurrentLocation(res.data))
      })
      .catch(err => console.log(err));
  };

export const removeCurrentLocation = () =>
  dispatch => {
    dispatch(removeCurrentZipcode());
  };

// REDUCER

export default function(state = [], action) {
  switch (action.type) {
    case SET_ZIPCODE:
      return [action.location]
    case REMOVE_LOCATION:
      return state = [];
    default:
      return state;
  }
};