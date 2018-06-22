import React, { Component } from 'react'

export default class SearchBar extends Component {
  state = {
    searchText: '',
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value})
  }

  onSearchRadius= e => {
    this.setState({ searchRadius: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
    e.currentTarget.reset();
  }

  render() {
    return (
     <form className="all-doctors-container" onSubmit={this.handleSubmit} >
     <label className= "is-hidden" htmlFor="search"><h4>Who are you looking for? Ex. dermatologist</h4></label> 
     <input required type="search"
            onChange={this.onSearchChange}
            name="search"
            placeholder= "Search a Specialty..." />
      <button className= "button" type="submit" value="Submit">Find</button>
      </form>
    );
  }
}