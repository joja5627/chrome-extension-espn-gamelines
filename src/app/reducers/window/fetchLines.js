

export const FETCH_LINES_SUCCESS = 'FETCH_LINES_SUCCESS';
  
export const fetchLinesSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});
export function fetchLines() {
    return dispatch => {
        let BASE_URL = 'https://api.actionnetwork.com/web/v1/scoreboard/';
        let sports = ['ncaaf', 'soccer', 'nba', 'nfl', 'nhl', 'mlb'];
        
          for (var i = 0; i < sports.length; i++) {
            let sport = sports[i];
            fetch(BASE_URL + sport, {
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
              .then(response => response.json())
              .then(json => {
                if (json.league && (json.games.length > 1)) {
                  console.log(json)
                  dispatch(fetchLinesSuccess(json));
                  return json
                }
              });
          
        }
  }
}
