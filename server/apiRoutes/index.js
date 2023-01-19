const router = require('express').Router();
const generateWav = require('../generateWav');

//apis here...

router.post('/data-for-wav', async (req, res, next) => {
	try {
		console.log('API HiT!!!!');
		console.log('REQ BODY', req.body);
		await generateWav(req.body);
		res.sendStatus(200);
		console.log('WAV file should have been generated');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
