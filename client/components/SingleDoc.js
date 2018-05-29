import React, { Component } from 'react';

class SinglePet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: props.expand,
    };
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ expand: !this.state.expand });
  }

  render() {
    const { doc } = this.props;
    return (
      <div
        id="docCard"
        className={
        this.state.expand
        ? 'expanded'
        : 'collapsed'}
        onClick={this.onClick.bind(this)}
      >
        <div>
          <div id="picContainer">
            <img
              src={
      doc.media.photos
      ? doc.media.photos.photo[3].$t
      : 'http://biorem.org/wp-content/uploads/2016/07/not-available.png'}
              className="docPic rounded"
              alt="doc profile pic"
            />
          </div>
        </div>
        <div>
          <h1>{doc.name.$t}</h1>
        </div>
        <div>
          <p>{doc.description.$t && doc.description.$t.length > 500 ? `${doc.description.$t.slice(0, 500)}...` : doc.description.$t}</p>
        </div>
      </div>
    );
  }
}

export default SingleDoc;