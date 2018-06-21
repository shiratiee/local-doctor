
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { unMatch, fetchMatches } from '../store';
import { CardStack, Card } from 'react-cardstack';
import { connect } from 'react-redux';

class Matches extends Component {
  render() {
    return (
      <div>
        <h1>Matches</h1>
        <div className="row">
          {this.props.matches.length ?
              this.props.matchdocs.map((data, i) => { 
                console.log(this.props.matchdocs, "THISSSS")
                return ( 
                <div key={i}>
                <ul className="doctor">
                <li>
                <CardStack
                height={500}
                width={280}
                background='#c7b1c7'
                hoverOffset={25}>

                <Card background='#c7b1c7'>
                <button	
                onClick={(event) => {
                  event.preventDefault(); this.props.onUnmatch(pet, this.props.user.id);
                  }}
                    >	
                    X	
                    </button>
                <h3 style={{ textDecoration: 'underline' }}> {data.data.profile.first_name}
                {data.data.profile.last_name}, {data.data.profile.title} </h3> 
                <img className="doc-image" src={data.data.profile.image_url} />
                <br></br>
                <br></br>
                <span style={{ textDecoration: 'underline' }}> Address </span>
                <p>
                  {data.data.practices[0].visit_address.street} <br></br>
                  {data.data.practices[0].visit_address.city}, {data.data.practices[0].visit_address.state} <br></br>
                </p> 
                <span style={{ textDecoration: 'underline' }}>Phone Number </span> 
                {data.data.practices[0].phones.length ?
                   <p>{data.data.practices[0].phones[0].number}</p>
                   : <p>None Provided</p>}
              <span style={{ textDecoration: 'underline' }}>Website </span> 
                {data.data.practices[0].website ? 
               <p> <a href={data.data.practices[0].website}> Click here for website</a></p>
                : <p>None Provided</p>}
                </Card>

                <Card background='#8b9dc3'>
                <h3 style={{ textDecoration: 'underline' }}> Accepted Insurances </h3>
                
                {data.data.insurances.length 
                  ? data.data.insurances.map(insurance => insurance.insurance_provider.name).join(', ').slice(0,790)+"..."
                  : <span>No insurance listed. Contact doctor for more information.</span> }
                
                </Card>
                </CardStack>    
                </li>
                </ul>  
                </div>
                
                )

              })
                
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
  matchdocs: state.matchdocs
});

const mapDispatch = dispatch => ({
  loadMatches(id) {
    dispatch(fetchMatches(id));
  },
  onUnmatch(doc, userId) {
    if (window.confirm(`Are you sure you want to delete ${data.data.profile.first_name}?`))
      dispatch(unMatch(data.uid, userId));
  }
});

export default connect(mapState, mapDispatch)(Matches);