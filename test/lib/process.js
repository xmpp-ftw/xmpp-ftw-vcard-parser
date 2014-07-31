'use strict';

var ltx = require('ltx')
  , mockery = require('mockery')

require('should')

var processVCard = null

/* jshint -W030 */
describe('Checking input format', function() {
    
    var vCardTemp = new ltx.parse('<iq><vCard xmlns="vcard-temp"/></iq>')
    
    beforeEach(function() {
        processVCard = require('../../index')
    })
    
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
    
    it('Processes as expected', function() {
        
        mockery.enable()
        
        var inputStub = {
            process: function(data) {
                data.toString().should.equal(vCardTemp.toString())
                return { data: 'hello' }
            }
        }
        var outputStub = {
            process: function(data) {
                data.should.eql({ data: 'hello' })
                return { data: data.data.toUpperCase() }
            }
        }
        
        mockery.registerMock('./input/vcard-temp', inputStub)
        mockery.registerMock('./output/json', outputStub)
        
        var response = processVCard(vCardTemp, { in: 'vcard-temp', out: 'json' })
        response.should.eql({ data: 'HELLO' })
        
        mockery.disable()
    })
    
})