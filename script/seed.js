'use strict';

const db = require('../server/db');
const { User, Emotion } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('Database synchronization complete.');

	const users = await Promise.all([
		User.create({
			email: 'joseph@email.com',
			password: '123',
			tokenId:
				'985ad792cef8d0b893b3a2f7349213106a9c96e35f1de582922e757cf8de8364'
		}),

		User.create({
			email: 'stephen@email.com',
			password: '321',
			tokenId: '3ce0c3bd839d10e849d54d4422104ee521f39effe3c4d9f925ed292434364f'
		}),

		User.create({
			email: 'preet@email.com',
			password: '1234',
			tokenId: '3b56b089b21077b46971a5c33e1cf718d68c3d4ddd7f129d123ffe7f9f011ab'
		}),

		User.create({
			email: 'sanjeev@email.com',
			password: '4321',
			tokenId: 'd19c8d2f61d45395f1d897faf33d35ec97e9a021509cdb3614c7bc4c4fb27b'
		})
	]);

	const emotions = await Promise.all([
		Emotion.create({
			url: 'google.com',
			anger: '0',
			contempt: '0',
			disgust: '0',
			fear: '0.12',
			happiness: '0.8',
			neutral: '0.002',
			sadness: '0.01',
			surprise: '0.068',
			userTokenId:
				'985ad792cef8d0b893b3a2f7349213106a9c96e35f1de582922e757cf8de8364',
			userId: 1
		}),

		Emotion.create({
			url: 'google.com',
			anger: '0',
			contempt: '0',
			disgust: '0',
			fear: '0.12',
			happiness: '0.8',
			neutral: '0.002',
			sadness: '0.01',
			surprise: '0.068',
			userTokenId:
				'3ce0c3bd839d10e849d54d4422104ee521f39effe3c4d9f925ed292434364f',
			userId: 2
		}),

		Emotion.create({
			url: 'google.com',
			anger: '0',
			contempt: '0',
			disgust: '0',
			fear: '0.12',
			happiness: '0.8',
			neutral: '0.002',
			sadness: '0.01',
			surprise: '0.068',
			userTokenId:
				'3b56b089b21077b46971a5c33e1cf718d68c3d4ddd7f129d123ffe7f9f011ab',
			userId: 3
		}),

		Emotion.create({
			url: 'google.com',
			anger: '0',
			contempt: '0',
			disgust: '0',
			fear: '0.12',
			happiness: '0.8',
			neutral: '0.002',
			sadness: '0.01',
			surprise: '0.068',
			userTokenId:
				'd19c8d2f61d45395f1d897faf33d35ec97e9a021509cdb3614c7bc4c4fb27b',
			userId: 4
		})
	]);
}

async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (error) {
		console.error(error);
	} finally {
		console.log('closing database connection');
		await db.close();
		console.log('connection closed');
	}
}

if (module === require.main) {
	runSeed();
}

module.exports = seed;
