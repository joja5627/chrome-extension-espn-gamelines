import axios from 'axios';

const GET_ALL_EMOTIONS = 'GET_ALL_EMOTIONS';

const defaultAllEmotion = [];

const getAllEmotions = emotions => {
	return {
		type: GET_ALL_EMOTIONS,
		emotions
	};
};

export const getAllEmotionsThunk = id => async dispatch => {
	try {
		const emotions = await axios.get(`/api/users/${id}/emotions`);
		dispatch(getAllEmotions(emotions.data));
	} catch (error) {
		console.error(error);
	}
};

export default function(state = defaultAllEmotion, action) {
	switch (action.type) {
		case GET_ALL_EMOTIONS:
			return action.emotions;
		default:
			return state;
	}
}
