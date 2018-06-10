
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
                docId &&
                <div key={doc.id.$t} className="matches docCard">
                    <img
                      src={data.profile.image_url.$t}
                    />
                    <button
                      className="unmatch smallIcon"
                      onClick={(event) => {
                      event.preventDefault(); this.props.onUnmatch(doc, this.props.user.id);
              }}
                    >
                      <FontAwesome name="heart" />
                      <FontAwesome name="remove" />
                    </button>
                    <div id="docInfo">
                      <h1>{doc.name}</h1>
                      <h2>{doc.bio}</h2>
                    </div>
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
  matchDocs: state.matchDocs,
});

const mapDispatch = dispatch => ({
  onUnmatch(doc, userId) {
    if (window.confirm(`Are you sure you want to delete ${doc.name.$t}?`))
      dispatch(unMatch(doc.id.$t, userId));
  }
});

export default connect(mapState, mapDispatch)(Matches);