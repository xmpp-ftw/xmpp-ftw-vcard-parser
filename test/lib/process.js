'use strict';

var ltx = require('ltx')

require('should')

var processVCard = require('../../index')

/* jshint -W030 */
describe('Checking input format', function() {
    
    var vCardTemp = new ltx.parse('<iq><vCard xmlns="vcard-temp"/></iq>')
    
    describe('Input format not supplied', function() {
        
        it('Errors when it can\'t determine the input format', function(done) {
            try {
                processVCard(true)
            } catch (e) {
                e.message.should.equal('Unknown input format')
                done()
            }
        })
        
    })
    
    it('Throws error if output format not requested', function(done) {
        try {
            processVCard(vCardTemp)
        } catch (e) {
            e.message.should.equal('No output format supplied')
            done()
        }
    })
    
})