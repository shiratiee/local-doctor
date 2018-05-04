import axios from 'axios';

const FETCH_DOCTORS = 'FETCH_DOCTORS';

const fetchDoctors= doctors => ({ type: FETCH_DOCTOR, doctors });

export const fetchDoctorMatches = () => dispatch =>
  axios
    .get('https://api.betterdoctor.com/2016-03-01/specialties?user_key=6ffaf2f592ca4029cf614bb4bf313be5')
    .then(res => {
      dispatch(fetchDoctors(res.data));
    })
    .catch(err => console.log(err));

export default function(doctors = [], action) {
  switch (action.type) {
    case FETCH_DOCTORS:
      return action.doctos;
    default:
      return doctors;
  }
}

