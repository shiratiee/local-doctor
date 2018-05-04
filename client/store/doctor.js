import axios from 'axios';

const GET_ONE_DOCTOR = 'GET_ONE_DOCTOR'

const getOneDoctor = doctor => ({type: GET_ONE_DOCTOR, doctor})

export default function reducer (state={}, action) {
    switch (action.type) {
      case GET_ONE_DOCTOR:
      return action.doctor;

      default:
      return state;
    }
}

export function fetchDoctor(id) {
  return function thunk(dispatch) {
      return axios.get(`/api/products/${id}`)
          .then(res => res.data)
          .then(doctor => {
              const action = getOneDoctor(doctor);
              dispatch(action)
          })
  }
}