const router = require('express').Router();
const { Emotion } = require('../db/models');

router.get('/', async (req, res, next) => {
	try {
		if (!req.user || !req.user.admin) {
			res.send("You're not authorized!");
		} else {
			const allEmotions = await Emotion.findAll();
			res.send(allEmotions);
		}
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		if (!req.user || !req.user.admin) {
			res.send("You're not authorized!");
		} else {
			const userEmotions = await Emotion.findAll({
				where: {
					userTokenId: req.params.id
				},
				include: [{ all: true }]
			});
			res.send(userEmotions);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
