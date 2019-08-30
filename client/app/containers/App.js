import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { liftedDispatch, getReport } from '../actions';
import { getActiveInstance } from '../reducers/instances';


const books = {"books":[{"id":67,"display_name":"SIConsensus","source_name":"siconsensus","logo_url":null},{"id":53,"display_name":"Don Best Consensus","source_name":"donbestconsensus","logo_url":null},{"id":30,"display_name":"Open","source_name":"open","logo_url":null},{"id":45,"display_name":"SportsInteraction","source_name":"sportsinteraction","logo_url":null},{"id":37,"display_name":"Sportbet","source_name":"sportbet","logo_url":null},{"id":55,"display_name":"5Dimes","source_name":"5dimes","logo_url":null},{"id":27,"display_name":"Carib","source_name":"carib","logo_url":null},{"id":11,"display_name":"Sportsbook","source_name":"sportsbook.com","logo_url":null},{"id":7,"display_name":"BetUs","source_name":"betus","logo_url":null},{"id":23,"display_name":"ABC Islands","source_name":"abcislands","logo_url":null},{"id":21,"display_name":"Bovada","source_name":"bovada","logo_url":null},{"id":35,"display_name":"Matchbook","source_name":"matchbook","logo_url":null},{"id":14,"display_name":"Westgate","source_name":"westgate","logo_url":null},{"id":18,"display_name":"Stations","source_name":"stations","logo_url":null},{"id":19,"display_name":"MGM Mirage","source_name":"mgmmirage","logo_url":null},{"id":13,"display_name":"Caesars","source_name":"caesars","logo_url":null},{"id":47,"display_name":"Golden Nugget","source_name":"golden nugget","logo_url":null},{"id":1,"display_name":"BetOnline","source_name":"betonline","logo_url":null},{"id":34,"display_name":"Bookmaker","source_name":"bookmaker","logo_url":null},{"id":36,"display_name":"JazzSports","source_name":"jazzsports","logo_url":null},{"id":42,"display_name":"Bet Mania","source_name":"bet mania","logo_url":null},{"id":24,"display_name":"Bet365","source_name":"bet365","logo_url":null},{"id":5,"display_name":"Betcris","source_name":"betcris","logo_url":null},{"id":33,"display_name":"The Greek Sportsbook","source_name":"thegreeksportsbook","logo_url":null},{"id":32,"display_name":"Wynn","source_name":"wynn","logo_url":null},{"id":48,"display_name":"IASprt","source_name":"iasprt","logo_url":null},{"id":39,"display_name":"BetDSI","source_name":"betdsi","logo_url":null},{"id":2,"display_name":"JustBet","source_name":"justbet","logo_url":null},{"id":16,"display_name":"Heritage","source_name":"heritage","logo_url":null},{"id":9,"display_name":"YouWager","source_name":"youwager","logo_url":null},{"id":62,"display_name":"VietBet","source_name":"vietbet","logo_url":null},{"id":56,"display_name":"Lowvig","source_name":"lowvig","logo_url":null},{"id":28,"display_name":"Sportsbetting","source_name":"sportsbetting","logo_url":null},{"id":15,"display_name":"Consensus","source_name":"consensus","logo_url":null},{"id":49,"display_name":"WillHill","source_name":"willhill","logo_url":null},{"id":4,"display_name":"Interops","source_name":"intertops","logo_url":null},{"id":59,"display_name":"Carbon","source_name":"carbon","logo_url":null},{"id":61,"display_name":"TopBet","source_name":"topbet","logo_url":null},{"id":50,"display_name":"GTBets","source_name":"gtbets","logo_url":null},{"id":31,"display_name":"South Point","source_name":"south point","logo_url":null},{"id":46,"display_name":"Treasure Island","source_name":"treasure island","logo_url":null},{"id":43,"display_name":"Jerry's Nugget","source_name":"jerry's nugget","logo_url":null},{"id":8,"display_name":"MyBookie","source_name":"mybookie","logo_url":null},{"id":68,"display_name":"DraftKings","source_name":"draftkings","logo_url":"https://static.sprtactn.co/assets/upload/840823_dk%20icon.png"},{"id":10,"display_name":"IslandCasino","source_name":"islandcasino","logo_url":null},{"id":64,"display_name":"Nitrogen","source_name":"nitrogen","logo_url":null},{"id":52,"display_name":"Loose Lines","source_name":"looselines","logo_url":null},{"id":69,"display_name":"FanDuel","source_name":"fanduel","logo_url":"https://static.sprtactn.co/assets/upload/733955_Icon.png"},{"id":70,"display_name":"NJ Consensus","source_name":"njconsensus","logo_url":null},{"id":73,"display_name":"BetStars","source_name":"njbetstars","logo_url":null},{"id":25,"display_name":"Coasts Casino","source_name":"coasts casino","logo_url":null},{"id":6,"display_name":"CG Technology","source_name":"cgtechnology","logo_url":null},{"id":71,"display_name":"Sugar House","source_name":"njsugarhouse","logo_url":null},{"id":72,"display_name":"888Sport","source_name":"nj888sport","logo_url":null},{"id":77,"display_name":"Rivers Casino","source_name":"pariverscasino","logo_url":null},{"id":76,"display_name":"PointsBet","source_name":"njpointsbet","logo_url":"https://assets.actionnetwork.com/444690_pb_square_logo.png"},{"id":75,"display_name":"PlayMGM","source_name":"njplaymgm","logo_url":null},{"id":74,"display_name":"Parx","source_name":"paparx","logo_url":null},{"id":78,"display_name":"Circa","source_name":"circa","logo_url":null},{"id":3,"display_name":"Pinnacle","source_name":"pinnacle","logo_url":null},{"id":29,"display_name":"SBG","source_name":"sbg","logo_url":null}]}

class App extends Component {



  getLines(){

    fetch("https://api.actionnetwork.com/web/v1/scoreboard/ncaaf",
     {"credentials":"omit","headers":{"accept":"application/json","content-type":"application/json","sec-fetch-mode":"no-cors"},
     "referrer":"https://www.actionnetwork.com/nfl/live-odds","referrerPolicy":"no-referrer-when-downgrade",
     "body":null,"method":"GET","mode":"cors"}).then(res => res.json()).then(json =>console.log(json));

     fetch("https://api.actionnetwork.com/web/v1/scoreboard/mba",
     {"credentials":"omit","headers":{"accept":"application/json","content-type":"application/json","sec-fetch-mode":"no-cors"},
     "referrer":"https://www.actionnetwork.com/nfl/live-odds","referrerPolicy":"no-referrer-when-downgrade",
     "body":null,"method":"GET","mode":"cors"}).then(res => res.json()).then(json =>console.log(json));

     fetch("https://api.actionnetwork.com/web/v1/scoreboard/soccer",
     {"credentials":"omit","headers":{"accept":"application/json","content-type":"application/json","sec-fetch-mode":"no-cors"},
     "referrer":"https://www.actionnetwork.com/nfl/live-odds","referrerPolicy":"no-referrer-when-downgrade",
     "body":null,"method":"GET","mode":"cors"}).then(res => res.json()).then(json =>console.log(json));

     fetch("https://api.actionnetwork.com/web/v1/scoreboard/nfl",
     {"credentials":"omit","headers":{"accept":"application/json","content-type":"application/json","sec-fetch-mode":"no-cors"},
     "referrer":"https://www.actionnetwork.com/nfl/live-odds","referrerPolicy":"no-referrer-when-downgrade",
     "body":null,"method":"GET","mode":"cors"}).then(res => res.json()).then(json =>console.log(json));

     fetch("https://api.actionnetwork.com/web/v1/scoreboard/nhl",
     {"credentials":"omit","headers":{"accept":"application/json","content-type":"application/json","sec-fetch-mode":"no-cors"},
     "referrer":"https://www.actionnetwork.com/nfl/live-odds","referrerPolicy":"no-referrer-when-downgrade",
     "body":null,"method":"GET","mode":"cors"}).then(res => res.json()).then(json =>console.log(json));

     fetch("https://api.actionnetwork.com/web/v1/scoreboard/mlb",
     {"credentials":"omit","headers":{"accept":"application/json","content-type":"application/json","sec-fetch-mode":"no-cors"},
     "referrer":"https://www.actionnetwork.com/nfl/live-odds","referrerPolicy":"no-referrer-when-downgrade",
     "body":null,"method":"GET","mode":"cors"}).then(res => res.json()).then(json =>console.log(json));




  }
  



  render() {
    const {  liftedState } = this.props;
    console.log(liftedState)
    return (
      <div>
        <h1>Running</h1>
        <h1>Running</h1>
        <h1>Running</h1>
        <h1>Running</h1>
        <h1>Running</h1><h1>Running</h1>
        <button onClick={this.getLines}></button>

      </div>

    );
  }
}

function mapStateToProps(state) {
  const instances = state.instances;
  console.log(instances)
  const id = getActiveInstance(instances);
  console.log(instances.states[id])
  return {
    selected: instances.selected,
    liftedState: instances.states[id],
    monitorState: state.monitor.monitorState,
    options: instances.options[id],
    monitor: state.monitor.selected,
    dispatcherIsOpen: state.monitor.dispatcherIsOpen,
    sliderIsOpen: state.monitor.sliderIsOpen,
    reports: state.reports.data,
    shouldSync: state.instances.sync
  };
}

function mapDispatchToProps(dispatch) {
  return {
    liftedDispatch: bindActionCreators(liftedDispatch, dispatch),
    getReport: bindActionCreators(getReport, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
