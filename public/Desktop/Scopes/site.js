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
	 * @date Wed Dec 23 2015 17:44:52 GMT+0100 (W. Europe Standard Time)
	 **/
	!function (window, jQuery) {
	  "use strict";

	  function isString(input) {
	    return "string" === jQuery.type(input);
	  }

	  function isFunction(input) {
	    return jQuery.isFunction(input);
	  }

	  var reject = function reject(reason) {
	    return jQuery.Deferred().reject(reason);
	  },
	      resolve = jQuery.when,
	      Component = function () {
	    function Component(id, definition) {
	      this.id = id, this.definition = definition;
	    }

	    return Component;
	  }(),
	      Module = function () {
	    function Module(id, factory) {
	      this.id = id, this.factory = factory, this.scope = {};
	    }

	    return Module.prototype.toString = function () {
	      return this.id;
	    }, Module.isModule = function (value) {
	      return value instanceof Module;
	    }, Module;
	  }(),
	      $M = function () {
	    function $M() {
	      this._YTOS_READY_EVENT_ = "yTosReady", this._INJECTOR_MODULES_CONTAINER_ = {}, this._INJECTOR_COMPONENTS_CONTAINER_ = {};
	    }

	    return $M.prototype.getModule = function (id) {
	      var _this = this;
	      return isString(id) ? this.hasModule(id).then(function () {
	        return _this._INJECTOR_MODULES_CONTAINER_[id];
	      }).fail(function () {
	        return reject("$M unknown module " + id);
	      }) : reject("$M.getModule, first param must be a string");
	    }, $M.prototype.inspectModule = function (module) {
	      var promise = reject("$M.inspectModule unknown " + module + ", param must be a string or a Module");
	      return isString(module) && (promise = this.getModule(module.toString())), Module.isModule(module) && (promise = resolve(module)), promise.then(function (module) {
	        return module.scope;
	      });
	    }, $M.prototype.setModule = function (id, factory) {
	      if (!isString(id)) throw Error("$M.setModule, first param must be a string");
	      if (!isFunction(id)) throw Error("$M.setModule, second param must be a function");
	      if (this.hasModuleSync(id)) throw Error("$M.setModule " + id + " alredy exists");
	      return this._INJECTOR_MODULES_CONTAINER_[id] = new Module(id, factory), this;
	    }, $M.prototype.hasModuleSync = function (id) {
	      return this._INJECTOR_MODULES_CONTAINER_.hasOwnProperty(id);
	    }, $M.prototype.hasModule = function (id) {
	      return this.hasModuleSync(id) ? resolve() : reject();
	    }, $M.prototype.runModules = function (modules) {
	      for (var promises = [], i = 0; i < modules.length; i++) {
	        var module = modules[i];
	        promises.push(this.runModule(module));
	      }
	      return resolve.apply(jQuery, modules);
	    }, $M.prototype.runModule = function (module) {
	      var promise = reject("$M.runModule unknown " + module + ", param must be a string or a Module");
	      return isString(module) && (promise = this.getModule(module.toString())), Module.isModule(module) && (promise = resolve(module)), promise.then(function (module) {
	        var failure,
	            deferred = jQuery.Deferred();
	        try {
	          module.factory.call(module.scope, jQuery);
	        } catch (error) {
	          failure = error;
	        }
	        return window.setTimeout(function () {
	          failure ? deferred.reject(failure) : deferred.resolve(module);
	        }, 0), deferred.promise();
	      });
	    }, $M.prototype.setComponent = function (id, definition) {
	      if (!isString(id)) throw Error("$M.setComponent, first param must be a string");
	      if (this.hasComponent(id)) throw Error("$M.setComponent " + id + " alredy exists");
	      return this._INJECTOR_COMPONENTS_CONTAINER_[id] = new Component(id, definition), this;
	    }, $M.prototype.getComponent = function (id) {
	      if (!isString(id)) throw Error("$M.getComponent, first param must be a string");
	      if (!this.hasComponent(id)) throw Error("$M.Component " + id + " not found");
	      return this._INJECTOR_COMPONENTS_CONTAINER_[id].definition;
	    }, $M.prototype.hasComponent = function (id) {
	      return this._INJECTOR_COMPONENTS_CONTAINER_.hasOwnProperty(id);
	    }, $M.prototype.yTosReady = function (module) {
	      var _this = this,
	          deferred = jQuery.Deferred();
	      return jQuery(document).on(this._YTOS_READY_EVENT_, function () {
	        deferred.resolve(_this.runModule(module));
	      }), deferred.promise();
	    }, $M;
	  }();
	  window.$M = new $M();
	}(window, window.jQuery);

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTBhZWM4ZTk0ZTIxZGI0NmJjMTY/MTI2NSoqKioqKioqKioqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vL0M6L3Byb2plY3RzL2RvZG8tcHJvcG9zYWwvc3JjL0Rlc2t0b3AvU2NvcGVzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy9zb3VyY2UvcHJlZGF0b3JzLWVzNi1pbmplY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQ3BDd0IsS0FBSzs7OztBQUFkLFVBQVMsS0FBSyxHQUFHO0FBQzlCLFVBQU8sYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0VDRXBCLFVBQVUsTUFBUSxRQUNyQixFQW9Ka0IiLCJmaWxlIjoiRGVza3RvcFxcU2NvcGVzXFxzaXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxMGFlYzhlOTRlMjFkYjQ2YmMxNlxuICoqLyIsImltcG9ydCBcIm5wbS9wcmVkYXRvcnMvaW5qZWN0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JlZXQoKSB7XG4gIHJldHVybiAnSGVsbG8gV29ybGQnO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovcHJvamVjdHMvZG9kby1wcm9wb3NhbC9zcmMvRGVza3RvcC9TY29wZXMvc2l0ZS5qc1xuICoqLyIsImZ1bmN0aW9uIGlzU3RyaW5nKGlucHV0KSB7XHJcbiAgICByZXR1cm4galF1ZXJ5LnR5cGUoaW5wdXQpID09PSAnc3RyaW5nJztcclxufVxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGlucHV0KSB7XHJcbiAgICByZXR1cm4galF1ZXJ5LmlzRnVuY3Rpb24oaW5wdXQpO1xyXG59XHJcbnZhciByZWplY3QgPSBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICByZXR1cm4galF1ZXJ5LkRlZmVycmVkKCkucmVqZWN0KHJlYXNvbik7XHJcbn07XHJcbnZhciByZXNvbHZlID0galF1ZXJ5LndoZW47XHJcbnZhciBDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KGlkLCBkZWZpbml0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ29tcG9uZW50O1xyXG59KSgpO1xyXG52YXIgTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vZHVsZShpZCwgZmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmZhY3RvcnkgPSBmYWN0b3J5O1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcclxuICAgIH1cclxuICAgIE1vZHVsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9O1xyXG4gICAgTW9kdWxlLmlzTW9kdWxlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgTW9kdWxlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNb2R1bGU7XHJcbn0pKCk7XHJcbnZhciAkTSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiAkTSgpIHtcclxuICAgICAgICB0aGlzLl9ZVE9TX1JFQURZX0VWRU5UXyA9ICd5VG9zUmVhZHknO1xyXG4gICAgICAgIHRoaXMuX0lOSkVDVE9SX01PRFVMRVNfQ09OVEFJTkVSXyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX0lOSkVDVE9SX0NPTVBPTkVOVFNfQ09OVEFJTkVSXyA9IHt9O1xyXG4gICAgfVxyXG4gICAgJE0ucHJvdG90eXBlLmdldE1vZHVsZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpc1N0cmluZyhpZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChcIiRNLmdldE1vZHVsZSwgZmlyc3QgcGFyYW0gbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICAgICAgLmhhc01vZHVsZShpZClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX0lOSkVDVE9SX01PRFVMRVNfQ09OVEFJTkVSX1tpZF07IH0pXHJcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlamVjdChcIiRNIHVua25vd24gbW9kdWxlIFwiICsgaWQpOyB9KTtcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUuaW5zcGVjdE1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHJlamVjdChcIiRNLmluc3BlY3RNb2R1bGUgdW5rbm93biBcIiArIG1vZHVsZSArIFwiLCBwYXJhbSBtdXN0IGJlIGEgc3RyaW5nIG9yIGEgTW9kdWxlXCIpO1xyXG4gICAgICAgIGlmIChpc1N0cmluZyhtb2R1bGUpKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLmdldE1vZHVsZShtb2R1bGUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNb2R1bGUuaXNNb2R1bGUobW9kdWxlKSkge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gcmVzb2x2ZShtb2R1bGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobW9kdWxlKSB7IHJldHVybiBtb2R1bGUuc2NvcGU7IH0pO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5zZXRNb2R1bGUgPSBmdW5jdGlvbiAoaWQsIGZhY3RvcnkpIHtcclxuICAgICAgICBpZiAoIWlzU3RyaW5nKGlkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIiRNLnNldE1vZHVsZSwgZmlyc3QgcGFyYW0gbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKGlkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIiRNLnNldE1vZHVsZSwgc2Vjb25kIHBhcmFtIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzTW9kdWxlU3luYyhpZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCIkTS5zZXRNb2R1bGUgXCIgKyBpZCArIFwiIGFscmVkeSBleGlzdHNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0lOSkVDVE9SX01PRFVMRVNfQ09OVEFJTkVSX1tpZF0gPSBuZXcgTW9kdWxlKGlkLCBmYWN0b3J5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUuaGFzTW9kdWxlU3luYyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9JTkpFQ1RPUl9NT0RVTEVTX0NPTlRBSU5FUl8uaGFzT3duUHJvcGVydHkoaWQpO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5oYXNNb2R1bGUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNNb2R1bGVTeW5jKGlkKSA/IHJlc29sdmUoKSA6IHJlamVjdCgpO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5ydW5Nb2R1bGVzID0gZnVuY3Rpb24gKG1vZHVsZXMpIHtcclxuICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG1vZHVsZSA9IG1vZHVsZXNbaV07XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5ydW5Nb2R1bGUobW9kdWxlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNvbHZlLmFwcGx5KGpRdWVyeSwgbW9kdWxlcyk7XHJcbiAgICB9O1xyXG4gICAgJE0ucHJvdG90eXBlLnJ1bk1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHJlamVjdChcIiRNLnJ1bk1vZHVsZSB1bmtub3duIFwiICsgbW9kdWxlICsgXCIsIHBhcmFtIG11c3QgYmUgYSBzdHJpbmcgb3IgYSBNb2R1bGVcIik7XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKG1vZHVsZSkpIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuZ2V0TW9kdWxlKG1vZHVsZS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1vZHVsZS5pc01vZHVsZShtb2R1bGUpKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSByZXNvbHZlKG1vZHVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICAgICAgdmFyIGZhaWx1cmUsIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBtb2R1bGUuZmFjdG9yeS5jYWxsKG1vZHVsZS5zY29wZSwgalF1ZXJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGZhaWx1cmUgPSBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmFpbHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobW9kdWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgJE0ucHJvdG90eXBlLnNldENvbXBvbmVudCA9IGZ1bmN0aW9uIChpZCwgZGVmaW5pdGlvbikge1xyXG4gICAgICAgIGlmICghaXNTdHJpbmcoaWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiJE0uc2V0Q29tcG9uZW50LCBmaXJzdCBwYXJhbSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5oYXNDb21wb25lbnQoaWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiJE0uc2V0Q29tcG9uZW50IFwiICsgaWQgKyBcIiBhbHJlZHkgZXhpc3RzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9JTkpFQ1RPUl9DT01QT05FTlRTX0NPTlRBSU5FUl9baWRdID0gbmV3IENvbXBvbmVudChpZCwgZGVmaW5pdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgJE0ucHJvdG90eXBlLmdldENvbXBvbmVudCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIGlmICghaXNTdHJpbmcoaWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiJE0uZ2V0Q29tcG9uZW50LCBmaXJzdCBwYXJhbSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuaGFzQ29tcG9uZW50KGlkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIiRNLkNvbXBvbmVudCBcIiArIGlkICsgXCIgbm90IGZvdW5kXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fSU5KRUNUT1JfQ09NUE9ORU5UU19DT05UQUlORVJfW2lkXS5kZWZpbml0aW9uO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5oYXNDb21wb25lbnQgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSU5KRUNUT1JfQ09NUE9ORU5UU19DT05UQUlORVJfLmhhc093blByb3BlcnR5KGlkKTtcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUueVRvc1JlYWR5ID0gZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgalF1ZXJ5KGRvY3VtZW50KS5vbih0aGlzLl9ZVE9TX1JFQURZX0VWRU5UXywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnJ1bk1vZHVsZShtb2R1bGUpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiAkTTtcclxufSkoKTtcclxud2luZG93LiRNID0gbmV3ICRNKCk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWRhdG9ycy1lczYtaW5qZWN0b3IuanMubWFwXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wcmVkYXRvcnMtZXM2LWluamVjdG9yLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==