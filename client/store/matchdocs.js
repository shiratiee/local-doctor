import axios from 'axios'
// ACTION TYPES

const FETCH_DOC_BY_ID = 'FETCH_DOC_BY_ID';


// ACTION CREATORS

const fetchOneDocById = (doc) => ({
  type: FETCH_DOC_BY_ID,
  doc
});

// THUNK

export const fetchDocById = (docId) =>
  dispatch => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.betterdoctor.com/2016-03-01/doctors/${docId}?user_key=6ffaf2f592ca4029cf614bb4bf313be5`,
    {headers: {'Access-Control-Allow-Origin': '*'}})
      .then((res) => {
        dispatch(fetchOneDocById(res.data));
      })
      .catch(err => console.log(err));
  };



// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DOC_BY_ID:
      return [...state, action.doc];
    default:
      return state;
  }
}