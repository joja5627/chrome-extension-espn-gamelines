import React, { Component, PropTypes } from 'react';
import BOOKS from '../constants/books';
import Tab from './Tab';
import Tabs from './Tabs';
import Image from './Image';

const imageStyle = {
  height: '40px',
  width: '40px'
};
const weakText = {
  fontSize: '.em',
  opacity: 0.5,
  fontSize: 'smaller'
};
const boldText = {
  fontSize: 'larger'
};
const tabStyle = {
  margin: '10px',
  padding: '10px'
};
const padding20 = {
  padding: '20px'
};
const marginLeft30 = {
  marginLeft: '30px'
};
const marginRight30 = {
  marginRight: '30px'
};
const firstSection = {
  marginLeft: '40px',
  marginRight: '40px',
  padding: '10px'
};
const containerStyle = {
  marign: '10px',
  padding: '10px'
};
const marginTop10 = {
  marginTop: '10px'
};
const backgroundBlack = {
  backgroundColor: 'black',
  padding: '10px',
  margin: '10px',
  border: '1px solid black'
};
const marginNone = {
  margin: '0px'
};
const middle = {
  display: 'inline',
  margin: '3px'
};
const fillerImage = {
  height: '30px',
  width: '60px',
  border: '1px solid',
  display: 'inline'
};
const padding10 = {
  padding: '10px'
};
const marginBottom = {
    marginBottom:'10px'
}

class LinesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }
  findBook = bookId => {
    let book = BOOKS.find(function(book) {
      return book.id === bookId;
    });
    if (book) {
      return book.display_name;
    } else {
      return <div>book not found</div>;
    }
  };

  renderLines = (currentLines, homeTeam, awayTeam) => {
    return (
      <section style={marginTop10}>
        <Tabs>
          <div label="spread">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <th scope="col">Book</th>
                <th scope="col">{homeTeam.display_name}</th>
                <th scope="col">{awayTeam.display_name}</th>
              </thead>
              <tbody>
                {currentLines.map(line => {
                  return (
                    <tr>
                      <th scope="row">{this.findBook(line.book_id)}</th>
                      <td>
                        <p style={(boldText, marginNone)}>
                          {line.spread_home ? line.spread_home : '-'}
                        </p>
                        <i style={weakText}>
                          {line.spread_home_line ? line.spread_home_line : '-'}
                        </i>
                      </td>
                      <td>
                        <p style={(boldText, marginNone)}>
                          {line.spread_away ? line.spread_away : '-'}
                        </p>
                        <i style={weakText}>
                          {line.spread_away_line ? line.spread_away_line : '-'}
                        </i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={tabStyle} label="money line">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Book</th>
                  <th scope="col">{homeTeam.display_name}</th>
                  <th scope="col">{awayTeam.display_name}</th>
                </tr>
              </thead>
              <tbody>
                {currentLines.map(line => {
                  return (
                    <tr>
                      <th scope="row">{this.findBook(line.book_id)}</th>
                      <td>{line.ml_home ? line.ml_home : '-'}</td>
                      <td>{line.ml_away ? line.ml_away : '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={tabStyle} label="total">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Book</th>
                  <th scope="col">{homeTeam.display_name}</th>
                  <th scope="col">{awayTeam.display_name}</th>
                </tr>
              </thead>
              <tbody>
                {currentLines.map(line => {
                  return (
                    <tr>
                      <th scope="row">{this.findBook(line.book_id)}</th>
                      <td>{line.ml_home ? line.ml_home : '-'}</td>
                      <td>{line.ml_away ? line.ml_away : '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Tabs>
      </section>
    );
  };

  findGame = (streamingTeams, games) => {
     console.log(streamingTeams)
     console.log(games)
    for (var i = 0; i < games.length; i++) {
      if (
        games[i].teams.some(
          game => streamingTeams.indexOf(game.short_name) !== -1
        ) ||
        games[i].teams.some(
          game => streamingTeams.indexOf(game.long_name) !== -1
        ) ||
        games[i].teams.some(
          game => streamingTeams.indexOf(game.display_name) !== -1
        )
      )
        return games[i];
    }
    return null;
  };

  renderCurrentLines = () => {

    let { liftedContent, linesResponse } = this.state;
    
    let gameFound = null;

    if (liftedContent.subtitle.search(/ncaa/i) !== -1) {
       
      gameFound = this.findGame(
        liftedContent.name.split(' '),
        linesResponse['ncaaf'].games
      );
      console.log(gameFound)
    } else if (liftedContent.subtitle.search(/nba/i) !== -1) {
      gameFound = this.findGame(
        liftedContent.name.split(' '),
        linesResponse['nba'].games
      );
    } else if (liftedContent.subtitle.search(/nfl/i) !== -1) {
      gameFound = this.findGame(
        liftedContent.name.split(' '),
        linesResponse['nfl'].games
      );
    } else if (liftedContent.subtitle.search(/nhl/i) !== -1) {
      gameFound = this.findGame(
        liftedContent.name.split(' '),
        linesResponse['nhl'].games
      );
    } else if (liftedContent.subtitle.search(/mlb/i) !== -1) {
      gameFound = this.findGame(
        liftedContent.name.split(' '),
        linesResponse['mlb'].games
      );
    }
    // console.log(gameFound)
    console.log(liftedContent)
    console.log(gameFound)
    console.log(gameFound.odds)
    return (
      <div>
        {(liftedContent && gameFound && gameFound.odds) ? (
          <div>
            <div style={firstSection}>
              <p>{liftedContent.name}</p>
              <p>{liftedContent.date}</p>
              <p>{liftedContent.subtitle}</p>
              <p>{liftedContent.time}</p>
            </div>
            <div>
              {this.renderLines(
                this.parseLines(gameFound.odds),
                this.parseTeams(game)
              )}
            </div>
          </div>
        ) : (
          <p>No lines available for current stream</p>
        )}
      </div>
    );
  };
  parseTeams = game => {
    const homeTeam = game.teams
      .filter(team => team.id === game.home_team_id)
      .pop();
    const awayTeam = game.teams
      .filter(team => team.id != game.home_team_id)
      .pop();
    return [homeTeam, awayTeam];
  };
  parseLines = lines => {
    let uniqueIds = [...new Set(lines.map(line => line.book_id))];
    let currentLines = uniqueIds.map(id => {
      return lines
        .filter(function(line) {
          return line.book_id === id;
        })
        .pop();
    });

    return currentLines;
  };
  renderGames = games => {
    return games.map((game, index) => {
      if (game.odds) {
        let currentLines = this.parseLines(game.odds);
        let teams = this.parseTeams(game);
        let date = new Date(game.start_time);
       
        
        return (
          <div>
            <div
              className="list-group-item list-group-item-action"
              data-toggle="collapse"
              style={marginBottom}
              href={`#collapse-${index}`}
              role="button"
              aria-expanded="false"
              aria-controls={`collapse-${index}`}
            >
              <div className="container">
                <div className="card-columns d-flex justify-content-center">
                  <div className="card text-center shadow-lg  rounded">
                    <div style={padding10} className="card-block">
                      <h6 className="card-title">{teams[0].full_name}</h6>
                      <Image url={teams[0].logo}></Image>
                    </div>
                  </div>
                  <div className="col text-center align-middle">
                    <h1>@</h1>
                    
                    {/* <small>{new Date(game.start_time).toISOString}</small> */}
                  </div>
                  <div className="card text-center shadow-lg  rounded">
                    <div style={padding10} className="card-block">
                      <h6 className="card-title">{teams[1].full_name}</h6>
                      <Image url={teams[1].logo}></Image>
                     
                    </div>
                  </div>
                 
                </div>
                <div className="container justify-content-center">
                <small>{date.toString()}</small>

                </div>
              </div>
            </div>
            <div
              style={marginTop10}
              className="collapse"
              id={`collapse-${index}`}
            >
              <div className="card card-body">
                <div style={marginLeft30}>
                  {this.renderLines(currentLines, teams[0], teams[1])}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return <div> no odds for this matchup</div>;
      }
    });
  };

  renderAllOdds = () => {
    let { linesResponse } = this.state;
    return (
      <section style={padding20}>
        <Tabs>
          <div style={tabStyle} label="live">
            <Tabs>
              {Object.keys(linesResponse).map(sport => {
                let games = linesResponse[sport].games.filter(
                  game => game.status === 'inprogress'
                );

                return (
                  <div label={sport}>
                    {games.length > 0 ? (
                      <div class="list-group">
                      {this.renderGames(games)}
                      </div>
                    ) : (
                      'no games'
                    )}
                  </div>
                );
              })}
            </Tabs>
          </div>

          <div style={tabStyle} label="schedueled">
            <Tabs>
              {Object.keys(linesResponse).map(sport => {
                let games = linesResponse[sport].games.filter(
                  game => game.status === 'scheduled'
                );

                return (
                  <div label={sport}>
                    {games.length > 0 ? this.renderGames(games) : 'no games'}
                  </div>
                );
              })}
            </Tabs>
          </div>
          <div style={tabStyle} label="complete">
            <Tabs>
              {Object.keys(linesResponse).map(sport => {
                let games = linesResponse[sport].games.filter(
                  game => game.status === 'complete'
                );
                return (
                  <div label={sport}>
                    {games.length > 0 ? this.renderGames(games) : 'no games'}
                  </div>
                );
              })}
            </Tabs>
          </div>
        </Tabs>
      </section>
    );
  };

  render() {
    return (
      <div style={marginLeft30}>
        <section style={marginLeft30}>
          <h4>CURRENTLY STREAMING</h4>
          {this.renderCurrentLines()}
        </section>
        <section>{this.renderAllOdds()}</section>

        <footer className={'footer'}></footer>
      </div>
    );
  }
}

export default LinesComponent;
