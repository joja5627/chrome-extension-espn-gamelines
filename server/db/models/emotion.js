const Sequelize = require('sequelize');
const db = require('../db');

const Emotion = db.define('emotion', {
	url: {
		type: Sequelize.STRING
	},
	anger: {
		type: Sequelize.STRING
	},
	contempt: {
		type: Sequelize.STRING
	},
	disgust: {
		type: Sequelize.STRING
	},
	fear: {
		type: Sequelize.STRING
	},
	happiness: {
		type: Sequelize.STRING
	},
	neutral: {
		type: Sequelize.STRING
	},
	sadness: {
		type: Sequelize.STRING
	},
	surprise: {
		type: Sequelize.STRING
	}
});

module.exports = Emotion;
