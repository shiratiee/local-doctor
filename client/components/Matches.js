
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { unMatch } from '../store';
import { connect } from 'react-redux';

class Matches extends Component {
  render() {
    return (
      <div>
        <h1>Matches</h1>
        <div className="matchesList">
          {this.props.matches.length ?
              this.props.matchDocs.map(doc => { 
                return ( 
                doc.id &&
                <div key={doc.id.$t} className="matches docCard">
                  <Link to={`matches/${doc.id.$t}`}>
                    <img
                      src={
                doc.media.photos
                ? doc.media.photos.photo[3].$t
                : 'http://biorem.org/wp-content/uploads/2016/07/not-available.png'}
                      className="docPic rounded"
                      alt="doc profile pic"
                    />
                    <button
                      className="unmatch smallIcon"
                      onClick={(event) => {
              event.preventDefault(); this.props.onUnmatch(doc, this.props.currentUser.id);
              }}
                    >
                      <FontAwesome name="heart" />
                      <FontAwesome name="remove" />
                    </button>
                    <div id="docInfo">
                      <h1>{doc.name.$t}</h1>
                      <h2>{doc.bio.$t}</h2>
                    </div>
                  </Link>
                </div>
                )})
              : <p>NO MATCHES!</p>
          }
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
  matches: state.matches,
  matchPets: state.matchPets,
});

const mapDispatch = dispatch => ({
  onUnmatch(pet, userId) {
    if (window.confirm(`Are you sure you want to delete your match with ${pet.name.$t}?`))
      dispatch(unMatch(pet.id.$t, userId));
  },
  onClick(user, pet) {
    sendEmail(user, pet);
  },
});

export default connect(mapState, mapDispatch)(Matches);