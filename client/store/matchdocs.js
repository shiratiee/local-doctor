import axios from 'axios'

// ACTION TYPES

const FETCH_DOC_BY_ID = 'FETCH_DOC_BY_ID';
const REMOVE_UNMATCHES = 'REMOVE_UNMATCHES';

// ACTION CREATORS

const fetchOneDocById = (doc) => ({
  type: FETCH_DOC_BY_ID,
  doc
});

const removedUnmatchData = () => ({
  type: REMOVE_UNMATCHES
})

// THUNK
export const fetchDocById = (docId) =>
  dispatch => {
    axios.get(`/api/doctors/findById/${docId}`)
      .then((res) => {
        dispatch(fetchOneDocById(res.data));
      })
      .catch(err => console.log(err));
  };

export const removeUnmatchedDocs = () =>
  dispatch => {
    dispatch(removedUnmatchData());
  };

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DOC_BY_ID:
      return [...state, action.doc];
    case REMOVE_UNMATCHES:
      return state = [];
    default:
      return state;
  }
}