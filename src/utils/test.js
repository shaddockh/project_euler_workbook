exports.assertEqual = function(expected, actual, msg) {
    if (expected != actual) {
        throw new Error('Assert Error. Expected: ' + expected + ' Got: ' + actual + '\n' + (msg || ''));
    }
};
