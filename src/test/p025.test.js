describe('Problem 025', function() {
    var assert = require('assert');
    var problem25 = require('../p025');

    it('Nth element of fibonacci sequence should be', function(){
        assert.equal(21, problem25.fibSeq(8));
        assert.equal(34, problem25.fibSeq(9));
        assert.equal(55, problem25.fibSeq(10));
        assert.equal(144, problem25.fibSeq(12));
    });
    
    it('First element of fibonacci sequence with N digits should be', function() {
        assert.equal(12, problem25.findFibWithMaxDigits(3));    
        assert.equal(17, problem25.findFibWithMaxDigits(4));    
    });
    
    
    it('Manually adding two numbers should equal', function() {
      assert.equal('500', problem25.manualAdd(200,300));  
      assert.equal('500', problem25.manualAdd('200','300'));  
      assert.equal('2', problem25.manualAdd('1','1'));  
      assert.equal('42', problem25.manualAdd('29','13'));  
      assert.equal('21', problem25.manualAdd('13','8'));  
    });
    
});