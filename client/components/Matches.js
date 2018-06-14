
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { unMatch } from '../store';
import { CardStack, Card } from 'react-cardstack';
import { connect } from 'react-redux';

class Matches extends Component {
  render() {
    return (
      <div>
        <h1>Matches</h1>
        <div className="matchesList">
          {this.props.matches.length ?
              this.props.matchDocs.map(data => { 
                return ( 
                docId &&
                <div key={doc.id.$t} className="matches docCard">
                <CardStack
                height={500}
                width={280}
                background='#c7b1c7'
                hoverOffset={25}>

                <Card background='#c7b1c7'>
                <h3 style={{ textDecoration: 'underline' }}> {data.profile.first_name}
                {data.profile.last_name}, {data.profile.title} </h3> 
                <img className="doc-image" src={data.profile.image_url} />
                <br></br>
                <br></br>
                <span style={{ textDecoration: 'underline' }}> Address </span>
                <p>
                  {data.practices[0].visit_address.street} <br></br>
                  {data.practices[0].visit_address.city}, {data.practices[0].visit_address.state} <br></br>
                </p> 
                <span style={{ textDecoration: 'underline' }}>Phone Number </span> 
                {data.practices[0].phones.length ?
                   <p>{data.practices[0].phones[0].number}</p>
                   : <p>None Provided</p>}
              <span style={{ textDecoration: 'underline' }}>Website </span> 
                {data.practices[0].website ? 
               <p> <a href={data.practices[0].website}> Click here for website</a></p>
                : <p>None Provided</p>}
                </Card>

                <Card background='#8b9dc3'>
                <h3 style={{ textDecoration: 'underline' }}> Accepted Insurances </h3>
                
                {data.insurances.length 
                  ? data.insurances.map(insurance => insurance.insurance_provider.name).join(', ').slice(0,790)+"..."
                  : <span>No insurance listed. Contact doctor for more information.</span> }
                
                </Card>
                </CardStack>    
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
  user: state.user,
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