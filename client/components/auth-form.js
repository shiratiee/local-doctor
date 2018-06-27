import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, fetchMatches} from '../store'
import { withRouter } from 'react-router';
import FontAwesome from 'react-fontawesome';

const AuthForm = (props) => {
  const { handleSubmit } = props;
  let type;
  return (
    <div className='main-auth'>
      <div className="auth-form">
          {/*login form*/}
            <form onSubmit={event => handleSubmit(event, type)}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div className="group">
                <button
                  type="submit"
                  onClick={() => {
                    type = 'login';
                  }}
                >
                  Log In
                </button>

              </div>
            </form>
          </div>
          <div className="auth-form">
          {/*signup form */}
            <form onSubmit={event => handleSubmit(event, type)}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Verify Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={() => {
                    type = 'signup';
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>        
          </div>
      </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapState = state => ({
  error: state.user.error,
});


const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt, type) {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const redirect = type === 'login' ? '/' : '/';
    Promise.resolve(dispatch(auth(email, password, type))).then((res) => {
      ownProps.history.push(redirect)
      dispatch(fetchMatches(res))
    });
  },
});



export const Login = withRouter(connect(mapState, mapDispatch)(AuthForm));

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
