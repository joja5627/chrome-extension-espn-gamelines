import {
    FETCH_LINES_SUCCESS
  } from './fetchLines';
  
  const initialState = {
    linesResponse: {}
  };
  
  export default function linesReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_LINES_SUCCESS:
        return {
          ...state,
          linesResponse: action.payload
        };
  
      default:
        return state;
    }
  }