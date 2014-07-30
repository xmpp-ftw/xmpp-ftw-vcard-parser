'use strict';

var ltx = require('ltx')

var NS_VCARD_TEMP = 'vcard-temp'

var ERROR_UNKNOWN_INPUT_FORMAT = 'Unknown input format'

var determineInputFormat = function(data) {
    if ((typeof data === 'object') && (data instanceof ltx) && data.getChild('vCard', NS_VCARD_TEMP)) {
        return NS_VCARD_TEMP
    }
    throw new Error(ERROR_UNKNOWN_INPUT_FORMAT)
}

var processVCard = function(data, options) {
    
    if (!options) options = {}
    
    if (!options.in) options.in = determineInputFormat(data)
        
}

module.exports = processVCard