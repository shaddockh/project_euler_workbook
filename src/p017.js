/* problem 17 */

function problem() {
    /*
        If the numbers 1 to 5 are written out in words: 
            one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

        If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?


        NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters 
            and 115 (one hundred and fifteen) contains 20 letters. 
            
            The use of "and" when writing out numbers is in compliance with British usage.

    */


    var baseNums = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety'
    };
    var suffix = {
        100: 'hundred',
        1000: 'thousand'
    };

    function getWordLen(num) {
        var count = 0;
        var baseVal = 0;
        var mod = 0;
        //console.log(num);

        if (num in baseNums) {
//            console.log(baseNums[num]);
            //we have a pre-calculated length for this number, just bounce out
            return baseNums[num].length;
        } else if (num === 0) { 
            return 0;
        } else {
            if (num >= 1000) {
                baseVal = 1000;
            }
            else if (num >= 100) {
                baseVal = 100;
            }
            else if (num >= 10) {
                baseVal = 10;
            }


            mod = num % baseVal;
            
            /* first check to see if the num rounded down to the nearest block is solved in the lookup table */
            if ((num - mod) in baseNums) {
                count = baseNums[num - mod].length + getWordLen(mod);
                //console.log(baseNums[num - mod]);
            }
            else {
                /* otherwise, get the current digit and length and then get the next word len for the next digit */
                count = baseNums[Math.floor(num / baseVal)].length + getWordLen(mod);
                //console.log(baseNums[Math.floor(num / baseVal)]);
            }
            if (baseVal in suffix) {
                //If we have a suffix for our base value, use it */
                //console.log(suffix[baseVal]);
                count += suffix[baseVal].length;
            }
            
            /* special case for the hundreds place.  If we have any 10s or 1s, append the length of 'and' */
            if (mod > 0 && mod < 100 && num >= 100) {
                count += 'and'.length; /* and --- we don't have any hundreds so just add the AND */
                //console.log('and');
            }
        }
        return count;
    }

    function memoize(fn) {
        var results = {};
        var m = function m(arg) {
            m.calls++;
            if (arg in results) {
                m.hits++;
                return results[arg];
            }
            results[arg] = fn(arg);
            return results[arg];
        };
        m.hits = 0;
        m.calls = 0;
        m.dumpStats = function() {
            console.log('Calls: ' + m.calls + ', Cache Hits: '+ m.hits);
        };
        return m;
    }

    getWordLen = memoize(getWordLen);

    var maxNum = 1000;
    var c = 0;
    for (var i = 1; i <= maxNum; i++) {
        c += getWordLen(i);
    }
    console.log('Sum of all numbers converted to text between 1 and ' + maxNum + ' is: ' + c);
    getWordLen.dumpStats();
}
require('./utils/utils').measure(problem);
