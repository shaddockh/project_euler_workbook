function problem() {
    /*
      Description here
      By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

3
7 4
2 4 6
8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom of the triangle below:

75
95 64
17 47 82
18 35 87 10
20 04 82 47 65
19 01 23 75 03 34
88 02 77 73 07 63 67
99 65 04 28 06 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)



NOTES:
First tried to start at the top and recursively grab the max child and walk down that branch like a red black tree, but that didn't work because the max sum of the path 
might not be the largest based upon the immediate child.2
ie:
3
2 4
7 1 2

In this instance, we want to walk down 3-2-7 instead of 3-4-2.  Strangely, this method came up with the right answer for the sample tree, just not the actual problem

Then thought about it some more and decided to work my way up from the bottom.  For every row, every element should be:
 
 Row.element += Max(Row + 1.element, Row + 1.element + 1)
 
 This will iteratively sum each node all the way to the top with the top element containing the answer.  This method does not however lend itself
 to printing out the path taken, but it does run extremely fast and should scale.  Current run time:  8ms
 
 
 UPDATE:
 Modified to be able to track the path through the triangle. with logging optimizations, running 3-7mx 

*/


    function assertEqual(expected, actual, msg) {
        if (expected != actual) {
            throw new Error('Assert Error. Expected: ' + expected + ' Got: ' + actual + '\n' + (msg || ''));
        }
    }




    function sumMaxes(triArray) {

        var row, rowBelow;
        for (var i = triArray.length - 2; i >= 0; i--) {
            row = triArray[i];
            rowBelow = triArray[i + 1];
            var maxElement;

            for (var ii = 0; ii < row.length; ii++) {
                maxElement = rowBelow[ii].max > rowBelow[ii + 1].max ? rowBelow[ii] : rowBelow[ii + 1];
                row[ii].max = row[ii].value + maxElement.max;
                row[ii].maxPath = [row[ii].value].concat(maxElement.maxPath);
            }
        }

    }

    function navTriangle(triArray) {
        var tree = triArray.map(function(el) {
            return el.split(' ').map(function(subEl) {
                return {
                    value: parseInt(subEl)
                    ,max: 0
                    ,maxPath: []
                };
            });
        });

        //seed bottom row
        var bottomRow = tree[tree.length - 1];
            for (var x = 0; x < bottomRow.length; x++) {
                bottomRow[x].max = bottomRow[x].value;
                bottomRow[x].maxPath = [bottomRow[x].value];
            }
            
            
        sumMaxes(tree);
        
        var maxNode = tree[0][0];
        console.log('Sum of max path: ' + maxNode.max);
        console.log('Path: '+ maxNode.maxPath);
        return maxNode.max;
    }


    function test1() {

        var triangle = [
            '3',
            '7 4',
            '2 4 6',
            '8 5 9 3'
            ];


        assertEqual(23, navTriangle(triangle));
    }

    function test2() {

        var triangle = [
            '75',
            '95 64',
            '17 47 82',
            '18 35 87 10',
            '20 04 82 47 65',
            '19 01 23 75 03 34',
            '88 02 77 73 07 63 67',
            '99 65 04 28 06 16 70 92',
            '41 41 26 56 83 40 80 70 33',
            '41 48 72 33 47 32 37 16 94 29',
            '53 71 44 65 25 43 91 52 97 51 14',
            '70 11 33 28 77 73 17 78 39 68 17 57',
            '91 71 52 38 17 14 91 43 58 50 27 29 48',
            '63 66 04 68 89 53 67 30 73 16 69 87 40 31',
            '04 62 98 27 23 09 70 98 73 93 38 53 60 04 23'
            ];

        console.log('Answer is: ' + navTriangle(triangle));


    }

    //test1();
    test2();

}
require('./utils/utils').measure(problem);
