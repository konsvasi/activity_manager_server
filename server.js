const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const axios = require('axios');
const httpsProxyAgent = require('https-proxy-agent');
const app = express();
const agent = new httpsProxyAgent('http://172.25.1.1:8080');

require('dotenv').config();

app.use(morgan('common'));
app.use(cors());
app.use(compression());

const config = {
	httpsAgent: agent
}

// Takes the search term from the submitted input
// and returns the data from the call to the omdbApi
app.post('/findMovie', (req, res) => {
	axios.get('http://www.omdbapi.com/?apikey='+ process.env.OMDB_API_KEY + '&s=' + req.query.searchTerm)
		.then(response => {
			res.send(response.data);
		})
		.catch(err => { console.log('error:', err)});
})


app.listen(process.env.PORT, () => console.log('Server running on port:', process.env.PORT));