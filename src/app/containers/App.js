import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { liftedDispatch } from 'remotedev-app/lib/actions';
import { getActiveInstance } from 'remotedev-app/lib/reducers/instances';
import LinesComponent from './LinesComponent';


const marginLeft30 = {
  marginLeft: "30px"
}
const firstSection = {
  marginLeft: "40px",
  padding: "10px"
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        linesResponse:{},
      ...props
    }
  }
//   setLines() {
//     let BASE_URL = "https://api.actionnetwork.com/web/v1/scoreboard/"
//     let sports = ["ncaaf", "soccer", "nba", "soccer", "nfl", "nhl", "mlb"]
//     for (var i = 0; i < sports.length; i++) {
//       let sport = sports[i]
//       fetch(BASE_URL + sport, {
//         "credentials": "omit", "headers": { "accept": "application/json", "content-type": "application/json", "sec-fetch-mode": "no-cors" },
//         "referrer": "https://www.actionnetwork.com/nfl/live-odds", "referrerPolicy": "no-referrer-when-downgrade",
//         "body": null, "method": "GET", "mode": "cors"
//       })
//         .then(response => response.json())
//         .then(json => {
//           let sportId = json.league.name
//           let response = {
//             sportId: json
//           }
//           this.setState({ linesResponse: [...this.state.linesResponse, ...response] })

//         })
//     }

//   }
  componentDidUpdate(prevProps, prevState) {

    const { liftedState } = this.props;

    let stateIndex = liftedState.currentStateIndex
    let currentContent = liftedState.computedStates[stateIndex].state.app.playingStream.content

    if (currentContent != this.state.liftedContent) {

      this.setState({
        liftedContent: currentContent
      })
    }
  }
  componentDidMount() {
    let BASE_URL = 'https://api.actionnetwork.com/web/v1/scoreboard/';
    let sports = ['ncaaf', 'soccer', 'nba', 'nfl', 'nhl', 'mlb'];
    for (var i = 0; i < sports.length; i++) {
      let sport = sports[i];
      fetch(BASE_URL + sport, {
        credentials: 'omit',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'sec-fetch-mode': 'no-cors'
        },
        referrer: 'https://www.actionnetwork.com/nfl/live-odds',
        referrerPolicy: 'no-referrer-when-downgrade',
        body: null,
        method: 'GET',
        mode: 'cors'
      })
        .then(response => response.json())
        .then(json => {
            
          if (json.league && (json.games.length > 1)) {
            let currentResponse = this.state.linesResponse;
            currentResponse[json.league.name] = json;
            this.setState({ linesResponse: currentResponse });
          }
        });
    }
  }
  render() {
      const {linesResponse,liftedContent} = this.state

    return (
      <div>
        <header>
          <h1 style={marginLeft30}>ESPN LINES APP</h1>
        </header>
        <section>
          {liftedContent &&
            <div style={firstSection}>
              <p>{this.state.liftedContent.name}</p>
              <p>{this.state.liftedContent.date}</p>
              <p>{this.state.liftedContent.subtitle}</p>
              <p>{this.state.liftedContent.time}</p>
            </div>
          }
        </section>
        { (linesResponse && liftedContent) && <LinesComponent liftedContent={liftedContent} linesResponse={linesResponse}  />}
      </div>
    )


  }
}

App.propTypes = {
  liftedDispatch: PropTypes.func.isRequired,
  liftedState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    
    
  const instances = state.instances;
  const id = getActiveInstance(instances);
  return {
    liftedState: instances.states[id]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    liftedDispatch: bindActionCreators(liftedDispatch, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
