var test = require('./utils/test');

function problem() {
    /*
        Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
        If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
        
        For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
        
        Evaluate the sum of all the amicable numbers under 10000.
        

        NOTES:
        
        Oops, did it wrong.  Was thinking amicable numbers were numbers whose sum of divisors matched
        
        need to retry
        
        
        ran in about 205ms.  Could probably optimize it more though
        
    */

    function getProperDivisors(num) {

        var divisors = [];
        for (var i = 0, iEnd = Math.floor(Math.sqrt(num)) + 1; i < iEnd; i++) {
            if (num % i === 0) {
                divisors.push(i);
                if (i != 1) {
                    divisors.push(num / i);
                }
            }
        }
        //console.log('divisors of ' + num + ' = ', divisors);
        return divisors;
    }


    function getSumOfProperDivisors(num) {
        var divisors = getProperDivisors(num);

        if (divisors.length > 0) {
            return divisors.reduce(function(a, b) {
                return a + b;
            });
        }
        else {
            return undefined;
        }
    }

    function getAmicableNumber(num) {
        var num1 = getSumOfProperDivisors(num);
        if (getSumOfProperDivisors(num1) == num) {
            return num1;
        }
        else {
            return undefined;
        }
    }

    function getAmicalNumberList(maxNum) {
        var results = [];
        var amicableNumber;
        var uniques = {};
        for (var i = 1; i < maxNum + 1; i++) {
            if (!(i in uniques)) {

                amicableNumber = getAmicableNumber(i);
                if (amicableNumber && amicableNumber != i) {
                    results.push(i);
                    results.push(amicableNumber);
                    uniques[i] = true;
                    uniques[amicableNumber] = true;
                }
            }
        }
        return results;
    }


    function testGetProperDivisors() {

        var result = getProperDivisors(220).sort(function(a, b) {
            return a - b;
        });
        test.assertEqual(11, result.length, 'length of array should match');
        test.assertEqual('1,2,4,5,10,11,20,22,44,55,110', result.join(','));


        result = getProperDivisors(284).sort(function(a, b) {
            return a - b;
        });
        test.assertEqual(5, result.length, 'length of array should match');
        test.assertEqual('1,2,4,71,142', result.join(','));

        getProperDivisors(110);
    }
    //test.run('testGetProperDivisors', testGetProperDivisors);
    
    
    var maxNum = 10000;
    var amicableNumbers = getAmicalNumberList(maxNum);
    console.log(amicableNumbers);
    console.log('Sum of amicable numbers to ' + maxNum + ' is ' + amicableNumbers.reduce(function(a, b) {
        return a + b;
    }));
}
require('./utils/utils').measure(problem);
