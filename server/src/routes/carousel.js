const { Router } = require('express');
const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const blocks = [
			{
				title: 'Python',
				image:
					'https://raw.githubusercontent.com/Jioyi/Jioyi/master/icons/python.svg.png',
			},
			{
				title: 'Typescript',
				image:
					'https://raw.githubusercontent.com/Jioyi/Jioyi/master/icons/Typescript.svg.png',
			},
			{
				title: 'Java',
				image:
					'https://raw.githubusercontent.com/Jioyi/Jioyi/master/icons/java.png',
			},
		];
		return res.json({
			message: 'successful',
			blocks,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
