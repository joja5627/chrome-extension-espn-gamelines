import React, { Component, PropTypes } from 'react';
import BOOKS from '../constants/books';
import Tab from './Tab';
import Tabs from './Tabs';
import Image from './Image';
import { inflateSync } from 'zlib';
import _ from 'lodash';

{
  /* <div className="btn-group btn-group-sm" role="group" >
                 <button type="button" className="btn btn-secondary">First Half</button>
                 <button type="button" className="btn btn-secondary">Second Half</button>
               </div>
               <div className="btn-group btn-group-sm" role="group">
                 <button type="button" className="btn btn-secondary">First Quarter</button>
                 <button type="button" className="btn btn-secondary">Second Quarter</button>
                 <button type="button" className="btn btn-secondary">Third Quarter</button>
                 <button type="button" className="btn btn-secondary">Fourth Quarter</button>
               </div> */
}

const imageStyle = {
  height: '40px',
  width: '40px'
};
const weakText = {
  fontSize: '.em',
  opacity: 0.5,
  fontSize: 'smaller'
};
const boldText = {
  fontSize: 'larger'
};

const padding20 = {
  padding: '20px'
};
const marginLeft30 = {
  marginLeft: '30px'
};
const marginRight30 = {
  marginRight: '30px'
};
const firstSection = {
  marginLeft: '40px',
  marginRight: '40px',
  padding: '10px'
};
const containerStyle = {
  marign: '10px',
  padding: '10px'
};
const marginTop10 = {
  marginTop: '10px'
};
const backgroundBlack = {
  backgroundColor: 'black',
  padding: '10px',
  margin: '10px',
  border: '1px solid black'
};
const marginNone = {
  margin: '0px'
};
const middle = {
  display: 'inline',
  margin: '3px'
};
const fillerImage = {
  height: '30px',
  width: '60px',
  border: '1px solid',
  display: 'inline'
};
const padding10 = {
  padding: '10px'
};
const marginBottom = {
  marginBottom: '10px'
};
export default class OddsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oddsType: 'game',
      ...props
    };
    
    this.setOddsType = this.setOddsType.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
    );
  }

  setOddsType = e => {
    this.setState({ oddsType: e.target.value });
  };
  findBook = bookId => {
    let book = BOOKS.find(function(book) {
      return book.id === bookId;
    });
    if (book) {
      return book.display_name;
    } else {
      return <div>book not found</div>;
    }
  };

  render() {
    return (
      <div style={marginTop10}>
        <div className="row justify-content-end">
          <div className="col-4">
            <div
              className="btn-group btn-group-toggle text-left"
              data-toggle="buttons"
              onClick={this.setOddsType}
            >
              <button
                className="btn btn-secondary active"
                size="sm"
                type="radio"
                name="odds-btn"
                id="base"
                autocomplete="off"
                value={'game'}
                checked={true}
              >
                <small>base</small>
                
              </button>
              <button
                className="btn btn-secondary"
                size="sm"
                type="radio"
                name="odds-btn"
                id="live"
                autocomplete="off"
                value={'live'}
              >
               <small>live</small>
              </button>
            </div>
          </div>
        </div>

        <Tabs>
          <div label="spread">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <th className="small font-weight-bold" scope="col">book</th>
                <th className="small font-weight-bold" scope="col">{this.state.homeTeam.display_name}</th>
                <th className="small font-weight-bold" scope="col">{this.state.awayTeam.display_name}</th>
              </thead>
              <tbody>
                {this.state.odds
                  .filter(odd => odd.type === this.state.oddsType)
                  .map(line => {
                    return (
                      <tr>
                        <th  className="small font-weight-bold"scope="row">{this.findBook(line.book_id)}</th>
                        <td>
                          <p className="small font-weight-bold margin-0">
                            {line.spread_home ? line.spread_home : '-'}
                          </p>
                          <i style={weakText}>
                            {line.spread_home_line
                              ? line.spread_home_line
                              : '-'}
                          </i>
                        </td>
                        <td>
                          <p className="small font-weight-bold margin-0">
                            {line.spread_away ? line.spread_away : '-'}
                          </p>
                          <i style={weakText}>
                            {line.spread_away_line
                              ? line.spread_away_line
                              : '-'}
                          </i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div label="money line">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th className="small font-weight-bold" scope="col">Book</th>
                  <th className="small font-weight-bold" scope="col">{this.state.homeTeam.display_name}</th>
                  <th className="small font-weight-bold" scope="col">{this.state.awayTeam.display_name}</th>
                </tr>
              </thead>
              <tbody>
                {this.state.odds
                  .filter(odd => odd.type === this.state.oddsType)
                  .map(line => {
                    return (
                      <tr>
                        <th className="small font-weight-bold"scope="row">{this.findBook(line.book_id)}</th>
                        <td>{line.ml_home ? line.ml_home : '-'}</td>
                        <td>{line.ml_away ? line.ml_away : '-'}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div label="total">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th className="small font-weight-bold" scope="col">Book</th>
                  <th className="small font-weight-bold" scope="col">{this.state.homeTeam.display_name}</th>
                  <th className="small font-weight-bold" scope="col">{this.state.awayTeam.display_name}</th>
                </tr>
              </thead>

              <tbody>
                {this.state.odds
                  .filter(odd => odd.type === this.state.oddsType)
                  .map(line => {
                    return (
                      <tr>
                        <th className="small font-weight-bold"scope="row">{this.findBook(line.book_id)}</th>
                        <td>
                          <p style={(boldText, marginNone)}>
                            {line.total ? `o${line.total}` : '-'}
                          </p>
                          <i style={weakText}>
                            {line.spread_away_line
                              ? line.spread_away_line
                              : '-'}
                          </i>
                        </td>
                        <td>
                          <p style={(boldText, marginNone)}>
                            {line.total ? `u${line.total}` : '-'}
                          </p>
                          <i style={weakText}>
                            {line.spread_home_line
                              ? line.spread_home_line
                              : '-'}
                          </i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Tabs>
      </div>
    );
  }
}
