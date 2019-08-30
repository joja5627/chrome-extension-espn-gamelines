const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/emotions', require('./emotions'));
router.use('/webcam', require('./webcam'));

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

module.exports = router;
