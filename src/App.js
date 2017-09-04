import React, { Component } from 'react';
import './normalize.css';
import './skeleton.css';

class App extends Component {
  render() {
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
            <input className="u-max-full-width u-full-width" type="text" placeholder="Enter hashtag here (including the # symbol)"/>
          </div>
          <div className="two columns">
            <button className="button-primary">Run Search</button>
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
              <tr>
                <td>#netneutrality</td>
                <td>99</td>
                <td><a href="/">Link</a></td>
                <td><a href="/">Link</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
