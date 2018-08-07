
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { unMatch, fetchMatches, fetchDocById } from '../store';
import { CardStack, Card } from 'react-cardstack';
import { connect } from 'react-redux';

class Matches extends Component {
  render() {
    return (
      <div>
        <h2 className="matches">Matches</h2>
        <div className="row">
          {this.props.matches.length ?
              this.props.matches.map((data, i) => { 
                console.log(this.props.matches, "THISSSS")
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
                  event.preventDefault(); 
                  this.props.onUnmatch(data.uid, this.props.user.id);
                  }}
                    >	
                    X	
                    </button>
                <h3 style={{ textDecoration: 'underline' }}> {this.props.matches.firstName}
                {this.props.matches.lastName}, {this.props.matches.title} </h3> 
                <img className="doc-image" src={this.props.matches.image_url} />
                <br></br>
                <br></br>
                <span style={{ textDecoration: 'underline' }}> Address </span>
                <p>
                  {this.props.matches.street} <br></br>
                  {this.props.matches.city}, {this.props.matches.state} <br></br>
                </p> 
                <span style={{ textDecoration: 'underline' }}>Phone Number </span> 
                {this.props.matches.phoneNum.length ?
                   <p>{this.props.matches.phoneNum}</p>
                   : <p>None Provided</p>}
              <span style={{ textDecoration: 'underline' }}>Website </span> 
                {this.props.matches.website ? 
               <p> <a href={this.props.matches.website}> Click here for website</a></p>
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
                
              : <h2 className="no-match">NO MATCHES!</h2>
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
  onload() {
    dispatch(fetchDocById)
  },
  onUnmatch(docId, userId) {
    if (window.confirm(`Are you sure you want to delete this doctor?`))
      dispatch(unMatch(docId, userId));
  }
});

export default connect(mapState, mapDispatch)(Matches);