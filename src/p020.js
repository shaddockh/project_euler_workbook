var test = require('./utils/test');

function problem() {
    /*
        n! means n × (n − 1) × ... × 3 × 2 × 1

        For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
        and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

        Find the sum of the digits in the number 100!
        
        
        NOTE: the size of the number keeps us from using the native number, we'll have to manually multiply
        
        
        this turned out to be pretty hairy.  Had to write a multiply function that does long multiplication of two string arrays
        due to the size of the numbers generated.  The javascript native float wasn't giving the correct accuracy.
        
        95mx
    
    */


    function getFactor(num) {
        if (num < 2) {
            return 1;
        } else {
            return manualMultiply(num, getFactor(num - 1));
        }
    }

    function manualMultiply(numA, numB) {

        numA = numA.toString();
        numB = numB.toString();

        var a, b;

        //take the smaller number as the multiplier    
        if (numA.length < numB.length) {
            a = numB.toString().split('').reverse().map(function(el) { return parseInt(el); });
            b = numA.toString().split('').reverse().map(function(el) { return parseInt(el); });
        }
        else {
            a = numA.toString().split('').reverse().map(function(el) { return parseInt(el); });
            b = numB.toString().split('').reverse().map(function(el) { return parseInt(el); });
        }

        var sums = [];
        var zeroes = [];
        var curLine = [];
        var curMult;
        var carry = 0;
        for (var multB = 0, multBLen = b.length; multB < multBLen; multB++) {
            curLine = zeroes.slice(0);
            carry = 0;
            for (var multA = 0,multALen = a.length; multA < multALen; multA++) {
                curMult = a[multA] * b[multB] + carry;
                curLine.push(curMult % 10);
                carry = Math.floor(curMult / 10);
            }
            if (carry > 0) {
                curLine.push(carry.toString());
            }
        
            sums.push(curLine.reverse().join(''));
            zeroes.push(0);
        }
        return manualAddArray(sums);
    }
    
    function manualAddArray(sums) {
        
        var sumArrays = sums.map(function(el) {
            return el.split('').map(function(el) {
                return parseInt(el);
            })
        });
        
        var process = true;
        var arrLen = sumArrays.length;
        var colSum = 0;
        var resultArr = [];
        while (process) {
            process = false;
            for ( var i = 0; i < arrLen; i++) {
                colSum += (sumArrays[i].pop() || 0);
                if (sumArrays[i].length > 0) { process = true; }
            }
            resultArr.push(colSum % 10);
            colSum = Math.floor(colSum / 10); //handle carry
        }
        if (colSum> 0) { resultArr.push(colSum); }
        return resultArr.reverse().join('');
    }

    function getSumOfDigits(num) {
        return num.toString().split('').reduce(function(a, b) {
            return parseInt(a) + parseInt(b);
        });
    }


    var factorOf = 100;

    console.log('Sum of digits of ' + factorOf + '! is: ' + getSumOfDigits(getFactor(factorOf)));
    
    
    // some unit tests
    function test_0() {
        test.assertEqual(3628800, getFactor(10));
        test.assertEqual(27, getSumOfDigits(3628800));

        test.assertEqual('265252859812191058636308480000000', getFactor(30));
        test.assertEqual('71569457046263802294811533723186532165584657342365752577109445058227039255480148842668944867280814080000000000000000000', getFactor(80));
    }

    function testManualMultiply() {
        test.assertEqual(10, manualMultiply(5, 2));
        test.assertEqual(100 * 50, manualMultiply(50, 100));
    }

    //    test.run('test_0', test_0);
    //test.run('testManualMultiply', testManualMultiply);

}
require('./utils/utils').measure(problem);
