import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './Navbar.js'


const Home = (props) => {

  return(
    <Link to='/doctors'>
      <div>
        <h2>This is home</h2>
      </div>
    </Link>
  )

}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}


export default withRouter(connect(mapState)(Home))