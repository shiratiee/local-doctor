import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import Matches from './Matches'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, user} = props
  // const userId = user.id;

  return (
  <div>
     <div className="all-doctors-container">
      <h4>Welcome, {email} </h4>
      <h4>Click below to search a speciality and find a doctor near you!</h4>
        <Link to='/doctors' className="lets-begin">
          <h2>Let's Begin</h2>
        </Link>
     </div> 
  </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
