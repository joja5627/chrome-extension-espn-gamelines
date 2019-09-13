import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { liftedDispatch } from 'remotedev-app/lib/actions';
import { getActiveInstance } from 'remotedev-app/lib/reducers/instances';
import BOOKS from "../constants/books";

const currentOdds = [
  {
    "ml_away": 240,
    "ml_home": -300,
    "spread_away": 6.5,
    "spread_home": -6.5,
    "spread_away_line": -110,
    "spread_home_line": -110,
    "over": -110,
    "under": -110,
    "draw": null,
    "total": 48,
    "away_total": 20.5,
    "away_over": -116,
    "away_under": -109,
    "home_total": 27.5,
    "home_over": -119,
    "home_under": -106,
    "ml_home_public": 70,
    "ml_away_public": 30,
    "spread_home_public": 71,
    "spread_away_public": 29,
    "total_under_public": 53,
    "total_over_public": 47,
    "ml_home_money": 87,
    "ml_away_money": 13,
    "spread_home_money": 66,
    "spread_away_money": 34,
    "total_over_money": 46,
    "total_under_money": 54,
    "num_bets": 62759,
    "book_id": 15,
    "type": "game",
    "inserted": "2019-09-13T00:22:08.710018+00:00"
  },
  {
    "ml_away": 180,
    "ml_home": -215,
    "spread_away": 3.5,
    "spread_home": -3.5,
    "spread_away_line": -110,
    "spread_home_line": -110,
    "over": -110,
    "under": -110,
    "draw": null,
    "total": 23.5,
    "away_total": 9.5,
    "away_over": -135,
    "away_under": 105,
    "home_total": 13.5,
    "home_over": -135,
    "home_under": 105,
    "ml_home_public": null,
    "ml_away_public": null,
    "spread_home_public": 82,
    "spread_away_public": 18,
    "total_under_public": 53,
    "total_over_public": 47,
    "ml_home_money": null,
    "ml_away_money": null,
    "spread_home_money": null,
    "spread_away_money": null,
    "total_over_money": null,
    "total_under_money": null,
    "num_bets": 0,
    "book_id": 15,
    "type": "firsthalf",
    "inserted": "2019-09-13T00:23:18.448861+00:00"
  },
  {
    "ml_away": 170,
    "ml_home": -200,
    "spread_away": 4,
    "spread_home": -4,
    "spread_away_line": -110,
    "spread_home_line": -110,
    "over": -110,
    "under": -110,
    "draw": null,
    "total": 24,
    "away_total": null,
    "away_over": null,
    "away_under": null,
    "home_total": null,
    "home_over": null,
    "home_under": null,
    "ml_home_public": null,
    "ml_away_public": null,
    "spread_home_public": 66,
    "spread_away_public": 34,
    "total_under_public": 21,
    "total_over_public": 79,
    "ml_home_money": null,
    "ml_away_money": null,
    "spread_home_money": null,
    "spread_away_money": null,
    "total_over_money": null,
    "total_under_money": null,
    "num_bets": 0,
    "book_id": 15,
    "type": "secondhalf",
    "inserted": "2019-09-13T02:28:39.258801+00:00"
  },
  {
    "ml_away": 156,
    "ml_home": -179,
    "spread_away": 0.5,
    "spread_home": -0.5,
    "spread_away_line": -117,
    "spread_home_line": -104,
    "over": -107,
    "under": -107,
    "draw": null,
    "total": 9.5,
    "away_total": null,
    "away_over": null,
    "away_under": null,
    "home_total": null,
    "home_over": null,
    "home_under": null,
    "ml_home_public": null,
    "ml_away_public": null,
    "spread_home_public": null,
    "spread_away_public": null,
    "total_under_public": null,
    "total_over_public": null,
    "ml_home_money": null,
    "ml_away_money": null,
    "spread_home_money": null,
    "spread_away_money": null,
    "total_over_money": null,
    "total_under_money": null,
    "num_bets": null,
    "book_id": 15,
    "type": "firstquarter",
    "inserted": "2019-09-13T00:20:54.767137+00:00"
  },
  {
    "ml_away": -225,
    "ml_home": 160,
    "spread_away": 0,
    "spread_home": 0,
    "spread_away_line": -218,
    "spread_home_line": 180,
    "over": -110,
    "under": -122,
    "draw": null,
    "total": 38.5,
    "away_total": 20.5,
    "away_over": 120,
    "away_under": -162,
    "home_total": 19.5,
    "home_over": -125,
    "home_under": -107,
    "ml_home_public": null,
    "ml_away_public": null,
    "spread_home_public": null,
    "spread_away_public": null,
    "total_under_public": null,
    "total_over_public": null,
    "ml_home_money": null,
    "ml_away_money": null,
    "spread_home_money": null,
    "spread_away_money": null,
    "total_over_money": null,
    "total_under_money": null,
    "num_bets": null,
    "book_id": 15,
    "type": "live",
    "inserted": "2019-09-13T04:04:58.629613+00:00"
  },
  {
    "ml_away": 270,
    "ml_home": -330,
    "spread_away": 5,
    "spread_home": -5,
    "spread_away_line": -110,
    "spread_home_line": -110,
    "over": -100,
    "under": -110,
    "draw": null,
    "total": 50.5,
    "away_total": 21.5,
    "away_over": -109,
    "away_under": -120,
    "home_total": 27.5,
    "home_over": -113,
    "home_under": -115,
    "ml_home_public": 59,
    "ml_away_public": 41,
    "spread_home_public": 68,
    "spread_away_public": 32,
    "total_under_public": 50,
    "total_over_public": 50,
    "ml_home_money": 50,
    "ml_away_money": 50,
    "spread_home_money": 99,
    "spread_away_money": 1,
    "total_over_money": 30,
    "total_under_money": 70,
    "num_bets": 0,
    "book_id": 30,
    "type": "game",
    "inserted": "2019-09-09T19:29:45.827339+00:00"
  },
  {
    "ml_away": 197,
    "ml_home": -225,
    "spread_away": 3.5,
    "spread_home": -3.5,
    "spread_away_line": -100,
    "spread_home_line": -112,
    "over": -106,
    "under": -106,
    "draw": null,
    "total": 24.5,
    "away_total": 9.5,
    "away_over": -135,
    "away_under": 105,
    "home_total": 14.5,
    "home_over": 105,
    "home_under": -135,
    "ml_home_public": null,
    "ml_away_public": null,
    "spread_home_public": 50,
    "spread_away_public": 50,
    "total_under_public": 91,
    "total_over_public": 9,
    "ml_home_money": null,
    "ml_away_money": null,
    "spread_home_money": null,
    "spread_away_money": null,
    "total_over_money": null,
    "total_under_money": null,
    "num_bets": 0,
    "book_id": 30,
    "type": "firsthalf",
    "inserted": "2019-09-12T15:35:45.387552+00:00"
  },
  {
    "ml_away": 180,
    "ml_home": -220,
    "spread_away": 4,
    "spread_home": -4,
    "spread_away_line": -110,
    "spread_home_line": -110,
    "over": -110,
    "under": -110,
    "draw": null,
    "total": 24,
    "away_total": null,
    "away_over": null,
    "away_under": null,
    "home_total": null,
    "home_over": null,
    "home_under": null,
    "ml_home_public": null,
    "ml_away_public": null,
    "spread_home_public": 78,
    "spread_away_public": 22,
    "total_under_public": 18,
    "total_over_public": 82,
    "ml_home_money": null,
    "ml_away_money": null,
    "spread_home_money": null,
    "spread_away_money": null,
    "total_over_money": null,
    "total_under_money": null,
    "num_bets": 0,
    "book_id": 30,
    "type": "secondhalf",
    "inserted": "2019-09-13T02:19:33.604516+00:00"
  },
  {
    "ml_away": 166,
    "ml_home": -188,
    "spread_away": 0.5,
    "spread_home": -0.5,
    "spread_away_line": -102,
    "spread_home_line": -110,
    "over": -129,
    "under": 113,
    "draw": null,
    "total": 9.5,
    "away_total": null,
    "away_over": null,
    "away_under": null,
    "home_total": null,
    "home_over": null,
    "home_under": null,
    "ml_home_public": null,
    "ml_away_public": null,
    "spread_home_public": null,
    "spread_away_public": null,
    "total_under_public": null,
    "total_over_public": null,
    "ml_home_money": null,
    "ml_away_money": null,
    "spread_home_money": null,
    "spread_away_money": null,
    "total_over_money": null,
    "total_under_money": null,
    "num_bets": 0,
    "book_id": 30,
    "type": "firstquarter",
    "inserted": "2019-09-10T00:17:40.198985+00:00"
  },
  {
    "ml_away": 241,
    "ml_home": -297,
    "spread_away": 6.5,
    "spread_home": -6.5,
    "spread_away_line": -115,
    "spread_home_line": -103,
    "over": -110,
    "under": -110,
    "draw": null,
    "total": 47.5,
    "away_total": 20.5,
    "away_over": -103,
    "away_under": -132,
    "home_total": 26.5,
    "home_over": -121,
    "home_under": -110,
    "ml_home_public": null,
    "ml_away_public": null,
    "spread_home_public": null,
    "spread_away_public": null,
    "total_under_public": null,
    "total_over_public": null,
    "ml_home_money": null,
    "ml_away_money": null,
    "spread_home_money": null,
    "spread_away_money": null,
    "total_over_money": null,
    "total_under_money": null,
    "num_bets": 0,
    "book_id": 30,
    "type": "live",
    "inserted": "2019-09-13T00:23:27.701967+00:00"
  }
]

const marginLeft30 = {
  marginLeft: "30px"
}
const firstSection = {
  marginLeft: "40px",
  padding: "10px"
}
const containerStyle = {
  marign: "10px",
  padding: "10px"
}
const backgroundBlack = {
  backgroundColor: "black",
  padding: "10px",
  margin: "10px",
  border: "1px solid black"
}
var hasOwnProperty = Object.prototype.hasOwnProperty;

const isEmpty = (obj) => {

  if (obj == null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (typeof obj !== "object") return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}
const removeNullProperties = (obj) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}



class LinesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linesResponse: {},
      ...props
    }
  }
  findBook = (bookId) => {
    return BOOKS.find(function (book) {
      return book.id === bookId
    }).display_name;
  }
  sortByTimStamp = (lines) => {
    return lines.sort((a, b) => (Date(a.instered > b.inserted) ? 1 : -1))
  }
  renderLines = (lines) => {
    let uniqueIds = [...new Set(lines.map(line => line.book_id))];

    let currentLines = uniqueIds.map((id) => {
      return lines.filter(function (line) {
        return line.book_id === id
      }).pop()
    })
    //let date = new Date(line.inserted)
    return <div>
      <p>{this.findBook(line.book_id)}</p>
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">matchup</th>
            <th scope="col">spread</th>
            <th scope="col">line</th>
            <th scope="col">money line</th>
          
          </tr>
        </thead>
        <tbody>
          {currentLines.map((line, index) => {
            return <tr>
              
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          })}
          {/*
     <tr>
       <th scope="row">2</th>
       <td>Jacob</td>
       <td>Thornton</td>
       <td>@fat</td>
     </tr>
     <tr>
       <th scope="row">3</th>
       <td colspan="2">Larry the Bird</td>
       <td>@twitter</td>
     </tr> */}
        </tbody>
      </table>
    </div>



  }



  //
  renderCurrentOdds = (lines) => {
    return <div style={containerStyle} class="container">
      <header>
        <h1>Game Lines</h1>
      </header>
      <div style={marginLeft30}>
        {this.renderLines(lines)}
      </div>
    </div>

  }


  renderCurrentLines = () => {
    let { liftedContent, linesResponse } = this.state
    return this.renderCurrentOdds(currentOdds)
    // console.log(JSON.stringify(linesResponse["nfl"], null, 2))
    // console.log(JSON.stringify(liftedContent, null, 2))
    // if (liftedContent.subtitle.search(/ncaa/i) !== -1) {
    //   console.log(JSON.stringify(linesResponse["ncaaf"], null, 2))
    // } else if (liftedContent.subtitle.search(/nba/i) !== -1) {
    //   console.log(JSON.stringify(linesResponse["nba"], null, 2))
    // } else if (liftedContent.subtitle.search(/soccer/i) !== -1) {

    // } else if (liftedContent.subtitle.search(/nfl/i) !== -1) {
    //   console.log(JSON.stringify(linesResponse["nfl"], null, 2))
    // } else if (liftedContent.subtitle.search(/nhl/i) !== -1) {
    //   console.log(JSON.stringify(linesResponse["nhl"], null, 2))
    // } else if (liftedContent.subtitle.search(/mlb/i) !== -1) {
    //   console.log(JSON.stringify(linesResponse["mlb"], null, 2))
    // } else {
    //   return <p>No lines available for current stream</p>
    // }

  }

  componentDidMount() {
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

          if (json.league) {

            let currentResponse = this.state.linesResponse
            currentResponse[json.league.name] = json
            this.setState({ linesResponse: currentResponse })
          }
        })
    }

  }
  render() {
    return (
      <div>

        <section style={marginLeft30}>
          {!isEmpty(this.state.linesResponse) && this.renderCurrentLines()}

        </section>
        <section style={marginLeft30}>
          <h1>Other Live Events</h1>

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
