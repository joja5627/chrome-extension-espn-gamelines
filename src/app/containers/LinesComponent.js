import React, { Component, PropTypes } from 'react';
import BOOKS from '../constants/books';
import Tab from './Tab';
import Tabs from './Tabs';
import Image from './Image';
import { inflateSync } from 'zlib';
import OddsComponent from './OddsComponent';
import GameCanvas from './GameCanvas';
import GamesComponent from './GamesComponent'
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

const margin0 = {
  margin: '0px !important'
};

class LinesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      showAllOdds: false
    };
    this.toggleShowOdds = this.toggleShowOdds.bind(this);
  }

  // TOTAL: over total / spread away line
  //        under total / spread home line
  //
  findGame = (streamingTeams, games) => {
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

  renderCurrentLines = (liftedContent, linesResponse) => {
    let gameFound = null;

    if (liftedContent.subtitle.search(/ncaa/i) !== -1) {
      gameFound = this.findGame(
        liftedContent.name.split(' '),
        linesResponse['ncaaf'].games
      );
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

    return (
      <div>
        {gameFound && gameFound.odds ? (
            <GamesComponent games={[gameFound]}/>
          
        ) : (
          <p>No lines available for current stream</p>
        )}
      </div>
    );
  };
  
  


  toggleShowOdds = () => {
    this.setState({
      showAllOdds: !this.state.showAllOdds
    });
  };

  render() {
    let { liftedContent, linesResponse } = this.state;
    return (
      <div>
        <section>
          {this.renderCurrentLines(liftedContent, linesResponse)}
        </section>
        
       
      </div>
    );
  }
}

export default LinesComponent;
