import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { liftedDispatch } from 'remotedev-app/lib/actions';
import { getActiveInstance } from 'remotedev-app/lib/reducers/instances';
import LinesComponent from './LinesComponent';
import getLines from '../service/getLines';
import linesReducer from '../reducers/window/linesReducer';
import { getLinesDispatch } from '../actions/getLinesDispatch';
import Tabs from "./Tabs"
// import linesResponse from '../containers/linesResponse.json';
// const liftedContent = {"id":"401169054","eventId":401169054,"isEvent":true,"status":"live","type":"listing","imageFormat":"16x9","ratio":"16x9","size":"md","name":"Tampa Bay Rays vs. Oakland Athletics (Wildcard Game)","subtitle":"ESPN/ESPN2 • EN/ES • Baseball","imageHref":"https://artwork.api.espn.com/artwork/collections/airings/5708c0f3-7565-4bed-b689-51b1142613f2/default?width=640&apikey=1ngjw23osgcis1i1vbj96lmfqs&timestamp=201909292148","backgroundImageHref":"https://secure.espncdn.com/watchespn/images/espnplus/paywalls/ESPN_PLUS.paywall.png","date":"Wednesday, October 02","shortDate":"Wed, 10/2","utc":"2019-10-02T17:00:02-07:00","time":"5:00 PM","score":247650,"includeSponsor":false,"showKey":false,"isLocked":false,"isPersonalized":false,"event":{"type":"tvt","gameState":"in","teamOneName":"Rays","teamTwoName":"Athletics","teamOneRank":null,"teamTwoRank":null,"teamOneLogoURLDark":"https://secure.espncdn.com/i/teamlogos/mlb/500-dark/scoreboard/tb.png","teamTwoLogoURLDark":"https://secure.espncdn.com/i/teamlogos/mlb/500-dark/scoreboard/oak.png","teamOneScore":"4","teamTwoScore":"1","teamOnePossession":false,"teamTwoPossession":false,"statusTextOne":"Bot 4th"},"links":{"appPlay":"sportscenter://x-callback-url/showWatchStream?playGameID=401169054","picker":"https://watch.product.api.espn.com/api/product/v3/watchespn/web/picker?eventId=401169054&tz=UTC-0700&lang=en&countryCode=US&entitlements=ESPN_PLUS&features=openAuthz&deviceType=desktop"},"iconHref":"http://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/mlb.png&w=100&h=100&transparent=true"}

const marginLeft30 = {
  marginLeft: '30px'
};
const margin10 = {
  margin: '10px'
};
const firstSection = {
  marginLeft: '40px',
  padding: '10px'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linesResponse: {},
      showAllOdds: false,
      ...props
    };
    this.linesRequest = this.linesRequest.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { liftedState } = this.props;

    let stateIndex = liftedState.currentStateIndex;
    let currentContent =
      liftedState.computedStates[stateIndex].state.app.playingStream.content;

    if (currentContent != this.state.liftedContent) {
      this.setState({
        liftedContent: currentContent
      });
    }
  }
  linesRequest = () => {
    getLines().then(linesResponse => {
      this.setState({
        linesResponse: linesResponse
      });
    });
  };
  componentDidMount() {
    if (!this.state.linesResponse) {
      this.linesRequest();
    }
    this.interval = setInterval(() => this.linesRequest(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  toggleShowOdds = () => {
    this.setState({
      showAllOdds: !this.state.showAllOdds
    });
  };
  renderAllOdds = linesResponse => {
      console.log(JSON.stringify(linesResponse))
    return (
      <section className="padding-20">
        <Tabs>
          <div
            className="m-p-10 text-uppercase font-weight-light"
            label="live"
          >
            <Tabs>
              {Object.keys(linesResponse).map(sport => {
                let games = linesResponse[sport].games.filter(
                  game => game.status === 'inprogress'
                );

                return (
                  <div label={sport}>
                    {games.length > 0 ? (
                      <div class="list-group">
                        <GamesComponent games={games} />
                      </div>
                    ) : (
                      'no games'
                    )}
                  </div>
                );
              })}
            </Tabs>
          </div>

          <div
            className="m-p-10 text-uppercase font-weight-light"
            label="schedueled"
          >
            <Tabs>
              {Object.keys(linesResponse).map(sport => {
                let games = linesResponse[sport].games.filter(
                  game => game.status === 'scheduled'
                );

                return (
                  <div label={sport}>
                    {games.length > 0 ? (
                      <GamesComponent games={games} />
                    ) : (
                      'no games'
                    )}
                  </div>
                );
              })}
            </Tabs>
          </div>
          <div
            className="m-p-10 text-uppercase font-weight-light"
            label="complete"
          >
            <Tabs>
              {Object.keys(linesResponse).map(sport => {
                let games = linesResponse[sport].games.filter(
                  game => game.status === 'complete'
                );
                return (
                  <div label={sport}>
                    {games.length > 0 ? (
                      <GamesComponent games={games} />
                    ) : (
                      'no games'
                    )}
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
    const { linesResponse, liftedContent } = this.state;

    return (
      <div style={margin10}>
        <header>
          <h6 className="font-weight-light">Parlayed</h6>
        </header>
        {/* {linesResponse && liftedContent && (
          <LinesComponent
            liftedContent={liftedContent}
            linesResponse={linesResponse}
          />
        )} */}

        {linesResponse && 
          <section>
            <button
              className="btn-secondary btn-sm"
              onClick={this.toggleShowOdds}
            >
              <small className="font-weight-light">show other lines</small>
            </button>
            {this.state.showAllOdds && this.renderAllOdds(linesResponse)}
          </section>
        }

        <footer className={'footer'}></footer>
      </div>
    );
  }
}

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
    getLinesDispatch: bindActionCreators(getLinesDispatch, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
