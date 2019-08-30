const SET_ALL_EMOTION_OF_DOMAIN = 'SET_ALL_EMOTIONS_OF_DOMAIN';

const defaultAllEmotionOfDomain = [];

export const setAllEmotionsOfDomain = emotions => {
	return {
		type: SET_ALL_EMOTION_OF_DOMAIN,
		emotions
	};
};

export default function(state = defaultAllEmotionOfDomain, action) {
	switch (action.type) {
		case SET_ALL_EMOTION_OF_DOMAIN:
			return action.emotions;
		default:
			return state;
	}
}
