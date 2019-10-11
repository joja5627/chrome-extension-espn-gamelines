export default  function getLines() {
        let BASE_URL = 'https://api.actionnetwork.com/web/v1/scoreboard/';
        let sports = ['ncaaf', 'soccer', 'nba', 'nfl', 'nhl', 'mlb'];
        let queryParams = "?bookIds=15,30,14,13,24,49&date=20190925"
        let promises = []
        
          for (var i = 0; i < sports.length; i++) {
            let sport = sports[i];
            promises.push(fetch(BASE_URL + sport + queryParams, {
              credentials: 'omit',
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'sec-fetch-mode': 'no-cors'
              },
              referrerPolicy: 'no-referrer-when-downgrade',
              body: null,
              method: 'GET',
              mode: 'cors'
            })
              .then(response => response.json())
              .then(json => {
                if (json.league && (json.games.length > 1)) {
                   let response = {}
                   response[json.league.name] = json
                //    console.log(response)
                   return response
                }else{
                  return null
                }
              }));
          
        }
    
        return Promise.all(promises).then(res => {
            
            let response = {} 

            res.forEach(res => {
                response = { ...response, ...res }
            })
           
            return response
        });
    }

  
