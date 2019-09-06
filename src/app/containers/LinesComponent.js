import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { liftedDispatch } from 'remotedev-app/lib/actions';
import { getActiveInstance } from 'remotedev-app/lib/reducers/instances';


const marginLeft30 = {
  marginLeft: "30px"
}
const firstSection = {
  marginLeft: "40px",
  padding: "10px"
}
var hasOwnProperty = Object.prototype.hasOwnProperty;

const isEmpty = (obj) => {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}


class LinesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linesResponse: {},
      ...props
    }
  }
  
  findGame = (sport,streamingTeams) => {

    return game.teams.every(team => streamingTeams.includes(team.short_name))
  

  } 
  parse

  renderCurrentLines = () => {
    let { liftedContent, linesResponse } = this.state
    console.log(JSON.stringify(linesResponse["nfl"], null, 2))
    console.log(JSON.stringify(liftedContent, null, 2))
    if (liftedContent.subtitle.search(/ncaa/i) !== -1) {
      console.log(JSON.stringify(linesResponse["ncaaf"], null, 2))
    } else if (liftedContent.subtitle.search(/nba/i) !== -1) {
      console.log(JSON.stringify(linesResponse["nba"], null, 2))
    } else if (liftedContent.subtitle.search(/soccer/i) !== -1) {
      
    } else if (liftedContent.subtitle.search(/nfl/i) !== -1) {
      console.log(JSON.stringify(linesResponse["nfl"], null, 2))
    } else if (liftedContent.subtitle.search(/nhl/i) !== -1) {
      console.log(JSON.stringify(linesResponse["nhl"], null, 2))
    } else if (liftedContent.subtitle.search(/mlb/i) !== -1) {
      console.log(JSON.stringify(linesResponse["mlb"], null, 2))
    } else {
      return <p>No lines available for current stream</p>
    }

  }

  componentDidMount(){
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
        .then((json) => {
          console.log(json)
          if(json.league){
            
            let currentResponse = this.state.linesResponse
            currentResponse[json.league.name] = json
            this.setState({ linesResponse:currentResponse})
          }
        })
    }

}
//   componentDidUpdate(prevProps, prevState) {

//     const { liftedState } = this.props;

//     let stateIndex = liftedState.currentStateIndex
//     let currentContent = liftedState.computedStates[stateIndex].state.app.playingStream.content

//     if (currentContent != this.state.liftedContent) {
     
//       this.setState({
//         liftedContent: currentContent
//       })
//       this.setLines()
//     }
//   }
  render() {
    return (
      <div>
      
        <section style={marginLeft30}>
          {!isEmpty(this.state.linesResponse) && this.renderCurrentLines()}
          {/* {this.state.liftedContent &&
            <div style={appStyle}>
              <p>{this.state.liftedContent.name}</p>
              <p>{this.state.liftedContent.date}</p>
              <p>{this.state.liftedContent.subtitle}</p>
              <p>{this.state.liftedContent.time}</p>
            </div>
          } */}
        </section>
        <section style={marginLeft30}>
          <h1>Upcoming Events</h1>

        </section>
        <footer className={'footer'}>

        </footer>

      </div>
    )


  }
}


export default (LinesComponent);
