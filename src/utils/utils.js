exports.measure = function measure(fn) {
    console.time('Time to Execute');
    fn();
    console.timeEnd('Time to Execute');
};
