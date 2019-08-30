import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import api from './middlewares/api';
import persist from './middlewares/persist';
import exportState from './middlewares/exportState';
import rootReducer from './reducers';
// import {
//   getMonitorSettings, getSocketSettings, getTestTemplates, getTemplatesSelected
// } from './utils/localStorage';
import ReactDOM from 'react-dom';

import { CONNECT_REQUEST } from './constants/socketActionTypes';
import App from './containers/App';

let enhancer;
const middlewares = applyMiddleware(exportState, api, persist());
if (process.env.NODE_ENV === 'production') {
  enhancer = middlewares;
} else {
  enhancer = compose(
    middlewares,
    window.devToolsExtension ? window.devToolsExtension() : noop => noop
  );
}
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'))
// class Root extends Component {
//   componentWillMount() {
//     this.
//     this.store.dispatch({
//       type: CONNECT_REQUEST,
//       options: getSocketSettings() || this.props.socketOptions
//     });
//   }

//   render() {
//     return (
//       <Provider store={this.store}>
//         <App {...this.props} />
//       </Provider>
//     );
//   }
// }

// Root.propTypes = {
//   hash: PropTypes.bool,
//   socketOptions: PropTypes.shape({
//     hostname: PropTypes.string,
//     port: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
//     autoReconnect: PropTypes.bool,
//     secure: PropTypes.bool
//   }),
//   monitorOptions: PropTypes.shape({
//     selected: PropTypes.string
//   }),
//   testTemplates: PropTypes.array
// };

// export default (Root);
