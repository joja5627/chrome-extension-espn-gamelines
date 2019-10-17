import React  from 'react';



export const parseTeams = game => {
    const homeTeam = game.teams
      .filter(team => team.id === game.home_team_id)
      .pop();
    const awayTeam = game.teams
      .filter(team => team.id != game.home_team_id)
      .pop();
    return [homeTeam, awayTeam];
  };

export const GamesComponent = (props) => {
        const {games} = props 

        return games.map((game, index) => {
          let teams = this.parseTeams(game);
          let date = new Date(game.start_time);
          
          const overLay = {
            position: 'absolute',
            zIndex: '1'
          };
          return (
            <div className="margin-l-30">
              <div
                className="list-group-item list-group-item-action margin-bottom-10"
                data-toggle="collapse"
                href={`#collapse-${index}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapse-${index}`}
              >
                <div className="card text-center shadow-lg rounded align-middle">
                  <div className="card-block">
                    {/* <small>{game.boxscore.clock}</small>
                    <small>{game.period}</small> */}
                    <div className="row">
                   
                      <div
                        className="col border-radius-left"
                        style={{
                          backgroundColor: `#${teams[0].primary_color}`
                        }}
                      >
                        <Image
                          backgroundColor={teams[0].primary_color}
                          url={teams[0].logo}
                        />
                      </div>
    
                      <div
                        className="col border-radius-right"
                        style={{
                          backgroundColor: `#${teams[1].primary_color}`
                        }}
                      >
                        <Image
                          backgroundColor={teams[1].primary_color}
                          url={teams[1].logo}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* <div className="container-fluid">
                  <div className="col" style={margin0}>
                        
                        </div>
                    <div className="row d-flex justify-content-center">
                      
                      </div>
                    </div>
                    <div className="container text-center ">
                      <small>{date.toString()}</small>
                    </div> */}
    
                  
                </div>
              </div>
              <section
                    className="collapse padding-20"
                    id={`collapse-${index}`}
                
                  >
                    {game.odds ? (
                      <OddsComponent
                        game={game}
                        odds={game.odds}
                        awayTeam={teams[0]}
                        homeTeam={teams[1]}
                      />
                    ) : (
                      <div> no odds for this matchup</div>
                    )}
                  </section>
            </div>
          );
        });
    }



    
