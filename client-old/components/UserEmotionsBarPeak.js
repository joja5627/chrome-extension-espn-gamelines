import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllEmotionsThunk } from '../store/emotions';
import { Container, Divider } from 'semantic-ui-react';
import { datafyBar } from '../utils/chartJsHelper';

class UserEmotionsBarPeak extends Component {
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}

	render() {
		return (
			<Container>
				<Divider horizontal section>
					EMOTIONAL PEAKS
				</Divider>
				<Bar
					responsive
					responsiveAnimationDuration={5}
					maintainAspectRatio
					duration={9000}
					easing="easeInOutBounce"
					data={datafyBar(this.props.Emotions)}
				/>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getAllEmotions: id => dispatch(getAllEmotionsThunk(id))
	};
};

const mapStateToProps = state => {
	return {
		User: state.user.id,
		Emotions: state.emotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	UserEmotionsBarPeak
);
