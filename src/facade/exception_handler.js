'use strict';var lang_1 = require('angular2/src/facade/lang');
var base_wrapped_exception_1 = require('angular2/src/facade/base_wrapped_exception');
var collection_1 = require('angular2/src/facade/collection');
var _ArrayLogger = (function () {
    function _ArrayLogger() {
        this.res = [];
    }
    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroupEnd = function () { };
    ;
    return _ArrayLogger;
})();
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
 * intercept error handling,
 * write a custom exception handler that replaces this default as appropriate for your app.
 *
 * ### Example
 *
 * ```javascript
 *
 * class MyExceptionHandler implements ExceptionHandler {
 *   call(error, stackTrace = null, reason = null) {
 *     // do something with the exception
 *   }
 * }
 *
 * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
 *
 * ```
 */
var ExceptionHandler = (function () {
    function ExceptionHandler(_logger, _rethrowException) {
        if (_rethrowException === void 0) { _rethrowException = true; }
        this._logger = _logger;
        this._rethrowException = _rethrowException;
    }
    ExceptionHandler.exceptionToString = function (exception, stackTrace, reason) {
        if (stackTrace === void 0) { stackTrace = null; }
        if (reason === void 0) { reason = null; }
        var l = new _ArrayLogger();
        var e = new ExceptionHandler(l, false);
        e.call(exception, stackTrace, reason);
        return l.res.join("\n");
    };
    ExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
        if (stackTrace === void 0) { stackTrace = null; }
        if (reason === void 0) { reason = null; }
        var originalException = this._findOriginalException(exception);
        var originalStack = this._findOriginalStack(exception);
        var context = this._findContext(exception);
        this._logger.logGroup("EXCEPTION: " + this._extractMessage(exception));
        if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
            this._logger.logError("STACKTRACE:");
            this._logger.logError(this._longStackTrace(stackTrace));
        }
        if (lang_1.isPresent(reason)) {
            this._logger.logError("REASON: " + reason);
        }
        if (lang_1.isPresent(originalException)) {
            this._logger.logError("ORIGINAL EXCEPTION: " + this._extractMessage(originalException));
        }
        if (lang_1.isPresent(originalStack)) {
            this._logger.logError("ORIGINAL STACKTRACE:");
            this._logger.logError(this._longStackTrace(originalStack));
        }
        if (lang_1.isPresent(context)) {
            this._logger.logError("ERROR CONTEXT:");
            this._logger.logError(context);
        }
        this._logger.logGroupEnd();
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an exception happens. If we do not rethrow, bootstrap will always succeed.
        if (this._rethrowException)
            throw exception;
    };
    /** @internal */
    ExceptionHandler.prototype._extractMessage = function (exception) {
        return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage :
            exception.toString();
    };
    /** @internal */
    ExceptionHandler.prototype._longStackTrace = function (stackTrace) {
        return collection_1.isListLikeIterable(stackTrace) ? stackTrace.join("\n\n-----async gap-----\n") :
            stackTrace.toString();
    };
    /** @internal */
    ExceptionHandler.prototype._findContext = function (exception) {
        try {
            if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                return null;
            return lang_1.isPresent(exception.context) ? exception.context :
                this._findContext(exception.originalException);
        }
        catch (e) {
            // exception.context can throw an exception. if it happens, we ignore the context.
            return null;
        }
    };
    /** @internal */
    ExceptionHandler.prototype._findOriginalException = function (exception) {
        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
            return null;
        var e = exception.originalException;
        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
            e = e.originalException;
        }
        return e;
    };
    /** @internal */
    ExceptionHandler.prototype._findOriginalStack = function (exception) {
        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
            return null;
        var e = exception;
        var stack = exception.originalStack;
        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
            e = e.originalException;
            if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                stack = e.originalStack;
            }
        }
        return stack;
    };
    return ExceptionHandler;
})();
exports.ExceptionHandler = ExceptionHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uX2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXBVSG00Q2xzLnRtcC9hbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbl9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbIl9BcnJheUxvZ2dlciIsIl9BcnJheUxvZ2dlci5jb25zdHJ1Y3RvciIsIl9BcnJheUxvZ2dlci5sb2ciLCJfQXJyYXlMb2dnZXIubG9nRXJyb3IiLCJfQXJyYXlMb2dnZXIubG9nR3JvdXAiLCJfQXJyYXlMb2dnZXIubG9nR3JvdXBFbmQiLCJFeGNlcHRpb25IYW5kbGVyIiwiRXhjZXB0aW9uSGFuZGxlci5jb25zdHJ1Y3RvciIsIkV4Y2VwdGlvbkhhbmRsZXIuZXhjZXB0aW9uVG9TdHJpbmciLCJFeGNlcHRpb25IYW5kbGVyLmNhbGwiLCJFeGNlcHRpb25IYW5kbGVyLl9leHRyYWN0TWVzc2FnZSIsIkV4Y2VwdGlvbkhhbmRsZXIuX2xvbmdTdGFja1RyYWNlIiwiRXhjZXB0aW9uSGFuZGxlci5fZmluZENvbnRleHQiLCJFeGNlcHRpb25IYW5kbGVyLl9maW5kT3JpZ2luYWxFeGNlcHRpb24iLCJFeGNlcHRpb25IYW5kbGVyLl9maW5kT3JpZ2luYWxTdGFjayJdLCJtYXBwaW5ncyI6IkFBQUEscUJBQXdDLDBCQUEwQixDQUFDLENBQUE7QUFDbkUsdUNBQW1DLDRDQUE0QyxDQUFDLENBQUE7QUFDaEYsMkJBQThDLGdDQUFnQyxDQUFDLENBQUE7QUFFL0U7SUFBQUE7UUFDRUMsUUFBR0EsR0FBVUEsRUFBRUEsQ0FBQ0E7SUFLbEJBLENBQUNBO0lBSkNELDBCQUFHQSxHQUFIQSxVQUFJQSxDQUFNQSxJQUFVRSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN2Q0YsK0JBQVFBLEdBQVJBLFVBQVNBLENBQU1BLElBQVVHLElB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LENBQUNBO0lBRURQLGdCQUFnQkE7SUFDaEJBLDZDQUFrQkEsR0FBbEJBLFVBQW1CQSxTQUFjQTtRQUMvQlEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsWUFBWUEsNkNBQW9CQSxDQUFDQSxDQUFDQTtZQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUU5REEsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0E7UUFDbEJBLElBQUlBLEtBQUtBLEdBQUdBLFNBQVNBLENBQUNBLGFBQWFBLENBQUNBO1FBQ3BDQSxPQUFPQSxDQUFDQSxZQUFZQSw2Q0FBb0JBLElBQUlBLGdCQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxpQkFBaUJBLENBQUNBLEVBQUVBLENBQUNBO1lBQzNFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxpQkFBaUJBLENBQUNBO1lBQ3hCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxZQUFZQSw2Q0FBb0JBLElBQUlBLGdCQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4RUEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDMUJBLENBQUNBO1FBQ0hBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO0lBQ2ZBLENBQUNBO0lBQ0hSLHVCQUFDQTtBQUFEQSxDQUFDQSxBQWxHRCxJQWtHQztBQWxHWSx3QkFBZ0IsbUJBa0c1QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIHByaW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9iYXNlX3dyYXBwZWRfZXhjZXB0aW9uJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIGlzTGlzdExpa2VJdGVyYWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuY2xhc3MgX0FycmF5TG9nZ2VyIHtcbiAgcmVzOiBhbnlbXSA9IFtdO1xuICBsb2coczogYW55KTogdm9pZCB7IHRoaXMucmVzLnB1c2gocyk7IH1cbiAgbG9nRXJyb3IoczogYW55KTogdm9pZCB7IHRoaXMucmVzLnB1c2gocyk7IH1cbiAgbG9nR3JvdXAoczogYW55KTogdm9pZCB7IHRoaXMucmVzLnB1c2gocyk7IH1cbiAgbG9nR3JvdXBFbmQoKXt9O1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgaG9vayBmb3IgY2VudHJhbGl6ZWQgZXhjZXB0aW9uIGhhbmRsaW5nLlxuICpcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBFeGNlcHRpb25IYW5kbGVyYCBwcmludHMgZXJyb3IgbWVzc2FnZXMgdG8gdGhlIGBDb25zb2xlYC4gVG9cbiAqIGludGVyY2VwdCBlcnJvciBoYW5kbGluZyxcbiAqIHdyaXRlIGEgY3VzdG9tIGV4Y2VwdGlvbiBoYW5kbGVyIHRoYXQgcmVwbGFjZXMgdGhpcyBkZWZhdWx0IGFzIGFwcHJvcHJpYXRlIGZvciB5b3VyIGFwcC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqXG4gKiBjbGFzcyBNeUV4Y2VwdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBFeGNlcHRpb25IYW5kbGVyIHtcbiAqICAgY2FsbChlcnJvciwgc3RhY2tUcmFjZSA9IG51bGwsIHJlYXNvbiA9IG51bGwpIHtcbiAqICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB0aGUgZXhjZXB0aW9uXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoTXlBcHAsIFtwcm92aWRlKEV4Y2VwdGlvbkhhbmRsZXIsIHt1c2VDbGFzczogTXlFeGNlcHRpb25IYW5kbGVyfSldKVxuICpcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvZ2dlcjogYW55LCBwcml2YXRlIF9yZXRocm93RXhjZXB0aW9uOiBib29sZWFuID0gdHJ1ZSkge31cblxuICBzdGF0aWMgZXhjZXB0aW9uVG9TdHJpbmcoZXhjZXB0aW9uOiBhbnksIHN0YWNrVHJhY2U6IGFueSA9IG51bGwsIHJlYXNvbjogc3RyaW5nID0gbnVsbCk6IHN0cmluZyB7XG4gICAgdmFyIGwgPSBuZXcgX0FycmF5TG9nZ2VyKCk7XG4gICAgdmFyIGUgPSBuZXcgRXhjZXB0aW9uSGFuZGxlcihsLCBmYWxzZSk7XG4gICAgZS5jYWxsKGV4Y2VwdGlvbiwgc3RhY2tUcmFjZSwgcmVhc29uKTtcbiAgICByZXR1cm4gbC5yZXMuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIGNhbGwoZXhjZXB0aW9uOiBhbnksIHN0YWNrVHJhY2U6IGFueSA9IG51bGwsIHJlYXNvbjogc3RyaW5nID0gbnVsbCk6IHZvaWQge1xuICAgIHZhciBvcmlnaW5hbEV4Y2VwdGlvbiA9IHRoaXMuX2ZpbmRPcmlnaW5hbEV4Y2VwdGlvbihleGNlcHRpb24pO1xuICAgIHZhciBvcmlnaW5hbFN0YWNrID0gdGhpcy5fZmluZE9yaWdpbmFsU3RhY2soZXhjZXB0aW9uKTtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMuX2ZpbmRDb250ZXh0KGV4Y2VwdGlvbik7XG5cbiAgICB0aGlzLl9sb2dnZXIubG9nR3JvdXAoYEVYQ0VQVElPTjogJHt0aGlzLl9leHRyYWN0TWVzc2FnZShleGNlcHRpb24pfWApO1xuXG4gICAgaWYgKGlzUHJlc2VudChzdGFja1RyYWNlKSAmJiBpc0JsYW5rKG9yaWdpbmFsU3RhY2spKSB7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoXCJTVEFDS1RSQUNFOlwiKTtcbiAgICAgIHRoaXMuX2xvZ2dlci5sb2dFcnJvcih0aGlzLl9sb25nU3RhY2tUcmFjZShzdGFja1RyYWNlKSk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChyZWFzb24pKSB7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoYFJFQVNPTjogJHtyZWFzb259YCk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChvcmlnaW5hbEV4Y2VwdGlvbikpIHtcbiAgICAgIHRoaXMuX2xvZ2dlci5sb2dFcnJvcihgT1JJR0lOQUwgRVhDRVBUSU9OOiAke3RoaXMuX2V4dHJhY3RNZXNzYWdlKG9yaWdpbmFsRXhjZXB0aW9uKX1gKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KG9yaWdpbmFsU3RhY2spKSB7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoXCJPUklHSU5BTCBTVEFDS1RSQUNFOlwiKTtcbiAgICAgIHRoaXMuX2xvZ2dlci5sb2dFcnJvcih0aGlzLl9sb25nU3RhY2tUcmFjZShvcmlnaW5hbFN0YWNrKSk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChjb250ZXh0KSkge1xuICAgICAgdGhpcy5fbG9nZ2VyLmxvZ0Vycm9yKFwiRVJST1IgQ09OVEVYVDpcIik7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoY29udGV4dCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9nZ2VyLmxvZ0dyb3VwRW5kKCk7XG5cbiAgICAvLyBXZSByZXRocm93IGV4Y2VwdGlvbnMsIHNvIG9wZXJhdGlvbnMgbGlrZSAnYm9vdHN0cmFwJyB3aWxsIHJlc3VsdCBpbiBhbiBlcnJvclxuICAgIC8vIHdoZW4gYW4gZXhjZXB0aW9uIGhhcHBlbnMuIElmIHdlIGRvIG5vdCByZXRocm93LCBib290c3RyYXAgd2lsbCBhbHdheXMgc3VjY2VlZC5cbiAgICBpZiAodGhpcy5fcmV0aHJvd0V4Y2VwdGlvbikgdGhyb3cgZXhjZXB0aW9uO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZXh0cmFjdE1lc3NhZ2UoZXhjZXB0aW9uOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiBleGNlcHRpb24gaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbiA/IGV4Y2VwdGlvbi53cmFwcGVyTWVzc2FnZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9sb25nU3RhY2tUcmFjZShzdGFja1RyYWNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBpc0xpc3RMaWtlSXRlcmFibGUoc3RhY2tUcmFjZSkgPyAoPGFueVtdPnN0YWNrVHJhY2UpLmpvaW4oXCJcXG5cXG4tLS0tLWFzeW5jIGdhcC0tLS0tXFxuXCIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tUcmFjZS50b1N0cmluZygpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZENvbnRleHQoZXhjZXB0aW9uOiBhbnkpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIShleGNlcHRpb24gaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbikpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChleGNlcHRpb24uY29udGV4dCkgPyBleGNlcHRpb24uY29udGV4dCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRDb250ZXh0KGV4Y2VwdGlvbi5vcmlnaW5hbEV4Y2VwdGlvbik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXhjZXB0aW9uLmNvbnRleHQgY2FuIHRocm93IGFuIGV4Y2VwdGlvbi4gaWYgaXQgaGFwcGVucywgd2UgaWdub3JlIHRoZSBjb250ZXh0LlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZE9yaWdpbmFsRXhjZXB0aW9uKGV4Y2VwdGlvbjogYW55KTogYW55IHtcbiAgICBpZiAoIShleGNlcHRpb24gaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbikpIHJldHVybiBudWxsO1xuXG4gICAgdmFyIGUgPSBleGNlcHRpb24ub3JpZ2luYWxFeGNlcHRpb247XG4gICAgd2hpbGUgKGUgaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbiAmJiBpc1ByZXNlbnQoZS5vcmlnaW5hbEV4Y2VwdGlvbikpIHtcbiAgICAgIGUgPSBlLm9yaWdpbmFsRXhjZXB0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBlO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZE9yaWdpbmFsU3RhY2soZXhjZXB0aW9uOiBhbnkpOiBhbnkge1xuICAgIGlmICghKGV4Y2VwdGlvbiBpbnN0YW5jZW9mIEJhc2VXcmFwcGVkRXhjZXB0aW9uKSkgcmV0dXJuIG51bGw7XG5cbiAgICB2YXIgZSA9IGV4Y2VwdGlvbjtcbiAgICB2YXIgc3RhY2sgPSBleGNlcHRpb24ub3JpZ2luYWxTdGFjaztcbiAgICB3aGlsZSAoZSBpbnN0YW5jZW9mIEJhc2VXcmFwcGVkRXhjZXB0aW9uICYmIGlzUHJlc2VudChlLm9yaWdpbmFsRXhjZXB0aW9uKSkge1xuICAgICAgZSA9IGUub3JpZ2luYWxFeGNlcHRpb247XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEJhc2VXcmFwcGVkRXhjZXB0aW9uICYmIGlzUHJlc2VudChlLm9yaWdpbmFsRXhjZXB0aW9uKSkge1xuICAgICAgICBzdGFjayA9IGUub3JpZ2luYWxTdGFjaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH1cbn1cbiJdfQ==