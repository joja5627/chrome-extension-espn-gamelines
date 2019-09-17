import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { liftedDispatch } from 'remotedev-app/lib/actions';
import { getActiveInstance } from 'remotedev-app/lib/reducers/instances';
import LinesComponent from './LinesComponent';
import { fetchLines } from "../reducers/window/fetchLines";
import {fetchLinesDispatch} from '../reducers/window/fetchLinesDispatch';


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
    console.log(props)
    this.state = {
      ...props
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
  componentDidMount() {
    //this.props.
   
  }
  render() {
      const {linesResponse,liftedContent} = this.props

  console.log(linesResponse)
    return (
      <div>
        <header>
          <h1 style={marginLeft30}>ESPN LINES APP</h1>
        </header>
        <section>
          {liftedContent &&
            <div style={firstSection}>
              <p>{liftedContent.name}</p>
              <p>{liftedContent.date}</p>
              <p>{liftedContent.subtitle}</p>
              <p>{liftedContent.time}</p>
            </div>
          }
        </section>
        {(linesResponse & liftedContent) && <LinesComponent liftedContent={liftedContent} linesResponse={linesResponse}  />}
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
  const linesResponse = state.linesResponse;
  // dispatch(fetchLines());
  return {
    liftedState: instances.states[id],
    linesResponse: linesResponse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    liftedDispatch: bindActionCreators(liftedDispatch, dispatch),
    linesResponse:  bindActionCreators(fetchLinesDispatch, dispatch)  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);