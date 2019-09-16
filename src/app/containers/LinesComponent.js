import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { liftedDispatch } from 'remotedev-app/lib/actions';
import { getActiveInstance } from 'remotedev-app/lib/reducers/instances';
import BOOKS from '../constants/books';
import _ from 'lodash';

const currentOdds = [
  {
    ml_away: 240,
    ml_home: -300,
    spread_away: 6.5,
    spread_home: -6.5,
    spread_away_line: -110,
    spread_home_line: -110,
    over: -110,
    under: -110,
    draw: null,
    total: 48,
    away_total: 20.5,
    away_over: -116,
    away_under: -109,
    home_total: 27.5,
    home_over: -119,
    home_under: -106,
    ml_home_public: 70,
    ml_away_public: 30,
    spread_home_public: 71,
    spread_away_public: 29,
    total_under_public: 53,
    total_over_public: 47,
    ml_home_money: 87,
    ml_away_money: 13,
    spread_home_money: 66,
    spread_away_money: 34,
    total_over_money: 46,
    total_under_money: 54,
    num_bets: 62759,
    book_id: 15,
    type: 'game',
    inserted: '2019-09-13T00:22:08.710018+00:00'
  },
  {
    ml_away: 180,
    ml_home: -215,
    spread_away: 3.5,
    spread_home: -3.5,
    spread_away_line: -110,
    spread_home_line: -110,
    over: -110,
    under: -110,
    draw: null,
    total: 23.5,
    away_total: 9.5,
    away_over: -135,
    away_under: 105,
    home_total: 13.5,
    home_over: -135,
    home_under: 105,
    ml_home_public: null,
    ml_away_public: null,
    spread_home_public: 82,
    spread_away_public: 18,
    total_under_public: 53,
    total_over_public: 47,
    ml_home_money: null,
    ml_away_money: null,
    spread_home_money: null,
    spread_away_money: null,
    total_over_money: null,
    total_under_money: null,
    num_bets: 0,
    book_id: 15,
    type: 'firsthalf',
    inserted: '2019-09-13T00:23:18.448861+00:00'
  },
  {
    ml_away: 170,
    ml_home: -200,
    spread_away: 4,
    spread_home: -4,
    spread_away_line: -110,
    spread_home_line: -110,
    over: -110,
    under: -110,
    draw: null,
    total: 24,
    away_total: null,
    away_over: null,
    away_under: null,
    home_total: null,
    home_over: null,
    home_under: null,
    ml_home_public: null,
    ml_away_public: null,
    spread_home_public: 66,
    spread_away_public: 34,
    total_under_public: 21,
    total_over_public: 79,
    ml_home_money: null,
    ml_away_money: null,
    spread_home_money: null,
    spread_away_money: null,
    total_over_money: null,
    total_under_money: null,
    num_bets: 0,
    book_id: 15,
    type: 'secondhalf',
    inserted: '2019-09-13T02:28:39.258801+00:00'
  },
  {
    ml_away: 156,
    ml_home: -179,
    spread_away: 0.5,
    spread_home: -0.5,
    spread_away_line: -117,
    spread_home_line: -104,
    over: -107,
    under: -107,
    draw: null,
    total: 9.5,
    away_total: null,
    away_over: null,
    away_under: null,
    home_total: null,
    home_over: null,
    home_under: null,
    ml_home_public: null,
    ml_away_public: null,
    spread_home_public: null,
    spread_away_public: null,
    total_under_public: null,
    total_over_public: null,
    ml_home_money: null,
    ml_away_money: null,
    spread_home_money: null,
    spread_away_money: null,
    total_over_money: null,
    total_under_money: null,
    num_bets: null,
    book_id: 15,
    type: 'firstquarter',
    inserted: '2019-09-13T00:20:54.767137+00:00'
  },
  {
    ml_away: -225,
    ml_home: 160,
    spread_away: 0,
    spread_home: 0,
    spread_away_line: -218,
    spread_home_line: 180,
    over: -110,
    under: -122,
    draw: null,
    total: 38.5,
    away_total: 20.5,
    away_over: 120,
    away_under: -162,
    home_total: 19.5,
    home_over: -125,
    home_under: -107,
    ml_home_public: null,
    ml_away_public: null,
    spread_home_public: null,
    spread_away_public: null,
    total_under_public: null,
    total_over_public: null,
    ml_home_money: null,
    ml_away_money: null,
    spread_home_money: null,
    spread_away_money: null,
    total_over_money: null,
    total_under_money: null,
    num_bets: null,
    book_id: 15,
    type: 'live',
    inserted: '2019-09-13T04:04:58.629613+00:00'
  },
  {
    ml_away: 270,
    ml_home: -330,
    spread_away: 5,
    spread_home: -5,
    spread_away_line: -110,
    spread_home_line: -110,
    over: -100,
    under: -110,
    draw: null,
    total: 50.5,
    away_total: 21.5,
    away_over: -109,
    away_under: -120,
    home_total: 27.5,
    home_over: -113,
    home_under: -115,
    ml_home_public: 59,
    ml_away_public: 41,
    spread_home_public: 68,
    spread_away_public: 32,
    total_under_public: 50,
    total_over_public: 50,
    ml_home_money: 50,
    ml_away_money: 50,
    spread_home_money: 99,
    spread_away_money: 1,
    total_over_money: 30,
    total_under_money: 70,
    num_bets: 0,
    book_id: 30,
    type: 'game',
    inserted: '2019-09-09T19:29:45.827339+00:00'
  },
  {
    ml_away: 197,
    ml_home: -225,
    spread_away: 3.5,
    spread_home: -3.5,
    spread_away_line: -100,
    spread_home_line: -112,
    over: -106,
    under: -106,
    draw: null,
    total: 24.5,
    away_total: 9.5,
    away_over: -135,
    away_under: 105,
    home_total: 14.5,
    home_over: 105,
    home_under: -135,
    ml_home_public: null,
    ml_away_public: null,
    spread_home_public: 50,
    spread_away_public: 50,
    total_under_public: 91,
    total_over_public: 9,
    ml_home_money: null,
    ml_away_money: null,
    spread_home_money: null,
    spread_away_money: null,
    total_over_money: null,
    total_under_money: null,
    num_bets: 0,
    book_id: 30,
    type: 'firsthalf',
    inserted: '2019-09-12T15:35:45.387552+00:00'
  },
  {
    ml_away: 180,
    ml_home: -220,
    spread_away: 4,
    spread_home: -4,
    spread_away_line: -110,
    spread_home_line: -110,
    over: -110,
    under: -110,
    draw: null,
    total: 24,
    away_total: null,
    away_over: null,
    away_under: null,
    home_total: null,
    home_over: null,
    home_under: null,
    ml_home_public: null,
    ml_away_public: null,
    spread_home_public: 78,
    spread_away_public: 22,
    total_under_public: 18,
    total_over_public: 82,
    ml_home_money: null,
    ml_away_money: null,
    spread_home_money: null,
    spread_away_money: null,
    total_over_money: null,
    total_under_money: null,
    num_bets: 0,
    book_id: 30,
    type: 'secondhalf',
    inserted: '2019-09-13T02:19:33.604516+00:00'
  },
  {
    ml_away: 166,
    ml_home: -188,
    spread_away: 0.5,
    spread_home: -0.5,
    spread_away_line: -102,
    spread_home_line: -110,
    over: -129,
    under: 113,
    draw: null,
    total: 9.5,
    away_total: null,
    away_over: null,
    away_under: null,
    home_total: null,
    home_over: null,
    home_under: null,
    ml_home_public: null,
    ml_away_public: null,
    spread_home_public: null,
    spread_away_public: null,
    total_under_public: null,
    total_over_public: null,
    ml_home_money: null,
    ml_away_money: null,
    spread_home_money: null,
    spread_away_money: null,
    total_over_money: null,
    total_under_money: null,
    num_bets: 0,
    book_id: 30,
    type: 'firstquarter',
    inserted: '2019-09-10T00:17:40.198985+00:00'
  },
  {
    ml_away: 241,
    ml_home: -297,
    spread_away: 6.5,
    spread_home: -6.5,
    spread_away_line: -115,
    spread_home_line: -103,
    over: -110,
    under: -110,
    draw: null,
    total: 47.5,
    away_total: 20.5,
    away_over: -103,
    away_under: -132,
    home_total: 26.5,
    home_over: -121,
    home_under: -110,
    ml_home_public: null,
    ml_away_public: null,
    spread_home_public: null,
    spread_away_public: null,
    total_under_public: null,
    total_over_public: null,
    ml_home_money: null,
    ml_away_money: null,
    spread_home_money: null,
    spread_away_money: null,
    total_over_money: null,
    total_under_money: null,
    num_bets: 0,
    book_id: 30,
    type: 'live',
    inserted: '2019-09-13T00:23:27.701967+00:00'
  }
];
const imageStyle ={ 
    height:'40px',
    width:'40px'
}
const marginLeft30 = {
  marginLeft: '30px'
};
const firstSection = {
  marginLeft: '40px',
  padding: '10px'
};
const containerStyle = {
  marign: '10px',
  padding: '10px'
};
const backgroundBlack = {
  backgroundColor: 'black',
  padding: '10px',
  margin: '10px',
  border: '1px solid black'
};
var hasOwnProperty = Object.prototype.hasOwnProperty;

const isEmpty = obj => {
  if (obj == null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (typeof obj !== 'object') return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
};
const removeNullProperties = obj => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
};

class LinesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }
  findBook = bookId => {
    return BOOKS.find(function(book) {
      return book.id === bookId;
    }).display_name;
  };

  renderLines = lines => {
    let uniqueIds = [...new Set(lines.map(line => line.book_id))];

    let currentLines = uniqueIds.map(id => {
      return lines
        .filter(function(line) {
          return line.book_id === id;
        })
        .pop();
    });

    return (
      <div>
        {/*  */}
        <table class="table table-md">
          <thead>
            <tr>
              <th scope="col">matchup</th>
              <th scope="col">spread</th>
              <th scope="col">line</th>
              <th scope="col">ml</th>
            </tr>
          </thead>
          <tbody>
            {currentLines.map((line, index) => {
              return (
                <div>
                  <p>{this.findBook(line.book_id)}</p>
                  <p> {JSON.stringify()}</p>
                </div>
              );
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
    );
  };

  renderCurrentOdds = lines => {
    return (
      <div style={containerStyle} class="container">
        <header></header>
        <div style={marginLeft30}>{this.renderLines(lines)}</div>
      </div>
    );
  };

  nameMatches(streamingTeams, teams) {
    //
    // let team =  teams.some(team => {
    //     console.log(team.full_name)
    //     console.log(streamingTeams[0])
    //     console.log(streamingTeams[1])
    //     (
    // });
    // console.log(team)
    // return team
  }

  findGame = (streamingTeams, games) => {
    games.filter(
      game =>
        game.teams.includes(team => team.full_name === streamingTeams[0]) ||
        game.teams.includes(team => team.full_name === streamingTeams[1])
    );
    // _.filter(games, function(game) { return !o.active;
    // });
    // _.get(games, 'games.teams');
    // var underAgeUser = _.find(games, function(game) {
    //
    //     console.log(names)
    //     // return (game.teams.full_name.includes[0].full_name === streamingTeams[0] || game.teams[0].full_name === streamingTeams[1])
    // });
    // return games.find(game => );
  };

  parseCurrentTeams(teamString) {
    let parsed = teamString.split(' ');
    let vsIndex = parsed.indexOf('vs.');

    let teamOne = parsed.slice(0, vsIndex);
    let teamTwo = parsed.slice(vsIndex);

    return [teamOne.join(' '), teamTwo.join(' ')];
  }

  renderCurrentLines = () => {
    let { liftedContent, linesResponse } = this.state;
    let teams = this.parseCurrentTeams(liftedContent.name);

    if (liftedContent.subtitle.search(/ncaa/i) !== -1) {
      //   return JSON.stringify(this.findGame(teams, linesResponse['ncaaf'].games));
    } else if (liftedContent.subtitle.search(/nba/i) !== -1) {
      //   return this.findGame(teams, linesResponse['nba'].games);
    } else if (liftedContent.subtitle.search(/nfl/i) !== -1) {
      //   return this.findGame(teams, linesResponse['nfl'].games);
    } else if (liftedContent.subtitle.search(/nhl/i) !== -1) {
      //   return this.findGame(teams, linesResponse['nhl'].games);
    } else if (liftedContent.subtitle.search(/mlb/i) !== -1) {
      return this.findGame(teams, linesResponse['mlb'].games);
    } else {
      return <p>No lines available for current stream</p>;
    }
  };

  renderGames = games => {
    console.log(games);
    return games.map(game => {
      return (
        <div>
          <img style={imageStyle} data-src={game.teams[0].logo} src={game.teams[0].logo} />
          <img style={imageStyle} data-src={game.teams[1].logo} src={game.teams[1].logo} />

          <p>{game.teams[0].full_name + ' vs. ' + game.teams[1].full_name}</p>
          {this.renderCurrentOdds(game.odds)}
        </div>
      );
    });
  };
  renderLiveEvents = () => {
    let { liftedContent, linesResponse } = this.state;

    return (
      <div style={marginLeft30}>
        {Object.keys(linesResponse).map(sport => {
          console.log(linesResponse[sport].league.description);
          return (
            <div>
              <h2>{linesResponse[sport].league.description}</h2>
              {this.renderGames(linesResponse[sport].games)}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <section style={marginLeft30}>
          <h1>STREAMING EVENT</h1>
          {this.renderCurrentLines()}
        </section>
        <section style={marginLeft30}>
          <h1>LIVE EVENTS</h1>
          {this.renderLiveEvents()}
        </section>
        <section style={marginLeft30}>
          <h1>SCHEDUELED EVENTS</h1>
          {/* {this.renderUpcomingEvents()} */}
        </section>
        <section style={marginLeft30}>
          <h1>PREVIOUS EVENTS</h1>
          {/* {this.renderCurrentLines()} */}
        </section>
        <footer className={'footer'}></footer>
      </div>
    );
  }
}

export default LinesComponent;
