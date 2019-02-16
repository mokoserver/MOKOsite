/**
 * Created by kmalikov on 21.7.17.
 */
const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const helmet = require('helmet');

const options = {
    cert: fs.readFileSync('./sslcert/cert.pem'),
    key: fs.readFileSync('./sslcert/key.pem')
};

app.use(helmet());

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(8080);
https.createServer(options, app).listen(443);

console.log('Server is running now on http://localhost:443');