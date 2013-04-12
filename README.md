upperscore
==========
An extension of the popular underscore library. Upperscore contains all the underscore function, and the following functions:

```
var upp = require('upperscore');
```
###upp.dict(keys, values)
takes two arrays and returns an object where the property names in keys set to the values in the values array.

###upp.mapObject(object, mapFn(value, key), thisArg)
runs a map operation over all the enumerable properties of an object

###upp.filterObject(object, filterFn(value, key), thisArg)
runs a filter operation over all the enumerable properties of an object

###upp.filterDuplicates(array, compareFn(doc1, doc2))
just like _.uniq, but with a compare function that you can supply yourself.

###upp.zip(arrays...)
zips all given arrays in python style:

    zip([1,2,3],[11,22,33],[111,222,333]) => [[1,11,111],[2,22,222],[3,33,333]]
