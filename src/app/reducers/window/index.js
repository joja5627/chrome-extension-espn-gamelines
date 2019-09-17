import { combineReducers } from 'redux';
import instances from './instances';
import monitor from 'remotedev-app/lib/reducers/monitor';
import notification from 'remotedev-app/lib/reducers/notification';
import socket from 'remotedev-app/lib/reducers/socket';
import reports from 'remotedev-app/lib/reducers/reports';
import test from 'remotedev-app/lib/reducers/test';
import linesReducer from './fetchLines'
const rootReducer = combineReducers({
  instances,
  monitor,
  test,
  socket,
  reports,
  notification,
  linesReducer
});

export default rootReducer;
