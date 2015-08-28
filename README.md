# associative-array

A combination of Map and Array that maintains key ordering.

## Usage

```javascript
var AssociativeArray = require('associative-array');

var arr = new AssociativeArray();

arr.push('key', {value: 'value'});
arr.push('key2', {value: 'value2'});
arr.push('key3', {value: 'value3'});

arr.has('key'); //true
arr.has('beans'); //false

arr.length; //3

arr.push('key3', {value: 'value3 again'});

arr.length; //3

arr.map(function(val, idx, key) {
  return idx + ':' + val.value + ':' key;
}); //['0:value:key', '1:value2:key2', '2:value3:key3']


arr.remove('key2');

arr.map(function(val, idx, key) {
  return idx + ':' + val.value + ':' key;
}); //['0:value:key', '1:value3:key3']
```

## API

### AssociativeArray(size)

Construct a new `AssociativeArray`.

* `size` int - the initial size of the underlying `Array`.

### AssociativeArray.length

The number of items currently stored in the `AssociativeArray`.

### AssociativeArray.push(key, value)

Push a new key, value pair onto the `AssociativeArray`. Will not affect the `AssociativeArray` if `key` is already in it.

* `key` mixed - the key to associate with `value`. Can be any key supported by `Map`.
* `value` mixed - the value to store
* returns this

### AssociativeArray.pop()

Pop the last value off of the `AssociativeArray`.

* returns mixed - the removed last value.

### AssociativeArray.has(key)

Check whether the `AssociativeArray` contains `key`.

* `key` mixed - the key to look for
* returns boolean

### AssociativeArray.get(key)

Get the value associated with `key`.

* `key` mixed - the key to look for
* returns mixed

### AssociativeArray.getIdx(index)

Get the value stored at `index`.

* `index` int - the index to look up
* returns mixed

### AssociativeArray.first()

Get the first value.

* returns mixed

### AssociativeArray.last()

Get the last value.

* returns mixed

### AssociativeArray.set(key, value, index)

Set a key, value pair at a particular index in the `AssociativeArray`.
Replaces any value that previously occupied that index.
If `key` is already present in the `AssociativeArray`, `value` will replace the old value if `index` matches the current index of `key`, or if `index` is not supplied.
Otherwise, `set()` will not affect the `AssociativeArray` if `key` is already in it.
Omitting `index` makes this equivalent to `AssociativeArray.push(key, value)` when `key` is not already present in the `AssociativeArray`.

* `key` mixed - the key to associate with `value`. Can be any key supported by `Map`.
* `value` mixed - the value to store
* `index` int - the index to store `value` at
* returns this

### AssociativeArray.reset()

Clear all values from the `AssociativeArray`.

* returns this

### AssociativeArray.forEach(fn)

Iterate over the values in the `AssociativeArray`.

* `fn` function - the callback to execute with each value, index, and key. If `fn` returns false, the loop will be broken.
* returns this

### AssociativeArray.map(fn)

Map the values in the `AssociativeArray` to a plain `Array`.

* `fn` function - the callback to execute with each value, index, and key.
* returns array

### AssociativeArray.filter(fn)

Return a plain `Array` of values in the `AssociativeArray` which pass the `fn` test.

* `fn` function - the callback to test each value with. Should return boolean.
* returns array

### AssociativeArray.remove(key)

Remove the value associated with `key` from the `AssociativeArray`.

* `key` mixed - the key to look for
* returns mixed - the removed value
