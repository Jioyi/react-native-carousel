const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'Welcome to Server!' });
});

router.use('/carousel', require('./carousel'));

module.exports = router;