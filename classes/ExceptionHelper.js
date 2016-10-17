'use strict';

/**
 * @class Helper
 * @description
 */
class ExceptionHelper {
	
	constructor() {
		throw new Error('Helper: EXCEPTION: Should not instantiate this class as it contains only static methods');
	}

	static log(logger, prefix, e){

		const errMsg = e && e.stack ? e.stack.split('\n') : e;

		(logger ? logger : console).error(prefix + ' EXCEPTION', errMsg);

		return errMsg;
	}

};

module.exports = ExceptionHelper;
