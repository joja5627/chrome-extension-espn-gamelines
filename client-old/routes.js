import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserHome, Graph, MainPage, Dataview } from './components';
import { Login, Signup } from './components/loginsignup';
import { me, auth } from './store';

class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<Switch>
				{/* Routes placed here are available to all visitors */}
				<Route exact path="/" component={MainPage} />
				<Route path="/home" component={MainPage} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/graph" component={Graph} />
        <Route path="/examplecharts" component={Graph} />
				{isLoggedIn && (
          <Switch>
						{/* Routes placed here are only available after logging in */}
						<Route path="/charts" component={UserHome} />
            <Route path="/data" component={Dataview} />
					</Switch>
				)}
				<Route component={MainPage} />
			</Switch>
		);
	}
}

const mapState = state => {
	return {
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me());
		}
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
