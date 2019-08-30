import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu } from 'semantic-ui-react';

class Navbar extends Component {
	state = { activeItem: 'home' };

	handleItemClick = (evt, { name }) => {
		if (name === 'ChromeVision') {
			name = 'home';
		}
		this.setState({ activeItem: name });
	};
	handleLogOut() {
		this.props.logout();
	}

	render() {
		const { activeItem } = this.state;
		const { isLoggedIn } = this.props;
		return (
			<div>
				<Menu pointing size="massive" stackable>
					<Menu.Item
						header
						as={Link}
						to="/home"
						name="ChromeVision"
						icon="eye"
						onClick={this.handleItemClick}
					/>

					<Menu.Item
						as={Link}
						to="/home"
						name="home"
						active={activeItem === 'home'}
						onClick={this.handleItemClick}
					/>
          { isLoggedIn ?
          <Menu.Menu position='left'>
            <Menu.Item
              as={Link}
              to="/charts"
              name="charts"
              // disabled={!isLoggedIn}
              active={activeItem === 'charts'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/data"
              name="data"
              // disabled={!isLoggedIn}
              active={activeItem === 'data'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu> :
          <Menu.Menu position='left'>
          <Menu.Item
              as={Link}
              to="/examplecharts"
              name="Example Charts"
              active={activeItem === 'charts'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
          }


					<Menu.Menu position="right">
						{!isLoggedIn ? (
							<Menu.Menu position="right">
								<Menu.Item
									as={Link}
									to="/login"
									name="Login"
									active={activeItem === 'Login'}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									as={Link}
									to="/signup"
									name="Sign Up"
									active={activeItem === 'Sign Up'}
									onClick={this.handleItemClick}
								/>
							</Menu.Menu>
						) : (
							<Menu.Item
								as={Link}
								to="/home"
								name="Logout"
								onClick={this.handleLogOut.bind(this)}
							/>
						)}
					</Menu.Menu>
				</Menu>
			</div>
		);
	}
}

const mapStateToProp = state => {
	return {
		isLoggedIn: !!state.user.id
	};
};

const mapStateToDispatch = dispatch => {
	return {
		logout: () => dispatch(logout())
	};
};

export default connect(mapStateToProp, mapStateToDispatch)(Navbar);

Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
