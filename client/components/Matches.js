
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
                      hoverOffset={25}
                      >
                        <Card background='#c7b1c7'>
                        <button	
                          onClick={(event) => {
                            event.preventDefault(); 
                            this.props.onUnmatch(
                            this.props.matches.id, 
                            this.props.user.id,
                            this.props.matches.firstName,
                            this.props.matches.lastName,
                            this.props.matches.title,
                            this.props.matches.image_url,
                            this.props.matches.street,
                            this.props.matches.city,
                            this.props.matches.state,
                            this.props.matches.phoneNum,
                            this.props.matches.website,
                            data.insurances.map(insurance => insurance.insurance_provider.name).join(', ').slice(0,790)+"..."
                            );
                          }}
                          >	
                          X	
                        </button>
                        <h3 style={{ textDecoration: 'underline' }}> 
                        {this.props.matches[i].firstName}
                        {this.props.matches[i].lastName}, {this.props.matches[i].title} 
                        </h3> 
                        <img className="doc-image" src={this.props.matches[i].image_url} />
                        <br></br>
                        <br></br>
                        <span style={{ textDecoration: 'underline' }}>Address</span>
                        <p>
                          {this.props.matches[i].street} <br></br>
                          {this.props.matches[i].city}, {this.props.matches[i].state}<br></br>
                        </p> 
                        <span style={{ textDecoration: 'underline' }}>Phone Number</span> 
                        {this.props.matches[i].phoneNum 
                          ? <p>{this.props.matches[i].phoneNum}</p>
                          : <p>None Provided</p>}
                      <span style={{ textDecoration: 'underline' }}>Website </span> 
                        {this.props.matches[i].website 
                          ? <p> 
                              <a href={this.props.matches[i].website}> Click here for website</a>
                            </p>
                          : <p>None Provided</p>}
                        </Card>

                        <Card background='#8b9dc3'>
                        <h3 style={{ textDecoration: 'underline' }}> Accepted Insurances </h3>

                        {data.insurances
                          ? this.props.matches[i].insurances
                          : <span>No insurance listed. Contact doctor for more information.</span>}
                      </Card>
                </CardStack>    
              </li>
            </ul>  
          </div>
        )
      }) : 
          <h2 className="no-match">NO MATCHES!</h2>
    }
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  matches: state.matches
});

const mapDispatch = dispatch => ({
  onload() {
    dispatch(fetchDocById)
  },
  onUnmatch(docId, userId, firstName, lastName, title, image_url, street, city, state, phoneNum, website, insurances) {
    if (window.confirm(`Are you sure you want to delete this doctor?`))
      dispatch(unMatch(docId, userId, firstName, lastName, title, image_url, street, city, state, phoneNum, website, insurances));
  }
});

export default connect(mapState, mapDispatch)(Matches);