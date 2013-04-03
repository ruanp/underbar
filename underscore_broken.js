(function() {

  // Call iterator(value, key, obj) for each element of obj
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

  // Determine if the array or object contains a given value (using `===`).
  var contains = function(obj, target) {
    var result = false;
    _.each(obj, function(element, index,object) {
      result = (element === target) ? true : result;
    });
    return result;
  };

  // Return the results of applying an iterator to each element.
  var map = function(array, iterator) {
    if (array === null) return [];
    var mapResult = [];
    _.each(array, function(el,i) {
      mapResult[i] = iterator(el);
    });
    return mapResult;
  };

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  var pluck = function(obj, property) {
    var pluckResult = _.map(obj, function(element) {
      return element[property];
    });
    return pluckResult;
  };

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  var last = function(array, n) {
    return (array === null) ? undefined :
      (n < 1) ? [] :
      (n === undefined) ? Array.prototype.slice.call(array,-1) :
      Array.prototype.slice.call(array,-n);
  };

  // Like last, but for the first elements
  var first = function(array, n) {
    return (array === null) ? undefined :
      (n < 1) ? [] :
      (n === undefined) ? Array.prototype.slice.call(array,0,1) :
      Array.prototype.slice.call(array,0,n);
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(previous_value, item){
  //     return previous_value + item;
  //   }, 0); // should be 6
  //
  var reduce = function(obj, iterator, initialValue) {
    var reduction;
    if (arguments.length > 2) reduction = initialValue;
    _.each(obj, function(target) {
      reduction = (reduction === undefined) ? target :
        iterator(reduction, target);
    });
    return reduction;
  };

  // Return all elements of an array that pass a truth test.
  var select = function(array, iterator) {
    var result = [];
    _.each(array, function(el, i, array) {
      if (iterator(el, i, array)) result.push(el);
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(array, iterator) {
    var result = [];
    _.each(array, function(el) {
      if (!iterator(el)) result.push(el);
    });
    return result;
  };

  // Determine whether all of the elements match a truth test.
  var every = function(obj, iterator) {
    return _.reduce(obj, function(prev,el) {
      return !!iterator(el) && prev;
    }, true);
  };

  // Determine whether any of the elements pass a truth test.
  var any = function(obj, iterator) {
    return _.reduce(obj, function(prev, el) {
      return (typeof iterator === 'function') ? (!!iterator(el) || prev) :
        (el || prev);
    }, false);
  };

  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
    return _.select(Array.prototype.slice.call(array), function(el, i, array) {
      return (array.indexOf(el) === i);
    });
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  var once = function(func) {
    var result = null;
    return function(){
      return (result !== null) ? result : result = func();
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  var memoize = function(func) {
    var results = {};
    return function() {
      var args = Array.prototype.slice.call(arguments);
      return (results.hasOwnProperty(args)) ? results[args] :
        results[args] = func.apply(this, arguments);
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  var delay = function(func, wait) {
    var params = _.last(arguments, arguments.length - 2);
    setTimeout(function() {
      func(params);
    }, wait);
  };

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  var extend = function(obj) {
    var propertySets = _.last(arguments, (arguments.length - 1));
    _.each(propertySets, function(el, index) {
      _.each(el, function(val, key) {
        obj[key] = val;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(obj) {
     var propertySets = _.last(arguments, (arguments.length - 1));
    _.each(propertySets, function(el, index) {
      _.each(el, function(val, key) {
        obj[key] = (!obj.hasOwnProperty(key)) ? val : obj[key];
      });
    });
     return obj;
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  var flatten = function(nestedArray, result) {
    return _.reduce(nestedArray, function(reduction, target) {
      return (target instanceof Array) ? reduction.concat(_.flatten(target)) :
        reduction.concat(target);
    },[]);
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var sortBy = function(arr, iterator) {
    var itr = (typeof iterator === 'string') ? function(el) {
      return el[iterator];
    } : iterator;

    return arr.sort(function(a,b) {
      return (itr(a) > itr(b)) ? 1 :
        (itr(a) < itr(b)) ? -1 : 0;
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  var zip = function() {
    var args = Array.prototype.slice.call(arguments,0);
    var length = _.last(_.pluck((args),'length').sort());
    var result = [];
    for (var i = 0; i < length; i++) {
      result.push(_.pluck(args, i));
    }
    return result;
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  var intersection = function(array) {
    var argsArray = _.map(Array.prototype.slice.call(arguments), function(el) {
      return Array.prototype.slice.call(el);
    });
    return _.select(argsArray[0], function(el) {
      return _.every(argsArray, function(element) {
        return _.contains(element, el);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = function(array) {
    var argsArray = _.map(Array.prototype.slice.call(arguments), function(el) {
      return Array.prototype.slice.call(el);
    });
    return _.select(argsArray[0], function(el) {
      return !_.any(argsArray.slice(1), function(element) {
        return _.contains(element, el);
      });
    });
  };

  // Shuffle an array.
  var shuffle = function(obj) {
    var randomSorter = function() {
      return Math.random();
    }
    return _.sortBy(obj.slice(0), randomSorter);
  };

  // Range is required in order to pass the shuffle tests
  var range = function(maxnumber){
    var outputArray = [];
    for(var i = 0; i < maxnumber; i++){
      outputArray.push(i);
    }
    return outputArray;
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
