import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
	return (
		<div className="sub-nav centered enlarged-font wrap-container">
			<div className="container main-container">
			
				<p>
					If you are a <strong>new user</strong>, you must first{' '}
					<Link to="/signup">
						create a <strong>ChromeVision</strong> account,
					</Link>{' '}
					then install and log in with our companion Chrome extension.
				</p>

				<p>
					If you are an <strong>existing user</strong>, please{' '}
					<Link to="/login">sign in </Link>
					to your existing account to view your data.
				</p>

				<h2>Privacy</h2>
				<p>
					At <strong>ChromeVision</strong>, we value the importance of
					maintaining your privacy. To this end, we keep{' '}
					<strong>no record</strong> of any image or video data that is
					collected from your webcam. We also claim{' '}
					<strong>no ownership</strong> of your personal emotional data.
				</p>
			</div>
		</div>
	);
};

export default MainPage;
