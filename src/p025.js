    /*
      The Fibonacci sequence is defined by the recurrence relation:

        Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
        Hence the first 12 terms will be:
        
        F1 = 1
        F2 = 1
        F3 = 2
        F4 = 3
        F5 = 5
        F6 = 8
        F7 = 13
        F8 = 21
        F9 = 34
        F10 = 55
        F11 = 89
        F12 = 144
        The 12th term, F12, is the first term to contain three digits.
        
        What is the first term in the Fibonacci sequence to contain 1000 digits?
        
        
        HINT:
        By definition, the first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two.
        
        
        NOTES:
        Going through and recursively calculating the fib sequence.  Memoized the function to speed up lookups.
        
        Got bit by the javascript number.toString() issue emitting scientific notation, so ended up implementing an manual addition routine
        and then checking the length of the resulting string.  
        
        Ran into silly errors implementing the manual math routine.  A problem is that rushing through the details doesn't work on these,
        even though I've implemented that manual math routine a few times, I should still think through it.
        
        Runs in 2.8 seconds.
    */

    function fibSeq(num) {
        var result = 0;
        num = parseInt(num);
        if (num <= 1) {
            result = num;
        }
        else {
            result = manualAdd(fibSeq(num - 1), fibSeq(num - 2));
        }
        return result;
    }

    function memoize(fn) {

        var hash = {};
        return function m() {
            var key = JSON.stringify(arguments);
            if (key in hash) {
                return hash[key];
            }
            else {
                hash[key] = fn.apply(this, arguments);
                return hash[key];
            }
        }
    };
    fibSeq = memoize(fibSeq);

    function findFibWithMaxDigits(maxDigits) {
        var num = 0;
        while (true) {
            var result = fibSeq(num);
            if (result.toString().length == maxDigits) {
                return num;
            }
            num++;
        }

    }

    function manualAdd(num1, num2) {
        var n1 = num1.toString().split('').map(function(a) {
            return parseInt(a);
        }),
            n2 = num2.toString().split('').map(function(a) {
                return parseInt(a);
            });

        var result = [],
            val,
            carry = 0;

        while (n1.length > 0 || n2.length > 0) {
            val = (n1.pop() || 0) + (n2.pop() || 0) + carry;
            carry = Math.floor(val / 10);
            result.push(val % 10);
        }
        if (carry > 0) {
            result.push(carry);
        }

        return result.reverse().join('');
    }


    function findSolution() {
        var maxDigits = 1000;
        console.log('First Fib number to have ' + maxDigits + ' digits is: ' + findFibWithMaxDigits(maxDigits));
    }

    /*
     * Handle either as a required module or run as a standalone module 
     */
    if (require.main === module) {
        //we are being called directly, just run the problem
        require('./utils/utils').measure(findSolution);
    } else {
        //we are being 'require'd by someone, expose the functionality as exports
        exports.manualAdd = manualAdd;
        exports.findFibWithMaxDigits = findFibWithMaxDigits;
        exports.fibSeq = fibSeq;
    }