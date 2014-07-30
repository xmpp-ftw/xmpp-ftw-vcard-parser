'use strict';

var NS_VCARD_TEMP = 'vcard-temp'

var ERROR_UNKNOWN_INPUT_FORMAT = 'Unknown input format'
var ERROR_NO_OUTPUT_FORMAT = 'No output format supplied'

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
        
}

module.exports = processVCard