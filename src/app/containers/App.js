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
      ...props
    }
  }
  setLines() {
    let BASE_URL = "https://api.actionnetwork.com/web/v1/scoreboard/"
    let sports = ["ncaaf", "soccer", "nba", "soccer", "nfl", "nhl", "mlb"]
    for (var i = 0; i < sports.length; i++) {
      let sport = sports[i]
      fetch(BASE_URL + sport, {
        "credentials": "omit", "headers": { "accept": "application/json", "content-type": "application/json", "sec-fetch-mode": "no-cors" },
        "referrer": "https://www.actionnetwork.com/nfl/live-odds", "referrerPolicy": "no-referrer-when-downgrade",
        "body": null, "method": "GET", "mode": "cors"
      })
        .then(response => response.json())
        .then(json => {
          let sportId = json.league.name
          let response = {
            sportId: json
          }
          this.setState({ linesResponse: [...this.state.linesResponse, ...response] })

        })
    }

  }


  renderCurrentLines = () => {
    let { liftedContent, linesResponse } = this.state
    console.log(liftedContent)
    console.log(JSON.stringify(linesResponse["nfl"].games[0], null, 2))
    if (liftedContent.subtitle.search(/ncaa/i) !== -1) {
      console.log(JSON.stringify(linesResponse["ncaaf"], null, 2))
    } else if (liftedContent.subtitle.search(/nba/i) !== -1) {
      console.log(JSON.stringify(linesResponse["nba"], null, 2))
    } else if (liftedContent.subtitle.search(/soccer/i) !== -1) {
      console.log(JSON.stringify(linesResponse["soccer"], null, 2))
    } else if (liftedContent.subtitle.search(/nfl/i) !== -1) {
      console.log(JSON.stringify(linesResponse["nfl"], null, 2))
    } else if (liftedContent.subtitle.search(/nhl/i) !== -1) {
      console.log(JSON.stringify(linesResponse["nhl"], null, 2))
    } else if (liftedContent.subtitle.search(/mlb/i) !== -1) {
      console.log(JSON.stringify(linesResponse["mlb"], null, 2))
    } else {
      return <h1>No lines available for current stream</h1>
    }

  }



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
  render() {
    return (
      <div>
        <header>
          <h1 style={marginLeft30}>ESPN Lines APP</h1>
        </header>
        <section>
          {this.state.liftedContent &&
            <div style={firstSection}>
              <p>{this.state.liftedContent.name}</p>
              <p>{this.state.liftedContent.date}</p>
              <p>{this.state.liftedContent.subtitle}</p>
              <p>{this.state.liftedContent.time}</p>
            </div>
          }
        </section>
        {this.state.liftedContent && <LinesComponent liftedContent={this.state.liftedContent}/> }
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
