exports.assertEqual = function(expected, actual, msg) {
    if (expected != actual) {
        throw new Error('Assert Error. Expected: ' + expected + ' Got: ' + actual + '\n' + (msg || ''));
    }
};

exports.run = function(name, test) {
    if (exports.enabled) {

        var red = '\u001b[31m';
        var green = '\u001b[32m';
        var reset = '\u001b[0m';
        var blue = '\u001b[34m';
        try {
            test();
            console.log(blue + name + ': ' + green + 'Passed' + reset);
        } catch (e) {
            console.log(blue + name + ': ' + red + 'Failed' + reset + ' - ' + e.message);
        }
    }
};

exports.enabled = true;
