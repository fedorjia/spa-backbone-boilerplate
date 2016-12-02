(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.0.11.9@process/browser.js":[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.0.9.6@regenerator-runtime/runtime.js":[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.0.11.9@process/browser.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.1.1.1@whatwg-fetch/fetch.js":[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (typeof input === 'string') {
      this.url = input
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split('\r\n').forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/fn/regexp/escape.js":[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","../../modules/core.regexp.escape":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/core.regexp.escape.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/get-iterator.js":[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/core.get-iterator.js","../modules/es6.string.iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.string.iterator.js","../modules/web.dom.iterable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/web.dom.iterable.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/json/stringify.js":[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/assign.js":[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../../modules/es6.object.assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.assign.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/create.js":[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../../modules/es6.object.create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.create.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/define-property.js":[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../../modules/es6.object.define-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.define-property.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/get-own-property-descriptor.js":[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../../modules/es6.object.get-own-property-descriptor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.get-own-property-descriptor.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/get-prototype-of.js":[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../../modules/es6.object.get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.get-prototype-of.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/keys.js":[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../../modules/es6.object.keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.keys.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/set-prototype-of.js":[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../../modules/es6.object.set-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.set-prototype-of.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/promise.js":[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../modules/es6.object.to-string":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.to-string.js","../modules/es6.promise":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.promise.js","../modules/es6.string.iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.string.iterator.js","../modules/web.dom.iterable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/web.dom.iterable.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/symbol/index.js":[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","../../modules/es6.object.to-string":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.to-string.js","../../modules/es6.symbol":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.symbol.js","../../modules/es7.symbol.async-iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es7.symbol.async-iterator.js","../../modules/es7.symbol.observable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es7.symbol.observable.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/symbol/iterator.js":[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-ext.js","../../modules/es6.string.iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.string.iterator.js","../../modules/web.dom.iterable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/web.dom.iterable.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_a-function.js":[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_add-to-unscopables.js":[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-instance.js":[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js":[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_array-includes.js":[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-index.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_classof.js":[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_cof.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_cof.js":[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js":[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ctx.js":[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_a-function.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_defined.js":[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js":[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_dom-create.js":[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_enum-bug-keys.js":[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_enum-keys.js":[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gops.js","./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-pie.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js":[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ctx.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_fails.js":[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_for-of.js":[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ctx.js","./_is-array-iter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-array-iter.js","./_iter-call":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-call.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-length.js","./core.get-iterator-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/core.get-iterator-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js":[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js":[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js":[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_property-desc.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_html.js":[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js","./_dom-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_dom-create.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_invoke.js":[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iobject.js":[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_cof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-array-iter.js":[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iterators.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-array.js":[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_cof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-object.js":[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-call.js":[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-create.js":[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-create.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_property-desc.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-to-string-tag.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-define.js":[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js","./_iter-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-create.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iterators.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_library.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gpo.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_redefine.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-to-string-tag.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-detect.js":[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-step.js":[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iterators.js":[function(require,module,exports){
module.exports = {};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_keyof.js":[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_library.js":[function(require,module,exports){
module.exports = true;
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_meta.js":[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_fails.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-object.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_uid.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_microtask.js":[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_cof.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_task":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_task.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-assign.js":[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_fails.js","./_iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iobject.js","./_object-gops":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gops.js","./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-pie.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-create.js":[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js","./_dom-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_dom-create.js","./_enum-bug-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_enum-bug-keys.js","./_html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_html.js","./_object-dps":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dps.js","./_shared-key":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared-key.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js":[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js","./_ie8-dom-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dps.js":[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js","./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopd.js":[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js","./_ie8-dom-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ie8-dom-define.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-pie.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_property-desc.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopn-ext.js":[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopn.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopn.js":[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_enum-bug-keys.js","./_object-keys-internal":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys-internal.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gops.js":[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gpo.js":[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js","./_shared-key":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared-key.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys-internal.js":[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_array-includes.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js","./_shared-key":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared-key.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys.js":[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_enum-bug-keys.js","./_object-keys-internal":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys-internal.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-pie.js":[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-sap.js":[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_property-desc.js":[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_redefine-all.js":[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_redefine.js":[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-proto.js":[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ctx.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-object.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopd.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-species.js":[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-to-string-tag.js":[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared-key.js":[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_uid.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared.js":[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_species-constructor.js":[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_a-function.js","./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_string-at.js":[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_defined.js","./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_task.js":[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_cof.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ctx.js","./_dom-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_dom-create.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_html.js","./_invoke":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_invoke.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-index.js":[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-integer.js":[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js":[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_defined.js","./_iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-length.js":[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-object.js":[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_defined.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-primitive.js":[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_uid.js":[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-define.js":[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_library.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js","./_wks-ext":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-ext.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-ext.js":[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js":[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_shared":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_uid.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/core.get-iterator-method.js":[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_classof.js","./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iterators.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/core.get-iterator.js":[function(require,module,exports){
var anObject = require('./_an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js","./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","./core.get-iterator-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/core.get-iterator-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.array.iterator.js":[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_add-to-unscopables.js","./_iter-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-define.js","./_iter-step":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-step.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iterators.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.assign.js":[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js","./_object-assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-assign.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.create.js":[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-create.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.define-property.js":[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopd.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-sap.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.get-prototype-of.js":[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gpo.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-sap.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.keys.js":[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-sap.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.set-prototype-of.js":[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js","./_set-proto":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-proto.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.to-string.js":[function(require,module,exports){

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.promise.js":[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_a-function.js","./_an-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-instance.js","./_classof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_classof.js","./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ctx.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js","./_for-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_for-of.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-object.js","./_iter-detect":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-detect.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_library.js","./_microtask":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_microtask.js","./_redefine-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_redefine-all.js","./_set-species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-species.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-to-string-tag.js","./_species-constructor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_species-constructor.js","./_task":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_task.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.string.iterator.js":[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-define.js","./_string-at":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_string-at.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.symbol.js":[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js","./_enum-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_enum-keys.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js","./_is-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-array.js","./_keyof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_keyof.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_library.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_meta.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-create.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopd.js","./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopn.js","./_object-gopn-ext":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopn-ext.js","./_object-gops":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gops.js","./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-pie.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_property-desc.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_redefine.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-to-string-tag.js","./_shared":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-primitive.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_uid.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js","./_wks-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-define.js","./_wks-ext":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-ext.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es7.symbol.async-iterator.js":[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-define.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es7.symbol.observable.js":[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-define.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/web.dom.iterable.js":[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iterators.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js","./es6.array.iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.array.iterator.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_a-function.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-number-value.js":[function(require,module,exports){
var cof = require('./_cof');
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_add-to-unscopables.js":[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-instance.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-instance.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_an-object.js"][0].apply(exports,arguments)
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-copy-within.js":[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./_to-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-index.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-fill.js":[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./_to-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-index.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-from-iterable.js":[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_for-of.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-includes.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_array-includes.js"][0].apply(exports,arguments)
},{"./_to-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-index.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js":[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-species-create.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iobject.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-reduce.js":[function(require,module,exports){
var aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , IObject   = require('./_iobject')
  , toLength  = require('./_to-length');

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iobject.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-species-constructor.js":[function(require,module,exports){
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-array.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-species-create.js":[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-species-constructor.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_bind.js":[function(require,module,exports){
'use strict';
var aFunction  = require('./_a-function')
  , isObject   = require('./_is-object')
  , invoke     = require('./_invoke')
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_invoke":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_invoke.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_classof.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_classof.js"][0].apply(exports,arguments)
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_cof.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-strong.js":[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./_an-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-instance.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_for-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_for-of.js","./_iter-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-define.js","./_iter-step":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-step.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-create.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_redefine-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine-all.js","./_set-species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-species.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-from-iterable.js","./_classof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_classof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-weak.js":[function(require,module,exports){
'use strict';
var redefineAll       = require('./_redefine-all')
  , getWeak           = require('./_meta').getWeak
  , anObject          = require('./_an-object')
  , isObject          = require('./_is-object')
  , anInstance        = require('./_an-instance')
  , forOf             = require('./_for-of')
  , createArrayMethod = require('./_array-methods')
  , $has              = require('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-instance.js","./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_for-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_for-of.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js","./_redefine-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine-all.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection.js":[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , $export           = require('./_export')
  , redefine          = require('./_redefine')
  , redefineAll       = require('./_redefine-all')
  , meta              = require('./_meta')
  , forOf             = require('./_for-of')
  , anInstance        = require('./_an-instance')
  , isObject          = require('./_is-object')
  , fails             = require('./_fails')
  , $iterDetect       = require('./_iter-detect')
  , setToStringTag    = require('./_set-to-string-tag')
  , inheritIfRequired = require('./_inherit-if-required');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-instance.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_for-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_for-of.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_inherit-if-required":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_inherit-if-required.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_iter-detect":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-detect.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./_redefine-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine-all.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-to-string-tag.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_core.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_create-property.js":[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ctx.js"][0].apply(exports,arguments)
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_date-to-primitive.js":[function(require,module,exports){
'use strict';
var anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive')
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_defined.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_descriptors.js"][0].apply(exports,arguments)
},{"./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_dom-create.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_dom-create.js"][0].apply(exports,arguments)
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_enum-bug-keys.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_enum-bug-keys.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_enum-keys.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_enum-keys.js"][0].apply(exports,arguments)
},{"./_object-gops":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gops.js","./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-pie.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js":[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails-is-regexp.js":[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_fails.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fix-re-wks.js":[function(require,module,exports){
'use strict';
var hide     = require('./_hide')
  , redefine = require('./_redefine')
  , fails    = require('./_fails')
  , defined  = require('./_defined')
  , wks      = require('./_wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_flags.js":[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_for-of.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_for-of.js"][0].apply(exports,arguments)
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_is-array-iter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-array-iter.js","./_iter-call":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-call.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./core.get-iterator-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/core.get-iterator-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_global.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_has.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_hide.js"][0].apply(exports,arguments)
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_html.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_html.js"][0].apply(exports,arguments)
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ie8-dom-define.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_ie8-dom-define.js"][0].apply(exports,arguments)
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_dom-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_dom-create.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_inherit-if-required.js":[function(require,module,exports){
var isObject       = require('./_is-object')
  , setPrototypeOf = require('./_set-proto').set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_set-proto":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-proto.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_invoke.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_invoke.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iobject.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iobject.js"][0].apply(exports,arguments)
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-array-iter.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-array-iter.js"][0].apply(exports,arguments)
},{"./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iterators.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-array.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-array.js"][0].apply(exports,arguments)
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-integer.js":[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_is-object.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-regexp.js":[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object')
  , cof      = require('./_cof')
  , MATCH    = require('./_wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-call.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-call.js"][0].apply(exports,arguments)
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-create.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-create.js"][0].apply(exports,arguments)
},{"./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-create.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-to-string-tag.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-define.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-define.js"][0].apply(exports,arguments)
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_iter-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-create.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iterators.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_library.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-to-string-tag.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-detect.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-detect.js"][0].apply(exports,arguments)
},{"./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-step.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iter-step.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iterators.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_iterators.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_keyof.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_keyof.js"][0].apply(exports,arguments)
},{"./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_library.js":[function(require,module,exports){
module.exports = false;
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-expm1.js":[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-log1p.js":[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-sign.js":[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_meta.js"][0].apply(exports,arguments)
},{"./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_uid.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js":[function(require,module,exports){
var Map     = require('./es6.map')
  , $export = require('./_export')
  , shared  = require('./_shared')('metadata')
  , store   = shared.store || (shared.store = new (require('./es6.weak-map')));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_shared":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared.js","./es6.map":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.map.js","./es6.weak-map":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.weak-map.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_microtask.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_microtask.js"][0].apply(exports,arguments)
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_task":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_task.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-assign.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-assign.js"][0].apply(exports,arguments)
},{"./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iobject.js","./_object-gops":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gops.js","./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-pie.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-create.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-create.js"][0].apply(exports,arguments)
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_dom-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_dom-create.js","./_enum-bug-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_enum-bug-keys.js","./_html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_html.js","./_object-dps":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dps.js","./_shared-key":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared-key.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dp.js"][0].apply(exports,arguments)
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_ie8-dom-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ie8-dom-define.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dps.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-dps.js"][0].apply(exports,arguments)
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-forced-pam.js":[function(require,module,exports){
// Forced replacement prototype accessors methods
module.exports = require('./_library')|| !require('./_fails')(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete require('./_global')[K];
});
},{"./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_library.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopd.js"][0].apply(exports,arguments)
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_ie8-dom-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ie8-dom-define.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-pie.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn-ext.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopn-ext.js"][0].apply(exports,arguments)
},{"./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gopn.js"][0].apply(exports,arguments)
},{"./_enum-bug-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_enum-bug-keys.js","./_object-keys-internal":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys-internal.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gops.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gops.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-gpo.js"][0].apply(exports,arguments)
},{"./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_shared-key":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared-key.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys-internal.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys-internal.js"][0].apply(exports,arguments)
},{"./_array-includes":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-includes.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_shared-key":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared-key.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-keys.js"][0].apply(exports,arguments)
},{"./_enum-bug-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_enum-bug-keys.js","./_object-keys-internal":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys-internal.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-pie.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-pie.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_object-sap.js"][0].apply(exports,arguments)
},{"./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-to-array.js":[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-pie.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_own-keys.js":[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn')
  , gOPS     = require('./_object-gops')
  , anObject = require('./_an-object')
  , Reflect  = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn.js","./_object-gops":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gops.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_parse-float.js":[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_string-trim":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-trim.js","./_string-ws":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-ws.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_parse-int.js":[function(require,module,exports){
var $parseInt = require('./_global').parseInt
  , $trim     = require('./_string-trim').trim
  , ws        = require('./_string-ws')
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_string-trim":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-trim.js","./_string-ws":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-ws.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_partial.js":[function(require,module,exports){
'use strict';
var path      = require('./_path')
  , invoke    = require('./_invoke')
  , aFunction = require('./_a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_invoke":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_invoke.js","./_path":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_path.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_path.js":[function(require,module,exports){
module.exports = require('./_global');
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_property-desc.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine-all.js":[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js":[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_uid.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_replacer.js":[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_same-value.js":[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-proto.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-proto.js"][0].apply(exports,arguments)
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-species.js":[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-to-string-tag.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_set-to-string-tag.js"][0].apply(exports,arguments)
},{"./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared-key.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared-key.js"][0].apply(exports,arguments)
},{"./_shared":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_uid.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_shared.js"][0].apply(exports,arguments)
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_species-constructor.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_species-constructor.js"][0].apply(exports,arguments)
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js":[function(require,module,exports){
var fails = require('./_fails');

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-at.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_string-at.js"][0].apply(exports,arguments)
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-context.js":[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp')
  , defined  = require('./_defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_is-regexp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-regexp.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js":[function(require,module,exports){
var $export = require('./_export')
  , fails   = require('./_fails')
  , defined = require('./_defined')
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-pad.js":[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length')
  , repeat   = require('./_string-repeat')
  , defined  = require('./_defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_string-repeat":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-repeat.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-repeat.js":[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-trim.js":[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_string-ws":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-ws.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-ws.js":[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_task.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_task.js"][0].apply(exports,arguments)
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_dom-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_dom-create.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_html.js","./_invoke":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_invoke.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-index.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-index.js"][0].apply(exports,arguments)
},{"./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-integer.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-iobject.js"][0].apply(exports,arguments)
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-length.js"][0].apply(exports,arguments)
},{"./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-object.js"][0].apply(exports,arguments)
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_to-primitive.js"][0].apply(exports,arguments)
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js":[function(require,module,exports){
'use strict';
if(require('./_descriptors')){
  var LIBRARY             = require('./_library')
    , global              = require('./_global')
    , fails               = require('./_fails')
    , $export             = require('./_export')
    , $typed              = require('./_typed')
    , $buffer             = require('./_typed-buffer')
    , ctx                 = require('./_ctx')
    , anInstance          = require('./_an-instance')
    , propertyDesc        = require('./_property-desc')
    , hide                = require('./_hide')
    , redefineAll         = require('./_redefine-all')
    , toInteger           = require('./_to-integer')
    , toLength            = require('./_to-length')
    , toIndex             = require('./_to-index')
    , toPrimitive         = require('./_to-primitive')
    , has                 = require('./_has')
    , same                = require('./_same-value')
    , classof             = require('./_classof')
    , isObject            = require('./_is-object')
    , toObject            = require('./_to-object')
    , isArrayIter         = require('./_is-array-iter')
    , create              = require('./_object-create')
    , getPrototypeOf      = require('./_object-gpo')
    , gOPN                = require('./_object-gopn').f
    , getIterFn           = require('./core.get-iterator-method')
    , uid                 = require('./_uid')
    , wks                 = require('./_wks')
    , createArrayMethod   = require('./_array-methods')
    , createArrayIncludes = require('./_array-includes')
    , speciesConstructor  = require('./_species-constructor')
    , ArrayIterators      = require('./es6.array.iterator')
    , Iterators           = require('./_iterators')
    , $iterDetect         = require('./_iter-detect')
    , setSpecies          = require('./_set-species')
    , arrayFill           = require('./_array-fill')
    , arrayCopyWithin     = require('./_array-copy-within')
    , $DP                 = require('./_object-dp')
    , $GOPD               = require('./_object-gopd')
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
},{"./_an-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-instance.js","./_array-copy-within":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-copy-within.js","./_array-fill":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-fill.js","./_array-includes":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-includes.js","./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_classof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_classof.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_is-array-iter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-array-iter.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_iter-detect":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-detect.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iterators.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_library.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-create.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js","./_redefine-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine-all.js","./_same-value":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_same-value.js","./_set-species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-species.js","./_species-constructor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_species-constructor.js","./_to-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-index.js","./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js","./_typed":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed.js","./_typed-buffer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-buffer.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_uid.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js","./core.get-iterator-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/core.get-iterator-method.js","./es6.array.iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.iterator.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-buffer.js":[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , DESCRIPTORS    = require('./_descriptors')
  , LIBRARY        = require('./_library')
  , $typed         = require('./_typed')
  , hide           = require('./_hide')
  , redefineAll    = require('./_redefine-all')
  , fails          = require('./_fails')
  , anInstance     = require('./_an-instance')
  , toInteger      = require('./_to-integer')
  , toLength       = require('./_to-length')
  , gOPN           = require('./_object-gopn').f
  , dP             = require('./_object-dp').f
  , arrayFill      = require('./_array-fill')
  , setToStringTag = require('./_set-to-string-tag')
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"./_an-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-instance.js","./_array-fill":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-fill.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_library.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn.js","./_redefine-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine-all.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-to-string-tag.js","./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./_typed":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed.js":[function(require,module,exports){
var global = require('./_global')
  , hide   = require('./_hide')
  , uid    = require('./_uid')
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_uid.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_uid.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_uid.js"][0].apply(exports,arguments)
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks-define.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-define.js"][0].apply(exports,arguments)
},{"./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_library.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_wks-ext":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks-ext.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks-ext.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks-ext.js"][0].apply(exports,arguments)
},{"./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/_wks.js"][0].apply(exports,arguments)
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_shared":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_uid.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/core.get-iterator-method.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/core.get-iterator-method.js"][0].apply(exports,arguments)
},{"./_classof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_classof.js","./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iterators.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/core.regexp.escape.js":[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export')
  , $re     = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_replacer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_replacer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.copy-within.js":[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {copyWithin: require('./_array-copy-within')});

require('./_add-to-unscopables')('copyWithin');
},{"./_add-to-unscopables":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_add-to-unscopables.js","./_array-copy-within":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-copy-within.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.every.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $every  = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.fill.js":[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {fill: require('./_array-fill')});

require('./_add-to-unscopables')('fill');
},{"./_add-to-unscopables":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_add-to-unscopables.js","./_array-fill":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-fill.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.filter.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.find-index.js":[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_add-to-unscopables.js","./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.find.js":[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_add-to-unscopables.js","./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.for-each.js":[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $forEach = require('./_array-methods')(0)
  , STRICT   = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.from.js":[function(require,module,exports){
'use strict';
var ctx            = require('./_ctx')
  , $export        = require('./_export')
  , toObject       = require('./_to-object')
  , call           = require('./_iter-call')
  , isArrayIter    = require('./_is-array-iter')
  , toLength       = require('./_to-length')
  , createProperty = require('./_create-property')
  , getIterFn      = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_create-property.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_is-array-iter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-array-iter.js","./_iter-call":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-call.js","./_iter-detect":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-detect.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js","./core.get-iterator-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/core.get-iterator-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.index-of.js":[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , $indexOf      = require('./_array-includes')(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});
},{"./_array-includes":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-includes.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.is-array.js":[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', {isArray: require('./_is-array')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_is-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.iterator.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.array.iterator.js"][0].apply(exports,arguments)
},{"./_add-to-unscopables":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_add-to-unscopables.js","./_iter-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-define.js","./_iter-step":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-step.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iterators.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.join.js":[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iobject.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.last-index-of.js":[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , toIObject     = require('./_to-iobject')
  , toInteger     = require('./_to-integer')
  , toLength      = require('./_to-length')
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js","./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.map.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $map    = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.of.js":[function(require,module,exports){
'use strict';
var $export        = require('./_export')
  , createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});
},{"./_create-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_create-property.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.reduce-right.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"./_array-reduce":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-reduce.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.reduce.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"./_array-reduce":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-reduce.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.slice.js":[function(require,module,exports){
'use strict';
var $export    = require('./_export')
  , html       = require('./_html')
  , cof        = require('./_cof')
  , toIndex    = require('./_to-index')
  , toLength   = require('./_to-length')
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_html.js","./_to-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-index.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.some.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $some   = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.sort.js":[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , fails     = require('./_fails')
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_strict-method":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_strict-method.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.species.js":[function(require,module,exports){
require('./_set-species')('Array');
},{"./_set-species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-species.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.now.js":[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.to-iso-string.js":[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export')
  , fails   = require('./_fails')
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.to-json.js":[function(require,module,exports){
'use strict';
var $export     = require('./_export')
  , toObject    = require('./_to-object')
  , toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.to-primitive.js":[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));
},{"./_date-to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_date-to-primitive.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.to-string.js":[function(require,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  require('./_redefine')(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.function.bind.js":[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', {bind: require('./_bind')});
},{"./_bind":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_bind.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.function.has-instance.js":[function(require,module,exports){
'use strict';
var isObject       = require('./_is-object')
  , getPrototypeOf = require('./_object-gpo')
  , HAS_INSTANCE   = require('./_wks')('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))require('./_object-dp').f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.function.name.js":[function(require,module,exports){
var dP         = require('./_object-dp').f
  , createDesc = require('./_property-desc')
  , has        = require('./_has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.map.js":[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.1 Map Objects
module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection.js","./_collection-strong":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-strong.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.acosh.js":[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export')
  , log1p   = require('./_math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_math-log1p":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-log1p.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.asinh.js":[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export')
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.atanh.js":[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export')
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.cbrt.js":[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export')
  , sign    = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_math-sign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-sign.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.clz32.js":[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.cosh.js":[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.expm1.js":[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export')
  , $expm1  = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_math-expm1":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-expm1.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.fround.js":[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./_export')
  , sign      = require('./_math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_math-sign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-sign.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.hypot.js":[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.imul.js":[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.log10.js":[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.log1p.js":[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', {log1p: require('./_math-log1p')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_math-log1p":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-log1p.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.log2.js":[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.sign.js":[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', {sign: require('./_math-sign')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_math-sign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-sign.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.sinh.js":[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_math-expm1":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-expm1.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.tanh.js":[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_math-expm1":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_math-expm1.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.trunc.js":[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.constructor.js":[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , has               = require('./_has')
  , cof               = require('./_cof')
  , inheritIfRequired = require('./_inherit-if-required')
  , toPrimitive       = require('./_to-primitive')
  , fails             = require('./_fails')
  , gOPN              = require('./_object-gopn').f
  , gOPD              = require('./_object-gopd').f
  , dP                = require('./_object-dp').f
  , $trim             = require('./_string-trim').trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(require('./_object-create')(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_inherit-if-required":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_inherit-if-required.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-create.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./_string-trim":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-trim.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.epsilon.js":[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.is-finite.js":[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.is-integer.js":[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', {isInteger: require('./_is-integer')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_is-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.is-nan.js":[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./_export')
  , isInteger = require('./_is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_is-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.parse-float.js":[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_parse-float":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_parse-float.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.parse-int.js":[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_parse-int":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_parse-int.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.to-fixed.js":[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , toInteger    = require('./_to-integer')
  , aNumberValue = require('./_a-number-value')
  , repeat       = require('./_string-repeat')
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"./_a-number-value":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-number-value.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_string-repeat":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-repeat.js","./_to-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-integer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.to-precision.js":[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $fails       = require('./_fails')
  , aNumberValue = require('./_a-number-value')
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"./_a-number-value":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-number-value.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.assign.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.assign.js"][0].apply(exports,arguments)
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-assign.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.create.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.create.js"][0].apply(exports,arguments)
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-create.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.define-properties.js":[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperties: require('./_object-dps')});
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-dps":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dps.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.define-property.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.define-property.js"][0].apply(exports,arguments)
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.freeze.js":[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.get-own-property-descriptor.js"][0].apply(exports,arguments)
},{"./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn-ext.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.get-prototype-of.js"][0].apply(exports,arguments)
},{"./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.is-extensible.js":[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.is-frozen.js":[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.is-sealed.js":[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.is.js":[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', {is: require('./_same-value')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_same-value":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_same-value.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.keys.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.keys.js"][0].apply(exports,arguments)
},{"./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.seal.js":[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js","./_object-sap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-sap.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.set-prototype-of.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.object.set-prototype-of.js"][0].apply(exports,arguments)
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_set-proto":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-proto.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.to-string.js":[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof')
  , test    = {};
test[require('./_wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./_classof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_classof.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.parse-float.js":[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_parse-float":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_parse-float.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.parse-int.js":[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_parse-int":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_parse-int.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.promise.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.promise.js"][0].apply(exports,arguments)
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_an-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-instance.js","./_classof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_classof.js","./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","./_ctx":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_ctx.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_for-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_for-of.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_iter-detect":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-detect.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_library.js","./_microtask":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_microtask.js","./_redefine-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine-all.js","./_set-species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-species.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-to-string-tag.js","./_species-constructor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_species-constructor.js","./_task":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_task.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.apply.js":[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , rApply    = (require('./_global').Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.construct.js":[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = require('./_export')
  , create     = require('./_object-create')
  , aFunction  = require('./_a-function')
  , anObject   = require('./_an-object')
  , isObject   = require('./_is-object')
  , fails      = require('./_fails')
  , bind       = require('./_bind')
  , rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_bind":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_bind.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-create.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.define-property.js":[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = require('./_object-dp')
  , $export     = require('./_export')
  , anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./_export')
  , gOPD     = require('./_object-gopd').f
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.enumerate.js":[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./_export')
  , anObject = require('./_an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_iter-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-create.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = require('./_object-gopd')
  , $export  = require('./_export')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./_export')
  , getProto = require('./_object-gpo')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.get.js":[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , isObject       = require('./_is-object')
  , anObject       = require('./_an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.has.js":[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./_export')
  , anObject      = require('./_an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', {ownKeys: require('./_own-keys')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_own-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_own-keys.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./_export')
  , anObject           = require('./_an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./_export')
  , setProto = require('./_set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_set-proto":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-proto.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.set.js":[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = require('./_object-dp')
  , gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , createDesc     = require('./_property-desc')
  , anObject       = require('./_an-object')
  , isObject       = require('./_is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.constructor.js":[function(require,module,exports){
var global            = require('./_global')
  , inheritIfRequired = require('./_inherit-if-required')
  , dP                = require('./_object-dp').f
  , gOPN              = require('./_object-gopn').f
  , isRegExp          = require('./_is-regexp')
  , $flags            = require('./_flags')
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function(){
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_flags":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_flags.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_inherit-if-required":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_inherit-if-required.js","./_is-regexp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-regexp.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./_set-species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-species.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.flags.js":[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(require('./_descriptors') && /./g.flags != 'g')require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_flags":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_flags.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.match.js":[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"./_fix-re-wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fix-re-wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.replace.js":[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"./_fix-re-wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fix-re-wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.search.js":[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"./_fix-re-wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fix-re-wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.split.js":[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = require('./_is-regexp')
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"./_fix-re-wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fix-re-wks.js","./_is-regexp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-regexp.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.to-string.js":[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject    = require('./_an-object')
  , $flags      = require('./_flags')
  , DESCRIPTORS = require('./_descriptors')
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(require('./_fails')(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_flags":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_flags.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./es6.regexp.flags":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.flags.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.set.js":[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.2 Set Objects
module.exports = require('./_collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./_collection":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection.js","./_collection-strong":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-strong.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.anchor.js":[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.big.js":[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.blink.js":[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.bold.js":[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.code-point-at.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $at     = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_string-at":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-at.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.ends-with.js":[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./_export')
  , toLength  = require('./_to-length')
  , context   = require('./_string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails-is-regexp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails-is-regexp.js","./_string-context":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-context.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.fixed.js":[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.fontcolor.js":[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.fontsize.js":[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.from-code-point.js":[function(require,module,exports){
var $export        = require('./_export')
  , toIndex        = require('./_to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_to-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-index.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.includes.js":[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./_export')
  , context  = require('./_string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails-is-regexp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails-is-regexp.js","./_string-context":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-context.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.italics.js":[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.iterator.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.string.iterator.js"][0].apply(exports,arguments)
},{"./_iter-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-define.js","./_string-at":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-at.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.link.js":[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.raw.js":[function(require,module,exports){
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.repeat.js":[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_string-repeat":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-repeat.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.small.js":[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.starts-with.js":[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./_export')
  , toLength    = require('./_to-length')
  , context     = require('./_string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails-is-regexp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails-is-regexp.js","./_string-context":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-context.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.strike.js":[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.sub.js":[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.sup.js":[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"./_string-html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-html.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.trim.js":[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./_string-trim":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-trim.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.symbol.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es6.symbol.js"][0].apply(exports,arguments)
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_enum-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_enum-keys.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_has.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_is-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-array.js","./_keyof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_keyof.js","./_library":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_library.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js","./_object-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-create.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_object-gopn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn.js","./_object-gopn-ext":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopn-ext.js","./_object-gops":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gops.js","./_object-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-keys.js","./_object-pie":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-pie.js","./_property-desc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_property-desc.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./_set-to-string-tag":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-to-string-tag.js","./_shared":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_shared.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js","./_uid":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_uid.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js","./_wks-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks-define.js","./_wks-ext":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks-ext.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $typed       = require('./_typed')
  , buffer       = require('./_typed-buffer')
  , anObject     = require('./_an-object')
  , toIndex      = require('./_to-index')
  , toLength     = require('./_to-length')
  , isObject     = require('./_is-object')
  , ArrayBuffer  = require('./_global').ArrayBuffer
  , speciesConstructor = require('./_species-constructor')
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_fails":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_fails.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_set-species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-species.js","./_species-constructor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_species-constructor.js","./_to-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-index.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js","./_typed":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed.js","./_typed-buffer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-buffer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.data-view.js":[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_typed":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed.js","./_typed-buffer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-buffer.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.float32-array.js":[function(require,module,exports){
require('./_typed-array')('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.float64-array.js":[function(require,module,exports){
require('./_typed-array')('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.int16-array.js":[function(require,module,exports){
require('./_typed-array')('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.int32-array.js":[function(require,module,exports){
require('./_typed-array')('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.int8-array.js":[function(require,module,exports){
require('./_typed-array')('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"./_typed-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_typed-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.weak-map.js":[function(require,module,exports){
'use strict';
var each         = require('./_array-methods')(0)
  , redefine     = require('./_redefine')
  , meta         = require('./_meta')
  , assign       = require('./_object-assign')
  , weak         = require('./_collection-weak')
  , isObject     = require('./_is-object')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-methods.js","./_collection":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection.js","./_collection-weak":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-weak.js","./_is-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-object.js","./_meta":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_meta.js","./_object-assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-assign.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.weak-set.js":[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');

// 23.4 WeakSet Objects
require('./_collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./_collection":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection.js","./_collection-weak":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-weak.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.array.includes.js":[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = require('./_export')
  , $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');
},{"./_add-to-unscopables":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_add-to-unscopables.js","./_array-includes":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-includes.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.asap.js":[function(require,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = require('./_export')
  , microtask = require('./_microtask')()
  , process   = require('./_global').process
  , isNode    = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_microtask":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_microtask.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.error.is-error.js":[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export')
  , cof     = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"./_cof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_cof.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.map.to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-to-json.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.math.iaddh.js":[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.math.imulh.js":[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.math.isubh.js":[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.math.umulh.js":[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.define-getter.js":[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-forced-pam":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-forced-pam.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.define-setter.js":[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-dp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-dp.js","./_object-forced-pam":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-forced-pam.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.entries.js":[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-to-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-to-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = require('./_export')
  , ownKeys        = require('./_own-keys')
  , toIObject      = require('./_to-iobject')
  , gOPD           = require('./_object-gopd')
  , createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});
},{"./_create-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_create-property.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_own-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_own-keys.js","./_to-iobject":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-iobject.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.lookup-getter.js":[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-forced-pam":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-forced-pam.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.lookup-setter.js":[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_descriptors.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-forced-pam":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-forced-pam.js","./_object-gopd":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gopd.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js","./_to-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-object.js","./_to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-primitive.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.values.js":[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export')
  , $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_object-to-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-to-array.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.observable.js":[function(require,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export     = require('./_export')
  , global      = require('./_global')
  , core        = require('./_core')
  , microtask   = require('./_microtask')()
  , OBSERVABLE  = require('./_wks')('observable')
  , aFunction   = require('./_a-function')
  , anObject    = require('./_an-object')
  , anInstance  = require('./_an-instance')
  , redefineAll = require('./_redefine-all')
  , hide        = require('./_hide')
  , forOf       = require('./_for-of')
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

require('./_set-species')('Observable');
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_an-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-instance.js","./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_for-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_for-of.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_microtask":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_microtask.js","./_redefine-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine-all.js","./_set-species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_set-species.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.define-metadata.js":[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.delete-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.get-metadata-keys.js":[function(require,module,exports){
var Set                     = require('./es6.set')
  , from                    = require('./_array-from-iterable')
  , metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , getPrototypeOf          = require('./_object-gpo')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_array-from-iterable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_array-from-iterable.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js","./es6.set":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.set.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.get-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.get-own-metadata-keys.js":[function(require,module,exports){
var metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.get-own-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.has-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js","./_object-gpo":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_object-gpo.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.has-own-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.metadata.js":[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , aFunction                 = require('./_a-function')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"./_a-function":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_a-function.js","./_an-object":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_an-object.js","./_metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_metadata.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.set.to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json')('Set')});
},{"./_collection-to-json":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_collection-to-json.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.at.js":[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export')
  , $at     = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_string-at":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-at.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.match-all.js":[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export     = require('./_export')
  , defined     = require('./_defined')
  , toLength    = require('./_to-length')
  , isRegExp    = require('./_is-regexp')
  , getFlags    = require('./_flags')
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
},{"./_defined":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_defined.js","./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_flags":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_flags.js","./_is-regexp":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_is-regexp.js","./_iter-create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iter-create.js","./_to-length":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_to-length.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.pad-end.js":[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_string-pad":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-pad.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.pad-start.js":[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_string-pad":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-pad.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.trim-left.js":[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"./_string-trim":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-trim.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.trim-right.js":[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"./_string-trim":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_string-trim.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es7.symbol.async-iterator.js"][0].apply(exports,arguments)
},{"./_wks-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks-define.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.symbol.observable.js":[function(require,module,exports){
arguments[4]["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/modules/es7.symbol.observable.js"][0].apply(exports,arguments)
},{"./_wks-define":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks-define.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.system.global.js":[function(require,module,exports){
// https://github.com/ljharb/proposal-global
var $export = require('./_export');

$export($export.S, 'System', {global: require('./_global')});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/web.dom.iterable.js":[function(require,module,exports){
var $iterators    = require('./es6.array.iterator')
  , redefine      = require('./_redefine')
  , global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , wks           = require('./_wks')
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_hide":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_hide.js","./_iterators":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_iterators.js","./_redefine":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_redefine.js","./_wks":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_wks.js","./es6.array.iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.iterator.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/web.immediate.js":[function(require,module,exports){
var $export = require('./_export')
  , $task   = require('./_task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_task":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_task.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/web.timers.js":[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./_global')
  , $export    = require('./_export')
  , invoke     = require('./_invoke')
  , partial    = require('./_partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./_export":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_export.js","./_global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_global.js","./_invoke":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_invoke.js","./_partial":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_partial.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/shim.js":[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.umulh');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');
},{"./modules/_core":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/_core.js","./modules/es6.array.copy-within":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.copy-within.js","./modules/es6.array.every":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.every.js","./modules/es6.array.fill":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.fill.js","./modules/es6.array.filter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.filter.js","./modules/es6.array.find":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.find.js","./modules/es6.array.find-index":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.find-index.js","./modules/es6.array.for-each":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.for-each.js","./modules/es6.array.from":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.from.js","./modules/es6.array.index-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.index-of.js","./modules/es6.array.is-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.is-array.js","./modules/es6.array.iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.iterator.js","./modules/es6.array.join":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.join.js","./modules/es6.array.last-index-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.last-index-of.js","./modules/es6.array.map":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.map.js","./modules/es6.array.of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.of.js","./modules/es6.array.reduce":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.reduce.js","./modules/es6.array.reduce-right":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.reduce-right.js","./modules/es6.array.slice":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.slice.js","./modules/es6.array.some":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.some.js","./modules/es6.array.sort":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.sort.js","./modules/es6.array.species":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.array.species.js","./modules/es6.date.now":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.now.js","./modules/es6.date.to-iso-string":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.to-iso-string.js","./modules/es6.date.to-json":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.to-json.js","./modules/es6.date.to-primitive":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.to-primitive.js","./modules/es6.date.to-string":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.date.to-string.js","./modules/es6.function.bind":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.function.bind.js","./modules/es6.function.has-instance":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.function.has-instance.js","./modules/es6.function.name":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.function.name.js","./modules/es6.map":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.map.js","./modules/es6.math.acosh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.acosh.js","./modules/es6.math.asinh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.asinh.js","./modules/es6.math.atanh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.atanh.js","./modules/es6.math.cbrt":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.cbrt.js","./modules/es6.math.clz32":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.clz32.js","./modules/es6.math.cosh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.cosh.js","./modules/es6.math.expm1":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.expm1.js","./modules/es6.math.fround":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.fround.js","./modules/es6.math.hypot":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.hypot.js","./modules/es6.math.imul":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.imul.js","./modules/es6.math.log10":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.log10.js","./modules/es6.math.log1p":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.log1p.js","./modules/es6.math.log2":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.log2.js","./modules/es6.math.sign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.sign.js","./modules/es6.math.sinh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.sinh.js","./modules/es6.math.tanh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.tanh.js","./modules/es6.math.trunc":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.math.trunc.js","./modules/es6.number.constructor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.constructor.js","./modules/es6.number.epsilon":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.epsilon.js","./modules/es6.number.is-finite":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.is-finite.js","./modules/es6.number.is-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.is-integer.js","./modules/es6.number.is-nan":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.is-nan.js","./modules/es6.number.is-safe-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.is-safe-integer.js","./modules/es6.number.max-safe-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.max-safe-integer.js","./modules/es6.number.min-safe-integer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.min-safe-integer.js","./modules/es6.number.parse-float":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.parse-float.js","./modules/es6.number.parse-int":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.parse-int.js","./modules/es6.number.to-fixed":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.to-fixed.js","./modules/es6.number.to-precision":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.number.to-precision.js","./modules/es6.object.assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.assign.js","./modules/es6.object.create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.create.js","./modules/es6.object.define-properties":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.define-properties.js","./modules/es6.object.define-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.define-property.js","./modules/es6.object.freeze":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.freeze.js","./modules/es6.object.get-own-property-descriptor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.get-own-property-descriptor.js","./modules/es6.object.get-own-property-names":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.get-own-property-names.js","./modules/es6.object.get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.get-prototype-of.js","./modules/es6.object.is":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.is.js","./modules/es6.object.is-extensible":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.is-extensible.js","./modules/es6.object.is-frozen":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.is-frozen.js","./modules/es6.object.is-sealed":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.is-sealed.js","./modules/es6.object.keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.keys.js","./modules/es6.object.prevent-extensions":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.prevent-extensions.js","./modules/es6.object.seal":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.seal.js","./modules/es6.object.set-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.set-prototype-of.js","./modules/es6.object.to-string":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.object.to-string.js","./modules/es6.parse-float":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.parse-float.js","./modules/es6.parse-int":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.parse-int.js","./modules/es6.promise":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.promise.js","./modules/es6.reflect.apply":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.apply.js","./modules/es6.reflect.construct":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.construct.js","./modules/es6.reflect.define-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.define-property.js","./modules/es6.reflect.delete-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.delete-property.js","./modules/es6.reflect.enumerate":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.enumerate.js","./modules/es6.reflect.get":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.get.js","./modules/es6.reflect.get-own-property-descriptor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.get-own-property-descriptor.js","./modules/es6.reflect.get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.get-prototype-of.js","./modules/es6.reflect.has":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.has.js","./modules/es6.reflect.is-extensible":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.is-extensible.js","./modules/es6.reflect.own-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.own-keys.js","./modules/es6.reflect.prevent-extensions":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.prevent-extensions.js","./modules/es6.reflect.set":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.set.js","./modules/es6.reflect.set-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.reflect.set-prototype-of.js","./modules/es6.regexp.constructor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.constructor.js","./modules/es6.regexp.flags":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.flags.js","./modules/es6.regexp.match":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.match.js","./modules/es6.regexp.replace":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.replace.js","./modules/es6.regexp.search":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.search.js","./modules/es6.regexp.split":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.split.js","./modules/es6.regexp.to-string":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.regexp.to-string.js","./modules/es6.set":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.set.js","./modules/es6.string.anchor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.anchor.js","./modules/es6.string.big":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.big.js","./modules/es6.string.blink":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.blink.js","./modules/es6.string.bold":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.bold.js","./modules/es6.string.code-point-at":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.code-point-at.js","./modules/es6.string.ends-with":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.ends-with.js","./modules/es6.string.fixed":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.fixed.js","./modules/es6.string.fontcolor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.fontcolor.js","./modules/es6.string.fontsize":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.fontsize.js","./modules/es6.string.from-code-point":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.from-code-point.js","./modules/es6.string.includes":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.includes.js","./modules/es6.string.italics":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.italics.js","./modules/es6.string.iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.iterator.js","./modules/es6.string.link":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.link.js","./modules/es6.string.raw":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.raw.js","./modules/es6.string.repeat":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.repeat.js","./modules/es6.string.small":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.small.js","./modules/es6.string.starts-with":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.starts-with.js","./modules/es6.string.strike":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.strike.js","./modules/es6.string.sub":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.sub.js","./modules/es6.string.sup":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.sup.js","./modules/es6.string.trim":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.string.trim.js","./modules/es6.symbol":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.symbol.js","./modules/es6.typed.array-buffer":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.array-buffer.js","./modules/es6.typed.data-view":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.data-view.js","./modules/es6.typed.float32-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.float32-array.js","./modules/es6.typed.float64-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.float64-array.js","./modules/es6.typed.int16-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.int16-array.js","./modules/es6.typed.int32-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.int32-array.js","./modules/es6.typed.int8-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.int8-array.js","./modules/es6.typed.uint16-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.uint16-array.js","./modules/es6.typed.uint32-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.uint32-array.js","./modules/es6.typed.uint8-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.uint8-array.js","./modules/es6.typed.uint8-clamped-array":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.typed.uint8-clamped-array.js","./modules/es6.weak-map":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.weak-map.js","./modules/es6.weak-set":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es6.weak-set.js","./modules/es7.array.includes":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.array.includes.js","./modules/es7.asap":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.asap.js","./modules/es7.error.is-error":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.error.is-error.js","./modules/es7.map.to-json":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.map.to-json.js","./modules/es7.math.iaddh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.math.iaddh.js","./modules/es7.math.imulh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.math.imulh.js","./modules/es7.math.isubh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.math.isubh.js","./modules/es7.math.umulh":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.math.umulh.js","./modules/es7.object.define-getter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.define-getter.js","./modules/es7.object.define-setter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.define-setter.js","./modules/es7.object.entries":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.entries.js","./modules/es7.object.get-own-property-descriptors":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.get-own-property-descriptors.js","./modules/es7.object.lookup-getter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.lookup-getter.js","./modules/es7.object.lookup-setter":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.lookup-setter.js","./modules/es7.object.values":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.object.values.js","./modules/es7.observable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.observable.js","./modules/es7.reflect.define-metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.define-metadata.js","./modules/es7.reflect.delete-metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.delete-metadata.js","./modules/es7.reflect.get-metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.get-metadata.js","./modules/es7.reflect.get-metadata-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.get-metadata-keys.js","./modules/es7.reflect.get-own-metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.get-own-metadata.js","./modules/es7.reflect.get-own-metadata-keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.get-own-metadata-keys.js","./modules/es7.reflect.has-metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.has-metadata.js","./modules/es7.reflect.has-own-metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.has-own-metadata.js","./modules/es7.reflect.metadata":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.reflect.metadata.js","./modules/es7.set.to-json":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.set.to-json.js","./modules/es7.string.at":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.at.js","./modules/es7.string.match-all":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.match-all.js","./modules/es7.string.pad-end":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.pad-end.js","./modules/es7.string.pad-start":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.pad-start.js","./modules/es7.string.trim-left":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.trim-left.js","./modules/es7.string.trim-right":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.string.trim-right.js","./modules/es7.symbol.async-iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.symbol.async-iterator.js","./modules/es7.symbol.observable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.symbol.observable.js","./modules/es7.system.global":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/es7.system.global.js","./modules/web.dom.iterable":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/web.dom.iterable.js","./modules/web.immediate":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/web.immediate.js","./modules/web.timers":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/modules/web.timers.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.16.0@babel-polyfill/lib/index.js":[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"core-js/fn/regexp/escape":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/fn/regexp/escape.js","core-js/shim":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/shim.js","regenerator-runtime/runtime":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.0.9.6@regenerator-runtime/runtime.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/get-iterator.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/get-iterator.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/json/stringify.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/json/stringify.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/assign.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/assign.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/create.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/create.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/define-property.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/define-property.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-own-property-descriptor.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/get-own-property-descriptor.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/get-prototype-of.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/keys.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/keys.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/set-prototype-of.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/object/set-prototype-of.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/promise.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/promise.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/symbol.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/symbol/index.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/symbol/iterator.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.2.4.1@core-js/library/fn/symbol/iterator.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/define-property.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/extends.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/assign.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/get.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-own-property-descriptor.js","../core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/create.js","../core-js/object/set-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/set-prototype-of.js","../helpers/typeof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/typeof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/typeof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/typeof.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/symbol.js","../core-js/symbol/iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/symbol/iterator.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/app.js":[function(require,module,exports){
'use strict';

require('babel-polyfill');

var _router = require('./libs/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.APP = {};

$(function () {
	_router2.default.start();

	APP.router = _router2.default.appRouter;
}());

},{"./libs/router":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/router.js","babel-polyfill":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.16.0@babel-polyfill/lib/index.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/commons/cart-store.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LKEY = 'local-cart';

var cartStore = {
    count: function count() {
        var cart = localStorage.getItem(LKEY);
        if (cart) {
            cart = JSON.parse(cart);
            var keys = (0, _keys2.default)(cart);
            var count = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    count += cart[key].count * 1;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return count;
        }
        return 0;
    },
    get: function get() {
        var cart = localStorage.getItem(LKEY);
        if (!cart) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }
        var keys = (0, _keys2.default)(cart);
        var items = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(keys), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var key = _step2.value;

                items.push(cart[key]);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return items;
    },
    increase: function increase(item) {
        var cart = localStorage.getItem(LKEY);
        if (!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }

        if (cart[item.id]) {
            item.count = cart[item.id].count * 1 + 1;
        } else {
            item.count = 1;
        }
        cart[item.id] = item;
        localStorage.setItem(LKEY, (0, _stringify2.default)(cart));
        return true;
    },
    decrease: function decrease(item) {
        var cart = localStorage.getItem(LKEY);
        if (!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }
        if (cart[item.id]) {
            var t = cart[item.id].count * 1 - 1;
            if (t <= 0) {
                item.count = 0;
                delete cart[item.id];
            } else {
                item.count = t;
                cart[item.id] = item;
            }
            localStorage.setItem(LKEY, (0, _stringify2.default)(cart));
            return true;
        }
        return false;
    }
};

exports.default = cartStore;

},{"babel-runtime/core-js/get-iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/get-iterator.js","babel-runtime/core-js/json/stringify":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/json/stringify.js","babel-runtime/core-js/object/keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/keys.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/handler.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Handler = function () {
	function Handler(callback) {
		(0, _classCallCheck3.default)(this, Handler);

		this.callback = callback;
	}

	(0, _createClass3.default)(Handler, [{
		key: "send",
		value: function send(which, args) {
			if (this.callback) {
				this.callback(which, args);
			}
		}
	}]);
	return Handler;
}();

exports.default = Handler;

},{"babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/http.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

require('whatwg-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function __createURL(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + '__v=1';
    return url;
}

function __fetch(url, options) {
    return fetch(url, options).then(function (response) {
        return response.json();
    }).then(function (json) {
        return { data: json.result, __timestamp__: Date.now() };
    }).catch(function (ex) {
        return _promise2.default.reject({ message: ex.message, __timestamp__: Date.now() });
    });
}

function __request(method, url, params) {
    params = params || {};
    url = __createURL(url);

    var header = {};
    var query = (0, _keys2.default)(params).map(function (key) {
        return key + '=' + encodeURIComponent(params[key]);
    }).join('&');

    var opts = {
        headers: header,
        method: method
    };

    if (method === 'GET') {
        if (query) {
            url = url + '&' + query;
        }
    } else {
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        opts.body = query;
    }

    return __fetch(url, opts);
}

function __upload(method, url, params, files) {
    url = __createURL(url);

    var formData = new FormData();
    for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
            formData.append(prop, params[prop]);
        }
    }
    if (files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append(i + '-' + file.name, file);
        }
    }
    return __fetch(url, {
        method: method,
        credentials: 'include',
        body: formData
    });
}

exports.default = {
    get: function get(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return __request('GET', url, params);
    },
    delete: function _delete(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return __request('DELETE', url, params);
    },
    post: function post(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return __request('POST', url, params);
    },
    upload: function upload(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var files = arguments[2];

        return __upload('POST', url, params, files);
    },
    put: function put(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var files = arguments[2];

        return __request('PUT', url, params, files);
    }
};

},{"babel-runtime/core-js/object/keys":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/keys.js","babel-runtime/core-js/promise":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/promise.js","whatwg-fetch":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.1.1.1@whatwg-fetch/fetch.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/manager.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _transition = require('./transition');

var _transition2 = _interopRequireDefault(_transition);

var _Home = require('../views/Home');

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = [];

function getCurrentView() {
	var len = cache.length;
	if (len === 0) {
		return null;
	} else {
		return cache[len - 1].value;
	}
}

function getCacheItemByDefination(defination) {
	var result = void 0;
	for (var i = 0; i < cache.length; i++) {
		var item = cache[i];
		if (item.key === defination) {
			result = item;
			break;
		}
	}
	return result;
}

function removeModals() {
	$('.modal').remove();
}

var manager = {
	fly: function fly(defination, args) {
		removeModals();

		var len = cache.length;
		if (len === 0) {
			this.push(defination, args);
		} else {
			var cacheItem = getCacheItemByDefination(defination);
			if (!cacheItem) {
				this.push(defination, args);
			} else {
				var currentCacheItem = cache[len - 1];
				if (currentCacheItem.key === defination) {
					this.replace(defination, args);
				} else {
					if (len === 1) {
						throw new Error('cache size incorrect');
					}
					var prevCacheItem = cache[len - 2];
					if (prevCacheItem.key === defination) {
						this.pop(args);
					} else {
						this.popTo(cacheItem.key, args);
					}
				}
			}
		}
	},

	push: function push(defination, args) {
		var targetView = new defination(args);
		var currentView = getCurrentView();
		var animation = args.__animation__;

		var tran = _transition2.default.get(currentView, targetView, animation);
		if (currentView) {
			currentView.viewWillDisappear();
		}

		tran['push'](function () {
			targetView.__animation__ = args.__animation__;
			cache.push({ key: defination, value: targetView });
			targetView.viewDidAppear();
		});
	},
	replace: function replace(defination, args) {
		var len = cache.length;
		var targetView = new defination(args);
		var currentView = getCurrentView();
		var tran = _transition2.default.get(currentView, targetView);

		currentView.viewWillDisappear();

		tran['push'](function () {
			targetView.__animation__ = args.__animation__;

			currentView.remove();
			cache.splice(len - 1, 1);

			cache.push({ key: defination, value: targetView });
			targetView.viewDidAppear();
		});
	},
	pop: function pop() {
		var len = cache.length;
		var currentView = getCurrentView();
		if (!currentView) {
			throw new Error('no view to pop');
		}
		if (len <= 1) {
			throw new Error('cache size incorrect');
		}

		var cacheItem = cache[len - 2];
		var targetView = cacheItem.value;
		var animation = currentView.__animation__;

		currentView.viewWillDisappear();

		var tran = _transition2.default.get(currentView, targetView, animation);

		tran['pop'](function () {
			currentView.remove();
			cache.splice(len - 1, 1);
			targetView.viewDidAppear();
		});
	},
	popTo: function popTo(defination) {
		var cacheItem = getCacheItemByDefination(defination);
		if (!cacheItem) {
			throw new Error('target view not found');
		}
		var len = cache.length;
		var currentView = getCurrentView();
		if (!currentView) {
			throw new Error('no view to pop');
		}
		if (len <= 1) {
			throw new Error('cache size incorrect');
		}

		var targetView = cacheItem.value;
		var animation = currentView.__animation__;

		currentView.viewWillDisappear();

		var tran = _transition2.default.get(currentView, targetView, animation);

		tran['pop'](function () {
			var index = cache.indexOf(cacheItem);
			for (var i = index + 1; i < len; i++) {
				cache[i].value.remove();
			}
			cache.splice(index + 1, len - 1);
			targetView.viewDidAppear();
		});
	},
	toIndex: function toIndex() {
		var len = cache.length;
		if (len > 1) {
			cache.splice(0, len - 1);
		}
	}
};

exports.default = manager;

},{"../views/Home":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/Home.js","./transition":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/transition.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/router.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _transition = require('./transition');

var _transition2 = _interopRequireDefault(_transition);

var _routers = require('../routers');

var _routers2 = _interopRequireDefault(_routers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {
    start: function start() {
        var AppRouter = Backbone.Router.extend((0, _extends3.default)({}, _routers2.default, {
            nav: function nav(path, params, animation, trigger) {
                if (trigger === undefined) {
                    trigger = true;
                }

                params = params || {};
                params.__animation__ = animation || _transition2.default.defaultAnimation;
                this.params = params;

                this.navigate(path, { trigger: trigger });
            }
        }));

        this.appRouter = new AppRouter();

        Backbone.history.start({ pushState: true, root: '/' });
    },

    fly: function fly(view, params) {
        params = params || {};
        params.__animation__ = _transition2.default.defaultAnimation;
        (0, _assign2.default)(params, this.appRouter.params || {});

        _manager2.default.fly(view, params);
        this.appRouter.params = null;
    }
};

exports.default = router;

},{"../routers":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/routers.js","./manager":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/manager.js","./transition":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/transition.js","babel-runtime/core-js/object/assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/assign.js","babel-runtime/helpers/extends":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/extends.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/transition.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _NoneTransition = require('../plugins/transition/NoneTransition');

var _NoneTransition2 = _interopRequireDefault(_NoneTransition);

var _FadeTransition = require('../plugins/transition/FadeTransition');

var _FadeTransition2 = _interopRequireDefault(_FadeTransition);

var _SlideHorizontalTransition = require('../plugins/transition/SlideHorizontalTransition');

var _SlideHorizontalTransition2 = _interopRequireDefault(_SlideHorizontalTransition);

var _SlideVerticalTransition = require('../plugins/transition/SlideVerticalTransition');

var _SlideVerticalTransition2 = _interopRequireDefault(_SlideVerticalTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transition = {

	defaultAnimation: 'slide-h', get: function get(currentView, targetView, animation) {
		var result = void 0;

		var animationType = animation;
		if (_.isObject(animation)) {
			animationType = animation.type;
		}

		switch (animationType) {
			case 'fade':
				{
					result = new _FadeTransition2.default(currentView, targetView);
					break;
				}
			case 'slide-h':
				{
					result = new _SlideHorizontalTransition2.default(currentView, targetView);
					break;
				}
			case 'slide-v':
				{
					result = new _SlideVerticalTransition2.default(currentView, targetView);
					break;
				}
			default:
				{
					result = new _NoneTransition2.default(currentView, targetView);
					break;
				}
		}
		return result;
	}
};

exports.default = transition;

},{"../plugins/transition/FadeTransition":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/plugins/transition/FadeTransition.js","../plugins/transition/NoneTransition":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/plugins/transition/NoneTransition.js","../plugins/transition/SlideHorizontalTransition":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/plugins/transition/SlideHorizontalTransition.js","../plugins/transition/SlideVerticalTransition":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/plugins/transition/SlideVerticalTransition.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/plugins/transition/FadeTransition.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FadeTransition = function () {
    function FadeTransition(currentView, targetView) {
        (0, _classCallCheck3.default)(this, FadeTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    (0, _createClass3.default)(FadeTransition, [{
        key: 'push',
        value: function push(callback) {
            if (this.currentView) {
                this.currentView.$el.velocity('fadeOut', FadeTransition.duration);
            }

            this.targetView.render();
            this.targetView.$el.velocity('fadeIn', {
                delay: FadeTransition.duration / 4,
                duration: FadeTransition.duration,
                complete: function complete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            if (this.currentView) {
                this.currentView.$el.velocity('fadeOut', FadeTransition.duration);
            }

            this.targetView.$el.velocity('fadeIn', {
                delay: FadeTransition.duration / 4,
                duration: FadeTransition.duration,
                complete: function complete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }]);
    return FadeTransition;
}();

FadeTransition.type = 'fade';
FadeTransition.duration = 320;
exports.default = FadeTransition;

},{"babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/plugins/transition/NoneTransition.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoneTransition = function () {
    function NoneTransition(currentView, targetView) {
        (0, _classCallCheck3.default)(this, NoneTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    (0, _createClass3.default)(NoneTransition, [{
        key: 'push',
        value: function push(callback) {
            if (this.currentView) {
                this.currentView.$el.css({ display: 'none', opacity: 0 });
            }
            this.targetView.render();
            this.targetView.$el.css({ display: 'block', opacity: 1 });
            if (callback) {
                callback();
            }
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            this.currentView.$el.css({ display: 'none', opacity: 0 });
            this.targetView.$el.css({ display: 'block', opacity: 1 });
            if (callback) {
                callback();
            }
        }
    }]);
    return NoneTransition;
}();

NoneTransition.type = 'none';
exports.default = NoneTransition;

},{"babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/plugins/transition/SlideHorizontalTransition.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideHorizontalTransition = function () {
    function SlideHorizontalTransition(currentView, targetView) {
        (0, _classCallCheck3.default)(this, SlideHorizontalTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    (0, _createClass3.default)(SlideHorizontalTransition, [{
        key: 'push',
        value: function push(callback) {
            if (this.currentView) {
                this.currentView.$el.velocity('fadeOut', SlideHorizontalTransition.duration);
            }

            var delay = this.currentView ? SlideHorizontalTransition.duration / 4 : 0;

            this.targetView.render();

            this.targetView.$el.velocity('transition.slideRightIn', {
                delay: delay,
                duration: SlideHorizontalTransition.duration,
                complete: function complete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            if (this.currentView) {
                this.currentView.$el.velocity('fadeOut', SlideHorizontalTransition.duration);
            }

            var delay = this.currentView ? SlideHorizontalTransition.duration / 4 : 0;

            this.targetView.$el.velocity('transition.slideLeftIn', {
                delay: delay,
                duration: SlideHorizontalTransition.duration,
                complete: function complete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }]);
    return SlideHorizontalTransition;
}();

SlideHorizontalTransition.type = 'slide-h';
SlideHorizontalTransition.duration = 320;
exports.default = SlideHorizontalTransition;

},{"babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/plugins/transition/SlideVerticalTransition.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideVerticalTransition = function () {
    function SlideVerticalTransition(currentView, targetView) {
        (0, _classCallCheck3.default)(this, SlideVerticalTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    (0, _createClass3.default)(SlideVerticalTransition, [{
        key: 'push',
        value: function push(callback) {
            var _this = this;

            var delay = this.currentView ? SlideVerticalTransition.duration / 4 : 0;

            this.targetView.render();

            this.targetView.$el.velocity('transition.slideUpIn', {
                delay: delay,
                duration: SlideVerticalTransition.duration,
                complete: function complete() {
                    if (_this.currentView) {
                        _this.currentView.$el.css({ opacity: 0, display: 'none' });
                    }
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            var delay = this.currentView ? SlideVerticalTransition.duration / 4 : 0;
            this.targetView.$el.css({ opacity: 1, display: 'block' });

            if (this.currentView) {
                this.currentView.$el.velocity('transition.slideDownOut', {
                    delay: delay,
                    duration: SlideVerticalTransition.duration,
                    complete: function complete() {
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
        }
    }]);
    return SlideVerticalTransition;
}();

SlideVerticalTransition.type = 'slide-v';
SlideVerticalTransition.duration = 320;
exports.default = SlideVerticalTransition;

},{"babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/routers.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _router = require('./libs/router');

var _router2 = _interopRequireDefault(_router);

var _Home = require('./views/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Cart = require('./views/Cart');

var _Cart2 = _interopRequireDefault(_Cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = {

	routes: {
		'': 'toHome',
		'cart': 'toCart'
	},

	toHome: function toHome() {
		_router2.default.fly(_Home2.default);
	},
	toCart: function toCart() {
		_router2.default.fly(_Cart2.default);
	}
};

exports.default = routers;

},{"./libs/router":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/router.js","./views/Cart":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/Cart.js","./views/Home":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/Home.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/utils/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.is = exports.getParameter = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getParameter = exports.getParameter = function getParameter(name) {
	var url = location.href;
	var start = url.indexOf('?') + 1;
	if (start === 0) {
		return '';
	}
	var value = '';
	var queryString = url.substring(start);
	var paraNames = queryString.split('&');
	for (var i = 0; i < paraNames.length; i++) {
		var str = paraNames[i];
		start = str.indexOf('=');
		var parameterName = str;
		if (start !== -1) {
			parameterName = str.substring(0, start);
		}

		if (name === parameterName) {
			start = str.indexOf('=');
			if (start !== -1) {
				value = str.substring(start + 1);
			}
		}
	}
	return value;
};

var is = exports.is = {
	email: function email(str) {
		return (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(str)
		);
	},
	number: function number(str) {
		return !isNaN(parseFloat(str)) && isFinite(str);
	},
	string: function string(str) {
		return typeof str === 'string';
	},
	object: function object(str) {
		return (typeof str === 'undefined' ? 'undefined' : (0, _typeof3.default)(str)) === 'object';
	},
	integer: function integer(str) {
		return !isNaN(str) && str * 1 === parseInt(str, 10);
	},
	mobile: function mobile(str) {
		return (/^1\d{10}$/.test(str)
		);
	},
	empty: function empty(str) {
		return str === null || str === undefined || str.length === 0;
	}
};

},{"babel-runtime/helpers/typeof":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/typeof.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/Cart.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Component2 = require('./generic/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _cart = require('./tpls/cart.html');

var _cart2 = _interopRequireDefault(_cart);

var _cartStore = require('../commons/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

var _CartItem = require('./items/CartItem');

var _CartItem2 = _interopRequireDefault(_CartItem);

var _handler = require('../libs/handler');

var _handler2 = _interopRequireDefault(_handler);

var _Alert = require('./widgets/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Confirm = require('./widgets/Confirm');

var _Confirm2 = _interopRequireDefault(_Confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cart = function (_Component) {
    (0, _inherits3.default)(Cart, _Component);

    function Cart() {
        (0, _classCallCheck3.default)(this, Cart);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Cart.__proto__ || (0, _getPrototypeOf2.default)(Cart)).call(this, {
            className: 'cart-view',
            events: {
                'click .icon-back': 'onBack',
                'click .btn-buy': 'onBuy'
            }
        }));

        _this.freight = 5;

        _this.hander = new _handler2.default(_this.onMsgReceived.bind(_this));
        return _this;
    }

    (0, _createClass3.default)(Cart, [{
        key: 'viewWillDisappear',
        value: function viewWillDisappear() {}
    }, {
        key: 'viewDidAppear',
        value: function viewDidAppear() {}
    }, {
        key: 'render',
        value: function render() {
            (0, _get3.default)(Cart.prototype.__proto__ || (0, _getPrototypeOf2.default)(Cart.prototype), 'render', this).call(this);
            this.loadData();
            return this;
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            this.setup(_cartStore2.default.get());
        }
    }, {
        key: 'setup',
        value: function setup(items) {
            var productAmount = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    productAmount += item.count * item.price;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.$el.html((0, _cart2.default)({
                productAmount: productAmount,
                freight: this.freight,
                amount: productAmount + this.freight
            }));

            var $items = this.$el.find('.items');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(items), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _item = _step2.value;

                    var itemView = new _CartItem2.default(_item, this.hander);
                    $items.append(itemView.render().el);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'refreshAmounts',
        value: function refreshAmounts() {
            var items = _cartStore2.default.get();
            var productAmount = 0;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(items), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    productAmount += item.count * item.price;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var $productAmount = this.$el.find('.amount-box .product-amount');
            var $amount = this.$el.find('.footer-box .total-amount span');
            $productAmount.text(productAmount);
            $amount.text(productAmount + this.freight);
        }
    }, {
        key: 'onMsgReceived',
        value: function onMsgReceived(which, args) {
            switch (which) {
                case 1000:
                    {
                        this.refreshAmounts();
                        break;
                    }
            }
        }
    }, {
        key: 'onBack',
        value: function onBack() {
            history.go(-1);
        }
    }, {
        key: 'onBuy',
        value: function onBuy() {
            var items = _cartStore2.default.get();
            if (items.length > 0) {
                _Confirm2.default.show('Pay', {
                    content: 'Pay for this shopping, Are you sure?',
                    onDone: function onDone(index) {}
                });
            }
        }
    }]);
    return Cart;
}(_Component3.default);

exports.default = Cart;

},{"../commons/cart-store":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/commons/cart-store.js","../libs/handler":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/handler.js","./generic/Component":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/generic/Component.js","./items/CartItem":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/items/CartItem.js","./tpls/cart.html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/cart.html","./widgets/Alert":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/widgets/Alert.js","./widgets/Confirm":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/widgets/Confirm.js","babel-runtime/core-js/get-iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/get-iterator.js","babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/get":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/get.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/Home.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Component2 = require('./generic/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Infinite = require('./widgets/Infinite');

var _Infinite2 = _interopRequireDefault(_Infinite);

var _manager = require('../libs/manager');

var _manager2 = _interopRequireDefault(_manager);

var _home = require('./tpls/home.html');

var _home2 = _interopRequireDefault(_home);

var _handler = require('../libs/handler');

var _handler2 = _interopRequireDefault(_handler);

var _ProductItem = require('./items/ProductItem');

var _ProductItem2 = _interopRequireDefault(_ProductItem);

var _CartOverlay = require('./components/CartOverlay');

var _CartOverlay2 = _interopRequireDefault(_CartOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeView = function (_Component) {
    (0, _inherits3.default)(HomeView, _Component);

    function HomeView() {
        (0, _classCallCheck3.default)(this, HomeView);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HomeView.__proto__ || (0, _getPrototypeOf2.default)(HomeView)).call(this, {
            className: 'home-view',
            events: {}
        }));

        _this.hander = new _handler2.default(_this.onMsgReceived.bind(_this));

        _this.infinite = new _Infinite2.default({
            url: '/api/list',
            limit: 10,
            onDataReceived: _this.setup.bind(_this)
        });

        _this.cartOverlay = new _CartOverlay2.default();
        return _this;
    }

    (0, _createClass3.default)(HomeView, [{
        key: 'viewDidAppear',
        value: function viewDidAppear() {
            _manager2.default.toIndex();
            this.cartOverlay.refresh();
        }
    }, {
        key: 'render',
        value: function render() {
            (0, _get3.default)(HomeView.prototype.__proto__ || (0, _getPrototypeOf2.default)(HomeView.prototype), 'render', this).call(this);

            this.$el.html((0, _home2.default)());

            this.infinite.render(this.$el.find('.wrapper'));

            this.cartOverlay.render(this.$el);
            return this;
        }
    }, {
        key: 'setup',
        value: function setup(items) {
            var $items = this.$el.find('.items');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var itemView = new _ProductItem2.default(item, this.hander);
                    $items.append(itemView.render().el);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'onMsgReceived',
        value: function onMsgReceived(which, args) {
            switch (which) {
                case 1000:
                    {
                        this.cartOverlay.refresh();
                        break;
                    }
            }
        }
    }]);
    return HomeView;
}(_Component3.default);

exports.default = HomeView;

},{"../libs/handler":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/handler.js","../libs/manager":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/manager.js","./components/CartOverlay":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/components/CartOverlay.js","./generic/Component":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/generic/Component.js","./items/ProductItem":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/items/ProductItem.js","./tpls/home.html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/home.html","./widgets/Infinite":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/widgets/Infinite.js","babel-runtime/core-js/get-iterator":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/get-iterator.js","babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/get":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/get.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/components/CartOverlay.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _cartOverlay = require('../tpls/components/cart-overlay.html');

var _cartOverlay2 = _interopRequireDefault(_cartOverlay);

var _cartStore = require('../../commons/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartOverlay = function (_Backbone$View) {
    (0, _inherits3.default)(CartOverlay, _Backbone$View);

    function CartOverlay() {
        (0, _classCallCheck3.default)(this, CartOverlay);
        return (0, _possibleConstructorReturn3.default)(this, (CartOverlay.__proto__ || (0, _getPrototypeOf2.default)(CartOverlay)).call(this, {
            className: 'cart-overlay',
            events: {
                'click .inner': 'onClick'
            }
        }));
    }

    (0, _createClass3.default)(CartOverlay, [{
        key: 'render',
        value: function render($target) {
            (0, _get3.default)(CartOverlay.prototype.__proto__ || (0, _getPrototypeOf2.default)(CartOverlay.prototype), 'render', this).call(this);

            this.$el.html((0, _cartOverlay2.default)({ count: _cartStore2.default.count() }));
            $target.append(this.$el);
            return this;
        }
    }, {
        key: 'refresh',
        value: function refresh(item) {
            this.updateCount();
        }
    }, {
        key: 'updateCount',
        value: function updateCount() {
            var count = _cartStore2.default.count();
            var $count = this.$el.find('.badge');
            if (count > 9) {
                $count.text('9+');
            } else {
                $count.text(count);
            }
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            APP.router.nav('cart');
        }
    }]);
    return CartOverlay;
}(Backbone.View);

exports.default = CartOverlay;

},{"../../commons/cart-store":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/commons/cart-store.js","../tpls/components/cart-overlay.html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/components/cart-overlay.html","babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/get":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/get.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/generic/Component.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function (_Backbone$View) {
	(0, _inherits3.default)(Component, _Backbone$View);

	function Component() {
		(0, _classCallCheck3.default)(this, Component);
		return (0, _possibleConstructorReturn3.default)(this, (Component.__proto__ || (0, _getPrototypeOf2.default)(Component)).apply(this, arguments));
	}

	(0, _createClass3.default)(Component, [{
		key: 'render',
		value: function render() {
			this.$el.addClass('view');
			$('body').append(this.$el);
			return this;
		}
	}, {
		key: 'viewDidAppear',
		value: function viewDidAppear() {}
	}, {
		key: 'viewWillDisappear',
		value: function viewWillDisappear() {}
	}, {
		key: 'remove',
		value: function remove() {
			this.$el.remove();
		}
	}]);
	return Component;
}(Backbone.View);

exports.default = Component;

},{"babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/generic/Modal.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function (_Backbone$View) {
    (0, _inherits3.default)(Modal, _Backbone$View);

    function Modal(options) {
        (0, _classCallCheck3.default)(this, Modal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call(this, options));

        _this.options = (0, _assign2.default)({}, Modal.defaults, options);
        _this.render();
        return _this;
    }

    (0, _createClass3.default)(Modal, [{
        key: 'didAppear',
        value: function didAppear() {}
    }, {
        key: 'willDisappear',
        value: function willDisappear() {}
    }, {
        key: 'render',
        value: function render() {
            var $el = this.$el;
            var $modal = $(document.createElement('div'));

            $el.addClass('modal-overlay');
            $modal.addClass('modal');
            this.$el.append($modal);

            if (this.options.dismissOnBlur) {
                this.$el.on('click', this.dismiss.bind(this));
            }

            return this;
        }
    }, {
        key: 'show',
        value: function show($inner) {
            var _this2 = this;

            var $body = $('body');
            var $modal = this.$el.find('.modal');

            this.$el.show();
            $modal.html($inner);
            $body.append(this.$el);

            this.$el.velocity('transition.shrinkIn', this.options.duration, function () {
                _this2.didAppear();
            });
        }
    }, {
        key: 'dismiss',
        value: function dismiss(event) {
            var _this3 = this;

            if (event && !$(event.target).hasClass('modal')) {
                return;
            }
            this.willDisappear();
            this.$el.velocity('fadeOut', this.options.duration, function () {
                _this3.$el.remove();
            });
        }
    }]);
    return Modal;
}(Backbone.View);

Modal.defaults = {
    duration: 240,
    dismissOnBlur: false
};
exports.default = Modal;

},{"babel-runtime/core-js/object/assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/assign.js","babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/items/CartItem.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _cartItem = require('../tpls/items/cart-item.html');

var _cartItem2 = _interopRequireDefault(_cartItem);

var _cartStore = require('../../commons/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartItem = function (_Backbone$View) {
    (0, _inherits3.default)(CartItem, _Backbone$View);

    function CartItem(data, handler) {
        (0, _classCallCheck3.default)(this, CartItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CartItem.__proto__ || (0, _getPrototypeOf2.default)(CartItem)).call(this, {
            tagName: 'li',
            className: 'cart-item',
            events: {
                'click .icon-reduce': 'onReduce',
                'click .icon-add': 'onAdd'
            }
        }));

        _this.data = data;
        _this.handler = handler;
        return _this;
    }

    (0, _createClass3.default)(CartItem, [{
        key: 'render',
        value: function render() {
            this.$el.html((0, _cartItem2.default)(this.data));
            return this;
        }
    }, {
        key: 'onReduce',
        value: function onReduce() {
            var count = this.data.count;
            if (count - 1 < 0) {
                return;
            }

            var result = _cartStore2.default.decrease(this.data);
            if (result) {
                this.$el.find('.action .options .total span').text(this.data.count);
            }
            this.handler.send(1000);
        }
    }, {
        key: 'onAdd',
        value: function onAdd() {
            var result = _cartStore2.default.increase(this.data);
            if (result) {
                this.$el.find('.action .options .total span').text(this.data.count);
            }
            this.handler.send(1000);
        }
    }]);
    return CartItem;
}(Backbone.View);

exports.default = CartItem;

},{"../../commons/cart-store":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/commons/cart-store.js","../tpls/items/cart-item.html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/items/cart-item.html","babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/items/ProductItem.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _productItem = require('../tpls/items/product-item.html');

var _productItem2 = _interopRequireDefault(_productItem);

var _cartStore = require('../../commons/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductItem = function (_Backbone$View) {
    (0, _inherits3.default)(ProductItem, _Backbone$View);

    function ProductItem(data, handler) {
        (0, _classCallCheck3.default)(this, ProductItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProductItem.__proto__ || (0, _getPrototypeOf2.default)(ProductItem)).call(this, {
            tagName: 'li',
            className: 'product-item',
            events: {
                'click .icon-reduce': 'onReduce',
                'click .icon-add': 'onAdd'
            }
        }));

        _this.data = data;
        _this.handler = handler;
        return _this;
    }

    (0, _createClass3.default)(ProductItem, [{
        key: 'render',
        value: function render() {
            this.$el.html((0, _productItem2.default)(this.data));
            return this;
        }
    }, {
        key: 'onReduce',
        value: function onReduce() {
            var result = _cartStore2.default.decrease(this.data);
            if (result) {
                this.handler.send(1000);
            }
        }
    }, {
        key: 'onAdd',
        value: function onAdd() {
            var result = _cartStore2.default.increase(this.data);
            if (result) {
                this.handler.send(1000);
            }
        }
    }]);
    return ProductItem;
}(Backbone.View);

exports.default = ProductItem;

},{"../../commons/cart-store":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/commons/cart-store.js","../tpls/items/product-item.html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/items/product-item.html","babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/cart.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="wrapper">\n\t<div class="title-bar">\n\t\t<i class="iconfont icon-back"/>\n\t\t<div class="title">Shopping Cart</div>\n\t</div>\n\n\t<div class="user-box">\n\t\t<div class="avatar" style="background-image: url(/static/icons/avatar.jpg);"></div>\n\t\t<div class="name">Fedor.Jia</div>\n\t</div>\n\n\t';
 if(productAmount > 0) { 
__p+='\n\t\t<ul class="items"></ul>\n\n\t\t<ul class="amount-box">\n\t\t\t<li>\n\t\t\t\t<div class="label">Product Amount</div>\n\t\t\t\t<div class="value product-amount">$ '+
((__t=(productAmount))==null?'':__t)+
'</div>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t<div class="label">Freight</div>\n\t\t\t\t<div class="value">$ '+
((__t=(freight))==null?'':__t)+
'</div>\n\t\t\t</li>\n\t\t</ul>\n\t';
 } else { 
__p+='\n\t\t<div class="empty-tip">Nothing ...</div>\n\t';
 } 
__p+='\n</div>\n\n';
 if(productAmount > 0) { 
__p+='\n<div class="footer-box">\n\t<div class="total-amount">Total Amount: $ <span>'+
((__t=(amount))==null?'':__t)+
'</span></div>\n\t<div class="btn-buy">Pay</div>\n</div>\n';
 } 
__p+='\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/components/cart-overlay.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="inner">\n    <i class="iconfont icon-cart"/>\n    <div class="badge">'+
((__t=(count))==null?'':__t)+
'</div>\n</div>\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/home.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="wrapper">\n    <ul class="items"></ul>\n</div>\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/items/cart-item.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="inner">\n    <div class="thumbnail" style="background-image: url('+
((__t=(thumbnail))==null?'':__t)+
');"></div>\n    <div class="info">\n        <div class="name">'+
((__t=(title))==null?'':__t)+
'</div>\n\n        <div class="action">\n            <div class="price">\n                <span class="unit">$</span>\n                <span class="text">'+
((__t=(price))==null?'':__t)+
'</span>\n            </div>\n            <div class="options">\n                <div class="option iconfont icon-reduce"></div>\n                <div class="total">x <span>'+
((__t=(count))==null?'':__t)+
'</span></div>\n                <div class="option iconfont icon-add" style="margin-top: 6px;"></div>\n            </div>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/items/product-item.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="item-inner">\n    <div class="thumbnail cover" style="background-image:url('+
((__t=(thumbnail))==null?'':__t)+
')"></div>\n    <div class="name">'+
((__t=(title))==null?'':__t)+
'</div>\n\n    <div class="footer-box">\n        <div class="price">\n            <span class="unit">$</span>\n            <span class="text">'+
((__t=(price))==null?'':__t)+
'</span>\n        </div>\n        <div class="options">\n            <div class="option iconfont icon-reduce"></div>\n            <div class="option iconfont icon-add" style="margin-top: 4px;"></div>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/widgets/alert.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="inner">\n    <div class="title">'+
((__t=(title))==null?'':__t)+
'</div>\n    <div class="content">'+
((__t=(content))==null?'':__t)+
'</div>\n    <div class="buttons">\n        <div class="button button-clear">'+
((__t=(buttonText))==null?'':__t)+
'</div>\n    </div>\n</div>\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/widgets/confirm.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="inner">\n    <div class="title">'+
((__t=(title))==null?'':__t)+
'</div>\n    <div class="content">'+
((__t=(content))==null?'':__t)+
'</div>\n    <div class="buttons">\n        <div class="button-cancel button button-clear">'+
((__t=(cancelText))==null?'':__t)+
'</div>\n        <div class="button-confirm button button-clear">'+
((__t=(confirmText))==null?'':__t)+
'</div>\n    </div>\n</div>\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/widgets/Alert.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Modal2 = require('../generic/Modal');

var _Modal3 = _interopRequireDefault(_Modal2);

var _alert = require('../tpls/widgets/alert.html');

var _alert2 = _interopRequireDefault(_alert);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    show: function show(title, options) {
        options = options || {};
        options.title = title;

        new AlertModal(options).show();
    }
};

var AlertModal = function (_Modal) {
    (0, _inherits3.default)(AlertModal, _Modal);

    function AlertModal(options) {
        (0, _classCallCheck3.default)(this, AlertModal);

        options.className = 'ui-alert';
        options.events = {
            'click .button': 'onClick'
        };
        return (0, _possibleConstructorReturn3.default)(this, (AlertModal.__proto__ || (0, _getPrototypeOf2.default)(AlertModal)).call(this, (0, _assign2.default)({}, AlertModal.defaults, options)));
    }

    (0, _createClass3.default)(AlertModal, [{
        key: 'show',
        value: function show() {
            (0, _get3.default)(AlertModal.prototype.__proto__ || (0, _getPrototypeOf2.default)(AlertModal.prototype), 'show', this).call(this, (0, _alert2.default)({
                title: this.options.title,
                content: this.options.content,
                buttonText: this.options.buttonText
            }));
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            this.dismiss();
            if (this.options.onDone) {
                this.options.onDone();
            }
        }
    }]);
    return AlertModal;
}(_Modal3.default);

AlertModal.defaults = {
    dismissOnBlur: false,
    buttonText: 'OK',
    onDone: null
};

},{"../../utils":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/utils/index.js","../generic/Modal":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/generic/Modal.js","../tpls/widgets/alert.html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/widgets/alert.html","babel-runtime/core-js/object/assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/assign.js","babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/get":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/get.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/widgets/Confirm.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Modal2 = require('../generic/Modal');

var _Modal3 = _interopRequireDefault(_Modal2);

var _confirm = require('../tpls/widgets/confirm.html');

var _confirm2 = _interopRequireDefault(_confirm);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    show: function show(title, options) {
        options = options || {};
        options.title = title;

        new ComfirmModal(options).show();
    }
};

var ComfirmModal = function (_Modal) {
    (0, _inherits3.default)(ComfirmModal, _Modal);

    function ComfirmModal(options) {
        (0, _classCallCheck3.default)(this, ComfirmModal);

        options.className = 'ui-confirm';
        options.events = {
            'click .button-cancel': 'onCancel',
            'click .button-confirm': 'onConfirm'
        };
        return (0, _possibleConstructorReturn3.default)(this, (ComfirmModal.__proto__ || (0, _getPrototypeOf2.default)(ComfirmModal)).call(this, (0, _assign2.default)({}, ComfirmModal.defaults, options)));
    }

    (0, _createClass3.default)(ComfirmModal, [{
        key: 'show',
        value: function show() {
            (0, _get3.default)(ComfirmModal.prototype.__proto__ || (0, _getPrototypeOf2.default)(ComfirmModal.prototype), 'show', this).call(this, (0, _confirm2.default)({
                title: this.options.title,
                content: this.options.content,
                confirmText: this.options.confirmText,
                cancelText: this.options.cancelText
            }));
        }
    }, {
        key: 'onCancel',
        value: function onCancel() {
            this.dismiss();
            if (this.options.onDone) {
                this.options.onDone(0);
            }
        }
    }, {
        key: 'onConfirm',
        value: function onConfirm() {
            this.dismiss();
            if (this.options.onDone) {
                this.options.onDone(1);
            }
        }
    }]);
    return ComfirmModal;
}(_Modal3.default);

ComfirmModal.defaults = {
    dismissOnBlur: false,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onDone: null
};

},{"../../utils":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/utils/index.js","../generic/Modal":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/generic/Modal.js","../tpls/widgets/confirm.html":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/tpls/widgets/confirm.html","babel-runtime/core-js/object/assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/assign.js","babel-runtime/core-js/object/get-prototype-of":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/get-prototype-of.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js","babel-runtime/helpers/get":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/get.js","babel-runtime/helpers/inherits":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/inherits.js","babel-runtime/helpers/possibleConstructorReturn":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/possibleConstructorReturn.js"}],"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/views/widgets/Infinite.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require('../../libs/http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Infinite = function () {
    function Infinite(options) {
        (0, _classCallCheck3.default)(this, Infinite);

        var defaults = {
            url: '',
            autoScroll: true,
            limit: 20,
            delay: 500,
            params: {},
            footerLoadingText: 'Loading...',
            footerMoreText: 'Load More',
            footerClickText: 'Click To Load More'
        };
        options = (0, _assign2.default)({}, defaults, options);

        if (!options.url) {
            throw new Error('must set url to infinite');
        }

        this.skip = 0;
        this.isBusy = false;
        this.isCompleted = false;
        this.options = options;
    }

    (0, _createClass3.default)(Infinite, [{
        key: 'render',
        value: function render(target) {
            target.addClass('infinite');

            this.loadMoreBar = new LoadMoreBar({
                footerLoadingText: this.options.footerLoadingText,
                footerMoreText: this.options.footerMoreText,
                footerClickText: this.options.footerClickText,
                onClick: this.load.bind(this)
            });
            this.loadMoreBar.render(target);

            if (this.options.autoScroll) {
                target.scroll(this.onScroll.bind(this));
            }

            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            var params = this.options.params || {};
            params.skip = this.skip;
            params.limit = this.options.limit;

            this.isBusy = true;
            this.loadMoreBar.loading();

            _http2.default.get(this.options.url, params).then(function (resp) {
                var items = resp.data;
                if (items.length < _this.options.limit) {
                    _this.loadMoreBar.hide();
                    _this.isCompleted = true;
                } else {
                    _this.loadMoreBar.reset();

                    _this.skip = items[items.length - 1].id;
                }

                if (_this.options.onDataReceived) {
                    _this.options.onDataReceived(items);
                }

                _this.isBusy = false;
            }).catch(function (err) {
                _this.loadMoreBar.tip();
                _this.isBusy = false;
            });
        }
    }, {
        key: 'onScroll',
        value: function onScroll(e) {
            var _this2 = this;

            var $target = $(e.target);
            if ($target.scrollTop() + $target.height() >= $target.prop('scrollHeight') && !this.isBusy && !this.isCompleted) {
                this.loadMoreBar.loading();

                setTimeout(function () {
                    _this2.load();
                }, this.delay);
            }
        }
    }]);
    return Infinite;
}();

var LoadMoreBar = function () {
    function LoadMoreBar(options) {
        (0, _classCallCheck3.default)(this, LoadMoreBar);

        this.footerLoadingText = options.footerLoadingText;
        this.footerMoreText = options.footerMoreText;
        this.footerClickText = options.footerClickText;

        this.onClick = options.onClick;
    }

    (0, _createClass3.default)(LoadMoreBar, [{
        key: 'render',
        value: function render(parentEl) {
            this.$el = $(document.createElement('div'));
            this.$el.addClass('load-more-bar').html('\n            <i class="spinner iconfont icon-loading"/>&nbsp;\n            <div class="text">&nbsp;</div>\n        ');
            parentEl.append(this.$el);

            this.hide();

            this.$el.click(this.onClick);
            return this;
        }
    }, {
        key: 'loading',
        value: function loading() {
            this.$el.show();
            this.$el.find('.spinner').show();
            this.$el.find('.text').text(this.footerLoadingText);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$el.find('.text').text(this.footerMoreText);
            this.$el.hide();
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.$el.show();
            this.$el.find('.spinner').hide();
            this.$el.find('.text').text(this.footerMoreText);
        }
    }, {
        key: 'tip',
        value: function tip() {
            this.$el.show();
            this.$el.find('.spinner').hide();
            this.$el.find('.text').text(this.footerClickText);
        }
    }]);
    return LoadMoreBar;
}();

exports.default = Infinite;

},{"../../libs/http":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/libs/http.js","babel-runtime/core-js/object/assign":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/core-js/object/assign.js","babel-runtime/helpers/classCallCheck":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/classCallCheck.js","babel-runtime/helpers/createClass":"/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/node_modules/.6.18.0@babel-runtime/helpers/createClass.js"}]},{},["/Users/fedor/works/private/github/backbone-spa-mobile-boilerplate/webapp/src/app.js"]);
