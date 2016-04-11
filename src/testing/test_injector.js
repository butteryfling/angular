'use strict';var core_1 = require('angular2/core');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var TestInjector = (function () {
    function TestInjector() {
        this._instantiated = false;
        this._injector = null;
        this._providers = [];
        this.platformProviders = [];
        this.applicationProviders = [];
    }
    TestInjector.prototype.reset = function () {
        this._injector = null;
        this._providers = [];
        this._instantiated = false;
    };
    TestInjector.prototype.addProviders = function (providers) {
        if (this._instantiated) {
            throw new exceptions_1.BaseException('Cannot add providers after test injector is instantiated');
        }
        this._providers = collection_1.ListWrapper.concat(this._providers, providers);
    };
    TestInjector.prototype.createInjector = function () {
        var rootInjector = core_1.Injector.resolveAndCreate(this.platformProviders);
        this._injector = rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(this.applicationProviders, this._providers));
        this._instantiated = true;
        return this._injector;
    };
    TestInjector.prototype.execute = function (fn) {
        var additionalProviders = fn.additionalProviders();
        if (additionalProviders.length > 0) {
            this.addProviders(additionalProviders);
        }
        if (!this._instantiated) {
            this.createInjector();
        }
        return fn.execute(this._injector);
    };
    return TestInjector;
})();
exports.TestInjector = TestInjector;
var _testInjector = null;
function getTestInjector() {
    if (_testInjector == null) {
        _testInjector = new TestInjector();
    }
    return _testInjector;
}
exports.getTestInjector = getTestInjector;
/**
 * Set the providers that the test injector should use. These should be providers
 * common to every test in the suite.
 *
 * This may only be called once, to set up the common providers for the current test
 * suite on teh current platform. If you absolutely need to change the providers,
 * first use `resetBaseTestProviders`.
 *
 * Test Providers for individual platforms are available from
 * 'angular2/platform/testing/<platform_name>'.
 */
function setBaseTestProviders(platformProviders, applicationProviders) {
    var testInjector = getTestInjector();
    if (testInjector.platformProviders.length > 0 || testInjector.applicationProviders.length > 0) {
        throw new exceptions_1.BaseException('Cannot set base providers because it has already been called');
    }
    testInjector.platformProviders = platformProviders;
    testInjector.applicationProviders = applicationProviders;
    var injector = testInjector.createInjector();
    var inits = injector.getOptional(core_1.PLATFORM_INITIALIZER);
    if (lang_1.isPresent(inits)) {
        inits.forEach(function (init) { return init(); });
    }
    testInjector.reset();
}
exports.setBaseTestProviders = setBaseTestProviders;
/**
 * Reset the providers for the test injector.
 */
function resetBaseTestProviders() {
    var testInjector = getTestInjector();
    testInjector.platformProviders = [];
    testInjector.applicationProviders = [];
    testInjector.reset();
}
exports.resetBaseTestProviders = resetBaseTestProviders;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @param {Array} tokens
 * @param {Function} fn
 * @return {FunctionWithParamTokens}
 */
function inject(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn, false);
}
exports.inject = inject;
var InjectSetupWrapper = (function () {
    function InjectSetupWrapper(_providers) {
        this._providers = _providers;
    }
    InjectSetupWrapper.prototype.inject = function (tokens, fn) {
        return new FunctionWithParamTokens(tokens, fn, false, this._providers);
    };
    InjectSetupWrapper.prototype.injectAsync = function (tokens, fn) {
        return new FunctionWithParamTokens(tokens, fn, true, this._providers);
    };
    return InjectSetupWrapper;
})();
exports.InjectSetupWrapper = InjectSetupWrapper;
function withProviders(providers) {
    return new InjectSetupWrapper(providers);
}
exports.withProviders = withProviders;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`. The test must return
 * a promise which will resolve when all asynchronous activity is complete.
 *
 * Example:
 *
 * ```
 * it('...', injectAsync([AClass], (object) => {
 *   return object.doSomething().then(() => {
 *     expect(...);
 *   });
 * })
 * ```
 *
 * @param {Array} tokens
 * @param {Function} fn
 * @return {FunctionWithParamTokens}
 */
function injectAsync(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn, true);
}
exports.injectAsync = injectAsync;
function emptyArray() {
    return [];
}
var FunctionWithParamTokens = (function () {
    function FunctionWithParamTokens(_tokens, _fn, isAsync, additionalProviders) {
        if (additionalProviders === void 0) { additionalProviders = emptyArray; }
        this._tokens = _tokens;
        this._fn = _fn;
        this.isAsync = isAsync;
        this.additionalProviders = additionalProviders;
    }
    /**
     * Returns the value of the executed function.
     */
    FunctionWithParamTokens.prototype.execute = function (injector) {
        var params = this._tokens.map(function (t) { return injector.get(t); });
        return lang_1.FunctionWrapper.apply(this._fn, params);
    };
    FunctionWithParamTokens.prototype.hasToken = function (token) { return this._tokens.indexOf(token) > -1; };
    return FunctionWithParamTokens;
})();
exports.FunctionWithParamTokens = FunctionWithParamTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtU1RnYnBRQkkudG1wL2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3Rlc3RfaW5qZWN0b3IudHMiXSwibmFtZXMiOlsiVGVzdEluamVjdG9yIiwiVGVzdEluamVjdG9yLmNvbnN0cnVjdG9yIiwiVGVzdEluamVjdG9yLnJlc2V0IiwiVGVzdEluamVjdG9yLmFkZFByb3ZpZGVycyIsIlRlc3RJbmplY3Rvci5jcmVhdGVJbmplY3RvciIsIlRlc3RJbmplY3Rvci5leGVjdXRlIiwiZ2V0VGVzdEluamVjdG9yIiwic2V0QmFzZVRlc3RQcm92aWRlcnMiLCJyZXNldEJhc2VUZXN0UHJvdmlkZXJzIiwiaW5qZWN0IiwiSW5qZWN0U2V0dXBXcmFwcGVyIiwiSW5qZWN0U2V0dXBXcmFwcGVyLmNvbnN0cnVjdG9yIiwiSW5qZWN0U2V0dXBXcmFwcGVyLmluamVjdCIsIkluamVjdFNldHVwV3JhcHBlci5pbmplY3RBc3luYyIsIndpdGhQcm92aWRlcnMiLCJpbmplY3RBc3luYyIsImVtcHR5QXJyYXkiLCJGdW5jdGlvbldpdGhQYXJhbVRva2VucyIsIkZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zLmNvbnN0cnVjdG9yIiwiRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMuZXhlY3V0ZSIsIkZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zLmhhc1Rva2VuIl0sIm1hcHBpbmdzIjoiQUFBQSxxQkFBdUQsZUFBZSxDQUFDLENBQUE7QUFDdkUsMkJBQThDLGdDQUFnQyxDQUFDLENBQUE7QUFDL0UsMkJBQTBCLGdDQUFnQyxDQUFDLENBQUE7QUFDM0QscUJBQStDLDBCQUEwQixDQUFDLENBQUE7QUFFMUU7SUFBQUE7UUFDVUMsa0JBQWFBLEdBQVlBLEtBQUtBLENBQUNBO1FBRS9CQSxjQUFTQSxHQUFhQSxJQUFJQSxDQUFDQTtRQUUzQkEsZUFBVUEsR0FBbUNBLEVB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Z0NBQWtEQTtRQUQxQ0EsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBT0E7UUFBVUEsUUFBR0EsR0FBSEEsR0FBR0EsQ0FBVUE7UUFBU0EsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBU0E7UUFDL0RBLHdCQUFtQkEsR0FBbkJBLG1CQUFtQkEsQ0FBd0JBO0lBQUdBLENBQUNBO0lBRWxFRDs7T0FFR0E7SUFDSEEseUNBQU9BLEdBQVBBLFVBQVFBLFFBQWtCQTtRQUN4QkUsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQUEsQ0FBQ0EsSUFBSUEsT0FBQUEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBZkEsQ0FBZUEsQ0FBQ0EsQ0FBQ0E7UUFDcERBLE1BQU1BLENBQUNBLHNCQUFlQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtJQUNqREEsQ0FBQ0E7SUFFREYsMENBQVFBLEdBQVJBLFVBQVNBLEtBQVVBLElBQWFHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQzVFSCw4QkFBQ0E7QUFBREEsQ0FBQ0EsQUFiRCxJQWFDO0FBYlksK0JBQXVCLDBCQWFuQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RvciwgUHJvdmlkZXIsIFBMQVRGT1JNX0lOSVRJQUxJWkVSfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgRXhjZXB0aW9uSGFuZGxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0Z1bmN0aW9uV3JhcHBlciwgaXNQcmVzZW50LCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5leHBvcnQgY2xhc3MgVGVzdEluamVjdG9yIHtcbiAgcHJpdmF0ZSBfaW5zdGFudGlhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yID0gbnVsbDtcblxuICBwcml2YXRlIF9wcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPiA9IFtdO1xuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX2luamVjdG9yID0gbnVsbDtcbiAgICB0aGlzLl9wcm92aWRlcnMgPSBbXTtcbiAgICB0aGlzLl9pbnN0YW50aWF0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHBsYXRmb3JtUHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBbXTtcblxuICBhcHBsaWNhdGlvblByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gW107XG5cbiAgYWRkUHJvdmlkZXJzKHByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KSB7XG4gICAgaWYgKHRoaXMuX2luc3RhbnRpYXRlZCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ0Nhbm5vdCBhZGQgcHJvdmlkZXJzIGFmdGVyIHRlc3QgaW5qZWN0b3IgaXMgaW5zdGFudGlhdGVkJyk7XG4gICAgfVxuICAgIHRoaXMuX3Byb3ZpZGVycyA9IExpc3RXcmFwcGVyLmNvbmNhdCh0aGlzLl9wcm92aWRlcnMsIHByb3ZpZGVycyk7XG4gIH1cblxuICBjcmVhdGVJbmplY3RvcigpIHtcbiAgICB2YXIgcm9vdEluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZSh0aGlzLnBsYXRmb3JtUHJvdmlkZXJzKTtcbiAgICB0aGlzLl9pbmplY3RvciA9IHJvb3RJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlQ2hpbGQoXG4gICAgICAgIExpc3RXcmFwcGVyLmNvbmNhdCh0aGlzLmFwcGxpY2F0aW9uUHJvdmlkZXJzLCB0aGlzLl9wcm92aWRlcnMpKTtcbiAgICB0aGlzLl9pbnN0YW50aWF0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLl9pbmplY3RvcjtcbiAgfVxuXG4gIGV4ZWN1dGUoZm46IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKTogYW55IHtcbiAgICB2YXIgYWRkaXRpb25hbFByb3ZpZGVycyA9IGZuLmFkZGl0aW9uYWxQcm92aWRlcnMoKTtcbiAgICBpZiAoYWRkaXRpb25hbFByb3ZpZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmFkZFByb3ZpZGVycyhhZGRpdGlvbmFsUHJvdmlkZXJzKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9pbnN0YW50aWF0ZWQpIHtcbiAgICAgIHRoaXMuY3JlYXRlSW5qZWN0b3IoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmV4ZWN1dGUodGhpcy5faW5qZWN0b3IpO1xuICB9XG59XG5cbnZhciBfdGVzdEluamVjdG9yOiBUZXN0SW5qZWN0b3IgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGVzdEluamVjdG9yKCkge1xuICBpZiAoX3Rlc3RJbmplY3RvciA9PSBudWxsKSB7XG4gICAgX3Rlc3RJbmplY3RvciA9IG5ldyBUZXN0SW5qZWN0b3IoKTtcbiAgfVxuICByZXR1cm4gX3Rlc3RJbmplY3Rvcjtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHByb3ZpZGVycyB0aGF0IHRoZSB0ZXN0IGluamVjdG9yIHNob3VsZCB1c2UuIFRoZXNlIHNob3VsZCBiZSBwcm92aWRlcnNcbiAqIGNvbW1vbiB0byBldmVyeSB0ZXN0IGluIHRoZSBzdWl0ZS5cbiAqXG4gKiBUaGlzIG1heSBvbmx5IGJlIGNhbGxlZCBvbmNlLCB0byBzZXQgdXAgdGhlIGNvbW1vbiBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHRlc3RcbiAqIHN1aXRlIG9uIHRlaCBjdXJyZW50IHBsYXRmb3JtLiBJZiB5b3UgYWJzb2x1dGVseSBuZWVkIHRvIGNoYW5nZSB0aGUgcHJvdmlkZXJzLFxuICogZmlyc3QgdXNlIGByZXNldEJhc2VUZXN0UHJvdmlkZXJzYC5cbiAqXG4gKiBUZXN0IFByb3ZpZGVycyBmb3IgaW5kaXZpZHVhbCBwbGF0Zm9ybXMgYXJlIGF2YWlsYWJsZSBmcm9tXG4gKiAnYW5ndWxhcjIvcGxhdGZvcm0vdGVzdGluZy88cGxhdGZvcm1fbmFtZT4nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0QmFzZVRlc3RQcm92aWRlcnMocGxhdGZvcm1Qcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvblByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KSB7XG4gIHZhciB0ZXN0SW5qZWN0b3IgPSBnZXRUZXN0SW5qZWN0b3IoKTtcbiAgaWYgKHRlc3RJbmplY3Rvci5wbGF0Zm9ybVByb3ZpZGVycy5sZW5ndGggPiAwIHx8IHRlc3RJbmplY3Rvci5hcHBsaWNhdGlvblByb3ZpZGVycy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ0Nhbm5vdCBzZXQgYmFzZSBwcm92aWRlcnMgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZCcpO1xuICB9XG4gIHRlc3RJbmplY3Rvci5wbGF0Zm9ybVByb3ZpZGVycyA9IHBsYXRmb3JtUHJvdmlkZXJzO1xuICB0ZXN0SW5qZWN0b3IuYXBwbGljYXRpb25Qcm92aWRlcnMgPSBhcHBsaWNhdGlvblByb3ZpZGVycztcbiAgdmFyIGluamVjdG9yID0gdGVzdEluamVjdG9yLmNyZWF0ZUluamVjdG9yKCk7XG4gIGxldCBpbml0czogRnVuY3Rpb25bXSA9IGluamVjdG9yLmdldE9wdGlvbmFsKFBMQVRGT1JNX0lOSVRJQUxJWkVSKTtcbiAgaWYgKGlzUHJlc2VudChpbml0cykpIHtcbiAgICBpbml0cy5mb3JFYWNoKGluaXQgPT4gaW5pdCgpKTtcbiAgfVxuICB0ZXN0SW5qZWN0b3IucmVzZXQoKTtcbn1cblxuLyoqXG4gKiBSZXNldCB0aGUgcHJvdmlkZXJzIGZvciB0aGUgdGVzdCBpbmplY3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0QmFzZVRlc3RQcm92aWRlcnMoKSB7XG4gIHZhciB0ZXN0SW5qZWN0b3IgPSBnZXRUZXN0SW5qZWN0b3IoKTtcbiAgdGVzdEluamVjdG9yLnBsYXRmb3JtUHJvdmlkZXJzID0gW107XG4gIHRlc3RJbmplY3Rvci5hcHBsaWNhdGlvblByb3ZpZGVycyA9IFtdO1xuICB0ZXN0SW5qZWN0b3IucmVzZXQoKTtcbn1cblxuLyoqXG4gKiBBbGxvd3MgaW5qZWN0aW5nIGRlcGVuZGVuY2llcyBpbiBgYmVmb3JlRWFjaCgpYCBhbmQgYGl0KClgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBiZWZvcmVFYWNoKGluamVjdChbRGVwZW5kZW5jeSwgQUNsYXNzXSwgKGRlcCwgb2JqZWN0KSA9PiB7XG4gKiAgIC8vIHNvbWUgY29kZSB0aGF0IHVzZXMgYGRlcGAgYW5kIGBvYmplY3RgXG4gKiAgIC8vIC4uLlxuICogfSkpO1xuICpcbiAqIGl0KCcuLi4nLCBpbmplY3QoW0FDbGFzc10sIChvYmplY3QpID0+IHtcbiAqICAgb2JqZWN0LmRvU29tZXRoaW5nKCk7XG4gKiAgIGV4cGVjdCguLi4pO1xuICogfSlcbiAqIGBgYFxuICpcbiAqIE5vdGVzOlxuICogLSBpbmplY3QgaXMgY3VycmVudGx5IGEgZnVuY3Rpb24gYmVjYXVzZSBvZiBzb21lIFRyYWNldXIgbGltaXRhdGlvbiB0aGUgc3ludGF4IHNob3VsZFxuICogZXZlbnR1YWxseVxuICogICBiZWNvbWVzIGBpdCgnLi4uJywgQEluamVjdCAob2JqZWN0OiBBQ2xhc3MsIGFzeW5jOiBBc3luY1Rlc3RDb21wbGV0ZXIpID0+IHsgLi4uIH0pO2BcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbldpdGhQYXJhbVRva2Vuc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdCh0b2tlbnM6IGFueVtdLCBmbjogRnVuY3Rpb24pOiBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB7XG4gIHJldHVybiBuZXcgRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnModG9rZW5zLCBmbiwgZmFsc2UpO1xufVxuXG5leHBvcnQgY2xhc3MgSW5qZWN0U2V0dXBXcmFwcGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvdmlkZXJzOiAoKSA9PiBhbnkpIHt9XG5cbiAgaW5qZWN0KHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKHRva2VucywgZm4sIGZhbHNlLCB0aGlzLl9wcm92aWRlcnMpO1xuICB9XG5cbiAgaW5qZWN0QXN5bmModG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uKTogRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMge1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnModG9rZW5zLCBmbiwgdHJ1ZSwgdGhpcy5fcHJvdmlkZXJzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2l0aFByb3ZpZGVycyhwcm92aWRlcnM6ICgpID0+IGFueSkge1xuICByZXR1cm4gbmV3IEluamVjdFNldHVwV3JhcHBlcihwcm92aWRlcnMpO1xufVxuXG4vKipcbiAqIEFsbG93cyBpbmplY3RpbmcgZGVwZW5kZW5jaWVzIGluIGBiZWZvcmVFYWNoKClgIGFuZCBgaXQoKWAuIFRoZSB0ZXN0IG11c3QgcmV0dXJuXG4gKiBhIHByb21pc2Ugd2hpY2ggd2lsbCByZXNvbHZlIHdoZW4gYWxsIGFzeW5jaHJvbm91cyBhY3Rpdml0eSBpcyBjb21wbGV0ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogaXQoJy4uLicsIGluamVjdEFzeW5jKFtBQ2xhc3NdLCAob2JqZWN0KSA9PiB7XG4gKiAgIHJldHVybiBvYmplY3QuZG9Tb21ldGhpbmcoKS50aGVuKCgpID0+IHtcbiAqICAgICBleHBlY3QoLi4uKTtcbiAqICAgfSk7XG4gKiB9KVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdG9rZW5zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RBc3luYyh0b2tlbnM6IGFueVtdLCBmbjogRnVuY3Rpb24pOiBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB7XG4gIHJldHVybiBuZXcgRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnModG9rZW5zLCBmbiwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGVtcHR5QXJyYXkoKTogQXJyYXk8YW55PiB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdG9rZW5zOiBhbnlbXSwgcHJpdmF0ZSBfZm46IEZ1bmN0aW9uLCBwdWJsaWMgaXNBc3luYzogYm9vbGVhbixcbiAgICAgICAgICAgICAgcHVibGljIGFkZGl0aW9uYWxQcm92aWRlcnM6ICgpID0+IGFueSA9IGVtcHR5QXJyYXkpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBleGVjdXRlZCBmdW5jdGlvbi5cbiAgICovXG4gIGV4ZWN1dGUoaW5qZWN0b3I6IEluamVjdG9yKTogYW55IHtcbiAgICB2YXIgcGFyYW1zID0gdGhpcy5fdG9rZW5zLm1hcCh0ID0+IGluamVjdG9yLmdldCh0KSk7XG4gICAgcmV0dXJuIEZ1bmN0aW9uV3JhcHBlci5hcHBseSh0aGlzLl9mbiwgcGFyYW1zKTtcbiAgfVxuXG4gIGhhc1Rva2VuKHRva2VuOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Rva2Vucy5pbmRleE9mKHRva2VuKSA+IC0xOyB9XG59XG4iXX0=