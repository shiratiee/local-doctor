import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { fetchDoctor } from '../store';


class SingleDoctor extends React.Component {

//   componentDidMount() {
//     this.props.getDoctor(Number(this.props.match.params.id));
//   }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      nextProps.getDoctor(Number(nextProps.match.params.id));
    }
  }

  render () {

    const doctor = this.props.doctor;
    console.log('Doctor Id', doctor.id)
    const qtyArr = new Array(10).fill(0)

    return(
        <div>
            <h1>{doctor.title}  ${doctor.specialities}</h1>
            <img src = {doctor.image}/>

            <div className="product-description">

              <h3>Insurance: {doctor.insurance}</h3>
              <p>{doctor.description}</p>

            </div>

        </div>
    )
  }
}


const mapStateToProps = function (state) {
  return {
     doctor: state.doctor,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctor(id) {dispatch(fetchDoctor(id))},
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SingleDoctor));
