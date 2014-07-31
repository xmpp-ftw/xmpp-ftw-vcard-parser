'use strict';

var ltx = require('ltx')
  , fs = require('fs')
  , input = require('../../../lib/input/vcard-temp')

var getStanza = function(file) {
    var stanza = fs.readFileSync('./test/resources/' + file)
    var stanzaStr = stanza.toString('utf8')
        .replace(/[\n\r]/g, '')
        .replace(/>\s{1,}/g, '>')
    return ltx.parse(stanzaStr)
}

require('should')

var inputXml = getStanza('vcard-temp')
var outputJson = JSON.parse(fs.readFileSync('./test/resources/json'))

/* jshint -W030 */
describe('Input', function() {
    
    describe('vcard-temp', function() {
        
        it('Converts vcard-temp to interim format', function() {
            input.process(inputXml).should.eql(outputJson)
        })
        
    })

})