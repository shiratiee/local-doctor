import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { unMatch } from '../store';
import SinglePet from './SingleDoc';

class MatchSingle extends Component {
  render() {
    const searchDoc = this.props.match.params.docId;
    const docDetail = this.props.matchDocs.filter(matchDoc => { if (matchDoc.id !== undefined) return matchDoc.id.$t === searchDoc })[0];
    return (
      <div className="flex">
        <div id="singleMatchContainer">
          {this.props.matchDocs.length ? (
            <div>
              <button
                className="unmatch largeIconLeft"
                onClick={(event) => {
                event.preventDefault();
                this.props.onUnmatch(
                  docDetail,
                  this.props.currentUser.id,
                );
              }}
              >
                <FontAwesome name="heart" />
                <FontAwesome name="remove" />
              </button>
              <SingleDoc doc={docDetail} />
            </div>
        ) : (
          <p>Loading</p>
        )}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
  matchDocs: state.matchDocs,
  matches: state.matches
});

const mapDispatch = (dispatch, ownProps) => ({
  onUnmatch(pet, userId) {
    if (window.confirm(`Are you sure you want to delete your match with ${doc.name.$t}?`))
    dispatch(unMatch(doc.id.$t, userId));
    ownProps.history.push('/matches');
  },
});

export default connect(mapState, mapDispatch)(MatchSingle);
