
import axios from 'axios';

const FETCH_DOCTOR = 'FETCH_DOCTOR';

const fetchDoctor = doctor => ({ type: FETCH_DOCTOR, doctor });

export const fetchDoctorMatches = () => dispatch =>
  axios
    .get('https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=6ffaf2f592ca4029cf614bb4bf313be5')
    .then(res => {
        console.log(res);
      dispatch(fetchDoctor(res.data));
    })
    .catch(err => console.log(err));

export default function(doctor = [], action) {
  switch (action.type) {
    case FETCH_DOCTOR:
      return action.doctor;
    default:
      return doctor;
  }
}