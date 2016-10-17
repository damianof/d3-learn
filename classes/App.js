'use strict';

const ExceptionHelper = require('./ExceptionHelper')
	, express = require('express')
	, http = require('http')
	, socketio = require('socket.io');

let _instance
	, _logger
	, _expressInstance
	, _httpServer
	, _ioInstance;

/**
 * @class App
 * @description
 */
class App {
	
	constructor(args) {
		try {

			_logger = args.logger || console;

			_expressInstance = express();

			_httpServer = http.Server(_expressInstance);

			// setup up express app
			//const staticPath = __dirname + '/../html';
			const staticPath = './html';
			_logger.log('App: static path is', staticPath);
			_expressInstance.use(express.static(staticPath));

			// setup socket.io server
			_ioInstance = socketio(_httpServer);
		
			// wireup a handler to socket.io connection event, just for logging when a user connects
			_ioInstance.on('connection', (socket) => {
				_logger.log('socket.io a user connected');
				// log message when a user disconnect
				socket.on('disconnect', function(){
				_logger.log('socket.io user disconnected');
				});
			});

		} catch (e) {
			ExceptionHelper.log(_logger, 'App.constructor', e);
		}
	}

	get io () {
		return _ioInstance;
	}

	start(port) {
		// start node/express http server
		_httpServer.listen(port, () => {
			_logger.log('httpServer listening on *:' + port);
		});
	}

	/**
	 * @method getInstance
	 * @description
	 */
	static getInstance(args){
		if (!_instance){
			_instance = new App(args);
		}
		
		return _instance;
	}

};

module.exports = App;
