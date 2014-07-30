'use strict';

require('should')

var processVCard = require('../../index')

/* jshint -W030 */
describe('Checking input format', function() {
    
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
    
})