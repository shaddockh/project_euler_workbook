
var test = require('./utils/test');

function problem() {
    /*
      You are given the following information, but you may prefer to do some research for yourself.

        1 Jan 1900 was a Monday.
        Thirty days has September,
        April, June and November.
        All the rest have thirty-one,
        Saving February alone,
        Which has twenty-eight, rain or shine.
        And on leap years, twenty-nine.
        A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
        
        How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
        
        
        
        NOTES:
        This one threw me.  I misread 'but not on a century unless it is divisible by 400.' as not on century divisible by 400, so was off by one initially.
        
        Start at 1/1/1900 and just iterate over every month adding number of days.  if number of days + 1 (1st of next month) is divisible by 7, then we have a sunday
        on the 1st of the month.
        
        wrote some unit tests to test the helpers prior to running.
        
        5ms
        
*/


    function getDaysInMonth(year, month) {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                if (year % 400 === 0) { 
                    return 29;
                } else if ( year % 100 === 0) {
                    return 28;
                } else if ( year % 4 === 0) {
                    return 29;
                } else {
                    return 28;
                }
                break;
            default: throw new Error('Unknown month: ' + month);
        }
    }

        
    function getNumberOfSundaysInYears(startCountingYear, endYear) {    
        var startYear = 1900;
        var totalDaysElapsed = 0;
        var sundayCount = 0;
        
        for (var year = startYear; year <= endYear; year++) {
            for (var month = 1; month <= 12; month++) {
                if(totalDaysElapsed > 0 && year >= startCountingYear) {
                    if ((totalDaysElapsed + 1) % 7 == 0) {
                        //console.log('Sunday found on ' + month + '/01/' + year);
                        sundayCount++;
                    }                
                }
                totalDaysElapsed += getDaysInMonth(year, month);
            }
        }
        
        return sundayCount;
    }
    
    function test_0() {
        test.assertEqual(31, getDaysInMonth(1920, 1));
        test.assertEqual(30, getDaysInMonth(1920, 6));
        test.assertEqual(29, getDaysInMonth(1984, 2));
        test.assertEqual(28, getDaysInMonth(1983, 2));
        test.assertEqual(29, getDaysInMonth(2000, 2));
        
        test.assertEqual(2, getNumberOfSundaysInYears(2013, 2013));
        test.assertEqual(1, getNumberOfSundaysInYears(2000, 2000));

        
    }

    test_0();
    
    var startYear = 1901;
    var endYear = 2000;
    console.log('Number of sundays between ' + startYear + ' and ' + endYear + ' is ' + getNumberOfSundaysInYears(startYear, endYear));
}
require('./utils/utils').measure(problem);
