const { SERVER_PORT = 5003, HOST = "localhost" } = require('./config');

const cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(SERVER_PORT, HOST, function() {
    console.log('Running CORS Anywhere on ' + HOST + ':' + SERVER_PORT);
});