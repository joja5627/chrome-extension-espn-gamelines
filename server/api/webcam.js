const router = require('express').Router();
const { User, Emotion } = require('../db/models');
const { azureKey } = require('../../secrets');
const request = require('request');

const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

const params = {
	returnFaceId: 'true',
	returnFaceLandmarks: 'false',
	returnFaceAttributes: 'emotion'
};

router.post('/', async (req, res, next) => {
	try {
		let emotionObj;
		const { tokenid, taburl } = req.headers;

		const options = {
			uri: uriBase,
			qs: params,
			body: req.body,
			headers: {
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key': azureKey
			}
		};
		await request.post(options, async (error, response, body) => {
			try {
				if (error) {
					console.error('Error: ', error);
					return;
				}
				let jsonObj = JSON.parse(body);
				let jsonResponse = JSON.stringify(jsonObj, null, '  ');
				console.log('JSON response:', jsonResponse);
				if (jsonObj[0]) {
					emotionObj = jsonObj[0].faceAttributes.emotion;
					emotionObj.url = taburl;
					const associatedUser = await User.findOne({
						where: {
							tokenId: tokenid
						}
					});
					emotionObj.userId = associatedUser.id;
					console.log('emotion object sent to db:\n', emotionObj);
					await Emotion.create(emotionObj);
				} else {
					console.log(
						'The face detection response is empty. Either there is no face in the photo or the image data is bad. Please try again.'
					);
				}
			} catch (err) {
				next(err);
			}
		});
		// this response prevents server timeout
		res.send('response');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
