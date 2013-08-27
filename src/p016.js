

function problem() {
    /*
      2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

        What is the sum of the digits of the number 2^1000?
        
        
        
        NOTES:
        trick question? yep... Math.pow returns it in scientific notation in javascript, so we can't add the digits.
        
        Solution was to convert 2^1000 to a binary string of '1000000...'
        
        Then, use the formula of:
        
        total = total^2 + binaryDigit[i]
        
        Since the numbers were so large, I turned that into:
        
        total = total + total + binaryDigit[i]
        
        and used a custom add routine that manually adds the numbers together, handling carrying the digits, etc.arrays
        This gets around the number limitations in javascript.arrays
        
        Then take this string representation of a number and add each digit together to get the total.arrays
        
        Phew!
*/

    function manualAdd() {
        var arrays = Array.prototype.slice.call(arguments,0).map(function(el){
            return el.split('');
        });
        
        var curTotal  = 0;
        var keepProcessing = true;
        var result = [];        
        while (keepProcessing ) {
            keepProcessing = false;    
            for (var i = 0; i < arrays.length; i++) {
                curTotal += parseInt(arrays[i].pop() || 0);
                if (arrays[i].length > 0) { keepProcessing = true; }
            }
            result.push(curTotal % 10);
            curTotal = Math.floor( curTotal / 10);
        }
        if (curTotal > 0) {         
            result.push(curTotal);
        }
        return result.reverse().join('');
    }    
    
    //for each digit, double previous number and add digit    
    function binToDec(binArray) {
        var total = '0';
        for (var i =0; i < binArray.length; i++) {
            total = manualAdd(total, total, binArray[i]);
        }
        return total;
    }

    function makeBinaryStringArr(power) {
        var binString = ['1'];
        for (var i = 0; i < power; i++) {
            binString.push('0');
        }
        return binString;
    }
    
    function sumDigits(sNum) {
        return sNum.split('').reduce(function(a,b){
            return parseInt(a) + parseInt(b);
        });
    }
    var pow = 1000;
    var ans = binToDec(makeBinaryStringArr(pow));
    console.log('Sum of the digits of 2 to the power of ' + pow + ' is: ' + sumDigits(ans));    
}
require('./utils/utils').measure(problem);
