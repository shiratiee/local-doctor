import axios from 'axios';
import { fetchDocById, removeUnmatchedDocs } from './';

// ACTION TYPES

const GET_MATCHES = 'GET_MATCHES';
const CREATE_MATCHES = 'CREATE_MATCHES';

// ACTION CREATOR

const getMatches = matches => ({
  type: GET_MATCHES,
  matches,
});


const createMatches = match => ({
  type: CREATE_MATCHES,
  match,
});

// THUNK CREATORS

export const fetchMatches = userId =>
  dispatch =>
    axios.get(`/api/match/${userId}`)
      .then(res =>
        dispatch(getMatches(res.data)))
        .then(results => results.matches.map(doc => dispatch(fetchDocById(doc.docId))))
        .catch(err => console.log(err));

export const addMatches = (docId, userId, firstName, lastName, title, image_url, street,city,state,phoneNum,website) =>
  dispatch =>
    axios.post('/api/match', { docId, userId, firstName, lastName, title, image_url, street,city,state,phoneNum,website })
      .then((res) => {
        dispatch(createMatches(res.data));
        // dispatch(fetchDocById(docId));
      })
      .catch(err => console.log(err));

export const unMatch = (docId, userId) =>
  dispatch =>
    axios.delete('/api/match', {data:{docId: docId, userId: userId}})
      .then((res) => {
        dispatch(removeUnmatchedDocs());
        dispatch(fetchMatches(userId));
        dispatch(fetchDocById(docId));
      })
      .catch(err => console.log(err));

// REDUCER

export default function (state = [], action) {
  switch (action.type) {
    case GET_MATCHES:
      return action.matches;
    case CREATE_MATCHES:
      return [...state, action.match];
    default:
      return state;
  }
}