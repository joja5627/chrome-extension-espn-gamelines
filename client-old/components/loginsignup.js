import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import {
	Button,
	Form,
	Grid,
	Header,
	Segment,
	Message
} from 'semantic-ui-react';

class LoginSignUp extends Component {
	render() {
		const { name, displayName, handleSubmit, error } = this.props;

		return (
			<div className="login-form">
				<style>{`
			  body > div,
			  body > div > div,
			  body > div > div > div.login-form {
			    height: 100%;
			  }
			`}</style>

				<Segment placeholder>
					<Header>
						<h1 style={{ textAlign: 'center', paddingTop: '-1vh' }}>
							{displayName}
						</h1>
					</Header>
					<Grid
						columns={2}
						relaxed="very"
						stackable
						textAlign="center"
						style={{ height: '100%' }}
						verticalAlign="middle">
						<Form onSubmit={handleSubmit} name={name} widths="equal">
							<Grid.Column>
								<Form.Input
									icon="user"
									iconPosition="left"
									placeholder="Email"
									name="email"
								/>
							</Grid.Column>
							<Grid.Column>
								<Form.Input
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									type="password"
									name="password"
								/>
							</Grid.Column>
							<Button color="blue" fluid size="large">
								{displayName}
							</Button>
						</Form>
					</Grid>
				</Segment>
				{error &&
					error.response && (
						<div id="wrong-username-pw"> {error.response.data}! </div>
					)}
			</div>
		);
	}
}

const mapLogin = state => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.user.error
	};
};

const mapSignup = state => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		error: state.user.error
	};
};

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const email = evt.target.email.value;
			const password = evt.target.password.value;
			dispatch(auth(email, password, formName));
		}
	};
};

export const Login = connect(mapLogin, mapDispatch)(LoginSignUp);
export const Signup = connect(mapSignup, mapDispatch)(LoginSignUp);

LoginSignUp.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired
};
