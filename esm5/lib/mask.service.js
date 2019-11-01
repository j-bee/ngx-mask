/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config } from './config';
import { MaskApplierService } from './mask-applier.service';
var MaskService = /** @class */ (function (_super) {
    tslib_1.__extends(MaskService, _super);
    function MaskService(document, _config, _elementRef, _renderer) {
        var _this = _super.call(this, _config) || this;
        _this.document = document;
        _this._config = _config;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        _this.validation = true;
        _this.maskExpression = '';
        _this.isNumberValue = false;
        _this.showMaskTyped = false;
        _this.placeHolderCharacter = '_';
        _this.maskIsShown = '';
        _this.selStart = null;
        _this.selEnd = null;
        // tslint:disable-next-line
        _this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        _this._formElement = _this._elementRef.nativeElement;
        return _this;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyMask = 
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        var _this = this;
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        if (!maskExpression) {
            return inputValue;
        }
        this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';
        if (this.maskExpression === 'IP' && this.showMaskTyped) {
            this.maskIsShown = this.showMaskInInput(inputValue || '#');
        }
        if (!inputValue && this.showMaskTyped) {
            this.formControlResult(this.prefix);
            return this.prefix + this.maskIsShown;
        }
        /** @type {?} */
        var getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
        /** @type {?} */
        var newInputValue = '';
        if (this.hiddenInput !== undefined) {
            /** @type {?} */
            var actualResult = this.actualValue.split('');
            // tslint:disable no-unused-expression
            inputValue !== '' && actualResult.length
                ? typeof this.selStart === 'number' && typeof this.selEnd === 'number'
                    ? inputValue.length > actualResult.length
                        ? actualResult.splice(this.selStart, 0, getSymbol)
                        : inputValue.length < actualResult.length
                            ? actualResult.length - inputValue.length === 1
                                ? actualResult.splice(this.selStart - 1, 1)
                                : actualResult.splice(this.selStart, this.selEnd - this.selStart)
                            : null
                    : null
                : (actualResult = []);
            // tslint:enable no-unused-expression
            newInputValue = this.actualValue.length ? this.shiftTypedSymbols(actualResult.join('')) : inputValue;
        }
        newInputValue = Boolean(newInputValue) && newInputValue.length ? newInputValue : inputValue;
        /** @type {?} */
        var result = _super.prototype.applyMask.call(this, newInputValue, maskExpression, position, cb);
        this.actualValue = this.getActualValue(result);
        // handle some separator implications:
        // a.) adjust decimalMarker default (. -> ,) if thousandSeparator is a dot
        if (this.thousandSeparator === '.' && this.decimalMarker === '.') {
            this.decimalMarker = ',';
        }
        // b) remove decimal marker from list of special characters to mask
        if (this.maskExpression.startsWith('separator') && this.dropSpecialCharacters === true) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item !== _this.decimalMarker; }));
        }
        this.formControlResult(result);
        if (!this.showMaskTyped) {
            if (this.hiddenInput) {
                return result && result.length ? this.hideInput(result, this.maskExpression) : result;
            }
            return result;
        }
        /** @type {?} */
        var resLen = result.length;
        /** @type {?} */
        var prefNmask = this.prefix + this.maskIsShown;
        return result + (this.maskExpression === 'IP' ? prefNmask : prefNmask.slice(resLen));
    };
    /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyValueChanges = /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        this._formElement.value = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    };
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    MaskService.prototype.hideInput = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    function (inputValue, maskExpression) {
        var _this = this;
        return inputValue
            .split('')
            .map((/**
         * @param {?} curr
         * @param {?} index
         * @return {?}
         */
        function (curr, index) {
            if (_this.maskAvailablePatterns &&
                _this.maskAvailablePatterns[maskExpression[index]] &&
                _this.maskAvailablePatterns[maskExpression[index]].symbol) {
                return _this.maskAvailablePatterns[maskExpression[index]].symbol;
            }
            return curr;
        }))
            .join('');
    };
    // this function is not necessary, it checks result against maskExpression
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    MaskService.prototype.getActualValue = 
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        var _this = this;
        /** @type {?} */
        var compare = res
            .split('')
            .filter((/**
         * @param {?} symbol
         * @param {?} i
         * @return {?}
         */
        function (symbol, i) {
            return _this._checkSymbolMask(symbol, _this.maskExpression[i]) ||
                (_this.maskSpecialCharacters.includes(_this.maskExpression[i]) && symbol === _this.maskExpression[i]);
        }));
        if (compare.join('') === res) {
            return compare.join('');
        }
        return res;
    };
    /**
     * @param {?} inputValue
     * @return {?}
     */
    MaskService.prototype.shiftTypedSymbols = /**
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        var _this = this;
        /** @type {?} */
        var symbolToReplace = '';
        /** @type {?} */
        var newInputValue = (inputValue &&
            inputValue.split('').map((/**
             * @param {?} currSymbol
             * @param {?} index
             * @return {?}
             */
            function (currSymbol, index) {
                if (_this.maskSpecialCharacters.includes(inputValue[index + 1]) &&
                    inputValue[index + 1] !== _this.maskExpression[index + 1]) {
                    symbolToReplace = currSymbol;
                    return inputValue[index + 1];
                }
                if (symbolToReplace.length) {
                    /** @type {?} */
                    var replaceSymbol = symbolToReplace;
                    symbolToReplace = '';
                    return replaceSymbol;
                }
                return currSymbol;
            }))) ||
            [];
        return newInputValue.join('');
    };
    /**
     * @param {?=} inputVal
     * @return {?}
     */
    MaskService.prototype.showMaskInInput = /**
     * @param {?=} inputVal
     * @return {?}
     */
    function (inputVal) {
        if (this.showMaskTyped && !!this.shownMaskExpression) {
            if (this.maskExpression.length !== this.shownMaskExpression.length) {
                throw new Error('Mask expression must match mask placeholder length');
            }
            else {
                return this.shownMaskExpression;
            }
        }
        else if (this.showMaskTyped) {
            if (inputVal) {
                return this._checkForIp(inputVal);
            }
            return this.maskExpression.replace(/\w/g, this.placeHolderCharacter);
        }
        return '';
    };
    /**
     * @return {?}
     */
    MaskService.prototype.clearIfNotMatchFn = /**
     * @return {?}
     */
    function () {
        if (this.clearIfNotMatch &&
            this.prefix.length + this.maskExpression.length + this.suffix.length !==
                this._formElement.value.replace(/_/g, '').length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    };
    Object.defineProperty(MaskService.prototype, "formElementProperty", {
        set: /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), name = _b[0], value = _b[1];
            this._renderer.setProperty(this._formElement, name, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} mask
     * @return {?}
     */
    MaskService.prototype.checkSpecialCharAmount = /**
     * @param {?} mask
     * @return {?}
     */
    function (mask) {
        var _this = this;
        /** @type {?} */
        var chars = mask.split('').filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this._findSpecialChar(item); }));
        return chars.length;
    };
    /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    MaskService.prototype._checkForIp = /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    function (inputVal) {
        if (inputVal === '#') {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        /** @type {?} */
        var arr = [];
        for (var i = 0; i < inputVal.length; i++) {
            if (inputVal[i].match('\\d')) {
                arr.push(inputVal[i]);
            }
        }
        if (arr.length <= 3) {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        if (arr.length > 3 && arr.length <= 6) {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        if (arr.length > 6 && arr.length <= 9) {
            return this.placeHolderCharacter;
        }
        if (arr.length > 9 && arr.length <= 12) {
            return '';
        }
        return '';
    };
    /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    MaskService.prototype.formControlResult = /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        if (Array.isArray(this.dropSpecialCharacters)) {
            this.onChange(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters));
        }
        else if (this.dropSpecialCharacters) {
            this.onChange(this._checkSymbols(inputValue));
        }
        else {
            this.onChange(this._removeSuffix(this._removePrefix(inputValue)));
        }
    };
    /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._removeMask = /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (value, specialCharactersForRemove) {
        return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removePrefix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.prefix) {
            return value;
        }
        return value ? value.replace(this.prefix, '') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removeSuffix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.suffix) {
            return value;
        }
        return value ? value.replace(this.suffix, '') : value;
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    MaskService.prototype._retrieveSeparatorValue = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
    };
    /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._regExpForRemove = /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return "\\" + item; })).join('|'), 'gi');
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    MaskService.prototype._checkSymbols = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        if (result === '') {
            return result;
        }
        /** @type {?} */
        var separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);
        /** @type {?} */
        var separatorValue = this._retrieveSeparatorValue(result);
        if (this.decimalMarker !== '.') {
            separatorValue = separatorValue.replace(this.decimalMarker, '.');
        }
        if (this.isNumberValue) {
            if (separatorPrecision) {
                if (result === this.decimalMarker) {
                    return null;
                }
                return this._checkPrecision(this.maskExpression, separatorValue);
            }
            else {
                return Number(separatorValue);
            }
        }
        else {
            return separatorValue;
        }
    };
    // TODO should think about helpers or separting decimal precision to own property
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    MaskService.prototype._retrieveSeparatorPrecision = 
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    function (maskExpretion) {
        /** @type {?} */
        var matcher = maskExpretion.match(new RegExp("^separator\\.([^d]*)"));
        return matcher ? Number(matcher[1]) : null;
    };
    /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    MaskService.prototype._checkPrecision = /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    function (separatorExpression, separatorValue) {
        if (separatorExpression.indexOf('2') > 0) {
            return Number(separatorValue).toFixed(2);
        }
        return Number(separatorValue);
    };
    MaskService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MaskService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MaskService;
}(MaskApplierService));
export { MaskService };
if (false) {
    /** @type {?} */
    MaskService.prototype.validation;
    /** @type {?} */
    MaskService.prototype.maskExpression;
    /** @type {?} */
    MaskService.prototype.isNumberValue;
    /** @type {?} */
    MaskService.prototype.showMaskTyped;
    /** @type {?} */
    MaskService.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskService.prototype.maskIsShown;
    /** @type {?} */
    MaskService.prototype.selStart;
    /** @type {?} */
    MaskService.prototype.selEnd;
    /**
     * @type {?}
     * @protected
     */
    MaskService.prototype._formElement;
    /** @type {?} */
    MaskService.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MaskService.prototype._config;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLFVBQVUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RDtJQUNpQyx1Q0FBa0I7SUFhakQscUJBRTRCLFFBQWEsRUFDYixPQUFnQixFQUNsQyxXQUF1QixFQUN2QixTQUFvQjtRQUw5QixZQU9FLGtCQUFNLE9BQU8sQ0FBQyxTQUVmO1FBUDJCLGNBQVEsR0FBUixRQUFRLENBQUs7UUFDYixhQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2xDLGlCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGVBQVMsR0FBVCxTQUFTLENBQVc7UUFqQnZCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLG9CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLDBCQUFvQixHQUFXLEdBQUcsQ0FBQztRQUNuQyxpQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixjQUFRLEdBQWtCLElBQUksQ0FBQztRQUMvQixZQUFNLEdBQWtCLElBQUksQ0FBQzs7UUFHN0IsY0FBUTs7OztRQUFHLFVBQUMsQ0FBTSxJQUFPLENBQUMsRUFBQztRQVVoQyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDOztJQUNyRCxDQUFDO0lBRUQsaURBQWlEOzs7Ozs7Ozs7SUFDMUMsK0JBQVM7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LENBQUMsQ0FBQztRQUNoRyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDN0MsQ0FBQzs7Ozs7OztJQUVPLHFDQUFlOzs7Ozs7SUFBdkIsVUFBd0IsbUJBQTJCLEVBQUUsY0FBc0I7UUFDekUsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2dCQXhSRixVQUFVOzs7O2dEQWdCTixNQUFNLFNBQUMsUUFBUTtnREFDZixNQUFNLFNBQUMsTUFBTTtnQkF2QlQsVUFBVTtnQkFBc0IsU0FBUzs7SUErUmxELGtCQUFDO0NBQUEsQUF6UkQsQ0FDaUMsa0JBQWtCLEdBd1JsRDtTQXhSWSxXQUFXOzs7SUFDdEIsaUNBQWtDOztJQUNsQyxxQ0FBbUM7O0lBQ25DLG9DQUFzQzs7SUFDdEMsb0NBQXNDOztJQUN0QywyQ0FBMEM7O0lBQzFDLGtDQUFnQzs7SUFDaEMsK0JBQXNDOztJQUN0Qyw2QkFBb0M7Ozs7O0lBQ3BDLG1DQUF5Qzs7SUFFekMsK0JBQWtDOzs7OztJQUloQywrQkFBdUM7Ozs7O0lBQ3ZDLDhCQUEwQzs7Ozs7SUFDMUMsa0NBQStCOzs7OztJQUMvQixnQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBjb25maWcsIElDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYXNrQXBwbGllclNlcnZpY2UgfSBmcm9tICcuL21hc2stYXBwbGllci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hc2tTZXJ2aWNlIGV4dGVuZHMgTWFza0FwcGxpZXJTZXJ2aWNlIHtcbiAgcHVibGljIHZhbGlkYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgaXNOdW1iZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd01hc2tUeXBlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcGxhY2VIb2xkZXJDaGFyYWN0ZXI6IHN0cmluZyA9ICdfJztcbiAgcHVibGljIG1hc2tJc1Nob3duOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHNlbFN0YXJ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIHNlbEVuZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCBfZm9ybUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KGNvbmZpZykgcHJvdGVjdGVkIF9jb25maWc6IElDb25maWcsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKF9jb25maWcpO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmN5Y2xvbWF0aWMtY29tcGxleGl0eVxuICBwdWJsaWMgYXBwbHlNYXNrKGlucHV0VmFsdWU6IHN0cmluZywgbWFza0V4cHJlc3Npb246IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDAsIGNiOiBGdW5jdGlvbiA9ICgpID0+IHsgfSk6IHN0cmluZyB7XG4gICAgaWYgKCFtYXNrRXhwcmVzc2lvbikge1xuICAgICAgcmV0dXJuIGlucHV0VmFsdWU7XG4gICAgfVxuICAgIHRoaXMubWFza0lzU2hvd24gPSB0aGlzLnNob3dNYXNrVHlwZWQgPyB0aGlzLnNob3dNYXNrSW5JbnB1dCgpIDogJyc7XG4gICAgaWYgKHRoaXMubWFza0V4cHJlc3Npb24gPT09ICdJUCcgJiYgdGhpcy5zaG93TWFza1R5cGVkKSB7XG4gICAgICB0aGlzLm1hc2tJc1Nob3duID0gdGhpcy5zaG93TWFza0luSW5wdXQoaW5wdXRWYWx1ZSB8fCAnIycpO1xuICAgIH1cbiAgICBpZiAoIWlucHV0VmFsdWUgJiYgdGhpcy5zaG93TWFza1R5cGVkKSB7XG4gICAgICB0aGlzLmZvcm1Db250cm9sUmVzdWx0KHRoaXMucHJlZml4KTtcbiAgICAgIHJldHVybiB0aGlzLnByZWZpeCArIHRoaXMubWFza0lzU2hvd247XG4gICAgfVxuICAgIGNvbnN0IGdldFN5bWJvbDogc3RyaW5nID0gISFpbnB1dFZhbHVlICYmIHR5cGVvZiB0aGlzLnNlbFN0YXJ0ID09PSAnbnVtYmVyJyA/IGlucHV0VmFsdWVbdGhpcy5zZWxTdGFydF0gOiAnJztcbiAgICBsZXQgbmV3SW5wdXRWYWx1ZSA9ICcnO1xuICAgIGlmICh0aGlzLmhpZGRlbklucHV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBhY3R1YWxSZXN1bHQ6IHN0cmluZ1tdID0gdGhpcy5hY3R1YWxWYWx1ZS5zcGxpdCgnJyk7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvblxuICAgICAgaW5wdXRWYWx1ZSAhPT0gJycgJiYgYWN0dWFsUmVzdWx0Lmxlbmd0aFxuICAgICAgICA/IHR5cGVvZiB0aGlzLnNlbFN0YXJ0ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdGhpcy5zZWxFbmQgPT09ICdudW1iZXInXG4gICAgICAgICAgPyBpbnB1dFZhbHVlLmxlbmd0aCA+IGFjdHVhbFJlc3VsdC5sZW5ndGhcbiAgICAgICAgICAgID8gYWN0dWFsUmVzdWx0LnNwbGljZSh0aGlzLnNlbFN0YXJ0LCAwLCBnZXRTeW1ib2wpXG4gICAgICAgICAgICA6IGlucHV0VmFsdWUubGVuZ3RoIDwgYWN0dWFsUmVzdWx0Lmxlbmd0aFxuICAgICAgICAgICAgICA/IGFjdHVhbFJlc3VsdC5sZW5ndGggLSBpbnB1dFZhbHVlLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgID8gYWN0dWFsUmVzdWx0LnNwbGljZSh0aGlzLnNlbFN0YXJ0IC0gMSwgMSlcbiAgICAgICAgICAgICAgICA6IGFjdHVhbFJlc3VsdC5zcGxpY2UodGhpcy5zZWxTdGFydCwgdGhpcy5zZWxFbmQgLSB0aGlzLnNlbFN0YXJ0KVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICA6IG51bGxcbiAgICAgICAgOiAoYWN0dWFsUmVzdWx0ID0gW10pO1xuICAgICAgLy8gdHNsaW50OmVuYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvblxuICAgICAgbmV3SW5wdXRWYWx1ZSA9IHRoaXMuYWN0dWFsVmFsdWUubGVuZ3RoID8gdGhpcy5zaGlmdFR5cGVkU3ltYm9scyhhY3R1YWxSZXN1bHQuam9pbignJykpIDogaW5wdXRWYWx1ZTtcbiAgICB9XG4gICAgbmV3SW5wdXRWYWx1ZSA9IEJvb2xlYW4obmV3SW5wdXRWYWx1ZSkgJiYgbmV3SW5wdXRWYWx1ZS5sZW5ndGggPyBuZXdJbnB1dFZhbHVlIDogaW5wdXRWYWx1ZTtcbiAgICBjb25zdCByZXN1bHQ6IHN0cmluZyA9IHN1cGVyLmFwcGx5TWFzayhuZXdJbnB1dFZhbHVlLCBtYXNrRXhwcmVzc2lvbiwgcG9zaXRpb24sIGNiKTtcbiAgICB0aGlzLmFjdHVhbFZhbHVlID0gdGhpcy5nZXRBY3R1YWxWYWx1ZShyZXN1bHQpO1xuXG4gICAgLy8gaGFuZGxlIHNvbWUgc2VwYXJhdG9yIGltcGxpY2F0aW9uczpcbiAgICAvLyBhLikgYWRqdXN0IGRlY2ltYWxNYXJrZXIgZGVmYXVsdCAoLiAtPiAsKSBpZiB0aG91c2FuZFNlcGFyYXRvciBpcyBhIGRvdFxuICAgIGlmICh0aGlzLnRob3VzYW5kU2VwYXJhdG9yID09PSAnLicgJiYgdGhpcy5kZWNpbWFsTWFya2VyID09PSAnLicpIHtcbiAgICAgIHRoaXMuZGVjaW1hbE1hcmtlciA9ICcsJztcbiAgICB9XG5cbiAgICAvLyBiKSByZW1vdmUgZGVjaW1hbCBtYXJrZXIgZnJvbSBsaXN0IG9mIHNwZWNpYWwgY2hhcmFjdGVycyB0byBtYXNrXG4gICAgaWYgKHRoaXMubWFza0V4cHJlc3Npb24uc3RhcnRzV2l0aCgnc2VwYXJhdG9yJykgJiYgdGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmlsdGVyKChpdGVtOiBzdHJpbmcpID0+IGl0ZW0gIT09IHRoaXMuZGVjaW1hbE1hcmtlcik7XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtQ29udHJvbFJlc3VsdChyZXN1bHQpO1xuXG4gICAgaWYgKCF0aGlzLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIGlmICh0aGlzLmhpZGRlbklucHV0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA/IHRoaXMuaGlkZUlucHV0KHJlc3VsdCwgdGhpcy5tYXNrRXhwcmVzc2lvbikgOiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjb25zdCByZXNMZW46IG51bWJlciA9IHJlc3VsdC5sZW5ndGg7XG4gICAgY29uc3QgcHJlZk5tYXNrOiBzdHJpbmcgPSB0aGlzLnByZWZpeCArIHRoaXMubWFza0lzU2hvd247XG4gICAgcmV0dXJuIHJlc3VsdCArICh0aGlzLm1hc2tFeHByZXNzaW9uID09PSAnSVAnID8gcHJlZk5tYXNrIDogcHJlZk5tYXNrLnNsaWNlKHJlc0xlbikpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5VmFsdWVDaGFuZ2VzKHBvc2l0aW9uOiBudW1iZXIgPSAwLCBjYjogRnVuY3Rpb24gPSAoKSA9PiB7IH0pOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtRWxlbWVudC52YWx1ZSA9IHRoaXMuYXBwbHlNYXNrKHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLCB0aGlzLm1hc2tFeHByZXNzaW9uLCBwb3NpdGlvbiwgY2IpO1xuICAgIGlmICh0aGlzLl9mb3JtRWxlbWVudCA9PT0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoRm4oKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlSW5wdXQoaW5wdXRWYWx1ZTogc3RyaW5nLCBtYXNrRXhwcmVzc2lvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaW5wdXRWYWx1ZVxuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLm1hcCgoY3Vycjogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyAmJlxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2luZGV4XV0gJiZcbiAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltpbmRleF1dLnN5bWJvbFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25baW5kZXhdXS5zeW1ib2w7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnI7XG4gICAgICB9KVxuICAgICAgLmpvaW4oJycpO1xuICB9XG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBpcyBub3QgbmVjZXNzYXJ5LCBpdCBjaGVja3MgcmVzdWx0IGFnYWluc3QgbWFza0V4cHJlc3Npb25cbiAgcHVibGljIGdldEFjdHVhbFZhbHVlKHJlczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb21wYXJlOiBzdHJpbmdbXSA9IHJlc1xuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLmZpbHRlcihcbiAgICAgICAgKHN5bWJvbDogc3RyaW5nLCBpOiBudW1iZXIpID0+XG4gICAgICAgICAgdGhpcy5fY2hlY2tTeW1ib2xNYXNrKHN5bWJvbCwgdGhpcy5tYXNrRXhwcmVzc2lvbltpXSkgfHxcbiAgICAgICAgICAodGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXModGhpcy5tYXNrRXhwcmVzc2lvbltpXSkgJiYgc3ltYm9sID09PSB0aGlzLm1hc2tFeHByZXNzaW9uW2ldKVxuICAgICAgKTtcbiAgICBpZiAoY29tcGFyZS5qb2luKCcnKSA9PT0gcmVzKSB7XG4gICAgICByZXR1cm4gY29tcGFyZS5qb2luKCcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHB1YmxpYyBzaGlmdFR5cGVkU3ltYm9scyhpbnB1dFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBzeW1ib2xUb1JlcGxhY2UgPSAnJztcbiAgICBjb25zdCBuZXdJbnB1dFZhbHVlOiBzdHJpbmdbXSA9XG4gICAgICAoaW5wdXRWYWx1ZSAmJlxuICAgICAgICBpbnB1dFZhbHVlLnNwbGl0KCcnKS5tYXAoKGN1cnJTeW1ib2w6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmluY2x1ZGVzKGlucHV0VmFsdWVbaW5kZXggKyAxXSkgJiZcbiAgICAgICAgICAgIGlucHV0VmFsdWVbaW5kZXggKyAxXSAhPT0gdGhpcy5tYXNrRXhwcmVzc2lvbltpbmRleCArIDFdXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBzeW1ib2xUb1JlcGxhY2UgPSBjdXJyU3ltYm9sO1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0VmFsdWVbaW5kZXggKyAxXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN5bWJvbFRvUmVwbGFjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VTeW1ib2w6IHN0cmluZyA9IHN5bWJvbFRvUmVwbGFjZTtcbiAgICAgICAgICAgIHN5bWJvbFRvUmVwbGFjZSA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VTeW1ib2w7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjdXJyU3ltYm9sO1xuICAgICAgICB9KSkgfHxcbiAgICAgIFtdO1xuICAgIHJldHVybiBuZXdJbnB1dFZhbHVlLmpvaW4oJycpO1xuICB9XG5cbiAgcHVibGljIHNob3dNYXNrSW5JbnB1dChpbnB1dFZhbD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2hvd01hc2tUeXBlZCAmJiAhIXRoaXMuc2hvd25NYXNrRXhwcmVzc2lvbikge1xuICAgICAgaWYgKHRoaXMubWFza0V4cHJlc3Npb24ubGVuZ3RoICE9PSB0aGlzLnNob3duTWFza0V4cHJlc3Npb24ubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWFzayBleHByZXNzaW9uIG11c3QgbWF0Y2ggbWFzayBwbGFjZWhvbGRlciBsZW5ndGgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3duTWFza0V4cHJlc3Npb247XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIGlmIChpbnB1dFZhbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tGb3JJcChpbnB1dFZhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5tYXNrRXhwcmVzc2lvbi5yZXBsYWNlKC9cXHcvZywgdGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcik7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcklmTm90TWF0Y2hGbigpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNsZWFySWZOb3RNYXRjaCAmJlxuICAgICAgdGhpcy5wcmVmaXgubGVuZ3RoICsgdGhpcy5tYXNrRXhwcmVzc2lvbi5sZW5ndGggKyB0aGlzLnN1ZmZpeC5sZW5ndGggIT09XG4gICAgICB0aGlzLl9mb3JtRWxlbWVudC52YWx1ZS5yZXBsYWNlKC9fL2csICcnKS5sZW5ndGhcbiAgICApIHtcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsndmFsdWUnLCAnJ107XG4gICAgICB0aGlzLmFwcGx5TWFzayh0aGlzLl9mb3JtRWxlbWVudC52YWx1ZSwgdGhpcy5tYXNrRXhwcmVzc2lvbik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBmb3JtRWxlbWVudFByb3BlcnR5KFtuYW1lLCB2YWx1ZV06IFtzdHJpbmcsIHN0cmluZyB8IGJvb2xlYW5dKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZm9ybUVsZW1lbnQsIG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVja1NwZWNpYWxDaGFyQW1vdW50KG1hc2s6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgY2hhcnM6IHN0cmluZ1tdID0gbWFzay5zcGxpdCgnJykuZmlsdGVyKChpdGVtOiBzdHJpbmcpID0+IHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcihpdGVtKSk7XG4gICAgcmV0dXJuIGNoYXJzLmxlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrRm9ySXAoaW5wdXRWYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKGlucHV0VmFsID09PSAnIycpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfWA7XG4gICAgfVxuICAgIGNvbnN0IGFycjogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0VmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5wdXRWYWxbaV0ubWF0Y2goJ1xcXFxkJykpIHtcbiAgICAgICAgYXJyLnB1c2goaW5wdXRWYWxbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYXJyLmxlbmd0aCA8PSAzKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9YDtcbiAgICB9XG4gICAgaWYgKGFyci5sZW5ndGggPiAzICYmIGFyci5sZW5ndGggPD0gNikge1xuICAgICAgcmV0dXJuIGAke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn1gO1xuICAgIH1cbiAgICBpZiAoYXJyLmxlbmd0aCA+IDYgJiYgYXJyLmxlbmd0aCA8PSA5KSB7XG4gICAgICByZXR1cm4gdGhpcy5wbGFjZUhvbGRlckNoYXJhY3RlcjtcbiAgICB9XG4gICAgaWYgKGFyci5sZW5ndGggPiA5ICYmIGFyci5sZW5ndGggPD0gMTIpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtQ29udHJvbFJlc3VsdChpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycykpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fcmVtb3ZlTWFzayh0aGlzLl9yZW1vdmVTdWZmaXgodGhpcy5fcmVtb3ZlUHJlZml4KGlucHV0VmFsdWUpKSwgdGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX2NoZWNrU3ltYm9scyhpbnB1dFZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fcmVtb3ZlU3VmZml4KHRoaXMuX3JlbW92ZVByZWZpeChpbnB1dFZhbHVlKSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU1hc2sodmFsdWU6IHN0cmluZywgc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmU6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS5yZXBsYWNlKHRoaXMuX3JlZ0V4cEZvclJlbW92ZShzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZSksICcnKSA6IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlUHJlZml4KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5wcmVmaXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUucmVwbGFjZSh0aGlzLnByZWZpeCwgJycpIDogdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVTdWZmaXgodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnN1ZmZpeCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS5yZXBsYWNlKHRoaXMuc3VmZml4LCAnJykgOiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JldHJpZXZlU2VwYXJhdG9yVmFsdWUocmVzdWx0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9yZW1vdmVNYXNrKHRoaXMuX3JlbW92ZVN1ZmZpeCh0aGlzLl9yZW1vdmVQcmVmaXgocmVzdWx0KSksIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ0V4cEZvclJlbW92ZShzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZTogc3RyaW5nW10pOiBSZWdFeHAge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlLm1hcCgoaXRlbTogc3RyaW5nKSA9PiBgXFxcXCR7aXRlbX1gKS5qb2luKCd8JyksICdnaScpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tTeW1ib2xzKHJlc3VsdDogc3RyaW5nKTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgaWYgKHJlc3VsdCA9PT0gJycpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VwYXJhdG9yUHJlY2lzaW9uOiBudW1iZXIgfCBudWxsID0gdGhpcy5fcmV0cmlldmVTZXBhcmF0b3JQcmVjaXNpb24odGhpcy5tYXNrRXhwcmVzc2lvbik7XG4gICAgbGV0IHNlcGFyYXRvclZhbHVlOiBzdHJpbmcgPSB0aGlzLl9yZXRyaWV2ZVNlcGFyYXRvclZhbHVlKHJlc3VsdCk7XG4gICAgaWYgKHRoaXMuZGVjaW1hbE1hcmtlciAhPT0gJy4nKSB7XG4gICAgICBzZXBhcmF0b3JWYWx1ZSA9IHNlcGFyYXRvclZhbHVlLnJlcGxhY2UodGhpcy5kZWNpbWFsTWFya2VyLCAnLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzTnVtYmVyVmFsdWUpIHtcbiAgICAgIGlmIChzZXBhcmF0b3JQcmVjaXNpb24pIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdGhpcy5kZWNpbWFsTWFya2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrUHJlY2lzaW9uKHRoaXMubWFza0V4cHJlc3Npb24sIHNlcGFyYXRvclZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoc2VwYXJhdG9yVmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2VwYXJhdG9yVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBzaG91bGQgdGhpbmsgYWJvdXQgaGVscGVycyBvciBzZXBhcnRpbmcgZGVjaW1hbCBwcmVjaXNpb24gdG8gb3duIHByb3BlcnR5XG4gIHByaXZhdGUgX3JldHJpZXZlU2VwYXJhdG9yUHJlY2lzaW9uKG1hc2tFeHByZXRpb246IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IG1hdGNoZXI6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gbWFza0V4cHJldGlvbi5tYXRjaChuZXcgUmVnRXhwKGBec2VwYXJhdG9yXFxcXC4oW15kXSopYCkpO1xuICAgIHJldHVybiBtYXRjaGVyID8gTnVtYmVyKG1hdGNoZXJbMV0pIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrUHJlY2lzaW9uKHNlcGFyYXRvckV4cHJlc3Npb246IHN0cmluZywgc2VwYXJhdG9yVmFsdWU6IHN0cmluZyk6IG51bWJlciB8IHN0cmluZyB7XG4gICAgaWYgKHNlcGFyYXRvckV4cHJlc3Npb24uaW5kZXhPZignMicpID4gMCkge1xuICAgICAgcmV0dXJuIE51bWJlcihzZXBhcmF0b3JWYWx1ZSkudG9GaXhlZCgyKTtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcihzZXBhcmF0b3JWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==