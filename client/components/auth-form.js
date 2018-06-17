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
    <div className="splash">
      <div className="form animated flipInX login-html">
        <div className="img-container">
        </div>
        <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
        <label htmlFor="tab-1" className="tab">Log In</label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label htmlFor="tab-2" className="tab">Sign Up</label>
        <div className="login-form">
          <div className="sign-in-htm">
          {/*login form*/}
            <form onSubmit={event => handleSubmit(event, type)}>
              <div className="group">
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div className="group">
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
            {/*login form with google*/}
            <div className="social-container">
              <span>or Log in with </span>
              <a href="/auth/google" >
                <FontAwesome name="google" className="social google" />
              </a>
              <a href="/auth/facebook">
                <FontAwesome name="facebook" className="social facebook" />
              </a>
            </div>
          </div>
          <div className="sign-up-htm">
          {/*signup form */}
            <form onSubmit={event => handleSubmit(event, type)}>
              <div className="group">
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div className="group">
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div className="group">
                <label htmlFor="password">
                  <small>Verify Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div className="group">
                <button
                  type="submit"
                  onClick={() => {
                    type = 'signup';
                  }}
                >
                  Sign Up
                </button>
              </div>
              {/* error && error.response && <div> {error.response.data} </div> */}
              <div className="social-container">
              <span>or Sign up with </span>
              <a href="/auth/google" >
                <FontAwesome name="google" className="social google" />
              </a>
              <a href="/auth/facebook" >
                <FontAwesome
                  name="facebook"
                  className="social facebook"
                />
              </a>
            </div>
            </form>        
          </div>
        </div>
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
    const redirect = type === 'login' ? '/' : '/signup';
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
