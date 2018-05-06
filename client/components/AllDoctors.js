import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AllDoctors extends React.Component { 
  
render() {
  return (
    <div>
      {
        <div>
              {this.props.doctor.map((doc, i) => (
                <div key={doc.id}>
                  <div>
                    <h1>{`${doc.profile.first_name}`}</h1>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      );
    }
  }

  const mapState = state => ({
    doctor: state.doctor
  });
  
  
  export default connect(mapState)(AllDoctors);
  