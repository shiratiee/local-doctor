import React, { Component } from 'react'

export default class SearchBar extends Component {
  state = {
    searchText: '',
    searchZipcode: ''
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value})
  }

  onSearchRadius= e => {
    this.setState({ searchRadius: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText, this.state.searchZipcode);
    e.currentTarget.reset();
  }

  render() {
    return (
     <form className = "search-form" onSubmit={this.handleSubmit} >
     <label className= "is-hidden" htmlFor="search"><h4>Who are you looking for? Ex. dermatologist</h4></label> 
     <input type="search"
            onChange={this.onSearchChange}
            name="search"
            placeholder= "Search a Specialty..." />
      <button className= "button" type="submit" value="Submit">Find</button>
      </form>
    );
  }
}