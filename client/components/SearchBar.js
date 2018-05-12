import React, { Component } from 'react'

export default class SearchBar extends Component {
  state = {
    searchText: '',
    searchRadius: ''
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value})
  }

  onSearchRadius= e => {
    this.setState({ searchRadius: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText, this.state.searchRadius);
    e.currentTarget.reset();
  }

  render() {
    return (
     <form className = "search-form" onSubmit={this.handleSubmit} >
     <label className= "is-hidden" htmlFor="search">Search a Specialty</label> <br></br>
     <input type="search"
            onChange={this.onSearchChange}
            name="search"
            placeholder= "Specialty..." />
      <input type="search"
            onChange={this.onSearchRadius}
            name="search"
            placeholder= "Lat, Long, Search Radius" />
      <button className= "button" type="submit" value="Submit">Go!</button>
      </form>
    );
  }
}