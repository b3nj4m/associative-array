var expect = require('chai').expect;
var Assoc = require('.');

describe('associative-array', function() {
  it('should be a constructor', function() {
    expect(Assoc).to.be.a('function');
  });

  it('should descend from Array', function() {
    expect(new Assoc()).to.be.an.instanceof(Array);
  });

  it('should contain a Map', function() {
    expect((new Assoc())._map).to.be.an.instanceof(Map);
  });

  it('should begin with length 0', function() {
    expect((new Assoc()).length).to.equal(0);
  });

  it('should accept length param', function() {
    expect(new Assoc(4).length).to.equal(4);
  });

  describe('push()', function() {
    it('should add to end of array', function() {
      var a = new Assoc();
      a.push('key', 'val');
      expect(a[0]).to.deep.equal({key: 'key', value: 'val'});
      expect(a.length).to.equal(1);
    });

    it('should add key to Map', function() {
      var a = new Assoc();
      a.push('key', 'val');
      expect(a._map.has('key')).to.be.true;
      expect(a._map.get('key')).to.equal(0);
      expect(a._map.size).to.equal(1);
    });

    it('should ignore duplicates', function() {
      var a = new Assoc();
      a.push('key', 'val');
      expect(a.length).to.equal(1);
      expect(a._map.size).to.equal(1);
      a.push('key', 'val');
      expect(a.length).to.equal(1);
      expect(a._map.size).to.equal(1);
    });

    it('should return this', function() {
      var a = new Assoc();
      expect(a.push('beans', 'cheese')).to.equal(a);
    });
  });

  describe('has()', function() {
    it('should work', function() {
      var a = new Assoc();
      expect(a.has('beans')).to.be.false;
      expect(a.has('beanz')).to.be.false;
      a.push('beans', 'cheese');
      expect(a.has('beans')).to.be.true;
      expect(a.has('beanz')).to.be.false;
    });
  });

  describe('set()', function() {
    it('should set new key', function() {
      var a = new Assoc();
      a.set('key', 'val');
      expect(a.length).to.equal(1);
      expect(a._map.size).to.equal(1);
      expect(a.has('key')).to.be.true;
      expect(a.get('key')).to.equal('val');
      expect(a.getIdx(0)).to.equal('val');
    });

    it('should set new key with index', function() {
      var a = new Assoc();
      a.set('key', 'val', 1);
      expect(a.length).to.equal(2);
      expect(a._map.size).to.equal(1);
      expect(a.has('key')).to.be.true;
      expect(a.get('key')).to.equal('val');
      expect(a.getIdx(1)).to.equal('val');
      expect(a.getIdx(0)).to.be.undefined;
    });

    it('should replace existing key', function() {
      var a = new Assoc();
      a.set('key', 'val');
      a.set('key', 'val2');
      expect(a.length).to.equal(1);
      expect(a._map.size).to.equal(1);
      expect(a.has('key')).to.be.true;
      expect(a.get('key')).to.equal('val2');
      expect(a.getIdx(0)).to.equal('val2');
    });

    it('should replace existing key with matching index', function() {
      var a = new Assoc();
      a.set('key', 'val');
      a.set('key', 'val2', 0);
      expect(a.length).to.equal(1);
      expect(a._map.size).to.equal(1);
      expect(a.has('key')).to.be.true;
      expect(a.get('key')).to.equal('val2');
      expect(a.getIdx(0)).to.equal('val2');
    });

    it('should not replace existing key with non-matching index', function() {
      var a = new Assoc();
      a.set('key', 'val');
      a.set('key', 'val2', 1);
      expect(a.length).to.equal(1);
      expect(a._map.size).to.equal(1);
      expect(a.has('key')).to.be.true;
      expect(a.get('key')).to.equal('val');
      expect(a.getIdx(0)).to.equal('val');
    });

    it('should return this', function() {
      var a = new Assoc();
      expect(a.set('beans', 'cheese')).to.equal(a);
    });
  });

  describe('get()', function() {
    it('should return value', function() {
      var a = new Assoc();
      a.push('beans', 'cheese');
      expect(a.get('beans')).to.equal('cheese');
    });

    it('should return undefined for unset key', function() {
      var a = new Assoc();
      expect(a.get('beans')).to.be.undefined;
    });
  });

  describe('getIdx()', function() {
    it('should return value', function() {
      var a = new Assoc();
      a.push('beans', 'cheese');
      expect(a.getIdx(0)).to.equal('cheese');
    });

    it('should return undefined for unset index', function() {
      var a = new Assoc();
      expect(a.getIdx(0)).to.be.undefined;
    });
  });

  describe('last()', function() {
    it('should return value', function() {
      var a = new Assoc();
      a.push('beans', 'cheese');
      expect(a.last()).to.equal('cheese');
    });

    it('should return undefined for unset index', function() {
      var a = new Assoc();
      expect(a.last()).to.be.undefined;
    });
  });

  describe('first()', function() {
    it('should return value', function() {
      var a = new Assoc();
      a.push('beans', 'cheese');
      expect(a.first()).to.equal('cheese');
    });

    it('should return undefined for unset index', function() {
      var a = new Assoc();
      expect(a.first()).to.be.undefined;
    });
  });

  describe('reset()', function() {
    it('should work', function() {
      var a = new Assoc();
      a.push('beans', 'cheese');
      a.reset();
      expect(a.length).to.equal(0);
      expect(a._map.size).to.equal(0);
      expect(a.get('beans')).to.be.undefined;
    });

    it('should return this', function() {
      var a = new Assoc();
      expect(a.reset()).to.equal(a);
    });
  });

  describe('forEach()', function() {
    it('should work', function() {
      var a = new Assoc();
      a.push('key1', 'val1');
      a.push('key2', 'val2');
      a.push('key3', 'val3');

      var prevIdx = -1;
      a.forEach(function(val, idx, key) {
        expect(val).to.equal(a[idx].value);
        expect(key).to.equal(a[idx].key);
        expect(idx).to.be.above(prevIdx);
        prevIdx = idx;
      });
    });

    it('should return this', function() {
      var a = new Assoc();
      expect(a.forEach()).to.equal(a);
    });
  });

  describe('map()', function() {
    it('should work', function() {
      var a = new Assoc();
      a.push('key1', 'val1');
      a.push('key2', 'val2');
      a.push('key3', 'val3');

      var prevIdx = -1;
      var result = a.map(function(val, idx, key) {
        expect(val).to.equal(a[idx].value);
        expect(key).to.equal(a[idx].key);
        expect(idx).to.be.above(prevIdx);
        prevIdx = idx;

        return 'mapped' + val;
      });

      expect(result).to.be.an.instanceof(Array);
      expect(result).not.to.be.an.instanceof(Assoc);

      result.forEach(function(val, idx) {
        expect(val).to.equal('mapped' + a.getIdx(idx));
      });
    });
  });

  describe('filter()', function() {
    it('should work', function() {
      var a = new Assoc();
      a.push('key1', 'val1');
      a.push('key2', 'val2');
      a.push('key3', 'val3');

      var result = a.filter(function(val, idx, key) {
        return idx < 2;
      });

      expect(result).to.be.an.instanceof(Array);
      expect(result).not.to.be.an.instanceof(Assoc);
      expect(result.length).to.equal(2);
      expect(result[0]).to.equal('val1');
      expect(result[1]).to.equal('val2');
    });
  });

  describe('remove()', function() {
    it('should remove and return item', function() {
      var a = new Assoc();
      a.push('key1', 'val1');
      a.push('key2', 'val2');
      a.push('key3', 'val3');

      var result = a.remove('key2');
      expect(a.length).to.equal(2);
      expect(a.getIdx(0)).to.equal('val1');
      expect(a.getIdx(1)).to.equal('val3');
      expect(result).to.equal('val2');
    });

    it('should return undefined unset key', function() {
      var a = new Assoc();
      a.push('beans', 'cheese');

      expect(a.remove('key')).to.be.undefined;
      expect(a.length).to.equal(1);
    });
  });
});
