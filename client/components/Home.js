import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './Navbar.js'



const Home = (props) => {

  return(
    <div>
    <h4 className="all-doctors-container">Welcome to Local Doctor, click below to search a speciality and find a doctor near you!</h4>
    <Link to='/doctors' className="lets-begin">
      <div>
        <h2>Let's Begin</h2>
      </div>
    </Link>
    </div> 
  )

}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}


export default withRouter(connect(mapState)(Home))