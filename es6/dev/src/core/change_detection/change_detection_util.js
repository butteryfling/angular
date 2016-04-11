import { CONST_EXPR, isPresent, isBlank, looseIdentical, isPrimitive } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { StringMapWrapper, isListLikeIterable, areIterablesEqual } from 'angular2/src/facade/collection';
import { ChangeDetectionStrategy, isDefaultChangeDetectionStrategy } from './constants';
import { implementsOnDestroy } from './pipe_lifecycle_reflector';
import { BindingTarget } from './binding_record';
import { DirectiveIndex } from './directive_record';
/**
 * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 */
export class WrappedValue {
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    static wrap(value) {
        var w = _wrappedValues[_wrappedIndex++ % 5];
        w.wrapped = value;
        return w;
    }
}
var _wrappedValues = [
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null)
];
var _wrappedIndex = 0;
/**
 * Represents a basic change from a previous to a new value.
 */
export class SimpleChange {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    isFirstChange() { return this.previousValue === ChangeDetectionUtil.uninitialized; }
}
function _simpleChange(previousValue, currentValue) {
    return new SimpleChange(previousValue, currentValue);
}
/* tslint:disable:requireParameterType */
export class ChangeDetectionUtil {
    static arrayFn0() { return []; }
    static arrayFn1(a1) { return [a1]; }
    static arrayFn2(a1, a2) { return [a1, a2]; }
    static arrayFn3(a1, a2, a3) { return [a1, a2, a3]; }
    static arrayFn4(a1, a2, a3, a4) { return [a1, a2, a3, a4]; }
    static arrayFn5(a1, a2, a3, a4, a5) { return [a1, a2, a3, a4, a5]; }
    static arrayFn6(a1, a2, a3, a4, a5, a6) { return [a1, a2, a3, a4, a5, a6]; }
    static arrayFn7(a1, a2, a3, a4, a5, a6, a7) { return [a1, a2, a3, a4, a5, a6, a7]; }
    static arrayFn8(a1, a2, a3, a4, a5, a6, a7, a8) {
        return [a1, a2, a3, a4, a5, a6, a7, a8];
    }
    static arrayFn9(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return [a1, a2, a3, a4, a5, a6, a7, a8, a9];
    }
    static operation_negate(value) { return !value; }
    static operation_add(left, right) { return left + right; }
    static operation_subtract(left, right) { return left - right; }
    static operation_multiply(left, right) { return left * right; }
    static operation_divide(left, right) { return left / right; }
    static operation_remainder(left, right) { return left % right; }
    static operation_equals(left, right) { return left == right; }
    static operation_not_equals(left, right) { return left != right; }
    static operation_identical(left, right) { return left === right; }
    static operation_not_identical(left, right) { return left !== right; }
    static operation_less_then(left, right) { return left < right; }
    static operation_greater_then(left, right) { return left > right; }
    static operation_less_or_equals_then(left, right) { return left <= right; }
    static operation_greater_or_equals_then(left, right) { return left >= right; }
    static cond(cond, trueVal, falseVal) { return cond ? trueVal : falseVal; }
    static mapFn(keys) {
        function buildMap(values) {
            var res = StringMapWrapper.create();
            for (var i = 0; i < keys.length; ++i) {
                StringMapWrapper.set(res, keys[i], values[i]);
            }
            return res;
        }
        switch (keys.length) {
            case 0:
                return () => [];
            case 1:
                return (a1) => buildMap([a1]);
            case 2:
                return (a1, a2) => buildMap([a1, a2]);
            case 3:
                return (a1, a2, a3) => buildMap([a1, a2, a3]);
            case 4:
                return (a1, a2, a3, a4) => buildMap([a1, a2, a3, a4]);
            case 5:
                return (a1, a2, a3, a4, a5) => buildMap([a1, a2, a3, a4, a5]);
            case 6:
                return (a1, a2, a3, a4, a5, a6) => buildMap([a1, a2, a3, a4, a5, a6]);
            case 7:
                return (a1, a2, a3, a4, a5, a6, a7) => buildMap([a1, a2, a3, a4, a5, a6, a7]);
            case 8:
                return (a1, a2, a3, a4, a5, a6, a7, a8) => buildMap([a1, a2, a3, a4, a5, a6, a7, a8]);
            case 9:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9) => buildMap([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
            default:
                throw new BaseException(`Does not support literal maps with more than 9 elements`);
        }
    }
    static keyedAccess(obj, args) { return obj[args[0]]; }
    static unwrapValue(value) {
        if (value instanceof WrappedValue) {
            return value.wrapped;
        }
        else {
            return value;
        }
    }
    static changeDetectionMode(strategy) {
        return isDefaultChangeDetectionStrategy(strategy) ? ChangeDetectionStrategy.CheckAlways :
            ChangeDetectionStrategy.CheckOnce;
    }
    static simpleChange(previousValue, currentValue) {
        return _simpleChange(previousValue, currentValue);
    }
    static isValueBlank(value) { return isBlank(value); }
    static s(value) { return isPresent(value) ? `${value}` : ''; }
    static protoByIndex(protos, selfIndex) {
        return selfIndex < 1 ?
            null :
            protos[selfIndex - 1]; // self index is shifted by one because of context
    }
    static callPipeOnDestroy(selectedPipe) {
        if (implementsOnDestroy(selectedPipe.pipe)) {
            selectedPipe.pipe.ngOnDestroy();
        }
    }
    static bindingTarget(mode, elementIndex, name, unit, debug) {
        return new BindingTarget(mode, elementIndex, name, unit, debug);
    }
    static directiveIndex(elementIndex, directiveIndex) {
        return new DirectiveIndex(elementIndex, directiveIndex);
    }
    static looseNotIdentical(a, b) { return !looseIdentical(a, b); }
    static devModeEqual(a, b) {
        if (isListLikeIterable(a) && isListLikeIterable(b)) {
            return areIterablesEqual(a, b, ChangeDetectionUtil.devModeEqual);
        }
        else if (!isListLikeIterable(a) && !isPrimitive(a) && !isListLikeIterable(b) &&
            !isPrimitive(b)) {
            return true;
        }
        else {
            return looseIdentical(a, b);
        }
    }
}
ChangeDetectionUtil.uninitialized = CONST_EXPR(new Object());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1mb3hSVFU4Zi50bXAvYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwudHMiXSwibmFtZXMiOlsiV3JhcHBlZFZhbHVlIiwiV3JhcHBlZFZhbHVlLmNvbnN0cnVjdG9yIiwiV3JhcHBlZFZhbHVlLndyYXAiLCJTaW1wbGVDaGFuZ2UiLCJTaW1wbGVDaGFuZ2UuY29uc3RydWN0b3IiLCJTaW1wbGVDaGFuZ2UuaXNGaXJzdENoYW5nZSIsIl9zaW1wbGVDaGFuZ2UiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuMCIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjEiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm4yIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuMyIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjQiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm41IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuNiIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjciLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm44IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuOSIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX25lZ2F0ZSIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2FkZCIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX3N1YnRyYWN0IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fbXVsdGlwbHkiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9kaXZpZGUiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9yZW1haW5kZXIiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9lcXVhbHMiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9ub3RfZXF1YWxzIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25faWRlbnRpY2FsIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fbm90X2lkZW50aWNhbCIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2xlc3NfdGhlbiIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2dyZWF0ZXJfdGhlbiIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2xlc3Nfb3JfZXF1YWxzX3RoZW4iLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9ncmVhdGVyX29yX2VxdWFsc190aGVuIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5jb25kIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5tYXBGbiIsIkNoYW5nZURldGVjdGlvblV0aWwubWFwRm4uYnVpbGRNYXAiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmtleWVkQWNjZXNzIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC51bndyYXBWYWx1ZSIsIkNoYW5nZURldGVjdGlvblV0aWwuY2hhbmdlRGV0ZWN0aW9uTW9kZSIsIkNoYW5nZURldGVjdGlvblV0aWwuc2ltcGxlQ2hhbmdlIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5pc1ZhbHVlQmxhbmsiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLnMiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLnByb3RvQnlJbmRleCIsIkNoYW5nZURldGVjdGlvblV0aWwuY2FsbFBpcGVPbkRlc3Ryb3kiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmJpbmRpbmdUYXJnZXQiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmRpcmVjdGl2ZUluZGV4IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5sb29zZU5vdElkZW50aWNhbCIsIkNoYW5nZURldGVjdGlvblV0aWwuZGV2TW9kZUVxdWFsIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUdQLGNBQWMsRUFDZCxXQUFXLEVBQ1osTUFBTSwwQkFBMEI7T0FDMUIsRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckQsRUFHTCxnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNsQixNQUFNLGdDQUFnQztPQUVoQyxFQUFDLHVCQUF1QixFQUFFLGdDQUFnQyxFQUFDLE1BQU0sYUFBYTtPQUM5RSxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNEJBQTRCO09BQ3ZELEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCO09BQ3ZDLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CO0FBSWpEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNIO0lBQ0VBLFlBQW1CQSxPQUFZQTtRQUFaQyxZQUFPQSxHQUFQQSxPQUFPQSxDQUFLQTtJQUFHQSxDQUFDQTtJQUVuQ0QsT0FBT0EsSUFBSUEsQ0FBQ0EsS0FBVUE7UUFDcEJFLElBQUlBLENBQUNBLEdBQUdBLGNBQWNBLENBQUNBLGFBQWFBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQzVDQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNsQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDWEEsQ0FBQ0E7QUFDSEYsQ0FBQ0E7QUFFRCxJQUFJLGNBQWMsR0FBRztJQUNuQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDdEIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3RCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQztJQUN0QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDdEIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO0NBQ3ZCLENBQUM7QUFFRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFFdEI7O0dBRUc7QUFDSDtJQUNFRyxZQUFtQkEsYUFBa0JBLEVBQVNBLFlBQWlCQTtRQUE1Q0Msa0JBQWFBLEdBQWJBLGFBQWFBLENBQUtBO1FBQVNBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFLQTtJQUFHQSxDQUFDQTtJQUVuRUQ7O09BRUdBO0lBQ0hBLGFBQWFBLEtBQWNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLEtBQUtBLG1CQUFtQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDL0ZGLENBQUNBO0FBRUQsdUJBQXVCLGFBQWEsRUFBRSxZQUFZO0lBQ2hERyxNQUFNQSxDQUFDQSxJQUFJQSxZQUFZQSxDQUFDQSxhQUFhQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtBQUN2REEsQ0FBQ0E7QUFFRCx5Q0FBeUM7QUFDekM7SUFHRUMsT0FBT0EsUUFBUUEsS0FBWUMsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDdkNELE9BQU9BLFFBQVFBLENBQUNBLEVBQUVBLElBQVdFLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQzNDRixPQUFPQSxRQUFRQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXRyxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNuREgsT0FBT0EsUUFBUUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBV0ksTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDM0RKLE9BQU9BLFFBQVFBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQVdLLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ25FTCxPQUFPQSxRQUFRQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXTSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMzRU4sT0FBT0EsUUFBUUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBV08sTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDbkZQLE9BQU9BLFFBQVFBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQVdRLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQzNGUixPQUFPQSxRQUFRQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQTtRQUM1Q1MsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBQ0RULE9BQU9BLFFBQVFBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVB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QUFFQSxDQUFDQTtZQUNwQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ3JDQSxnQkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNiQSxDQUFDQTtRQUVERCxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsS0FBS0EsQ0FBQ0E7Z0JBQ0pBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBQ2xCQSxLQUFLQSxDQUFDQTtnQkFDSkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLEtBQUtBLENBQUNBO2dCQUNKQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4Q0EsS0FBS0EsQ0FBQ0E7Z0JBQ0pBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hEQSxLQUFLQSxDQUFDQTtnQkFDSkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeERBLEtBQUtBLENBQUNBO2dCQUNKQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoRUEsS0FBS0EsQ0FBQ0E7Z0JBQ0pBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hFQSxLQUFLQSxDQUFDQTtnQkFDSkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEZBLEtBQUtBLENBQUNBO2dCQUNKQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxF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LENBQUNBO0FBL0hRLGlDQUFhLEdBQVcsVUFBVSxDQUFTLElBQUksTUFBTSxFQUFFLENBQUMsQ0ErSGhFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ09OU1RfRVhQUixcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBUeXBlLFxuICBTdHJpbmdXcmFwcGVyLFxuICBsb29zZUlkZW50aWNhbCxcbiAgaXNQcmltaXRpdmVcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7XG4gIExpc3RXcmFwcGVyLFxuICBNYXBXcmFwcGVyLFxuICBTdHJpbmdNYXBXcmFwcGVyLFxuICBpc0xpc3RMaWtlSXRlcmFibGUsXG4gIGFyZUl0ZXJhYmxlc0VxdWFsXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1Byb3RvUmVjb3JkfSBmcm9tICcuL3Byb3RvX3JlY29yZCc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBpc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtpbXBsZW1lbnRzT25EZXN0cm95fSBmcm9tICcuL3BpcGVfbGlmZWN5Y2xlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0JpbmRpbmdUYXJnZXR9IGZyb20gJy4vYmluZGluZ19yZWNvcmQnO1xuaW1wb3J0IHtEaXJlY3RpdmVJbmRleH0gZnJvbSAnLi9kaXJlY3RpdmVfcmVjb3JkJztcbmltcG9ydCB7U2VsZWN0ZWRQaXBlfSBmcm9tICcuL3BpcGVzJztcblxuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IHRoZSByZXN1bHQgb2YgYSB7QGxpbmsgUGlwZU1ldGFkYXRhfSB0cmFuc2Zvcm1hdGlvbiBoYXMgY2hhbmdlZCBldmVuIHRob3VnaCB0aGVcbiAqIHJlZmVyZW5jZVxuICogaGFzIG5vdCBjaGFuZ2VkLlxuICpcbiAqIFRoZSB3cmFwcGVkIHZhbHVlIHdpbGwgYmUgdW53cmFwcGVkIGJ5IGNoYW5nZSBkZXRlY3Rpb24sIGFuZCB0aGUgdW53cmFwcGVkIHZhbHVlIHdpbGwgYmUgc3RvcmVkLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBpZiAodGhpcy5fbGF0ZXN0VmFsdWUgPT09IHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUpIHtcbiAqICAgIHJldHVybiB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlO1xuICogIH0gZWxzZSB7XG4gKiAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XG4gKiAgICByZXR1cm4gV3JhcHBlZFZhbHVlLndyYXAodGhpcy5fbGF0ZXN0VmFsdWUpOyAvLyB0aGlzIHdpbGwgZm9yY2UgdXBkYXRlXG4gKiAgfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBXcmFwcGVkVmFsdWUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgd3JhcHBlZDogYW55KSB7fVxuXG4gIHN0YXRpYyB3cmFwKHZhbHVlOiBhbnkpOiBXcmFwcGVkVmFsdWUge1xuICAgIHZhciB3ID0gX3dyYXBwZWRWYWx1ZXNbX3dyYXBwZWRJbmRleCsrICUgNV07XG4gICAgdy53cmFwcGVkID0gdmFsdWU7XG4gICAgcmV0dXJuIHc7XG4gIH1cbn1cblxudmFyIF93cmFwcGVkVmFsdWVzID0gW1xuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpLFxuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpLFxuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpLFxuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpLFxuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpXG5dO1xuXG52YXIgX3dyYXBwZWRJbmRleCA9IDA7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGJhc2ljIGNoYW5nZSBmcm9tIGEgcHJldmlvdXMgdG8gYSBuZXcgdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJldmlvdXNWYWx1ZTogYW55LCBwdWJsaWMgY3VycmVudFZhbHVlOiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlIG5ldyB2YWx1ZSBpcyB0aGUgZmlyc3QgdmFsdWUgYXNzaWduZWQuXG4gICAqL1xuICBpc0ZpcnN0Q2hhbmdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wcmV2aW91c1ZhbHVlID09PSBDaGFuZ2VEZXRlY3Rpb25VdGlsLnVuaW5pdGlhbGl6ZWQ7IH1cbn1cblxuZnVuY3Rpb24gX3NpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpOiBTaW1wbGVDaGFuZ2Uge1xuICByZXR1cm4gbmV3IFNpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpO1xufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTpyZXF1aXJlUGFyYW1ldGVyVHlwZSAqL1xuZXhwb3J0IGNsYXNzIENoYW5nZURldGVjdGlvblV0aWwge1xuICBzdGF0aWMgdW5pbml0aWFsaXplZDogT2JqZWN0ID0gQ09OU1RfRVhQUjxPYmplY3Q+KG5ldyBPYmplY3QoKSk7XG5cbiAgc3RhdGljIGFycmF5Rm4wKCk6IGFueVtdIHsgcmV0dXJuIFtdOyB9XG4gIHN0YXRpYyBhcnJheUZuMShhMSk6IGFueVtdIHsgcmV0dXJuIFthMV07IH1cbiAgc3RhdGljIGFycmF5Rm4yKGExLCBhMik6IGFueVtdIHsgcmV0dXJuIFthMSwgYTJdOyB9XG4gIHN0YXRpYyBhcnJheUZuMyhhMSwgYTIsIGEzKTogYW55W10geyByZXR1cm4gW2ExLCBhMiwgYTNdOyB9XG4gIHN0YXRpYyBhcnJheUZuNChhMSwgYTIsIGEzLCBhNCk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNF07IH1cbiAgc3RhdGljIGFycmF5Rm41KGExLCBhMiwgYTMsIGE0LCBhNSk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTVdOyB9XG4gIHN0YXRpYyBhcnJheUZuNihhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KTogYW55W10geyByZXR1cm4gW2ExLCBhMiwgYTMsIGE0LCBhNSwgYTZdOyB9XG4gIHN0YXRpYyBhcnJheUZuNyhhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNyk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhN107IH1cbiAgc3RhdGljIGFycmF5Rm44KGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCk6IGFueVtdIHtcbiAgICByZXR1cm4gW2ExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOF07XG4gIH1cbiAgc3RhdGljIGFycmF5Rm45KGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5XTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVyYXRpb25fbmVnYXRlKHZhbHVlKTogYW55IHsgcmV0dXJuICF2YWx1ZTsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2FkZChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICsgcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9zdWJ0cmFjdChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0IC0gcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9tdWx0aXBseShsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICogcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9kaXZpZGUobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAvIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fcmVtYWluZGVyKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgJSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2VxdWFscyhsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ID09IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbm90X2VxdWFscyhsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICE9IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25faWRlbnRpY2FsKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgPT09IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbm90X2lkZW50aWNhbChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICE9PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2xlc3NfdGhlbihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0IDwgcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9ncmVhdGVyX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA+IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbGVzc19vcl9lcXVhbHNfdGhlbihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0IDw9IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fZ3JlYXRlcl9vcl9lcXVhbHNfdGhlbihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ID49IHJpZ2h0OyB9XG4gIHN0YXRpYyBjb25kKGNvbmQsIHRydWVWYWwsIGZhbHNlVmFsKTogYW55IHsgcmV0dXJuIGNvbmQgPyB0cnVlVmFsIDogZmFsc2VWYWw7IH1cblxuICBzdGF0aWMgbWFwRm4oa2V5czogYW55W10pOiBhbnkge1xuICAgIGZ1bmN0aW9uIGJ1aWxkTWFwKHZhbHVlcyk6IHtbazogLyphbnkqLyBzdHJpbmddOiBhbnl9IHtcbiAgICAgIHZhciByZXMgPSBTdHJpbmdNYXBXcmFwcGVyLmNyZWF0ZSgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJlcywga2V5c1tpXSwgdmFsdWVzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgc3dpdGNoIChrZXlzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gKCkgPT4gW107XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiAoYTEpID0+IGJ1aWxkTWFwKFthMV0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gKGExLCBhMikgPT4gYnVpbGRNYXAoW2ExLCBhMl0pO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzXSk7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiAoYTEsIGEyLCBhMywgYTQpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNF0pO1xuICAgICAgY2FzZSA1OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSkgPT4gYnVpbGRNYXAoW2ExLCBhMiwgYTMsIGE0LCBhNV0pO1xuICAgICAgY2FzZSA2OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2XSk7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIHJldHVybiAoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhN10pO1xuICAgICAgY2FzZSA4OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkgPT4gYnVpbGRNYXAoW2ExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOF0pO1xuICAgICAgY2FzZSA5OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpID0+XG4gICAgICAgICAgICAgICAgICAgYnVpbGRNYXAoW2ExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTldKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBEb2VzIG5vdCBzdXBwb3J0IGxpdGVyYWwgbWFwcyB3aXRoIG1vcmUgdGhhbiA5IGVsZW1lbnRzYCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGtleWVkQWNjZXNzKG9iaiwgYXJncyk6IGFueSB7IHJldHVybiBvYmpbYXJnc1swXV07IH1cblxuICBzdGF0aWMgdW53cmFwVmFsdWUodmFsdWU6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgV3JhcHBlZFZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUud3JhcHBlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjaGFuZ2VEZXRlY3Rpb25Nb2RlKHN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSk6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHtcbiAgICByZXR1cm4gaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3koc3RyYXRlZ3kpID8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tBbHdheXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5DaGVja09uY2U7XG4gIH1cblxuICBzdGF0aWMgc2ltcGxlQ2hhbmdlKHByZXZpb3VzVmFsdWU6IGFueSwgY3VycmVudFZhbHVlOiBhbnkpOiBTaW1wbGVDaGFuZ2Uge1xuICAgIHJldHVybiBfc2ltcGxlQ2hhbmdlKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSk7XG4gIH1cblxuICBzdGF0aWMgaXNWYWx1ZUJsYW5rKHZhbHVlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIGlzQmxhbmsodmFsdWUpOyB9XG5cbiAgc3RhdGljIHModmFsdWU6IGFueSk6IHN0cmluZyB7IHJldHVybiBpc1ByZXNlbnQodmFsdWUpID8gYCR7dmFsdWV9YCA6ICcnOyB9XG5cbiAgc3RhdGljIHByb3RvQnlJbmRleChwcm90b3M6IFByb3RvUmVjb3JkW10sIHNlbGZJbmRleDogbnVtYmVyKTogUHJvdG9SZWNvcmQge1xuICAgIHJldHVybiBzZWxmSW5kZXggPCAxID9cbiAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgcHJvdG9zW3NlbGZJbmRleCAtIDFdOyAgLy8gc2VsZiBpbmRleCBpcyBzaGlmdGVkIGJ5IG9uZSBiZWNhdXNlIG9mIGNvbnRleHRcbiAgfVxuXG4gIHN0YXRpYyBjYWxsUGlwZU9uRGVzdHJveShzZWxlY3RlZFBpcGU6IFNlbGVjdGVkUGlwZSk6IHZvaWQge1xuICAgIGlmIChpbXBsZW1lbnRzT25EZXN0cm95KHNlbGVjdGVkUGlwZS5waXBlKSkge1xuICAgICAgKDxhbnk+c2VsZWN0ZWRQaXBlLnBpcGUpLm5nT25EZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGJpbmRpbmdUYXJnZXQobW9kZTogc3RyaW5nLCBlbGVtZW50SW5kZXg6IG51bWJlciwgbmFtZTogc3RyaW5nLCB1bml0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgIGRlYnVnOiBzdHJpbmcpOiBCaW5kaW5nVGFyZ2V0IHtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdUYXJnZXQobW9kZSwgZWxlbWVudEluZGV4LCBuYW1lLCB1bml0LCBkZWJ1Zyk7XG4gIH1cblxuICBzdGF0aWMgZGlyZWN0aXZlSW5kZXgoZWxlbWVudEluZGV4OiBudW1iZXIsIGRpcmVjdGl2ZUluZGV4OiBudW1iZXIpOiBEaXJlY3RpdmVJbmRleCB7XG4gICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVJbmRleChlbGVtZW50SW5kZXgsIGRpcmVjdGl2ZUluZGV4KTtcbiAgfVxuXG4gIHN0YXRpYyBsb29zZU5vdElkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gIWxvb3NlSWRlbnRpY2FsKGEsIGIpOyB9XG5cbiAgc3RhdGljIGRldk1vZGVFcXVhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmIChpc0xpc3RMaWtlSXRlcmFibGUoYSkgJiYgaXNMaXN0TGlrZUl0ZXJhYmxlKGIpKSB7XG4gICAgICByZXR1cm4gYXJlSXRlcmFibGVzRXF1YWwoYSwgYiwgQ2hhbmdlRGV0ZWN0aW9uVXRpbC5kZXZNb2RlRXF1YWwpO1xuXG4gICAgfSBlbHNlIGlmICghaXNMaXN0TGlrZUl0ZXJhYmxlKGEpICYmICFpc1ByaW1pdGl2ZShhKSAmJiAhaXNMaXN0TGlrZUl0ZXJhYmxlKGIpICYmXG4gICAgICAgICAgICAgICAhaXNQcmltaXRpdmUoYikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsb29zZUlkZW50aWNhbChhLCBiKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==