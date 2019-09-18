export const FETCH_LINES_SUCCESS = 'FETCH_LINES_SUCCESS';
  
export function getLinesDispatch(payload){
  return {
  type: FETCH_LINES_SUCCESS,
  payload: {...payload}
}};