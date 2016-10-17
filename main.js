'use strict';

const App = require('./Classes/App.js')
	, _app = App.getInstance({
		logger: console
	});

_app.start(3333);

// const FakeEmitter = require('./Classes/FakeEmitter')
// 	, _fakeEmitter = new FakeEmitter();

// _fakeEmitter.start(_app.io);
