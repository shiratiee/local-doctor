import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'
import { CardStack, Card } from 'react-cardstack';
import {addMatches } from '../store';
const Loading = require('react-loading-animation');


class AllDoctors extends React.Component { 
constructor(props) {
  super(props);
     this.state = {
      doctors :[],
      latLng: [],
      geolocationOn: false,
      loading: false,
      nomatch: false,
        }
        this.getLocation = this.getLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
     }

     getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.errorHandler)
        this.setState({geolocationOn: true, loading: true});
      } else {
        console.log('geolocation IS NOT available');
      }
    }
  
    showPosition(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      this.setState({
        latLng: [latitude, longitude],
        loading: false
      });
      this.props.onLocation(this.state.latLng[0], this.state.latLng[1]);
    }
    errorHandler(err) {
      console.log('getCurrentPosition Error:', err);
    }



performSearch = (query) => { 
  this.setState({loading: true})
  fetch(`https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${query}&location=${this.state.latLng[0]},${this.state.latLng[1]},100&user_location=${this.state.latLng[0]},${this.state.latLng[1]}&skip=0&limit=20&user_key=6ffaf2f592ca4029cf614bb4bf313be5`)
  .then(res =>res.json())
  .then((res) => {
    console.log(res)
    this.setState({doctors: res.data,loading: false})
    console.log(this.state.doctors)
    res.data.length 
    ? this.setState({nomatch: false}) 
    : this.setState({nomatch: true})
  })
  .catch((error) => {
    console.log('Request failed', error)
  })
}

  
render() {
  const { onLove, user } = this.props
  return (
    <div>
    <div className="all-doctors-container">
    { !this.state.geolocationOn 
      ? <h4> Find a doctor near you! Click "Get Current Location" button below before searching. </h4>
      : <span></span>
    }
    {
      this.state.geolocationOn
        ?  this.state.loading 
          ? <Loading/> 
          : <SearchBar onSearch={this.performSearch}/>  
        : <button className='geoLoc' onClick={(e) => {
            e.preventDefault();
            this.getLocation();
          }}>
          Get Current Location
          </button>
    }
  </div>
 
      {  
        <div className="row">
       {    !this.state.nomatch ?
              this.state.doctors.map((data, i) => (
                <div key ={i}>
                  <ul className="doctor">
                    <li>
                    <CardStack
	                  height={500}
                    width={280}
	                  background='#c7b1c7'
	                  hoverOffset={25}>

                    <Card background='#c7b1c7'>
                    <button	
                    onClick={() => { onLove(data.uid,user.id,data.profile.first_name,data.profile.last_name,data.profile.title,data.profile.image_url,data.practices[0].visit_address.street,data.practices[0].visit_address.city,data.practices[0].visit_address.state,data.practices[0].phones[0].number,data.practices[0].website)}}
                    >	
                    Save Doctor Info 	
                    </button>
                    <h3 style={{ textDecoration: 'underline' }}> {data.profile.first_name}
                    {data.profile.last_name}, {data.profile.title} </h3> 
                    <img className="doc-image" src={data.profile.image_url} />
                    <br></br>
                    <br></br>
                    <span style={{ textDecoration: 'underline' }}> Address </span>
                    <p>
                      {data.practices[0].visit_address.street} <br></br>
                      {data.practices[0].visit_address.city}, {data.practices[0].visit_address.state} <br></br>
                    </p> 
                    <span style={{ textDecoration: 'underline' }}>Phone Number </span> 
                    {data.practices[0].phones.length 
                      ? <p>{data.practices[0].phones[0].number}</p>
                      : <p>None Provided</p>}
                  <span style={{ textDecoration: 'underline' }}>Website </span> 
                    {data.practices[0].website 
                      ? <p> <a href={data.practices[0].website}> Click here for website</a></p>
                      : <p>None Provided</p>}
                    </Card>

                    <Card background='#8b9dc3'>
                    <h3 style={{ textDecoration: 'underline' }}> Accepted Insurances </h3>
                    
                    {data.insurances.length 
                      ? data.insurances.map(insurance => insurance.insurance_provider.name).join(', ').slice(0,790)+"..."
                      : <span>No insurance listed. Contact doctor for more information.</span> }
                    
                    </Card>
                    </CardStack>    
                      </li>
                    </ul>  
                    
                </div>
              ))
              : <h2 className="no-match">NO RESULTS FOUND! TRY ANOTHER SEARCH.</h2>
          }
            </div>
          }
        
        </div>
        
      );
    
    }
  }


const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  onLocation(lat, lng) {
    console.log('LAT', lat, 'LNG', lng)
  },
  onLove(docId, userId, firstName, lastName, title, image_url, street,city,state,phoneNum,website) {
    console.log('docId', docId, 'userId', userId, 'firstName', firstName)
    if (!userId) {window.confirm('You must login to save doctor information')
    } else { 
     window.confirm(`Are you sure you want to add this doctor to your profile?`)        
     dispatch(addMatches(docId, userId, firstName, lastName, title, image_url, street,city,state,phoneNum,website));
   }
  }
});

export default connect(mapState, mapDispatch)(AllDoctors);
