const http = require('./http.js');

const port = process.env.SERVER_PORT || 3001;

http.listen(port, async () => {
	console.log(`Server listening on port: ${port}`);
});
