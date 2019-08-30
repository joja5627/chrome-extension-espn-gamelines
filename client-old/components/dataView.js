import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAllEmotionsThunk } from '../store/emotions';

class Dataview extends Component {
  componentDidMount() {
    this.props.getAllEmotions(this.props.User);
  }
  render() {
    return (
      <div style={{ margin: '1vh 2vw' }}>
        <div className="sub-nav centered enlarged-font">
          We at <strong>ChromeVision</strong> understand the importance of{' '}
          transparency. Accordingly, here is all the data we have associated
          with you, {this.props.Email}:
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>URL</Table.HeaderCell>
              <Table.HeaderCell>Anger</Table.HeaderCell>
              <Table.HeaderCell>Contempt</Table.HeaderCell>
              <Table.HeaderCell>Disgust</Table.HeaderCell>
              <Table.HeaderCell>Fear</Table.HeaderCell>
              <Table.HeaderCell>Happiness</Table.HeaderCell>
              <Table.HeaderCell>Neutral</Table.HeaderCell>
              <Table.HeaderCell>Sadness</Table.HeaderCell>
              <Table.HeaderCell>Suprise</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.Emotions &&
              this.props.Emotions.map(emotion => {
                const dateString = String(new Date(emotion.createdAt)).slice(
                  0,
                  24
                );
                return (
                  <Table.Row key={emotion.id}>
                    <Table.Cell><a href={emotion.url} target="_blank" rel="noopener noreferrer" style={{fontSize:'14px'}}>{emotion.url}</a></Table.Cell>
                    <Table.Cell>{emotion.anger}</Table.Cell>
                    <Table.Cell>{emotion.contempt}</Table.Cell>
                    <Table.Cell>{emotion.disgust}</Table.Cell>
                    <Table.Cell>{emotion.fear}</Table.Cell>
                    <Table.Cell>{emotion.happiness}</Table.Cell>
                    <Table.Cell>{emotion.neutral}</Table.Cell>
                    <Table.Cell>{emotion.sadness}</Table.Cell>
                    <Table.Cell>{emotion.surprise}</Table.Cell>
                    <Table.Cell>{dateString}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllEmotions: id => dispatch(getAllEmotionsThunk(id)),
  };
};
const mapStateToProps = state => {
  return {
    User: state.user.id,
    Email: state.user.email,
    Emotions: state.emotions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dataview);
