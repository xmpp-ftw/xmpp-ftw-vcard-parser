'use strict';

var NS_VCARD_TEMP = 'vcard-temp'

var ERROR_UNKNOWN_INPUT_FORMAT = 'Unknown input format'
var ERROR_NO_OUTPUT_FORMAT = 'No output format supplied'
var ERROR_UNRECOGNIZED_INPUT_FORMAT = 'Unrecognized input format'
var ERROR_UNRECOGNIZED_OUTPUT_FORMAT = 'Unrecognized output format'

var determineInputFormat = function(data) {
    if ((typeof data === 'object') &&
        ('undefined' !== data.getChild) &&
        data.getChild('vCard', NS_VCARD_TEMP)) {
        return NS_VCARD_TEMP
    }
    throw new Error(ERROR_UNKNOWN_INPUT_FORMAT)
}

var processVCard = function(data, options) {
    
    if (!options) options = {}
    
    if (!options.in) options.in = determineInputFormat(data)
    if (!options.out) throw new Error(ERROR_NO_OUTPUT_FORMAT)
    
    var input = null
    var output = null
    try {
        input = require('./input/' + options.in)
    } catch (e) {
        throw new Error(ERROR_UNRECOGNIZED_INPUT_FORMAT)
    }
    try {
        output = require('./input/' + options.out)
    } catch (e) {
        throw new Error(ERROR_UNRECOGNIZED_OUTPUT_FORMAT)
    }
}

module.exports = processVCard