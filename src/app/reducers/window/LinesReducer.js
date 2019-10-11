export const FETCH_LINES_SUCCESS = 'FETCH_LINES_SUCCESS';

  
  const initialState = {
    linesResponse: {}
  };
  
  export default function linesReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_LINES_SUCCESS:
        // console.log(FETCH_LINES_SUCCESS)
        // console.log(action.payload)
        return Object.assign({}, state, {
          linesResponse: action.payload
        })
  
      default:
        return state;
    }
  }