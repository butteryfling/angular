'use strict';var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var di_1 = require('angular2/src/core/di');
var parse5_adapter_1 = require('angular2/src/platform/server/parse5_adapter');
var post_message_bus_1 = require('angular2/src/web_workers/shared/post_message_bus');
var worker_app_common_1 = require('./worker_app_common');
var core_1 = require('angular2/core');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var compiler_1 = require('angular2/src/compiler/compiler');
// TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
var _postMessage = {
    postMessage: function (message, transferrables) {
        postMessage(message, transferrables);
    }
};
exports.WORKER_APP_APPLICATION = [
    worker_app_common_1.WORKER_APP_APPLICATION_COMMON,
    compiler_1.COMPILER_PROVIDERS,
    new di_1.Provider(message_bus_1.MessageBus, { useFactory: createMessageBus, deps: [ng_zone_1.NgZone] }),
    new di_1.Provider(core_1.APP_INITIALIZER, { useValue: setupWebWorker, multi: true })
];
function createMessageBus(zone) {
    var sink = new post_message_bus_1.PostMessageBusSink(_postMessage);
    var source = new post_message_bus_1.PostMessageBusSource();
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
function setupWebWorker() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtcFVIbTRDbHMudG1wL2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfYXBwLnRzIl0sIm5hbWVzIjpbImNyZWF0ZU1lc3NhZ2VCdXMiLCJzZXR1cFdlYldvcmtlciJdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXFCLGdDQUFnQyxDQUFDLENBQUE7QUFFdEQsbUJBQXVCLHNCQUFzQixDQUFDLENBQUE7QUFDOUMsK0JBQStCLDZDQUE2QyxDQUFDLENBQUE7QUFDN0UsaUNBSU8sa0RBQWtELENBQUMsQ0FBQTtBQUMxRCxrQ0FBNEMscUJBQXFCLENBQUMsQ0FBQTtBQUNsRSxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFDOUMsNEJBQXlCLDZDQUE2QyxDQUFDLENBQUE7QUFDdkUseUJBQWlDLGdDQUFnQyxDQUFDLENBQUE7QUFFbEUsNEVBQTRFO0FBQzVFLElBQUksWUFBWSxHQUFHO0lBQ2pCLFdBQVcsRUFBRSxVQUFDLE9BQVksRUFBRSxjQUE2QjtRQUNqRCxXQUFZLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRixDQUFDO0FBRVcsOEJBQXNCLEdBQTJDO0lBQzVFLGlEQUE2QjtJQUM3Qiw2QkFBa0I7SUFDbEIsSUFBSSxhQUFRLENBQUMsd0JBQVUsRUFBRSxFQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLEVBQUMsQ0FBQztJQUN4RSxJQUFJLGFBQVEsQ0FBQyxzQkFBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7Q0FDdkUsQ0FBQztBQUVGLDBCQUEwQixJQUFZO0lBQ3BDQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxxQ0FBa0JBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0lBQ2hEQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSx1Q0FBb0JBLEVBQUVBLENBQUNBO0lBQ3hDQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxpQ0FBY0EsQ0FBQ0EsSUFBSUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDM0NBLEdBQUdBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ3ZCQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtBQUNiQSxDQUFDQTtBQUVEO0lBQ0VDLGlDQUFnQkEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7QUFDakNBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3pvbmUvbmdfem9uZSc7XG5pbXBvcnQge1R5cGUsIENPTlNUX0VYUFIsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7UGFyc2U1RG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3NlcnZlci9wYXJzZTVfYWRhcHRlcic7XG5pbXBvcnQge1xuICBQb3N0TWVzc2FnZUJ1cyxcbiAgUG9zdE1lc3NhZ2VCdXNTaW5rLFxuICBQb3N0TWVzc2FnZUJ1c1NvdXJjZVxufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtXT1JLRVJfQVBQX0FQUExJQ0FUSU9OX0NPTU1PTn0gZnJvbSAnLi93b3JrZXJfYXBwX2NvbW1vbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtDT01QSUxFUl9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9jb21waWxlcic7XG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpIHJlbW92ZSB0aGlzIGFuZCBjb21waWxlIHdpdGggbGliLndlYndvcmtlci5kLnRzICgjMzQ5MilcbmxldCBfcG9zdE1lc3NhZ2UgPSB7XG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZTogYW55LCB0cmFuc2ZlcnJhYmxlcz86W0FycmF5QnVmZmVyXSkgPT4ge1xuICAgICg8YW55PnBvc3RNZXNzYWdlKShtZXNzYWdlLCB0cmFuc2ZlcnJhYmxlcyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfQVBQX0FQUExJQ0FUSU9OOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IFtcbiAgV09SS0VSX0FQUF9BUFBMSUNBVElPTl9DT01NT04sXG4gIENPTVBJTEVSX1BST1ZJREVSUyxcbiAgbmV3IFByb3ZpZGVyKE1lc3NhZ2VCdXMsIHt1c2VGYWN0b3J5OiBjcmVhdGVNZXNzYWdlQnVzLCBkZXBzOiBbTmdab25lXX0pLFxuICBuZXcgUHJvdmlkZXIoQVBQX0lOSVRJQUxJWkVSLCB7dXNlVmFsdWU6IHNldHVwV2ViV29ya2VyLCBtdWx0aTogdHJ1ZX0pXG5dO1xuXG5mdW5jdGlvbiBjcmVhdGVNZXNzYWdlQnVzKHpvbmU6IE5nWm9uZSk6IE1lc3NhZ2VCdXMge1xuICBsZXQgc2luayA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NpbmsoX3Bvc3RNZXNzYWdlKTtcbiAgbGV0IHNvdXJjZSA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSgpO1xuICBsZXQgYnVzID0gbmV3IFBvc3RNZXNzYWdlQnVzKHNpbmssIHNvdXJjZSk7XG4gIGJ1cy5hdHRhY2hUb1pvbmUoem9uZSk7XG4gIHJldHVybiBidXM7XG59XG5cbmZ1bmN0aW9uIHNldHVwV2ViV29ya2VyKCk6IHZvaWQge1xuICBQYXJzZTVEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG59XG4iXX0=