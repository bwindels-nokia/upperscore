/*jshint evil: false, bitwise:false, strict: false, undef: true, white: false, plusplus:false, node:true, onevar: false */


var upp = require('node_modules/upperscore/lib/upperscore');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
    'test dict basic case': function(test) {
        var keys = ['one', 'two', 5, null, {toString: function() {return 'hi';}}];
        var values = [ 1 , 2 , 5, 9, 'world'];
        var o = upp.dict(keys, values);
        var generatedKeys = upp.sortBy(upp.keys(o), function(k) {return k;});
        //o should only contain the given keys
        test.deepEqual(generatedKeys, ['5', 'hi', 'one', 'two']);
        test.strictEqual(o.one, 1, 'one should be 1');
        test.strictEqual(o.two, 2, 'two should be 2');
        test.strictEqual(o['5'], 5, '5 should be 5');
        test.strictEqual(o.hi, 'world', 'hi should be world');
        
        test.done();
    },
    'test mapObject': function(test) {
        var originalObject = {
            'hello' : 'world',
            'foo' : 'bar'
        };
        var newObject = upp.mapObject(originalObject, function(value, key) {
            return value + '!!';
        });
        var expectedObject = {
            'hello' : 'world!!',
            'foo' : 'bar!!'
        };
        test.deepEqual(newObject, expectedObject, 'values are not properly mapped with mapObject');
        test.done();
    },
    'test mapObject with falsy values': function(test) {
        test.expect(5);
        var o = {"foo":null,"bar":false,"cow":[], 'horse': 0, 'tut': undefined};
        upp.mapObject(o, function(value, key) {
            test.strictEqual(value, o[key], 'values should not be modified in any way');
        });
        test.done();
    },
    'test mapPairs': function(test) {
        var pairs = upp.mapPairs(['a','b','c','d'], function(str1, str2) {
            return str1 + str2;
        });
        test.deepEqual(pairs, ['ab', 'bc', 'cd'], 'pairs not as expected');
        test.done();
    },
    'test filterDuplicates': function(test) {
        var barney = {name: 'Barney', familyName: 'Rubble'},
            wilma = {name: 'Wilma', familyName: 'Flintstone'},
            fred = {name: 'Fred', familyName: 'flintStone'},
            joe = {name: 'Joe', familyName: 'Rockhead'},
            bammbamm = {name: 'Bamm Bamm', familyName: 'rUBBLE'};

        var list = [barney, wilma, fred, joe, bammbamm];
        var expected = [barney, wilma, joe];
        var result = upp.filterDuplicates(list, function(a, b) {
            return a.familyName.toLowerCase() === b.familyName.toLowerCase();
        });
        test.deepEqual(expected, result);
        test.done();
    }
});