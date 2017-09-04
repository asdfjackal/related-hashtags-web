import React, { Component } from 'react';
import request from 'request';
import './normalize.css';
import './skeleton.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      results: [],
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.runSearch = this.runSearch.bind(this);
  }

  handleSearchChange(event) {
    this.setState({search: event.target.value});
  }

  runSearch(event){
    const hashtag = this.state.search;
    const options = {
      uri: 'https://tg24proy95.execute-api.us-east-1.amazonaws.com/prod/RelatedHashtags',
      method: 'POST',
      json: {
        "hashtag": hashtag,
      },
    };

    request(options, function (error, response, body) {
      console.log(response);
    });
  }

  render() {
    const tableBody = this.state.results.map((item) =>
      <tr>
        <td>{item.tag}</td>
        <td>{item.count}</td>
        <td><a href="/">Link</a></td>
        <td><a href="/">Link</a></td>
      </tr>
    );

    return (
      <div className="container">
        <br />
        <div className="row">
          <h2>Related Hashtag Search</h2>
          <p>Enter a hashtag and this site will find other hashtags used with the tag your are searching for.</p>
          <p>Search is done using what twitter has determined to be the 100 most relevant tweets associated with the given hashtag from the past 7 days.</p>
        </div>

        <div className="row">
          <div className="ten columns">
            <input className="u-max-full-width u-full-width" type="text" value={this.state.search} placeholder="Enter hashtag here (including the # symbol)" onChange={this.handleSearchChange}/>
          </div>
          <div className="two columns">
            <button className="button-primary" onClick={this.runSearch}>Run Search</button>
          </div>
        </div>


        <div className="row">
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Hashtag</th>
                <th>Instances</th>
                <th>Search</th>
                <th>Combined Search</th>
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
