import { isPresent, isBlank } from 'angular2/src/facade/lang';
const DIRECTIVE_LIFECYCLE = "directiveLifecycle";
const BINDING = "native";
const DIRECTIVE = "directive";
const ELEMENT_PROPERTY = "elementProperty";
const ELEMENT_ATTRIBUTE = "elementAttribute";
const ELEMENT_CLASS = "elementClass";
const ELEMENT_STYLE = "elementStyle";
const TEXT_NODE = "textNode";
const EVENT = "event";
const HOST_EVENT = "hostEvent";
export class BindingTarget {
    constructor(mode, elementIndex, name, unit, debug) {
        this.mode = mode;
        this.elementIndex = elementIndex;
        this.name = name;
        this.unit = unit;
        this.debug = debug;
    }
    isDirective() { return this.mode === DIRECTIVE; }
    isElementProperty() { return this.mode === ELEMENT_PROPERTY; }
    isElementAttribute() { return this.mode === ELEMENT_ATTRIBUTE; }
    isElementClass() { return this.mode === ELEMENT_CLASS; }
    isElementStyle() { return this.mode === ELEMENT_STYLE; }
    isTextNode() { return this.mode === TEXT_NODE; }
}
export class BindingRecord {
    constructor(mode, target, implicitReceiver, ast, setter, lifecycleEvent, directiveRecord) {
        this.mode = mode;
        this.target = target;
        this.implicitReceiver = implicitReceiver;
        this.ast = ast;
        this.setter = setter;
        this.lifecycleEvent = lifecycleEvent;
        this.directiveRecord = directiveRecord;
    }
    isDirectiveLifecycle() { return this.mode === DIRECTIVE_LIFECYCLE; }
    callOnChanges() {
        return isPresent(this.directiveRecord) && this.directiveRecord.callOnChanges;
    }
    isDefaultChangeDetection() {
        return isBlank(this.directiveRecord) || this.directiveRecord.isDefaultChangeDetection();
    }
    static createDirectiveDoCheck(directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "DoCheck", directiveRecord);
    }
    static createDirectiveOnInit(directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnInit", directiveRecord);
    }
    static createDirectiveOnChanges(directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnChanges", directiveRecord);
    }
    static createForDirective(ast, propertyName, setter, directiveRecord) {
        var elementIndex = directiveRecord.directiveIndex.elementIndex;
        var t = new BindingTarget(DIRECTIVE, elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(DIRECTIVE, t, 0, ast, setter, null, directiveRecord);
    }
    static createForElementProperty(ast, elementIndex, propertyName) {
        var t = new BindingTarget(ELEMENT_PROPERTY, elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    }
    static createForElementAttribute(ast, elementIndex, attributeName) {
        var t = new BindingTarget(ELEMENT_ATTRIBUTE, elementIndex, attributeName, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    }
    static createForElementClass(ast, elementIndex, className) {
        var t = new BindingTarget(ELEMENT_CLASS, elementIndex, className, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    }
    static createForElementStyle(ast, elementIndex, styleName, unit) {
        var t = new BindingTarget(ELEMENT_STYLE, elementIndex, styleName, unit, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    }
    static createForHostProperty(directiveIndex, ast, propertyName) {
        var t = new BindingTarget(ELEMENT_PROPERTY, directiveIndex.elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    }
    static createForHostAttribute(directiveIndex, ast, attributeName) {
        var t = new BindingTarget(ELEMENT_ATTRIBUTE, directiveIndex.elementIndex, attributeName, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    }
    static createForHostClass(directiveIndex, ast, className) {
        var t = new BindingTarget(ELEMENT_CLASS, directiveIndex.elementIndex, className, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    }
    static createForHostStyle(directiveIndex, ast, styleName, unit) {
        var t = new BindingTarget(ELEMENT_STYLE, directiveIndex.elementIndex, styleName, unit, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    }
    static createForTextNode(ast, elementIndex) {
        var t = new BindingTarget(TEXT_NODE, elementIndex, null, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    }
    static createForEvent(ast, eventName, elementIndex) {
        var t = new BindingTarget(EVENT, elementIndex, eventName, null, ast.toString());
        return new BindingRecord(EVENT, t, 0, ast, null, null, null);
    }
    static createForHostEvent(ast, eventName, directiveRecord) {
        var directiveIndex = directiveRecord.directiveIndex;
        var t = new BindingTarget(HOST_EVENT, directiveIndex.elementIndex, eventName, null, ast.toString());
        return new BindingRecord(HOST_EVENT, t, directiveIndex, ast, null, null, directiveRecord);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ19yZWNvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWZveFJUVThmLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2JpbmRpbmdfcmVjb3JkLnRzIl0sIm5hbWVzIjpbIkJpbmRpbmdUYXJnZXQiLCJCaW5kaW5nVGFyZ2V0LmNvbnN0cnVjdG9yIiwiQmluZGluZ1RhcmdldC5pc0RpcmVjdGl2ZSIsIkJpbmRpbmdUYXJnZXQuaXNFbGVtZW50UHJvcGVydHkiLCJCaW5kaW5nVGFyZ2V0LmlzRWxlbWVudEF0dHJpYnV0ZSIsIkJpbmRpbmdUYXJnZXQuaXNFbGVtZW50Q2xhc3MiLCJCaW5kaW5nVGFyZ2V0LmlzRWxlbWVudFN0eWxlIiwiQmluZGluZ1RhcmdldC5pc1RleHROb2RlIiwiQmluZGluZ1JlY29yZCIsIkJpbmRpbmdSZWNvcmQuY29uc3RydWN0b3IiLCJCaW5kaW5nUmVjb3JkLmlzRGlyZWN0aXZlTGlmZWN5Y2xlIiwiQmluZGluZ1JlY29yZC5jYWxsT25DaGFuZ2VzIiwiQmluZGluZ1JlY29yZC5pc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb24iLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZURpcmVjdGl2ZURvQ2hlY2siLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZURpcmVjdGl2ZU9uSW5pdCIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRGlyZWN0aXZlT25DaGFuZ2VzIiwiQmluZGluZ1JlY29yZC5jcmVhdGVGb3JEaXJlY3RpdmUiLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckVsZW1lbnRQcm9wZXJ0eSIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudEF0dHJpYnV0ZSIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudENsYXNzIiwiQmluZGluZ1JlY29yZC5jcmVhdGVGb3JFbGVtZW50U3R5bGUiLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckhvc3RQcm9wZXJ0eSIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdEF0dHJpYnV0ZSIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdENsYXNzIiwiQmluZGluZ1JlY29yZC5jcmVhdGVGb3JIb3N0U3R5bGUiLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvclRleHROb2RlIiwiQmluZGluZ1JlY29yZC5jcmVhdGVGb3JFdmVudCIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdEV2ZW50Il0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSwwQkFBMEI7QUFLM0QsTUFBTSxtQkFBbUIsR0FBRyxvQkFBb0IsQ0FBQztBQUNqRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFFekIsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBQzlCLE1BQU0sZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7QUFDM0MsTUFBTSxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztBQUM3QyxNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUM7QUFDckMsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDO0FBQ3JDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUM3QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUM7QUFDdEIsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDO0FBRS9CO0lBQ0VBLFlBQW1CQSxJQUFZQSxFQUFTQSxZQUFvQkEsRUFBU0EsSUFBWUEsRUFDOURBLElBQVlBLEVBQVNBLEtBQWFBO1FBRGxDQyxTQUFJQSxHQUFKQSxJQUFJQSxDQUFRQTtRQUFTQSxpQkFBWUEsR0FBWkEsWUFBWUEsQ0FBUUE7UUFBU0EsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBUUE7UUFDOURBLFNBQUlBLEdBQUpBLElBQUlBLENBQVFBO1FBQVNBLFVBQUtBLEdBQUxBLEtBQUtBLENBQVFBO0lBQUdBLENBQUNBO0lBRXpERCxXQUFXQSxLQUFjRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxLQUFLQSxTQUFTQSxD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RUEsU0FBaUJBLEVBQzNCQSxlQUFnQ0E7UUFDeERtQixJQUFJQSxjQUFjQSxHQUFHQSxlQUFlQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUNwREEsSUFBSUEsQ0FBQ0EsR0FDREEsSUFBSUEsYUFBYUEsQ0FBQ0EsVUFBVUEsRUFBRUEsY0FBY0EsQ0FBQ0EsWUFBWUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDaEdBLE1BQU1BLENBQUNBLElBQUlBLGFBQWFBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLGNBQWNBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLGVBQWVBLENBQUNBLENBQUNBO0lBQzVGQSxDQUFDQTtBQUNIbkIsQ0FBQ0E7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtTZXR0ZXJGbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi90eXBlcyc7XG5pbXBvcnQge0FTVH0gZnJvbSAnLi9wYXJzZXIvYXN0JztcbmltcG9ydCB7RGlyZWN0aXZlSW5kZXgsIERpcmVjdGl2ZVJlY29yZH0gZnJvbSAnLi9kaXJlY3RpdmVfcmVjb3JkJztcblxuY29uc3QgRElSRUNUSVZFX0xJRkVDWUNMRSA9IFwiZGlyZWN0aXZlTGlmZWN5Y2xlXCI7XG5jb25zdCBCSU5ESU5HID0gXCJuYXRpdmVcIjtcblxuY29uc3QgRElSRUNUSVZFID0gXCJkaXJlY3RpdmVcIjtcbmNvbnN0IEVMRU1FTlRfUFJPUEVSVFkgPSBcImVsZW1lbnRQcm9wZXJ0eVwiO1xuY29uc3QgRUxFTUVOVF9BVFRSSUJVVEUgPSBcImVsZW1lbnRBdHRyaWJ1dGVcIjtcbmNvbnN0IEVMRU1FTlRfQ0xBU1MgPSBcImVsZW1lbnRDbGFzc1wiO1xuY29uc3QgRUxFTUVOVF9TVFlMRSA9IFwiZWxlbWVudFN0eWxlXCI7XG5jb25zdCBURVhUX05PREUgPSBcInRleHROb2RlXCI7XG5jb25zdCBFVkVOVCA9IFwiZXZlbnRcIjtcbmNvbnN0IEhPU1RfRVZFTlQgPSBcImhvc3RFdmVudFwiO1xuXG5leHBvcnQgY2xhc3MgQmluZGluZ1RhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2RlOiBzdHJpbmcsIHB1YmxpYyBlbGVtZW50SW5kZXg6IG51bWJlciwgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgcHVibGljIHVuaXQ6IHN0cmluZywgcHVibGljIGRlYnVnOiBzdHJpbmcpIHt9XG5cbiAgaXNEaXJlY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1vZGUgPT09IERJUkVDVElWRTsgfVxuXG4gIGlzRWxlbWVudFByb3BlcnR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBFTEVNRU5UX1BST1BFUlRZOyB9XG5cbiAgaXNFbGVtZW50QXR0cmlidXRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBFTEVNRU5UX0FUVFJJQlVURTsgfVxuXG4gIGlzRWxlbWVudENsYXNzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBFTEVNRU5UX0NMQVNTOyB9XG5cbiAgaXNFbGVtZW50U3R5bGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1vZGUgPT09IEVMRU1FTlRfU1RZTEU7IH1cblxuICBpc1RleHROb2RlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBURVhUX05PREU7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEJpbmRpbmdSZWNvcmQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kZTogc3RyaW5nLCBwdWJsaWMgdGFyZ2V0OiBCaW5kaW5nVGFyZ2V0LCBwdWJsaWMgaW1wbGljaXRSZWNlaXZlcjogYW55LFxuICAgICAgICAgICAgICBwdWJsaWMgYXN0OiBBU1QsIHB1YmxpYyBzZXR0ZXI6IFNldHRlckZuLCBwdWJsaWMgbGlmZWN5Y2xlRXZlbnQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgcHVibGljIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKSB7fVxuXG4gIGlzRGlyZWN0aXZlTGlmZWN5Y2xlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBESVJFQ1RJVkVfTElGRUNZQ0xFOyB9XG5cbiAgY2FsbE9uQ2hhbmdlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZGlyZWN0aXZlUmVjb3JkKSAmJiB0aGlzLmRpcmVjdGl2ZVJlY29yZC5jYWxsT25DaGFuZ2VzO1xuICB9XG5cbiAgaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0JsYW5rKHRoaXMuZGlyZWN0aXZlUmVjb3JkKSB8fCB0aGlzLmRpcmVjdGl2ZVJlY29yZC5pc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb24oKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVEaXJlY3RpdmVEb0NoZWNrKGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogQmluZGluZ1JlY29yZCB7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKERJUkVDVElWRV9MSUZFQ1lDTEUsIG51bGwsIDAsIG51bGwsIG51bGwsIFwiRG9DaGVja1wiLCBkaXJlY3RpdmVSZWNvcmQpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZURpcmVjdGl2ZU9uSW5pdChkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChESVJFQ1RJVkVfTElGRUNZQ0xFLCBudWxsLCAwLCBudWxsLCBudWxsLCBcIk9uSW5pdFwiLCBkaXJlY3RpdmVSZWNvcmQpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZURpcmVjdGl2ZU9uQ2hhbmdlcyhkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChESVJFQ1RJVkVfTElGRUNZQ0xFLCBudWxsLCAwLCBudWxsLCBudWxsLCBcIk9uQ2hhbmdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVSZWNvcmQpO1xuICB9XG5cblxuXG4gIHN0YXRpYyBjcmVhdGVGb3JEaXJlY3RpdmUoYXN0OiBBU1QsIHByb3BlcnR5TmFtZTogc3RyaW5nLCBzZXR0ZXI6IFNldHRlckZuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIGVsZW1lbnRJbmRleCA9IGRpcmVjdGl2ZVJlY29yZC5kaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXg7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChESVJFQ1RJVkUsIGVsZW1lbnRJbmRleCwgcHJvcGVydHlOYW1lLCBudWxsLCBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKERJUkVDVElWRSwgdCwgMCwgYXN0LCBzZXR0ZXIsIG51bGwsIGRpcmVjdGl2ZVJlY29yZCk7XG4gIH1cblxuXG5cbiAgc3RhdGljIGNyZWF0ZUZvckVsZW1lbnRQcm9wZXJ0eShhc3Q6IEFTVCwgZWxlbWVudEluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfUFJPUEVSVFksIGVsZW1lbnRJbmRleCwgcHJvcGVydHlOYW1lLCBudWxsLCBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIDAsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRm9yRWxlbWVudEF0dHJpYnV0ZShhc3Q6IEFTVCwgZWxlbWVudEluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRUxFTUVOVF9BVFRSSUJVVEUsIGVsZW1lbnRJbmRleCwgYXR0cmlidXRlTmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChCSU5ESU5HLCB0LCAwLCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZvckVsZW1lbnRDbGFzcyhhc3Q6IEFTVCwgZWxlbWVudEluZGV4OiBudW1iZXIsIGNsYXNzTmFtZTogc3RyaW5nKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChFTEVNRU5UX0NMQVNTLCBlbGVtZW50SW5kZXgsIGNsYXNzTmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChCSU5ESU5HLCB0LCAwLCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZvckVsZW1lbnRTdHlsZShhc3Q6IEFTVCwgZWxlbWVudEluZGV4OiBudW1iZXIsIHN0eWxlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IHN0cmluZyk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRUxFTUVOVF9TVFlMRSwgZWxlbWVudEluZGV4LCBzdHlsZU5hbWUsIHVuaXQsIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgMCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG5cblxuICBzdGF0aWMgY3JlYXRlRm9ySG9zdFByb3BlcnR5KGRpcmVjdGl2ZUluZGV4OiBEaXJlY3RpdmVJbmRleCwgYXN0OiBBU1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfUFJPUEVSVFksIGRpcmVjdGl2ZUluZGV4LmVsZW1lbnRJbmRleCwgcHJvcGVydHlOYW1lLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChCSU5ESU5HLCB0LCBkaXJlY3RpdmVJbmRleCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JIb3N0QXR0cmlidXRlKGRpcmVjdGl2ZUluZGV4OiBEaXJlY3RpdmVJbmRleCwgYXN0OiBBU1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRUxFTUVOVF9BVFRSSUJVVEUsIGRpcmVjdGl2ZUluZGV4LmVsZW1lbnRJbmRleCwgYXR0cmlidXRlTmFtZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgZGlyZWN0aXZlSW5kZXgsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRm9ySG9zdENsYXNzKGRpcmVjdGl2ZUluZGV4OiBEaXJlY3RpdmVJbmRleCwgYXN0OiBBU1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfQ0xBU1MsIGRpcmVjdGl2ZUluZGV4LmVsZW1lbnRJbmRleCwgY2xhc3NOYW1lLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChCSU5ESU5HLCB0LCBkaXJlY3RpdmVJbmRleCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JIb3N0U3R5bGUoZGlyZWN0aXZlSW5kZXg6IERpcmVjdGl2ZUluZGV4LCBhc3Q6IEFTVCwgc3R5bGVOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdDogc3RyaW5nKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChFTEVNRU5UX1NUWUxFLCBkaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIHN0eWxlTmFtZSwgdW5pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgZGlyZWN0aXZlSW5kZXgsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuXG5cbiAgc3RhdGljIGNyZWF0ZUZvclRleHROb2RlKGFzdDogQVNULCBlbGVtZW50SW5kZXg6IG51bWJlcik6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoVEVYVF9OT0RFLCBlbGVtZW50SW5kZXgsIG51bGwsIG51bGwsIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgMCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG5cblxuICBzdGF0aWMgY3JlYXRlRm9yRXZlbnQoYXN0OiBBU1QsIGV2ZW50TmFtZTogc3RyaW5nLCBlbGVtZW50SW5kZXg6IG51bWJlcik6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRVZFTlQsIGVsZW1lbnRJbmRleCwgZXZlbnROYW1lLCBudWxsLCBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEVWRU5ULCB0LCAwLCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZvckhvc3RFdmVudChhc3Q6IEFTVCwgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlUmVjb3JkOiBEaXJlY3RpdmVSZWNvcmQpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgZGlyZWN0aXZlSW5kZXggPSBkaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXg7XG4gICAgdmFyIHQgPVxuICAgICAgICBuZXcgQmluZGluZ1RhcmdldChIT1NUX0VWRU5ULCBkaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIGV2ZW50TmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChIT1NUX0VWRU5ULCB0LCBkaXJlY3RpdmVJbmRleCwgYXN0LCBudWxsLCBudWxsLCBkaXJlY3RpdmVSZWNvcmQpO1xuICB9XG59XG4iXX0=