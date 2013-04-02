(function() {

  // Call iterator(value, key, obj) for each element of obj
  var each = function(obj, iterator) {
    if (obj instanceof Array) {
      for(var i = 0; i < obj.length; i++){
        iterator(obj[i],i,obj);
      }
    }
    else {
      for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator(obj[key],key,obj);
        };
      };
    };
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

  // Takes an array of objects and returns and array of the values of
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

    if (n === undefined) n = 1;
    if (array === null) return undefined;
    if (n > array.length) n = array.length;

    var lastResult = [];

    for (var i = array.length - n; i < array.length; i++) {
      lastResult.push(array[i]);
    };

    return lastResult;
  };

  // Like last, but for the first elements
  var first = function(array, n) {

    if (n === undefined) n = 1;
    if (array === null) return undefined;
    if (n > array.length) n = array.length;

    var firstResult = [];

    for (var i = 0; i <= (n - 1); i++) {
      firstResult.push(array[i]);
    }
    return firstResult;
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
    
    var previousValue = initialValue;

    if (!initialValue) previousValue = 0;
    if (!obj) return initialValue;
    
    for (var i = 0; i < obj.length ; i++) {
      previousValue = iterator(previousValue, obj[i]);
    }
    return previousValue;
  };

  // Return all elements of an array that pass a truth test.
  var select = function(array, iterator) {

    var result = [];
    for(var i = 0; i < array.length; i++) {
      if(iterator(array[i])) result.push(array[i]);
    }
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(array, iterator) {
    var result = [];
    for(var i = 0; i < array.length; i++) {
      if(!iterator(array[i])) result.push(array[i]);
    }
    return result;
  };

  // Determine whether all of the elements match a truth test.
  var every = function(obj, iterator) {
    for(var i = 0; i < obj.length; i++) {
      if(!iterator(obj[i])) return false;
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test.
  var any = function(obj, iterator) {

    for(var i = 0; i < obj.length; i++) {
      if (!iterator) {
        if(obj[i]) return true;
      }
      else {
        if(iterator(obj[i])) return true;
      }
    }
    return false;
  };

  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
    var result = [];
    for(var i = 0; i < array.length; i++) {
      var duplicate = false;
      for(var j = 0; j < result.length; j++) {
        if(result[j] == array[i]) {
            duplicate = true;  
        }
      }
      if(!duplicate) {
        result.push(array[i]);
      }
    }
    return result;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  var once = function(func) {
    var result;
    var called;

    var onceFunction = function(){
      if(called){
        return result;
      } else {
        result = func();
        called = true;
        return result;
      };
    };    
    return onceFunction;
  };


  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  var memoize = function(func) {

    var results = new Object();

    var fastFunc = function(param) {

      if (!results.hasOwnProperty(param)) {
        results[param] = func(param);
      }; 
      return results[param];
    }; 
    return fastFunc;
  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  var delay = function(func, wait) {
    num_args = arguments.length - 2;
    params = _.last(arguments, num_args);
    
    var timedFunction = function() {
      func(params);
    };

    setTimeout(timedFunction, wait);
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

    param_array = _.last(arguments, (arguments.length - 1));

    var extendObj = function(kvpairs) {
      for (var key in kvpairs) {
        obj[key] = kvpairs[key];
      };
    };

    for (i = 0; i < param_array.length; i++) {
      extendObj(param_array[i]);
    }

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(obj) {

     param_array = _.last(arguments, (arguments.length - 1));

     var extendObj = function(kvpairs) {
       for (var key in kvpairs) {
        if (obj[key] === undefined) obj[key] = kvpairs[key];
       };
     };

     for (i = 0; i < param_array.length; i++) {
       extendObj(param_array[i]);
     }

     return obj;

  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  var flatten = function(nestedArray, result) {

    var takeElement = function(input) {
      if (Array.isArray(input)) {
        
        for (i = 0; i < input.length; i++) {
          takeElement(input[i]);
        }; 
      } else {
        answer.push(input);
      };
    };

    var answer = [];

    if(!Array.isArray(nestedArray)) {
      nestedArray = Array.prototype.slice.call(nestedArray,0);
    };

    takeElement(nestedArray);
    return answer;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var sortBy = function(arr, iterator) {

    if (typeof(iterator) != 'function') {
      oldIterator = iterator;
      iterator = function(el) {
        return el[oldIterator];
      }
    }

    var newArr = arr;
    return newArr.sort(function(a, b) {  
      if (iterator(a) > iterator(b))
        return 1;
      if (iterator(a) === iterator(b))
        return 0;
      else 
        return -1;
    })

  };

  // Zip together two or more arrays with elements of the same index 
  // going together.
  // 
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  var zip = function() {

    var argsArray = Array.prototype.slice.call(arguments,0);
    var numArgs = argsArray.length;
    var maxLength = _.reduce(argsArray, function(prev, array) {
      if (prev > array.length) {
        return prev;
      }
      return array.length;  
    });

    result = [];

    for (var i = 0; i < maxLength; i++) {
      result[i] = _.map(argsArray, function(eachArray) {return eachArray[i];});
    };

    return result;

  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  var intersection = function(array) {

    var argsArray = Array.prototype.slice.call(arguments,1);
    var numArgs = argsArray.length;
  
    var deepSelector = function (element) {
        var inAll = true;
        _.each(argsArray, function(array) {
          if (!(_.contains(array,element))) {
            inAll = false;
          } 
        });
        return inAll;
    };

    var chosenOnes = select(array, deepSelector);

    return chosenOnes;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = function(array) {

    var argsArray = Array.prototype.slice.call(arguments,1);
    var numArgs = argsArray.length;
  
    var deepSelector = function (element) {
        var inAny = false;
        _.each(argsArray, function(array) {
          if ((_.contains(array,element))) {
            inAny = true;
          } 
        });
        return !inAny;
    };

    var chosenOnes = select(array, deepSelector);

    return chosenOnes;

  };

  // Shuffle an array.
  var shuffle = function(obj) {
    var randomElement = function() {
      return Math.random();
    }
    return _.sortBy(obj.slice(0), randomElement);
  };


  var range = function(maxnumber){
    var outputArray = [];
    for(var i = 0; i < maxnumber; i++){
      outputArray.push(i);
    }
    return outputArray;
  };

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  var chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  var throttle = function(func, wait) {
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
    chain: chain,
    range: range,
    throttle: throttle
  };


}).call(this);
