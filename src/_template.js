    /*
      Problem: 000
      Description here
    */

    function testableFunction() {
        //
    }

    function findSolution() {
        // code to find solution
    }

    /*
     * Handle either as a required module or run as a standalone module 
     */
    if (require.main === module) {
        //we are being called directly, just run the problem
        require('./utils/utils').measure(findSolution);
    } else {
        //we are being 'require'd by someone, expose the functionality as exports
        exports.testableFunction = testableFunction;
    }
    