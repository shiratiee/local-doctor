import React, { Component } from 'react'

export default class SearchBar extends Component {

  state = {
    searchText: ''
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
    e.currentTarget.reset();
  }

  render() {
    return (
     <form className = "search-form" onSubmit={this.handleSubmit} >
     <label className= "is-hidden" htmlFor="search">Search</label>
     <input type="search"
            onChange={this.onSearchChange}
            name="search"
            placeholder= "Search..." />
      <button type="submit" value="Submit"/>
      </form>
    );
  }
}