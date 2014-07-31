'use strict';

var addKey = function(key, stanza, data) {
    key = key.toUpperCase()
    if (!stanza.getChild(key)) return
    var text = stanza.getChild(key).text()
    if (!text) text = false
    data[key.toLowerCase()] = text 
}

var handleNames = function(stanza, response) {
    addKey('FN', stanza, response)
    
    var name = stanza.getChild('N')
    if (name)  {
        response.n = {}
        addKey('FAMILY', name, response.n)
        addKey('GIVEN', name, response.n)
        addKey('MIDDLE', name, response.n)
    }
    addKey('NICKNAME', stanza, response)
}

var handleOrg = function(stanza, response) {
    if (stanza.getChild('ORG')) {
        response.org = {}
        var org = stanza.getChild('ORG')
        addKey('ORGNAME', org, response.org)
        addKey('ORGUNIT', org, response.org)
    }
    addKey('TITLE', stanza, response)
    addKey('ROLE', stanza, response)
}

var handleTelephoneNumbers = function(numbers, data) {
    if (0 === numbers.length) return
    data.tel = []
    numbers.forEach(function(number) {
        var tel = {}
        addKey('WORK', number, tel)
        addKey('HOME', number, tel)
        addKey('VOICE', number, tel)
        addKey('FAX', number, tel)
        addKey('MSG', number, tel)
        addKey('NUMBER', number, tel)
        data.tel.push(tel)
    })
}

var process = function(stanza) {
    var response = { 'vcard-temp': {} }
    var vCard = response['vcard-temp']
    var xml = stanza.getChild('vCard')
    handleNames(xml, vCard)
    addKey('URL', xml, vCard)
    addKey('BDAY', xml, vCard)
    handleOrg(xml, vCard)
    handleTelephoneNumbers(xml.getChildren('TEL'), vCard)
    
    return response
}

exports.process = process