/* Lattice Paths 

    Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, 
    there are exactly 6 routes to the bottom right corner.


    How many such routes are there through a 20×20 grid?
    
    
    -- notes

    0,0  1,0  2,0
    0,1  1,1  2,1
    0,2  1,2  2,2

    1 - 2
    2 - 6


    
    a-b c-d e-f
    | | | | | |
    g-h i-j k-l
    m-n o-p q-r
    | | | | | |
    s-t u-v w-x
    y-z 0-1 2-3
    | | | | | |
    4-5 6-7 8-9
    
    abcdeflrx39
    
    abcdeklrx39
    abcdjklrx39
    abcijklrx39
    abhijklrx39
    aghijklrx39
    
    abcdekqrx39
    abcd
    
    
    X X X
    X X X
    X X X
    
    
    
    3r3d
    2r1d1r2d
    2r2d1r1d
    2r3d1r
    1r1d1r1d1r1d
    1r2d2r1d
    1r2d1r1
    
    2d2r
    2r2d
    1d2r1d
    1d1r1d1r
    1r2d1r
    1r1d1r1d




thoughts:
    walk recursively through 
*/



function p015() {

    function navLattice(w, h) {

        var width = w + 1;
        var height = h  + 1;
        var paths = {}; //this will hold the cache of path lenghts


        function nextStep(curX, curY) {
            var key = curX + ':' + curY;
            if (paths[key]) {
                return paths[key];
            } else {
                var count = 0;
                if (curX == width - 1 && curY == height - 1) {
                    //we're at the last node
                    count = 1;
                }
                else {
                    //we need to branch
                    if (curX < width - 1) {
                        count += nextStep(curX + 1, curY);
                    }
                    if (curY < height - 1) {
                        count += nextStep(curX, curY + 1);
                    }
                }
                return paths[key] = count;
            }
        }

        var curX = 0;
        var curY = 0;
        var pathCount = nextStep(curX, curY);

        console.log("Paths through a " + w + 'x' + h + " lattice: " + pathCount );
    }

    //brute force method -- not good -- never finished.
    //changed it so that we cache the number of paths from each point in the grid if we've already solved for that 
    //point in a prior recursive cycle.. significantly improved performance.  109ms for 20x20 lattice.
    
    //had a problem with total number of nodes though.. was calculating width and height as
    //   width = gridWidth * 2 -1, height = gridHeight * 2 - 1.
    //
    // this works for a 2x2 matrix, but is not correct for higher values
    // discovered that I needed to do gridWidth + 1, gridHeight + 1

    //var w = 4, h = 4;
    //navLattice(w, h);
    

    navLattice(20,20);
}
require('./utils/utils').measure(p015);
