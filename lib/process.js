'use strict';

var ltx = require('ltx')

var NS_VCARD_TEMP = 'vcard-temp'

var determineInputFormat = function(data) {
    if ((data instanceof ltx) && data.getChild('vCard', NS_VCARD_TEMP)) {
        return NS_VCARD_TEMP
    }
}

var processVCard = function(data, options) {
    
    if (!options) options = {}
    
    if (!options.in) options.in = determineInputFormat(data)
        
}

module.exports = processVCard