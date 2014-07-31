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
    
    it('Errors if input format not recognized', function(done) {
        try {
            processVCard(vCardTemp, { in: 'gobbledegook', out: 'gibberish' })
        } catch (e) {
            e.message.should.equal('Unrecognized input format')
            done()
        }
    })
    
    it('Errors if output format not recognized', function(done) {
        try {
            processVCard(vCardTemp, { in: 'vcard-temp', out: 'gibberish' })
        } catch (e) {
            e.message.should.equal('Unrecognized output format')
            done()
        }
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