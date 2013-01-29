var dive = require('../lib/dive.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['feetToMeters'] = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(1);
        test.equal(dive.feetToMeters(), 0.3048, 'should be standard 1m -> 3.2808ft');
        test.done();
    },
    '1 arg': function(test) {
        test.expect(1);
        test.equal(dive.feetToMeters(33), 10.0584, 'should be standard 33ft -> 10.0584m');
        test.done();
    }
};

exports['dac'] = {
    setUp: function(done) {
        done();
    },
    'args': function(test) {
        test.expect(1);
        test.equal(dive.dac(2500, 1300, 50), 24, 'should be 24 psi/min')
        test.done();
    }
};

exports['atmToDepthInMeters'] = {
    setUp: function(done) {
        done();
    },
    '10 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.8, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = dive.atmToDepthInMeters();
        depth = Math.floor(depth);
        test.equal(depth, 10, 'should be 10 meters equal 1atm below sea level on earth');
        test.done();
    }
};

exports['sac'] = {
    setUp: function(done) {
        done();
    },
    '1 atm sac rate': function(test) {
        test.expect(2);
        var dac = dive.dac(2500, 1300, 50);
        test.equals(dac, 24, 'should be 24 psi/min');
        var sac = dive.sac(dac, 10);
        sac = Math.floor(sac);
        test.equals(sac, 12, 'should be 12 psi/min');
        test.done();
    }
};