//A limited implementation of an associative array
(function() {
  function defineAssoc() {
    function AssociativeArray(size) {
      var array;
      if (size === undefined) {
        array = new Array();
      }
      else {
        array = new Array(size);
      }

      array._map = new Map();

      for (var key in AssociativeArray.prototype) {
        if (AssociativeArray.prototype.hasOwnProperty(key)) {
          array[key] = AssociativeArray.prototype[key];
        }
      }

      return array;
    }

    AssociativeArray.prototype.has = function(key) {
      return this._map.has(key);
    };

    AssociativeArray.prototype.set = function(key, value, idx) {
      if (this.has(key)) {
        //overwrite old value if idx matches, or idx not supplied
        if (typeof idx === 'undefined' || this._map.get(key) === idx) {
          this[this._map.get(key)].value = value;
        }
      }
      else {
        if (typeof idx === 'undefined') {
          this.push(key, value);
        }
        else {
          if (this[idx] !== undefined) {
            this.remove(this[idx].key);
          }

          this[idx] = {key: key, value: value};
          this._map.set(key, idx);
        }
      }

      return this;
    };

    AssociativeArray.prototype.get = function(key) {
      return this.getIdx(this._map.get(key));
    };

    AssociativeArray.prototype.getIdx = function(idx) {
      return this[idx] === undefined ? undefined : this[idx].value;
    };

    AssociativeArray.prototype.last = function() {
      return this.getIdx(this.length - 1);
    };

    AssociativeArray.prototype.first = function() {
      return this.getIdx(0);
    };

    AssociativeArray.prototype.reset = function() {
      this.splice(0, this.length);
      this._map.clear();
      return this;
    };

    AssociativeArray.prototype.forEach = function(fn) {
      for (var i = 0; i < this.length; i++) {
        if (fn(this[i].value, i, this[i].key) === false) {
          break;
        }
      }

      return this;
    };

    AssociativeArray.prototype.map = function(fn) {
      var result = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        result[i] = fn(this[i].value, i, this[i].key);
      }
      return result;
    };

    AssociativeArray.prototype.filter = function(fn) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        if (fn(this[i].value, i, this[i].key)) {
          result.push(this[i].value);
        }
      }
      return result;
    };

    AssociativeArray.prototype.remove = function(key) {
      var idx = this._map.get(key);
      var value;

      if (idx !== undefined) {
        value = this[idx].value;
        this.splice(idx, 1);
        this._map.delete(key);

        //adjust map of indexes for items after the removed item
        for (var i = idx; i < this.length; i++) {
          this._map.set(this[i].key, i);
        }
      }

      return value;
    };

    AssociativeArray.prototype.push = function(key, val) {
      if (!this.has(key)) {
        Array.prototype.push.call(this, {value: val, key: key});

        this._map.set(key, this.length - 1);
      }

      return this;
    };

    AssociativeArray.prototype.pop = function() {
      var result = Array.prototype.pop.apply(this, arguments);

      this._map.delete(result.key);

      return result.value;
    };

    return AssociativeArray;
  }

  if (typeof module === 'object' && typeof require === 'function') {
    module.exports = defineAssoc.call(this);
  }
  else if (typeof define === 'function' && define.amd) {
    define([], defineAssoc.bind(this));
  }
  else {
    this.AssociativeArray = defineAssoc.call(this);
  }
})();
