exports.assertEqual = function(expected, actual, msg) {
    if (expected != actual) {
        throw new Error('Assert Error. Expected: ' + expected + ' Got: ' + actual + '\n' + (msg || ''));
    }
};

exports.run = function(name, test) {
    try {
        test();
        console.log(name + ': Passed');
    } catch (e) {
        console.log(name + ': Failed - ' + e.message);
    }
};

