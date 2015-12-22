((window, $) => {
  'use strict';

  var
    unknownComponentMessage = key => `Injector.component:${key} does not exist`,

    isString = input => typeof input === "string",
    isFunction = $.isFunction,

    reject = reason => $.Deferred().reject(reason),
    resolve = $.when
    ;

  class Injector {
    /**
     * Singleton, creates an instance of the components container and gives
     * the ability to register, retrieve or check components.
     *
     * @Constructor
     * @Singleton
     */
    constructor() {

      /**
       * The place where all components are kept.
       * @type {Object}
       * @private
       */
      this._INJECTOR_COMPONENTS = {};
    }

    /**
     * jQuery-like getter and setter, if called with the callback parameter
     * works as a setter, otherwise as a getter.
     *
     * Must be used in order to register all application components.
     *
     * @param {string} key
     * @param {?function} [callback = null]
     * @returns {$.Promise}
     */
    component(key, callback = null) {
      if(!isString(key)) {
        return reject("Injector.component, first param must be a string");
      }

      let promise;

      if(isFunction(callback)) {
        promise = this.
          has(key)
          .then(
          () => {
            return reject(`Injector.component ${key} already exists`);
          },
          () => {
            this._INJECTOR_COMPONENTS[key] = {
              id: key,
              scope: {},
              worker: callback
            };

            return resolve();
          }
        );

      } else {
        promise = resolve();
      }

      return promise
        .then(() => this._getComponent(key) )
//        .then(component => component.worker)
      ;
    }

    /**
     * Retrieves a component definition object from the container
     *
     * @param {string} key
     * @returns {$.Promise}
     * @private
     */
    _getComponent(key) {

      return this
        .has(key)
        .then(() => this._INJECTOR_COMPONENTS[key])
        .fail(() => reject(unknownComponentMessage(key)))
      ;
    }

    /**
     * Checks if the given component exists or not.
     *
     * @param {string} key
     * @returns {boolean}
     */
    hasSync(key) {
      return this._INJECTOR_COMPONENTS.hasOwnProperty(key);
    }

    /**
     * Asynchronous check of the given component existence.
     * @param {string} key
     * @returns {$.Promise}
     */
    has(key) {
      return this.hasSync(key) ? resolve() : reject();
    }

    /**
     * Calls the requested component with window.jQuery and all rest params
     *
     * @param {string} key
     * @param {Array} rest - optional parameters to pass at the worker
     * @returns {$.Promise}
     */
    run(component, ...rest) {
      let promise;

      //TODO: cover all cases
      switch($.type(component)) {

        case "string":
          promise = this.component(component);
          break;
      }

      return (promise || resolve(component))
        .then(component => {
          return component.worker.call(component.scope, $, ...rest);
        })
    }

    study(component) {
      let promise;

      //TODO: cover all cases
      switch($.type(component)) {

        case "string":
          promise = this.component(component);
          break;
      }

      return (promise || resolve(component))
        .then(component => {
          if(component.scope) {
            return component.scope;
          }

          return reject("Component does not exists");
        })
    }
  }


  window.$M = new Injector();
})(window, window.jQuery);
