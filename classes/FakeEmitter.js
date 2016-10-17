'use strict';

/**
 * @class FakeEmitter
 * @description
 * A fake emitter data emitter (will send fake data through socket.io every 500 milliseconds)
 */
class FakeEmitter {
	
	constructor() {
		this.intervalId = undefined;
	}

	/**
	 * @method getRandomInt
	 * @description 
	 * helper function to return a random integer within a specified range
	 */
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * @method getFakeData
	 * @description 
	 * helper function that returns a data item with random data points/counts
	 */
	getFakeData () {
		return {
			sessionsPerMinute: this.getRandomInt(1234, 5432),
			averageSessionLength: this.getRandomInt(15454, 53692),
			databaseRequestsPerSec: this.getRandomInt(15499, 57932),
			other: this.getRandomInt(12131, 27932)
		};
	}

	/**
	 * @method start
	 * @description start emitting
	 */
	start (io) {
		if (!this.intervalId) {
			this.intervalId = setInterval(() => {
				const fakeData = this.getFakeData();
				io.emit('dashboardData', fakeData);
			}, 500);
		}
	}

	/**
	 * @method stop
	 * @description stop emitting
	 */
	stop () {
		if (this.intervalId){
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
	}
};

module.exports = FakeEmitter;
