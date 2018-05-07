import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'

class AllDoctors extends React.Component { 
constructor(props) {
  super(props);
     this.state = {
      doctors :[]
        };
     }
    
      performSearch = (query) => {
        fetch(`https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=6ffaf2f592ca4029cf614bb4bf313be5`)
        .then(res => res.json())
          .then(
            (result) => { 
              console.log(result)
              this.setState({
                doctors: result.data
              })
            });
            }
  
render() {
  return (
    // <div>
    <SearchBar onSearch={this.performSearch}/>  
      // {
      //   <div>
      //         {this.state.doctors.map((doc, i) => (
      //           <div key={doc.id}>
      //             <div>
      //             <h1>{`${doc.profile.first_name}`}</h1>
      //             </div>
      //           </div>
      //         ))}
      //       </div>
      //     }
        // </div>
      );
    }
  }

  const mapState = state => ({
    doctor: state.doctor
  });
  
  
  export default connect(mapState)(AllDoctors);
  