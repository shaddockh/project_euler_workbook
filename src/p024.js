var test = require('./utils/test');

function problem() {
    /*
        A permutation is an ordered arrangement of objects. For example, 3124 is one possible 
        permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically 
        or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:
    
        012   021   102   120   201   210
    
        What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
        
        
        
        NOTES:
        Handled this with brute force.  First pass was to generate a huge array recursively and the pluck out the index we
        are looking for.  That wouldn't work with 1000000.  So, modified it to keep track of how many permutations it had gone through
        and not store the interim values in the array.  Once it hits the Nth permutation, short-circuit and pass back the value.and
        
        Still brute force, and it runs in 2.3 seconds.3
        
        Apparently, there is a Euler solution using factorials that would be quicker.  Need to re-implement with the euler method.
    */


    //brute force method
    function getLexographicPermutations(prefixDigit, remainingDigits) {

        var result = [];

        if (remainingDigits.length === 1) {
            return [ (prefixDigit || '') + remainingDigits.shift()];
        }
        for (var i = 0; i < remainingDigits.length; i++) {
            var digit = remainingDigits[i];
            var newArray = remainingDigits.slice(0);
            newArray.splice(i,1);
            result = result.concat(getLexographicPermutations( (prefixDigit || '') + digit, newArray ));
        }

        return result;
    }


    function getNthPurmutation(n, sequence) {
        var currentVal = 0;
        function getLexographicPermutationsN(prefixDigit, remainingDigits) {
    
            var result;

            if (currentVal == n) { return; }    
            if (remainingDigits.length === 1) {
                currentVal++;
                if (currentVal == n) {
                    return (prefixDigit || '') + remainingDigits.shift();
                } else {
                    return undefined;
                }
            }
            for (var i = 0; i < remainingDigits.length; i++) {
                var digit = remainingDigits[i];
                var newArray = remainingDigits.slice(0);
                newArray.splice(i,1);
                
                var tempReturn = getLexographicPermutationsN( (prefixDigit || '') + digit, newArray );
                if (tempReturn) {
                    result = tempReturn;
                }
                if (currentVal == n) { return result; }
            }
    
            return result;
        }
        
        var perm = getLexographicPermutationsN(null, sequence);
        return perm;
    }
    
    function testGetpermutations() {
        var result = getLexographicPermutations(null, ['0','1','2']);
        console.log(result.join(','));
        test.assertEqual('012,021,102,120,201,210', result.join(','));
    }

    function testGetNthPermutation() {
        var sequence = ['0','1','2','3','4'];
        var result = getLexographicPermutations(null, sequence);
        console.log(result.join(','));
        test.assertEqual('03124',getNthPurmutation(13, sequence));
        test.assertEqual('01342',getNthPurmutation(4, sequence));
    }    
    
    test.run('testGetpermuations', testGetpermutations);
    test.run('testGetNthPermutation', testGetNthPermutation);

    
    function doit() {
        var max = 1000000;
        var sequence = ['0','1','2','3','4','5','6','7','8','9'];
        var result = getNthPurmutation(max, sequence);
        console.log('Permutation at position ' + max + ' is ' + result);
    }
    doit();
}
test.enabled = false;
require('./utils/utils').measure(problem);
