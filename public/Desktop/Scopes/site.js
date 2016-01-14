/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = greet;
	
	__webpack_require__(28);
	
	function greet() {
	  return 'Hello World';
	}

/***/ },

/***/ 28:
/***/ function(module, exports) {

	"use strict";
	
	/*!
	 * @project $M - Predators Module Management System
	 * @requires jQuery (window.jQuery)
	 * @version 0.0.1
	 * @date Thu Jan 14 2016 17:19:08 GMT+0100 (W. Europe Standard Time)
	**/
	!function (window, jQuery) {
	  "use strict";
	  function isString(input) {
	    return "string" === jQuery.type(input);
	  }function isFunction(input) {
	    return jQuery.isFunction(input);
	  }var reject = function reject(reason) {
	    var deferred = jQuery.Deferred();return setTimeout(function () {
	      deferred.reject(reason);
	    }, 0), deferred.promise();
	  },
	      resolve = function resolve() {
	    return jQuery.when.apply(jQuery, arguments);
	  },
	      ModuleScope = (function () {
	    function Component(id, definition) {
	      this.id = id, this.definition = definition;
	    }return Component;
	  }(), function () {
	    function ModuleScope() {}return ModuleScope;
	  }()),
	      Module = function () {
	    function Module(id, factory) {
	      this.id = id, this.factory = factory, this.scope = new ModuleScope();
	    }return Module.prototype.toString = function () {
	      return this.id;
	    }, Module.isModule = function (value) {
	      return value instanceof Module;
	    }, Module;
	  }(),
	      $M = function () {
	    function $M() {
	      this._YTOS_READY_EVENT_ = "yTosReady", this._INJECTOR_MODULES_CONTAINER_ = {}, this._INJECTOR_COMPONENTS_CONTAINER_ = {};
	    }return $M.prototype.get = function (id) {
	      var _this = this,
	          deferred = jQuery.Deferred();return window.setTimeout(function () {
	        return isString(id) ? _this.hasSync(id) ? deferred.resolve(_this._INJECTOR_MODULES_CONTAINER_[id]) : deferred.reject("$M unknown module " + id) : deferred.reject("$M.get, first param must be a string");
	      }), deferred.promise();
	    }, $M.prototype.inspect = function (module) {
	      var promise = reject("$M.inspect unknown " + module + ", param must be a string or a Module");return isString(module) && (promise = this.get((module || "").toString())), Module.isModule(module) && (promise = resolve(module)), promise.then(function (module) {
	        return module.scope;
	      });
	    }, $M.prototype.set = function (id, factory) {
	      if (!isString(id)) throw Error("$M.set, first param must be a string");if (!isFunction(factory)) throw Error("$M.set, second param must be a function");if (this.hasSync(id)) throw Error("$M.set " + id + " alredy exists");return this._INJECTOR_MODULES_CONTAINER_[id] = new Module(id, factory), this;
	    }, $M.prototype.hasSync = function (id) {
	      return this._INJECTOR_MODULES_CONTAINER_.hasOwnProperty(id);
	    }, $M.prototype.has = function (id) {
	      return this.hasSync(id) ? resolve() : reject();
	    }, $M.prototype.runModules = function (modules) {
	      for (var promises = [], i = 0; i < modules.length; i++) {
	        var module = modules[i];promises.push(this.runModule(module));
	      }return resolve.apply(jQuery, promises);
	    }, $M.prototype.runModule = function (module) {
	      var promise = reject("$M.runModule unknown " + module + ", param must be a string or a Module");return isString(module) && (promise = this.get((module || "").toString())), Module.isModule(module) && (promise = resolve(module)), promise.then(function (module) {
	        var failure,
	            deferred = jQuery.Deferred();try {
	          module.factory.call(module.scope, jQuery);
	        } catch (error) {
	          failure = error;
	        }return window.setTimeout(function () {
	          failure ? deferred.reject(failure) : deferred.resolve(module);
	        }, 0), deferred.promise();
	      });
	    }, $M.prototype.yTosReady = function (module) {
	      var _this = this,
	          deferred = jQuery.Deferred();return jQuery(document).on(this._YTOS_READY_EVENT_, function () {
	        deferred.resolve(module && _this.runModule(module));
	      }), deferred.promise();
	    }, $M;
	  }(),
	      $MInjector = new $M();Object.defineProperty ? Object.defineProperty(window, "$M", { "value": $MInjector, "writable": !1, "enumerable": !0, "configurable": !1 }) : window.$M = $MInjector;
	}(window, window.jQuery);

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmNmYTg2Yjk0ZDcyNDQxZTU4N2E/NzFhMCoqKioqKioqKioqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vL0M6L3Byb2plY3RzL3RkZC1wcm9qZWN0L3NyYy9EZXNrdG9wL1Njb3Blcy9zaXRlLmpzIiwid2VicGFjazovLy8vc291cmNlL3ByZWRhdG9ycy1lczYtaW5qZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkNwQ3dCLEtBQUs7Ozs7QUFBZCxVQUFTLEtBQUssR0FBRztBQUM5QixVQUFPLGFBQWEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztFQ0VwQixVQUFVLFFBQVE7QUFDckIsZUFDQztBQUFTLHFCQUFTO0FBQ2YsWUFBOEIsYUFBdkIsT0FBTyxLQUFLO0lBRWQsb0JBQVc7QUFDVCxtQkFBTyxXQUFXO0lBRXpCLGFBQVMsZ0JBQVU7QUFDZixvQkFBVyxPQUFPLFVBSXRCLENBSEEsa0JBQVc7QUFDUCxnQkFBUyxPQUFPO1FBQ2pCLElBQ0ksU0FBUzs7T0FFaEIsVUFBVTtBQUNILG1CQUFPLEtBQUssTUFBTSxRQUFROztPQVNqQyxlQVBZO0FBQ0gsd0JBQVUsSUFBSTtBQUNuQixZQUFLLEtBQUssSUFDVixLQUFLLGFBQWE7TUFFZjtRQUVPO0FBQ0wsOEJBRUY7O09BRVAsU0FBUztBQUNBLHFCQUFPLElBQUk7QUFDaEIsWUFBSyxLQUFLLElBQ1YsS0FBSyxVQUFVLFNBQ2YsS0FBSyxRQUFZO01BUXJCLGNBTk8sVUFBVSxXQUFXO0FBQ2pCLG1CQUFLO1FBRWhCLE9BQU8sV0FBVyxVQUFVO0FBQ2pCLG1CQUFpQjtRQUVyQjs7T0FFUCxLQUFLO0FBQ0k7QUFDTCxZQUFLLHFCQUFxQixhQUMxQixLQUFLLG1DQUNMLEtBQUs7TUEwRlQsVUF4RkcsVUFBVSxNQUFNLFVBQVU7QUFDckIsbUJBQVE7V0FDUixXQUFXLE9BQU8sVUFVdEIsQ0FUQSxjQUFPLFdBQVc7QUFDVCx5QkFBUyxNQUdWLE1BQU0sUUFBUSxNQUNQLFNBQVMsUUFBUSxNQUFNLDZCQUE2QixPQUV4RCxTQUFTLE9BQU8sdUJBQXVCLE1BTG5DLFNBQVMsT0FBTztXQU94QixTQUFTO1FBRXBCLEdBQUcsVUFBVSxVQUFVLFVBQVU7QUFDekIscUJBQVUsT0FBTyx3QkFBd0IsU0FBUyx1Q0FPdEQsQ0FOSSxnQkFBUyxZQUNULFVBQVUsS0FBSyxLQUFLLFVBQVUsSUFBSSxjQUVsQyxPQUFPLFNBQVMsWUFDaEIsVUFBVSxRQUFRLFVBRWYsUUFDRixLQUFLLFVBQVU7QUFBaUIsdUJBQU87O1FBRWhELEdBQUcsVUFBVSxNQUFNLFVBQVUsSUFBSTtBQUM3QixZQUFLLFNBQVMsS0FDSixZQUFNLHVDQUVoQixNQUFLLFdBQVcsVUFDTixZQUFNLDBDQUVoQixLQUFJLEtBQUssUUFBUSxLQUNQLFlBQU0sWUFBWSxLQUFLLGlCQUdqQyxDQURBLFlBQUssNkJBQTZCLE1BQVUsV0FBTyxJQUFJLFVBQ2hEO1FBRVgsR0FBRyxVQUFVLFVBQVUsVUFBVTtBQUN0QixtQkFBSyw2QkFBNkIsZUFBZTtRQUU1RCxHQUFHLFVBQVUsTUFBTSxVQUFVO0FBQ2xCLG1CQUFLLFFBQVEsTUFBTSxZQUFZO1FBRTFDLEdBQUcsVUFBVSxhQUFhLFVBQVU7QUFFaEMsWUFBSyxtQkFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLFFBQVEsS0FBSztBQUNqQyxzQkFBUyxRQUFRLEVBQ3JCLFVBQVMsS0FBSyxLQUFLLFVBQVU7UUFFMUIsZUFBUSxNQUFNLFFBQVE7UUFFakMsR0FBRyxVQUFVLFlBQVksVUFBVTtBQUMzQixxQkFBVSxPQUFPLDBCQUEwQixTQUFTLHVDQU94RCxDQU5JLGdCQUFTLFlBQ1QsVUFBVSxLQUFLLEtBQUssVUFBVSxJQUFJLGNBRWxDLE9BQU8sU0FBUyxZQUNoQixVQUFVLFFBQVEsVUFFZixRQUNGLEtBQUssVUFBVTtBQUNaO2FBQVMsV0FBVyxPQUFPLFVBQy9CO0FBQ0ksa0JBQU8sUUFBUSxLQUFLLE9BQU8sT0FBTztVQUV0QyxRQUFPO0FBQ0gscUJBQVU7VUFVZCxjQVJPLFdBQVc7QUFDVixxQkFDQSxTQUFTLE9BQU8sV0FHaEIsU0FBUyxRQUFRO1lBRXRCLElBQ0ksU0FBUzs7UUFHeEIsR0FBRyxVQUFVLFlBQVksVUFBVTtBQUMzQixtQkFBUTtXQUNSLFdBQVcsT0FBTyxVQUl0QixDQUhBLGNBQU8sVUFBVSxHQUFHLEtBQUssb0JBQW9CO0FBQ3pDLGtCQUFTLFFBQVEsVUFBVSxNQUFNLFVBQVU7V0FFeEMsU0FBUztRQUViOztPQUVQLGFBQWlCLE1BQ2pCLFVBQU8saUJBQ1AsT0FBTyxlQUFlLFFBQVEsUUFDMUIsU0FBTyxZQUNQLGFBQVUsR0FDVixlQUFZLEdBQ1osaUJBQWMsT0FJbEIsT0FBTyxLQUFLO0dBR2IsUUFBUSxPQUFPLFEiLCJmaWxlIjoiRGVza3RvcFxcU2NvcGVzXFxzaXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2Y2ZhODZiOTRkNzI0NDFlNTg3YVxuICoqLyIsImltcG9ydCBcIm5wbS9wcmVkYXRvcnMvaW5qZWN0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JlZXQoKSB7XG4gIHJldHVybiAnSGVsbG8gV29ybGQnO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovcHJvamVjdHMvdGRkLXByb2plY3Qvc3JjL0Rlc2t0b3AvU2NvcGVzL3NpdGUuanNcbiAqKi8iLCIvKiFcbiAqIEBwcm9qZWN0ICRNIC0gUHJlZGF0b3JzIE1vZHVsZSBNYW5hZ2VtZW50IFN5c3RlbVxuICogQHJlcXVpcmVzIGpRdWVyeSAod2luZG93LmpRdWVyeSlcbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBAZGF0ZSBUaHUgSmFuIDE0IDIwMTYgMTc6MTk6MDggR01UKzAxMDAgKFcuIEV1cm9wZSBTdGFuZGFyZCBUaW1lKVxuKiovKGZ1bmN0aW9uKHdpbmRvdywgalF1ZXJ5KXtcbid1c2Ugc3RyaWN0J1xuO2Z1bmN0aW9uIGlzU3RyaW5nKGlucHV0KSB7XHJcbiAgICByZXR1cm4galF1ZXJ5LnR5cGUoaW5wdXQpID09PSAnc3RyaW5nJztcclxufVxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGlucHV0KSB7XHJcbiAgICByZXR1cm4galF1ZXJ5LmlzRnVuY3Rpb24oaW5wdXQpO1xyXG59XHJcbnZhciByZWplY3QgPSBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pO1xyXG4gICAgfSwgMCk7XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59O1xyXG52YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBqUXVlcnkud2hlbi5hcHBseShqUXVlcnksIGFyZ3VtZW50cyk7XHJcbn07XHJcbnZhciBDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KGlkLCBkZWZpbml0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ29tcG9uZW50O1xyXG59KSgpO1xyXG52YXIgTW9kdWxlU2NvcGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTW9kdWxlU2NvcGUoKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTW9kdWxlU2NvcGU7XHJcbn0pKCk7XHJcbnZhciBNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTW9kdWxlKGlkLCBmYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IGZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5zY29wZSA9IG5ldyBNb2R1bGVTY29wZSgpO1xyXG4gICAgfVxyXG4gICAgTW9kdWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH07XHJcbiAgICBNb2R1bGUuaXNNb2R1bGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBNb2R1bGU7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1vZHVsZTtcclxufSkoKTtcclxudmFyICRNID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uICRNKCkge1xyXG4gICAgICAgIHRoaXMuX1lUT1NfUkVBRFlfRVZFTlRfID0gJ3lUb3NSZWFkeSc7XHJcbiAgICAgICAgdGhpcy5fSU5KRUNUT1JfTU9EVUxFU19DT05UQUlORVJfID0ge307XHJcbiAgICAgICAgdGhpcy5fSU5KRUNUT1JfQ09NUE9ORU5UU19DT05UQUlORVJfID0ge307XHJcbiAgICB9XHJcbiAgICAkTS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNTdHJpbmcoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVqZWN0KFwiJE0uZ2V0LCBmaXJzdCBwYXJhbSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5oYXNTeW5jKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoX3RoaXMuX0lOSkVDVE9SX01PRFVMRVNfQ09OVEFJTkVSX1tpZF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5yZWplY3QoXCIkTSB1bmtub3duIG1vZHVsZSBcIiArIGlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gcmVqZWN0KFwiJE0uaW5zcGVjdCB1bmtub3duIFwiICsgbW9kdWxlICsgXCIsIHBhcmFtIG11c3QgYmUgYSBzdHJpbmcgb3IgYSBNb2R1bGVcIik7XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKG1vZHVsZSkpIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuZ2V0KChtb2R1bGUgfHwgJycpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTW9kdWxlLmlzTW9kdWxlKG1vZHVsZSkpIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHJlc29sdmUobW9kdWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2VcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1vZHVsZSkgeyByZXR1cm4gbW9kdWxlLnNjb3BlOyB9KTtcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGlkLCBmYWN0b3J5KSB7XHJcbiAgICAgICAgaWYgKCFpc1N0cmluZyhpZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCIkTS5zZXQsIGZpcnN0IHBhcmFtIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNGdW5jdGlvbihmYWN0b3J5KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIiRNLnNldCwgc2Vjb25kIHBhcmFtIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzU3luYyhpZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCIkTS5zZXQgXCIgKyBpZCArIFwiIGFscmVkeSBleGlzdHNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0lOSkVDVE9SX01PRFVMRVNfQ09OVEFJTkVSX1tpZF0gPSBuZXcgTW9kdWxlKGlkLCBmYWN0b3J5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUuaGFzU3luYyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9JTkpFQ1RPUl9NT0RVTEVTX0NPTlRBSU5FUl8uaGFzT3duUHJvcGVydHkoaWQpO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNTeW5jKGlkKSA/IHJlc29sdmUoKSA6IHJlamVjdCgpO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5ydW5Nb2R1bGVzID0gZnVuY3Rpb24gKG1vZHVsZXMpIHtcclxuICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG1vZHVsZSA9IG1vZHVsZXNbaV07XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5ydW5Nb2R1bGUobW9kdWxlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNvbHZlLmFwcGx5KGpRdWVyeSwgcHJvbWlzZXMpO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5ydW5Nb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSByZWplY3QoXCIkTS5ydW5Nb2R1bGUgdW5rbm93biBcIiArIG1vZHVsZSArIFwiLCBwYXJhbSBtdXN0IGJlIGEgc3RyaW5nIG9yIGEgTW9kdWxlXCIpO1xyXG4gICAgICAgIGlmIChpc1N0cmluZyhtb2R1bGUpKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLmdldCgobW9kdWxlIHx8ICcnKS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1vZHVsZS5pc01vZHVsZShtb2R1bGUpKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSByZXNvbHZlKG1vZHVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICAgICAgdmFyIGZhaWx1cmUsIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBtb2R1bGUuZmFjdG9yeS5jYWxsKG1vZHVsZS5zY29wZSwgalF1ZXJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGZhaWx1cmUgPSBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmFpbHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobW9kdWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgJE0ucHJvdG90eXBlLnlUb3NSZWFkeSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGpRdWVyeShkb2N1bWVudCkub24odGhpcy5fWVRPU19SRUFEWV9FVkVOVF8sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShtb2R1bGUgJiYgX3RoaXMucnVuTW9kdWxlKG1vZHVsZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuICRNO1xyXG59KSgpO1xyXG52YXIgJE1JbmplY3RvciA9IG5ldyAkTSgpO1xyXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCAnJE0nLCB7XHJcbiAgICAgICAgdmFsdWU6ICRNSW5qZWN0b3IsXHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICB3aW5kb3cuJE0gPSAkTUluamVjdG9yO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWRhdG9ycy1lczYtaW5qZWN0b3IuanMubWFwXG59KSh3aW5kb3csIHdpbmRvdy5qUXVlcnkpXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wcmVkYXRvcnMtZXM2LWluamVjdG9yLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==