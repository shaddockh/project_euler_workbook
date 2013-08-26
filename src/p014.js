
function p14() {
    /*
    The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:

13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.
*/
    //brute force!
    function getCollatzChainLength(startingNum) {

        var num = startingNum;
        var count = 1;
        while (num != 1) {
            num = num % 2 == 0 ? num / 2 : (num * 3) + 1;
            count++;
        }
        return count;
    }

    function bruteForce() {
        var maxNum = 1000000;
        var curMax = 0;
        var longestChainNum = 0;
        var chainLen = 0;
        for (var i = 1; i <= maxNum; i++) {
            chainLen = getCollatzChainLength(i);
            if (chainLen > curMax) {
                longestChainNum = i;
                curMax = chainLen;
            }
        }
        console.log('Number not greater than ' + maxNum + ' with longest Collatz Chain is: ' + longestChainNum + ', chain length is: ' + curMax);
    }

    function memoize(fn) {
        var hash = {};
        var returnFunction = function (arg) {
            var result = hash[arg];
            if (typeof(result) === 'undefined') {
                result = fn(arg);
                hash[arg] = result;
            }
            return result;
        };
        returnFunction.hashLength = function() {
            var i = 0;
            for (var x in hash) { i++; } 
            return i;
        };
        return returnFunction;
    }


    var getCollatzChainLength_rec2 = memoize(function (num) {
        if (num > 1) {
            num = num % 2 == 0 ? num / 2 : (num * 3) + 1;
            return 1 + getCollatzChainLength_rec2(num);
        } else { return 1; }
    });


    var hash = {};

    function getCollatzChainLength_rec(startingNum) {
        var count = 1;
        if (typeof (hash[startingNum]) !== 'undefined') {
            count = hash[startingNum];
        } else {
            var num = startingNum;
            if (num > 1) {
                num = num % 2 == 0 ? num / 2 : (num * 3) + 1;
                count += getCollatzChainLength_rec(num);
            }
            hash[startingNum] = count;
        }
        return count;
    }

    
    //memoizing cuts it from 11 seconds to 1.9 seconds, but still too slow.  And has is over 2 million entries
    function memoized() {
        var maxNum = 1000000;
        //maxNum = 10;
        var curMax = 0;
        var longestChainNum = 0;
        var chainLen = 0;
        for (var i = 0; i <= maxNum; i++) {
            chainLen = getCollatzChainLength_rec2(i);
            if (chainLen > curMax) {
                longestChainNum = i;
                curMax = chainLen;
            }
        }
        console.log('Number not greater than ' + maxNum + ' with longest Collatz Chain is: ' + longestChainNum + ', chain length is: ' + curMax);
//        console.log(getCollatzChainLength_rec2.hashLength());
    }

    //bruteForce();

    memoized();


}
require('./utils/utils').measure(p14);