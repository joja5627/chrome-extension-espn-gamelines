const authForm = document.getElementsByTagName('form')[0];
const contentToShow = document.getElementById('content');
const feedbackMessage = document.getElementById('feedback');

authForm.onsubmit = evt => {
	evt.preventDefault();

	const userObj = {};

	async function getUserIdFromStorage(callback) {
		await chrome.storage.sync.get('userid', async items => {
			let userid = items.userid;
			if (userid) {
				callback(userid);
			} else {
				let randomPool = new Uint8Array(32);
				crypto.getRandomValues(randomPool);
				let hex = '';
				for (let i = 0; i < randomPool.length; i++) {
					hex += randomPool[i].toString(16);
				}
				await chrome.storage.sync.set({ userid: hex }, () => {
					callback(hex);
				});
			}
		});
	}

	getUserIdFromStorage(useToken);

	function useToken(userid) {
		let token = userid;
		defineObjectAndMakeRequest(token);
	}

	async function defineObjectAndMakeRequest(token) {
		userObj.email = evt.target[0].value;
		userObj.password = evt.target[1].value;
		userObj.tokenId = token;

		const updateURI = 'http://localhost:8080/auth/login';

		const response = await fetch(updateURI, {
			method: 'PUT',
			body: JSON.stringify(userObj),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			switchView();
		} else {
			feedbackMessage.textContent =
				'Your username/password combination is invalid.\nPlease make sure you have already signed up through our web application, and that you have entered the correct username and password.';
		}
	}
};

function switchView() {
	authForm.classList.toggle('hidden');
	contentToShow.classList.toggle('hidden');
}
