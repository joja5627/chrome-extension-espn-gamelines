import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getAllEmotionsThunk } from '../store/emotions';
import { setAllEmotionsOfDomain } from '../store/currentDomainEmotions';
import UserEmotionsRadar from './UserEmotionsRadar';
import UserEmotionsBarPeak from './UserEmotionsBarPeak';
import UserEmotionsLine from './UserEmotionsLine';
import UserEmotionsLineSearch from './UserEmotionsLineSearch';

import { urlFinder } from '../utils/baseUrlHelper';

import {
	Header,
	Container,
	Statistic,
	Segment,
	Divider
} from 'semantic-ui-react';

class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}

	handleChange(e) {
		this.setState({ search: e.target.value });
	}
	handleSubmit() {
		const arr = urlFinder(this.props.Emotions, this.state.search);
		this.props.setAllEmotionsOfDomain(arr);
	}
	render() {
		return (
			<Container>
				<Container>
					<div
						style={{
							alignItems: 'flex-end',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: '1vh'
						}}>
						{/* <Header as="h1">Snapshot for {this.props.Email}</Header> */}
            <div style={{fontSize: '28px'}}>
						Snapshot for {this.props.Email}
					  </div>
						<Header as="h4">
							<Statistic>
								<Statistic.Label>Total Snapshots</Statistic.Label>
								<Statistic.Value>{this.props.Emotions.length}</Statistic.Value>
							</Statistic>
						</Header>
					</div>
				</Container>
				<Divider hidden />
				<Segment raised>
					<UserEmotionsRadar />
				</Segment>
				<Segment raised>
					<UserEmotionsBarPeak />
				</Segment>
				<Segment raised>
					<UserEmotionsLine />
				</Segment>
				<Segment raised>
					<UserEmotionsLineSearch />
				</Segment>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getAllEmotions: id => dispatch(getAllEmotionsThunk(id)),
		setAllEmotionsOfDomain: emotions =>
			dispatch(setAllEmotionsOfDomain(emotions))
	};
};

const mapStateToProps = state => {
	return {
		User: state.user.id,
		Email: state.user.email,
		Emotions: state.emotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
