import React, { Component } from 'react';
import request from 'request';
import './normalize.css';
import './skeleton.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      cachedSearch: '',
      results: [],
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.runSearch = this.runSearch.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  handleSearchChange(event) {
    this.setState({search: event.target.value});
  }

  runSearch(event){
    event.preventDefault();
    const hashtag = this.state.search;
    this.setState({cachedSearch: hashtag})
    const options = {
      uri: 'https://tg24proy95.execute-api.us-east-1.amazonaws.com/prod/RelatedHashtags',
      method: 'POST',
      body: JSON.stringify({
        "hashtag": hashtag,
      }),
    };

    request(options, this.handleResponse);
  }

  handleResponse(error, response, body){
    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body);
      const data = Object.keys(result).map((key) => {
        return {
          tag: key,
          count: result[key],
        };
      });
      data.sort((a,b) => {
        return b.count - a.count;
      });
      this.setState({results: data});
    }
  }

  removeHashtag(input) {
    if(input.charAt(0) === '#'){
      return input.slice(1);
    }
    return input;
  }

  render() {
    const search = this.state.cachedSearch;
    const tableBody = this.state.results.map((item) =>
      <tr>
        <td>{item.tag}</td>
        <td>{item.count}</td>
        <td><a target="_blank" href={'https://twitter.com/search?q=%23' + this.removeHashtag(item.tag)}>{item.tag}</a></td>
        <td><a target="_blank" href={'https://twitter.com/search?q=%23' + this.removeHashtag(item.tag) + '%20%23' + this.removeHashtag(search)}>{item.tag + ' + ' + search}</a></td>
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
          <form>
            <div className="ten columns">
              <input className="u-max-full-width u-full-width" type="text" value={this.state.search} placeholder="Enter hashtag here (including the # symbol)" onChange={this.handleSearchChange}/>
            </div>
            <div className="two columns">
              <input className="button-primary" type="submit" value="Run Search" onClick={this.runSearch} />
            </div>
          </form>
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

        <!-- Piwik -->
        <script type="text/javascript">
          var _paq = _paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//174.138.35.28/";
            _paq.push(['setTrackerUrl', u+'piwik.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
          })();
        </script>
        <!-- End Piwik Code -->
      </div>
    );
  }
}

export default App;
