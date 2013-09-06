var test = require('./utils/test');

function problem() {
    /*
    A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. 
    For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

    A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

    As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers
    is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. 
    However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed
    as the sum of two abundant numbers is less than this limit.

    Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.
    
    
    NOTES:
    
      iterate through the numbers 1 .. max
      check if the number is an abundant number and if so:
         - add it to the list of abundant numbers
         - iterate over the list of abundant numbers, adding this new number to each and storing in a hash by sum
      check the hash by sum and see if the current number is in it.. if it is, then it's a number that can be reached by summing 2 abundant numbers and 
      not a valid number for the final sum
      
      sum the numbers that didn't match the above.
      
      1.3 seconds
      
    
     a couple things hung me up on this:
     1) when getting the sum of divisors, I was mistakenly adding divisors that were the same: ie: 
         4 = 2 + 2 + 1 instead of just 4 = 2 + 1
     2) when iterating over the list of abundant numbers adding the new one, I was not adding the new one with itself, which is a valid case
     
    */

    function getSumOfDivisors(num) {
        var tot = 1;
        for (var x = 2, xEnd = Math.floor(Math.sqrt(num)) + 1; x < xEnd; x++) {
            if (num % x === 0) {
                tot += x;
                if (num / x != x) {
                    tot += (num / x);
                }
            }
        }
        return tot;
    }

    function isAbundant(num) {
        return getSumOfDivisors(num) > num;
    }

    function testGetSumOfDivisors() {
        test.assertEqual(28, getSumOfDivisors(28));
        test.assertEqual(16, getSumOfDivisors(12));
    }

    test.run('testGetSumOfDivisors', testGetSumOfDivisors);

    function testAbundantNumbers() {
        test.assertEqual(false, isAbundant(28));
        test.assertEqual(true, isAbundant(12));
        for (var i = 1; i < 12; i++) {
            test.assertEqual(false, isAbundant(i), 'Should not be abundant: ' + i);
        }
    }
    test.run('testAbundantNumbers', testAbundantNumbers);


    var abundantSums = {};
    var abundantNums = [];

    function isSumOfTwoAbundantNumbers(num) {
        return num in abundantSums;
    }

    function addAbundant(num) {
        //run through and add to all prior abundant numbers
        abundantNums.push(num);
        for (var i = 0, iLen = abundantNums.length; i < iLen; i++) {
            abundantSums[num + abundantNums[i]] = true;
        }
    }

    function findAnswer(max) {
        var total = 0;


        for (var i = 1; i < max + 1; i++) {
            if (isAbundant(i)) {
                addAbundant(i);
            }
            if (!isSumOfTwoAbundantNumbers(i)) {
                //console.log('Not sum of two abundant numbers: ' + i);
                total += i
            }
        }
        return total;
    }

    if (!test.enabled) {
        var max = 28147;    
        var i = findAnswer(max);
        console.log('sum is: ' + i);
    }
}

test.enabled = false;
require('./utils/utils').measure(problem);
