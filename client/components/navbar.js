import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AllDoctors from './AllDoctors';
import UserHome from './user-home';


const Navbar = ({ handleClick, isLoggedIn, children }) => (
    <div>
        {
          isLoggedIn
            ? <div>
            <nav>
              {/* The navbar will show these links after you log in */}
              <User-home />
              <Link to="/">Home</Link>
              <Link to="/matches">Profile</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </nav>
            <h1><img className="icon" src="/doc-icon.png" />LocalDoctor</h1>
            </div>
            : <div>
            <nav>
              {/* The navbar will show these links before you log in */}
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </nav>
            <h1><img className="icon" src="/doc-icon.png" />LocalDoctor</h1>
            </div>
        }
      {children}
    </div>
  )


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
