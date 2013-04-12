/*jshint evil: false, bitwise:false, strict: false, undef: true, white: false, node:true */

var _ = require('underscore');

var upperscore = {};
_.extend(upperscore, _);

upperscore.dict = function(keys, values) {
    var len = Math.min(keys.length, values.length);
    keys = keys.slice(0, len);
    values = values.slice(0, len);
    var d = {};
    this.forEach(keys, function(key, i) {
        //skip null and undefined keys
        if(!upperscore.isUndefined(key) && !upperscore.isNull(key)) {
            d[key.toString()] = values[i];
        }
    });
    return d;
};

//calls mapFn like underscore.map: (value, key, list)
upperscore.mapObject = function(o, mapFn, context) {
    var values = this.map(o, mapFn, context);
    var keys = this.keys(o);
    return this.dict(keys, values);
};

upperscore.filterObject = function(o, filterFn, context) {
    var keys = this.keys(o);
    var newObject = {};
    this.forEach(keys, function(key) {
        var value = o[key];
        if(filterFn(value, key)) {
            newObject[key] = value;
        }
    }, context);
    return newObject;
};

upperscore.mapPairs = function(array, callback) {
    var result = [];
    for(var i = 1; i < array.length; ++i) {
        result.push(callback(array[i - 1], array[i]));
    }
    return result;
};

upperscore.filterDuplicates = function(array, compareFn) {
    var newList = [];
    
    array.forEach(function(a) {
        var hasDupesInNewList = newList.some(compareFn.bind(null, a));
        if(!hasDupesInNewList) {
            newList.push(a);
        }
    });
    return newList;
};

module.exports = upperscore;