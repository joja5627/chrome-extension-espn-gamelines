const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// const compression = require('compression')
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();

module.exports = app;

// "start-dev": "NODE_ENV='development' nodemon server/index.js"
if (process.env.NODE_ENV !== 'production') require('../secrets');

// passport registration
// passport.serializeUser((user, done) => done(null, user.id));
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.models.user.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

const createApp = () => {
	app.use(morgan('dev'));

	// body parsing middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
	// app.use(bodyParser.json({ limit: '10mb', extended: true }));
	app.use(
		bodyParser.raw({
			type: 'application/octet-stream',
			limit: '10mb'
		})
	);

	// compression middleware
	//   app.use(compression())

	// session middleware
	app.use(
		session({
			secret: process.env.SESSION_SECRET || 'my best friend is Cody',
			store: sessionStore,
			resave: false,
			saveUninitialized: false
		})
	);

	// passport setup
	app.use(passport.initialize());
	app.use(passport.session());

	// auth and api routes
	app.use('/auth', require('./auth'));
	app.use('/api', require('./api'));

	// static file-serving middleware
	app.use(express.static(path.join(__dirname, '..', 'public')));

	// any remaining requests with an extension (.js, .css, etc.) send 404
	// app.use((req, res, next) => {
	//   if (path.extname(req.path).length) {
	//     const err = new Error('Not found')
	//     err.status = 404
	//     next(err)
	//   } else {
	//     next()
	//   }
	// })

	// sends index.html
	app.use('*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'public/index.html'));
	});

	// error handling endware
	app.use((err, req, res, next) => {
		console.error(err);
		console.error(err.stack);
		res.status(err.status || 500).send(err.message || 'Internal server error.');
	});
};

const startListening = () => {
	// start listening (and create a 'server' object representing our server)
	app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

const syncDb = () => db.sync();

async function bootApp() {
	//   await sessionStore.sync()
	//await syncDb();
	await createApp();
	await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
	bootApp();
} else {
	createApp();
}
