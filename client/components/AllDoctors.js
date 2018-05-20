import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'
import CurrentLocation from './CurrentLocation'
import { CardStack, Card } from 'react-cardstack';
import {getCurrentZipcode, removeCurrentLocation} from '../store';


class AllDoctors extends React.Component { 
constructor(props) {
  super(props);
     this.state = {
      doctors :[],
      latLng: [],
      geolocationOn: false
        }
        this.getLocation = this.getLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
     }

     getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.errorHandler)
        this.setState({geolocationOn: true});
      } else {
        console.log('geolocation IS NOT available');
      }
    }
  
    showPosition(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      this.setState({
        latLng: [latitude, longitude]
      });
      this.props.onLocation(this.state.latLng[0], this.state.latLng[1]);
    }
  
    errorHandler(err) {
      console.log('getCurrentPosition Error:', err);
    }

    
// performSearch = (query, zipcode) => {
//   fetch(`https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${query}&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=6ffaf2f592ca4029cf614bb4bf313be5`)
//     .then(res => res.json())
//       .then((result) => { 
//         console.log(result)
//         this.setState({doctors: result.data})
//   });
// }


performSearch = (query, zipcode) => { 
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latLng[0]},${this.state.latLng[1]}&key=AIzaSyCPlxbijQCwg2pLSN_B_j8V9nbptG65AVM`)
  .then(res => res.json())
  .then((result) => {
    console.log(result)
    return fetch(`https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${query}&location=${this.state.latLng[0]},${this.state.latLng[1]},205&user_location=${this.state.latLng[0]},${this.state.latLng[1]}&skip=0&limit=20&user_key=6ffaf2f592ca4029cf614bb4bf313be5`); // make a 2nd request and return a promise
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res)
        this.setState({doctors: res.data})
  })
  .catch((error) => {
    console.log('Request failed', error)
  })
  }
  
  
render() {
  return (
    <div>
    <SearchBar onSearch={this.performSearch}/>  
      {
        <div>
              {this.state.doctors.map((data, i) => (
                <div key={data.id}>
                  <ul className="doctor">
                    <li>
                    <CardStack
	                  height={500}
                    width={400}
	                  background='#f8f8f8'
	                  hoverOffset={25}>

                      <Card background='#2980B9'>
                      <h3>{`BetterDoctor - ${data.profile.first_name}
                      ${data.profile.last_name}`}, {`${data.profile.title}`} <button className= "add-button">+</button> </h3> 
                      </Card>

                      <Card background='#27AE60'>
                      <a href={data.profile.image_url}>
                      <img className="doc-image" src={data.profile.image_url} />
                      </a>
                      <p>{data.profile.bio}</p>
                    </Card>
                    
                    </CardStack>    
                      </li>
                    </ul>  
                </div>
              ))}
            </div>
          }
          <div>
      {
        this.state.geolocationOn
          ? <button className='geoLoc' onClick={(e) => {
                e.preventDefault();
                this.setState({geolocationOn: false});
                this.props.onTurnOff();
              }}>Turn Off Current Location</button>
            : <button className='geoLoc' onClick={(e) => {
                e.preventDefault();
                this.getLocation();
              }}>
              Get Current Location
            </button>
      }
    </div>
        </div>
      );
    }
  }


const mapState = state => ({currentLocation: state.currentLocation});

const mapDispatch = dispatch => ({
  onLocation(lat, lng) {
    console.log('LAT', lat, 'LNG', lng)
    dispatch(getCurrentZipcode(lat, lng));
  },
  onTurnOff() {
    dispatch(removeCurrentLocation());
  }
});

export default connect(mapState, mapDispatch)(AllDoctors);

  