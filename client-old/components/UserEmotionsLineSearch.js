import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { datafyLine } from '../utils/chartJsHelper';
import { getAllEmotionsThunk } from '../store/emotions';
import { setAllEmotionsOfDomain } from '../store/currentDomainEmotions';
import { Container, Divider, Header, Input, Label } from 'semantic-ui-react';
import { urlFinder } from '../utils/baseUrlHelper';
import UserEmotionsLine from './UserEmotionsLine';

class UserHomeLineSearch extends Component {
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
				<Divider horizontal section>
					Search a Site To View Your Sitewide Trends!
				</Divider>
				<Input
					placeholder="Domain"
					icon="world"
					iconPosition="left"
					size="mini"
					onChange={this.handleChange}
					action={{
						icon: 'search',
						onClick: () => this.handleSubmit()
					}}
				/>
				{this.state.search === '' ? (
					<Label size="small" pointing="left">
						Please enter a value
					</Label>
				) : null}

				<Divider hidden />
				<UserEmotionsLine searching={true} forCurr={true} />
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
		Emotions: state.emotions,
		currentDomainEmotions: state.currentDomainEmotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeLineSearch);
