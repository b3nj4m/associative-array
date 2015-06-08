//A limited implementation of an associative array
(function() {
  function defineAssoc() {
    function Assoc() {
      Array.apply(this, arguments);

      this._map = new Map();
    }

    Assoc.prototype = Object.create(Array.prototype);
    Assoc.prototype.constructor = Assoc;

    Assoc.prototype.has = function(key) {
      return this._map.has(key);
    };

    Assoc.prototype.set = function(key, value, idx) {
      if (typeof idx === 'undefined') {
        return this.push(key, value);
      }

      if (!this.has(key)) {
        if (this[idx] !== undefined) {
          this.remove(this[idx].key);
        }

        this[idx] = {key: key, value: value};
        this._map.set(key, idx);
      }

      return this;
    };

    Assoc.prototype.get = function(key) {
      return this[this._map.get(key)].value;
    };

    Assoc.prototype.getIdx = function(idx) {
      return this[idx].value;
    };

    Assoc.prototype.last = function() {
      return this[this.length - 1].value;
    };

    Assoc.prototype.first = function() {
      return this[0].value;
    };

    Assoc.prototype.forEach = function(fn) {
      for (var i = 0; i < this.length; i++) {
        if (!fn(this[i].value, i, this[i].key)) {
          break;
        }
      }
    };

    Assoc.prototype.map = function(fn) {
      var result = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        result[i] = fn(this[i].value, i, this[i].key);
      }
      return result;
    };

    Assoc.prototype.filter = function(fn) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        if (fn(this[i].value, i, this[i].key)) {
          result.push(this[i].value);
        }
      }
      return result;
    };

    Assoc.prototype.remove = function(key) {
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

    Assoc.prototype.push = function(key, val) {
      if (!this.has(key)) {
        Array.prototype.push.call(this, {value: val, key: key});

        this._map.set(key, this.length - 1);
      }

      return this;
    };

    Assoc.prototype.pop = function() {
      var result = Array.prototype.pop.apply(this, arguments);

      this._map.delete(result.key);

      return result.value;
    };

    return Assoc;
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