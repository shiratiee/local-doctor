import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchDoctors, fetchDoctor} from '../store';

export class Searchbar extends Component {
constructor(props) {
  super(props);
  this.state = {
    doctorNames: [],
    query: ''
  }
  this.getDoctorNames = this.getDoctorNames.bind(this);
  this.handleInput = this.handleInput.bind(this);
  this.handleNewRequest = this.handleNewRequest.bind(this);
  this.clearQuery = this.clearQuery.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

componentWillReceiveProps(newProps) {
  if (newProps !== this.props ) {
    this.props = newProps;
  }
}


handleInput(query) {
  this.setState({
    query: query
  });
}

handleNewRequest() {
  this.setState({
    query: this.state.query
  });
}

clearQuery() {
  this.setState({
    query: ''
  })
}

handleSubmit(event) {
  event.preventDefault();

  let doctors = this.props.doctors;
  for (let i = 0; i < doctors.length; i++) {
    if (this.state.query === doctors[i].title) {
      this.context.router.history.push(`/doctors/${doctors[i].id}`);
    }
  }
  this.clearQuery();
  }

getDoctorNames(doctors) {
  let doctorNames = [];
  for (let i = 0; i < doctors.length; i++) {
    doctorNames.push(doctors[i].title);
  }
  return doctorNames;
}


render() {
  const doctorNames = this.getDoctorNames(this.props.doctors)

  const filteredDoctors = this.props.doctors.filter(
            doctor => doctor.title.toLowerCase().match(this.state.query.toLowerCase()));
  return (
    <div className="container">
      <form onSubmit={ this.handleSubmit }>
        <AutoComplete
          hintText="Type in a symptom here to find doctors who can treat you"
          filter={ AutoComplete.fuzzyFilter }
          dataSource={ doctorNames }
          floatingLabelText="Search"
          searchText={this.state.query}
          onUpdateInput={this.handleInput}
          onNewRequest={this.handleNewRequest}
          fullWidth={ true }
        />
      </form>
      <br />
    </div>
  )
}
}

Searchbar.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
return {
  products: state.products
}
}


export default withRouter(connect(mapStateToProps, null)(Searchbar));