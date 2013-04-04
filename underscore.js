(function() {

  var each = function(obj, iterator) {
    if (obj instanceof Array) {
      for(var i = 0; i < obj.length; i++){
        iterator(obj[i],i,obj);
      }
    } else {
      for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator(obj[key],key,obj);
        }
      }
    }
  };

  var contains = function(obj, target) {
    return reduce(obj, function(reduction, value) {
      return ((target === value) || reduction);
    }, false);
  };

  var map = function(array, iterator) {
    if (array === null) return [];
    return reduce(array, function(reduction, target) {
      reduction.push(iterator(target));
      return reduction;
    }, []);
  };

  var pluck = function(obj, property) {
    return map(obj, function(element) {
      return element[property];
    });
  };

  var last = function(array, n) {
    return (array === null) ? undefined :
      (n < 1) ? [] :
      (n === undefined) ? Array.prototype.slice.call(array,-1) :
      Array.prototype.slice.call(array,-n);
  };

  var first = function(array, n) {
    return (array === null) ? undefined :
      (n < 1) ? [] :
      (n === undefined) ? Array.prototype.slice.call(array,0,1) :
      Array.prototype.slice.call(array,0,n);
  };

  var reduce = function(obj, iterator, initialValue) {
    var reduction = (arguments.length > 2) ? initialValue : undefined;
    each(obj, function(target, index) {
      reduction = (reduction === undefined) ? target :
        iterator(reduction, target, index, obj);
    });
    return reduction;
  };

  var select = function(array, iterator) {
    return reduce(array, function(reduction, target, index, object) {
      if (iterator(target, index, object)) reduction.push(target);
      return reduction;
    }, []);
  };

  var reject = function(array, iterator) {
    return _.reduce(array, function(reduction, target, index, object) {
      if (!iterator(target, index, object)) reduction.push(target);
      return reduction;
    }, []);
  };

  var every = function(obj, iterator) {
    return reduce(obj, function(prev,el) {
      return !!iterator(el) && prev;
    }, true);
  };

  var any = function(obj, iterator) {
    return reduce(obj, function(prev, el) {
      return (typeof iterator === 'function') ? (!!iterator(el) || prev) :
        (el || prev);
    }, false);
  };

  var uniq = function(array) {
    return select(Array.prototype.slice.call(array), function(el, i, array) {
      return (array.indexOf(el) === i);
    });
  };

  var once = function(func) {
    var result = null;
    return function(){
      return (result !== null) ? result : result = func();
    };
  };

  var memoize = function(func) {
    var results = {};
    return function() {
      var args = Array.prototype.slice.call(arguments);
      return (results.hasOwnProperty(args)) ? results[args] :
        results[args] = func.apply(this, arguments);
    };
  };

  var delay = function(func, wait) {
    var params = last(arguments, arguments.length - 2);
    setTimeout(function() {
      func(params);
    }, wait);
  };

  var extend = function(obj) {
    var propertySets = last(arguments, (arguments.length - 1));
    return reduce(propertySets, function(reduction, target) {
      each(target, function(el,index) {
        obj[index] = el;
      });
      return obj;
    }, obj);
  };

  var defaults = function(obj) {
    var propertySets = last(arguments, (arguments.length - 1));
    return reduce(propertySets, function(reduction, target) {
      each(target, function(el,index) {
        obj[index] = (!obj.hasOwnProperty(index)) ? el : obj[index];
      });
      return obj;
    }, obj);
  };

  var flatten = function(nestedArray, result) {
    return reduce(nestedArray, function(reduction, target) {
      return (target instanceof Array) ? reduction.concat(flatten(target)) :
        reduction.concat(target);
    },[]);
  };

  var sortBy = function(arr, iterator) {
    var itr = (typeof iterator === 'string') ? function(el) {
      return el[iterator];
    } : iterator;

    return arr.sort(function(a,b) {
      return (itr(a) > itr(b)) ? 1 :
        (itr(a) < itr(b)) ? -1 : 0;
    });
  };

  var zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var length = last(pluck((args),'length').sort());
    var result = [];
    for (var i = 0; i < length; i++) {
      result.push(pluck(args, i));
    }
    return result;
  };

  var intersection = function(array) {
    var argsArray = map(Array.prototype.slice.call(arguments), function(el) {
      return Array.prototype.slice.call(el);
    });
    return select(argsArray[0], function(el) {
      return every(argsArray, function(element) {
        return contains(element, el);
      });
    });
  };

  var difference = function(array) {
    var argsArray = map(Array.prototype.slice.call(arguments), function(el) {
      return Array.prototype.slice.call(el);
    });
    return select(argsArray[0], function(el) {
      return !any(argsArray.slice(1), function(element) {
        return contains(element, el);
      });
    });
  };

  var shuffle = function(obj) {
    var randomSorter = function() {
      return Math.random();
    }
    return sortBy(obj.slice(), randomSorter);
  };

  var range = function(maxnumber) {
    var outputArray = [];
    for(var i = 0; i < maxnumber; i++){
      outputArray.push(i);
    }
    return outputArray;
    return reduce()
  };

  this._ = {
    each: each,
    contains: contains,
    map: map,
    pluck: pluck,
    last: last,
    first: first,
    reduce: reduce,
    select: select,
    reject: reject,
    every: every,
    any: any,
    uniq: uniq,
    once: once,
    memoize: memoize,
    delay: delay,
    extend: extend,
    defaults: defaults,
    flatten: flatten,
    sortBy: sortBy,
    zip: zip,
    intersection: intersection,
    difference: difference,
    shuffle: shuffle,
    range: range
  };


}).call(this);