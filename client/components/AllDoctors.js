import React from 'react'
import { connect } from 'react-redux';


export default class AllDoctors extends React.Component { 
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     doctors :[]
  //   };
  // }


  // componentDidMount() {
  //   fetch("https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=6ffaf2f592ca4029cf614bb4bf313be5")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //           console.log(result);
  //         this.setState({
  //           doctors: result.data
  //         });
  //       });
  //       }

        

  
render() {
  return (
    <div>
      {
        <div>
              {this.props.doctor.map((doc, i) => (
                <div key={doc.id}>
                  <div>
                    <h1>{`${i + 1}. ${doc.specialties}`}</h1>
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
  