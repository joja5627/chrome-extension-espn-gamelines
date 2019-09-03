import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { liftedDispatch } from 'remotedev-app/lib/actions';
import { getActiveInstance } from 'remotedev-app/lib/reducers/instances';
import style from './App.css';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
class App extends Component {
  openWindow = position => {
    chrome.runtime.sendMessage({ type: 'OPEN', position });
  };
  openOptionsPage = () => {
    if (navigator.userAgent.indexOf('Firefox') !== -1) {
      chrome.runtime.sendMessage({ type: 'OPEN_OPTIONS' });
    } else {
      chrome.runtime.openOptionsPage();
    }
  };

  getLines() {
    fetch('https://api.actionnetwork.com/web/v1/scoreboard/ncaaf', {
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
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json, null, 2)));

    fetch('https://api.actionnetwork.com/web/v1/scoreboard/nba', {
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
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json, null, 2)));

    fetch('https://api.actionnetwork.com/web/v1/scoreboard/soccer', {
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
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json, null, 2)));

    fetch('https://api.actionnetwork.com/web/v1/scoreboard/nfl', {
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
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json, null, 2)));

    fetch('https://api.actionnetwork.com/web/v1/scoreboard/nhl', {
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
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json, null, 2)));

    fetch('https://api.actionnetwork.com/web/v1/scoreboard/mlb', {
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
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json, null, 2)));
  }

  render() {
    const { liftedState, todos, actions } = this.props;
    
    let stateIndex = liftedState.currentStateIndex
    let currentState = liftedState.computedStates[stateIndex]
    if(currentState.app){
        let content = currentState.app.playingStream.content
        console.log(content)
    }
    

    return (
      <div className={"normal"}>
        <header>
          <h1>ESPN Lines APP</h1>
          <div></div>
        
        </header>
        <section className={'main'}>
          <button refresh lines onClick={this.handleLinesRefresh} />
         
        </section>
        <footer className={'footer'}>
          
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  bgStore: PropTypes.object,
  liftedDispatch: PropTypes.func.isRequired,
  getReport: PropTypes.func.isRequired,
  togglePersist: PropTypes.func.isRequired,
  selected: PropTypes.string,
  liftedState: PropTypes.object.isRequired,
  monitorState: PropTypes.object,
  options: PropTypes.object.isRequired,
  monitor: PropTypes.string,
  position: PropTypes.string,
  reports: PropTypes.array.isRequired,
  dispatcherIsOpen: PropTypes.bool,
  sliderIsOpen: PropTypes.bool
};

function mapStateToProps(state) {
  const instances = state.instances;
  const id = getActiveInstance(instances);
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
    liftedDispatch: bindActionCreators(liftedDispatch, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// <div style={styles.container}>
//         <div style={styles.buttonBar}>
//           <MonitorSelector selected={monitor}/>
//           <Instances selected={this.props.selected} />
//         </div>
//         <DevTools
//           monitor={monitor}
//           liftedState={liftedState}
//           monitorState={this.props.monitorState}
//           dispatch={this.props.liftedDispatch}
//           lib={options.lib || options.explicitLib}
//         />
//         <Notification />
//         {sliderIsOpen && options.connectionId && options.features.jump &&
//           <SliderMonitor
//             monitor="SliderMonitor"
//             liftedState={liftedState}
//             dispatch={this.props.liftedDispatch}
//             getReport={this.props.getReport}
//             reports={this.props.reports}
//             showActions={monitor === 'ChartMonitor'}
//             style={{ padding: '15px 5px' }}
//             fillColor="rgb(120, 144, 156)"
//           />
//         }
//         {dispatcherIsOpen && options.connectionId && options.features.dispatch &&
//           <Dispatcher options={options} />
//         }
//         <div style={styles.buttonBar}>
//           {!window.isElectron && position !== '#left' &&
//           <Button
//             Icon={LeftIcon}
//             onClick={() => { this.openWindow('left'); }}
//           />
//           }
//           {!window.isElectron && position !== '#right' &&
//           <Button
//             Icon={RightIcon}
//             onClick={() => { this.openWindow('right'); }}
//           />
//           }
//           {!window.isElectron && position !== '#bottom' &&
//           <Button
//             Icon={BottomIcon}
//             onClick={() => { this.openWindow('bottom'); }}
//           />
//           }
//           {features.pause &&
//             <RecordButton paused={liftedState.isPaused} />
//           }
//           {features.lock &&
//             <LockButton locked={liftedState.isLocked} />
//           }
//           {features.persist &&
//             <Button
//               Icon={PersistIcon}
//               onClick={togglePersist}
//             >Persist</Button>
//           }
//           {features.dispatch &&
//             <DispatcherButton dispatcherIsOpen={dispatcherIsOpen}/>
//           }
//           {features.jump &&
//             <SliderButton isOpen={sliderIsOpen}/>
//           }
//           {features.import &&
//             <ImportButton />
//           }
//           {features.export &&
//             <ExportButton />
//           }
//           {position && (position !== '#popup' || navigator.userAgent.indexOf('Firefox') !== -1) &&
//             <PrintButton />
//           }
//           {!window.isElectron &&
//           <Button
//             Icon={RemoteIcon}
//             onClick={() => { this.openWindow('remote'); }}
//           >Remote</Button>
//           }
//           {(chrome.runtime.openOptionsPage || navigator.userAgent.indexOf('Firefox') !== -1) &&
//           <Button
//             Icon={SettingsIcon}
//             onClick={this.openOptionsPage}
//           >Settings</Button>
//           }
//         </div>
//       </div>
//     );
