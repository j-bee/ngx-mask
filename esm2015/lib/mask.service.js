/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config } from './config';
import { MaskApplierService } from './mask-applier.service';
export class MaskService extends MaskApplierService {
    /**
     * @param {?} document
     * @param {?} _config
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(document, _config, _elementRef, _renderer) {
        super(_config);
        this.document = document;
        this._config = _config;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.validation = true;
        this.maskExpression = '';
        this.isNumberValue = false;
        this.showMaskTyped = false;
        this.placeHolderCharacter = '_';
        this.maskIsShown = '';
        this.selStart = null;
        this.selEnd = null;
        // tslint:disable-next-line
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._formElement = this._elementRef.nativeElement;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    applyMask(inputValue, maskExpression, position = 0, cb = (/**
     * @return {?}
     */
    () => { })) {
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
        const getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
        /** @type {?} */
        let newInputValue = '';
        if (this.hiddenInput !== undefined) {
            /** @type {?} */
            let actualResult = this.actualValue.split('');
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
        const result = super.applyMask(newInputValue, maskExpression, position, cb);
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
            (item) => item !== this.decimalMarker));
        }
        this.formControlResult(result);
        if (!this.showMaskTyped) {
            if (this.hiddenInput) {
                return result && result.length ? this.hideInput(result, this.maskExpression) : result;
            }
            return result;
        }
        /** @type {?} */
        const resLen = result.length;
        /** @type {?} */
        const prefNmask = this.prefix + this.maskIsShown;
        return result + (this.maskExpression === 'IP' ? prefNmask : prefNmask.slice(resLen));
    }
    /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    applyValueChanges(position = 0, cb = (/**
     * @return {?}
     */
    () => { })) {
        this._formElement.value = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    hideInput(inputValue, maskExpression) {
        return inputValue
            .split('')
            .map((/**
         * @param {?} curr
         * @param {?} index
         * @return {?}
         */
        (curr, index) => {
            if (this.maskAvailablePatterns &&
                this.maskAvailablePatterns[maskExpression[index]] &&
                this.maskAvailablePatterns[maskExpression[index]].symbol) {
                return this.maskAvailablePatterns[maskExpression[index]].symbol;
            }
            return curr;
        }))
            .join('');
    }
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    getActualValue(res) {
        /** @type {?} */
        const compare = res
            .split('')
            .filter((/**
         * @param {?} symbol
         * @param {?} i
         * @return {?}
         */
        (symbol, i) => this._checkSymbolMask(symbol, this.maskExpression[i]) ||
            (this.maskSpecialCharacters.includes(this.maskExpression[i]) && symbol === this.maskExpression[i])));
        if (compare.join('') === res) {
            return compare.join('');
        }
        return res;
    }
    /**
     * @param {?} inputValue
     * @return {?}
     */
    shiftTypedSymbols(inputValue) {
        /** @type {?} */
        let symbolToReplace = '';
        /** @type {?} */
        const newInputValue = (inputValue &&
            inputValue.split('').map((/**
             * @param {?} currSymbol
             * @param {?} index
             * @return {?}
             */
            (currSymbol, index) => {
                if (this.maskSpecialCharacters.includes(inputValue[index + 1]) &&
                    inputValue[index + 1] !== this.maskExpression[index + 1]) {
                    symbolToReplace = currSymbol;
                    return inputValue[index + 1];
                }
                if (symbolToReplace.length) {
                    /** @type {?} */
                    const replaceSymbol = symbolToReplace;
                    symbolToReplace = '';
                    return replaceSymbol;
                }
                return currSymbol;
            }))) ||
            [];
        return newInputValue.join('');
    }
    /**
     * @param {?=} inputVal
     * @return {?}
     */
    showMaskInInput(inputVal) {
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
    }
    /**
     * @return {?}
     */
    clearIfNotMatchFn() {
        if (this.clearIfNotMatch &&
            this.prefix.length + this.maskExpression.length + this.suffix.length !==
                this._formElement.value.replace(/_/g, '').length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    set formElementProperty([name, value]) {
        this._renderer.setProperty(this._formElement, name, value);
    }
    /**
     * @param {?} mask
     * @return {?}
     */
    checkSpecialCharAmount(mask) {
        /** @type {?} */
        const chars = mask.split('').filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._findSpecialChar(item)));
        return chars.length;
    }
    /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    _checkForIp(inputVal) {
        if (inputVal === '#') {
            return `${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
        }
        /** @type {?} */
        const arr = [];
        for (let i = 0; i < inputVal.length; i++) {
            if (inputVal[i].match('\\d')) {
                arr.push(inputVal[i]);
            }
        }
        if (arr.length <= 3) {
            return `${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
        }
        if (arr.length > 3 && arr.length <= 6) {
            return `${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
        }
        if (arr.length > 6 && arr.length <= 9) {
            return this.placeHolderCharacter;
        }
        if (arr.length > 9 && arr.length <= 12) {
            return '';
        }
        return '';
    }
    /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    formControlResult(inputValue) {
        if (Array.isArray(this.dropSpecialCharacters)) {
            this.onChange(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters));
        }
        else if (this.dropSpecialCharacters) {
            this.onChange(this._checkSymbols(inputValue));
        }
        else {
            this.onChange(this._removeSuffix(this._removePrefix(inputValue)));
        }
    }
    /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    _removeMask(value, specialCharactersForRemove) {
        return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _removePrefix(value) {
        if (!this.prefix) {
            return value;
        }
        return value ? value.replace(this.prefix, '') : value;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _removeSuffix(value) {
        if (!this.suffix) {
            return value;
        }
        return value ? value.replace(this.suffix, '') : value;
    }
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    _retrieveSeparatorValue(result) {
        return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
    }
    /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    _regExpForRemove(specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => `\\${item}`)).join('|'), 'gi');
    }
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    _checkSymbols(result) {
        if (result === '') {
            return result;
        }
        /** @type {?} */
        const separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);
        /** @type {?} */
        let separatorValue = this._retrieveSeparatorValue(result);
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
    }
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    _retrieveSeparatorPrecision(maskExpretion) {
        /** @type {?} */
        const matcher = maskExpretion.match(new RegExp(`^separator\\.([^d]*)`));
        return matcher ? Number(matcher[1]) : null;
    }
    /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    _checkPrecision(separatorExpression, separatorValue) {
        if (separatorExpression.indexOf('2') > 0) {
            return Number(separatorValue).toFixed(2);
        }
        return Number(separatorValue);
    }
}
MaskService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MaskService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [config,] }] },
    { type: ElementRef },
    { type: Renderer2 }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFXLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzVELE1BQU0sT0FBTyxXQUFZLFNBQVEsa0JBQWtCOzs7Ozs7O0lBYWpELFlBRTRCLFFBQWEsRUFDYixPQUFnQixFQUNsQyxXQUF1QixFQUN2QixTQUFvQjtRQUU1QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFMVyxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBakJ2QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHlCQUFvQixHQUFXLEdBQUcsQ0FBQztRQUNuQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixhQUFRLEdBQWtCLElBQUksQ0FBQztRQUMvQixXQUFNLEdBQWtCLElBQUksQ0FBQzs7UUFHN0IsYUFBUTs7OztRQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUM7UUFVaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUNyRCxDQUFDOzs7Ozs7Ozs7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LFVBQVU7Ozs7NENBZ0JOLE1BQU0sU0FBQyxRQUFROzRDQUNmLE1BQU0sU0FBQyxNQUFNO1lBdkJULFVBQVU7WUFBc0IsU0FBUzs7OztJQVFoRCxpQ0FBa0M7O0lBQ2xDLHFDQUFtQzs7SUFDbkMsb0NBQXNDOztJQUN0QyxvQ0FBc0M7O0lBQ3RDLDJDQUEwQzs7SUFDMUMsa0NBQWdDOztJQUNoQywrQkFBc0M7O0lBQ3RDLDZCQUFvQzs7Ozs7SUFDcEMsbUNBQXlDOztJQUV6QywrQkFBa0M7Ozs7O0lBSWhDLCtCQUF1Qzs7Ozs7SUFDdkMsOEJBQTBDOzs7OztJQUMxQyxrQ0FBK0I7Ozs7O0lBQy9CLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1hc2tBcHBsaWVyU2VydmljZSB9IGZyb20gJy4vbWFzay1hcHBsaWVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFza1NlcnZpY2UgZXh0ZW5kcyBNYXNrQXBwbGllclNlcnZpY2Uge1xuICBwdWJsaWMgdmFsaWRhdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBtYXNrRXhwcmVzc2lvbjogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBpc051bWJlclZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93TWFza1R5cGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwbGFjZUhvbGRlckNoYXJhY3Rlcjogc3RyaW5nID0gJ18nO1xuICBwdWJsaWMgbWFza0lzU2hvd246IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgc2VsU3RhcnQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgc2VsRW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9mb3JtRWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHB1YmxpYyBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIEBJbmplY3QoY29uZmlnKSBwcm90ZWN0ZWQgX2NvbmZpZzogSUNvbmZpZyxcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgc3VwZXIoX2NvbmZpZyk7XG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y3ljbG9tYXRpYy1jb21wbGV4aXR5XG4gIHB1YmxpYyBhcHBseU1hc2soaW5wdXRWYWx1ZTogc3RyaW5nLCBtYXNrRXhwcmVzc2lvbjogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyID0gMCwgY2I6IEZ1bmN0aW9uID0gKCkgPT4geyB9KTogc3RyaW5nIHtcbiAgICBpZiAoIW1hc2tFeHByZXNzaW9uKSB7XG4gICAgICByZXR1cm4gaW5wdXRWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5tYXNrSXNTaG93biA9IHRoaXMuc2hvd01hc2tUeXBlZCA/IHRoaXMuc2hvd01hc2tJbklucHV0KCkgOiAnJztcbiAgICBpZiAodGhpcy5tYXNrRXhwcmVzc2lvbiA9PT0gJ0lQJyAmJiB0aGlzLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIHRoaXMubWFza0lzU2hvd24gPSB0aGlzLnNob3dNYXNrSW5JbnB1dChpbnB1dFZhbHVlIHx8ICcjJyk7XG4gICAgfVxuICAgIGlmICghaW5wdXRWYWx1ZSAmJiB0aGlzLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2xSZXN1bHQodGhpcy5wcmVmaXgpO1xuICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5tYXNrSXNTaG93bjtcbiAgICB9XG4gICAgY29uc3QgZ2V0U3ltYm9sOiBzdHJpbmcgPSAhIWlucHV0VmFsdWUgJiYgdHlwZW9mIHRoaXMuc2VsU3RhcnQgPT09ICdudW1iZXInID8gaW5wdXRWYWx1ZVt0aGlzLnNlbFN0YXJ0XSA6ICcnO1xuICAgIGxldCBuZXdJbnB1dFZhbHVlID0gJyc7XG4gICAgaWYgKHRoaXMuaGlkZGVuSW5wdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGFjdHVhbFJlc3VsdDogc3RyaW5nW10gPSB0aGlzLmFjdHVhbFZhbHVlLnNwbGl0KCcnKTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9uXG4gICAgICBpbnB1dFZhbHVlICE9PSAnJyAmJiBhY3R1YWxSZXN1bHQubGVuZ3RoXG4gICAgICAgID8gdHlwZW9mIHRoaXMuc2VsU3RhcnQgPT09ICdudW1iZXInICYmIHR5cGVvZiB0aGlzLnNlbEVuZCA9PT0gJ251bWJlcidcbiAgICAgICAgICA/IGlucHV0VmFsdWUubGVuZ3RoID4gYWN0dWFsUmVzdWx0Lmxlbmd0aFxuICAgICAgICAgICAgPyBhY3R1YWxSZXN1bHQuc3BsaWNlKHRoaXMuc2VsU3RhcnQsIDAsIGdldFN5bWJvbClcbiAgICAgICAgICAgIDogaW5wdXRWYWx1ZS5sZW5ndGggPCBhY3R1YWxSZXN1bHQubGVuZ3RoXG4gICAgICAgICAgICAgID8gYWN0dWFsUmVzdWx0Lmxlbmd0aCAtIGlucHV0VmFsdWUubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgPyBhY3R1YWxSZXN1bHQuc3BsaWNlKHRoaXMuc2VsU3RhcnQgLSAxLCAxKVxuICAgICAgICAgICAgICAgIDogYWN0dWFsUmVzdWx0LnNwbGljZSh0aGlzLnNlbFN0YXJ0LCB0aGlzLnNlbEVuZCAtIHRoaXMuc2VsU3RhcnQpXG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIDogbnVsbFxuICAgICAgICA6IChhY3R1YWxSZXN1bHQgPSBbXSk7XG4gICAgICAvLyB0c2xpbnQ6ZW5hYmxlIG5vLXVudXNlZC1leHByZXNzaW9uXG4gICAgICBuZXdJbnB1dFZhbHVlID0gdGhpcy5hY3R1YWxWYWx1ZS5sZW5ndGggPyB0aGlzLnNoaWZ0VHlwZWRTeW1ib2xzKGFjdHVhbFJlc3VsdC5qb2luKCcnKSkgOiBpbnB1dFZhbHVlO1xuICAgIH1cbiAgICBuZXdJbnB1dFZhbHVlID0gQm9vbGVhbihuZXdJbnB1dFZhbHVlKSAmJiBuZXdJbnB1dFZhbHVlLmxlbmd0aCA/IG5ld0lucHV0VmFsdWUgOiBpbnB1dFZhbHVlO1xuICAgIGNvbnN0IHJlc3VsdDogc3RyaW5nID0gc3VwZXIuYXBwbHlNYXNrKG5ld0lucHV0VmFsdWUsIG1hc2tFeHByZXNzaW9uLCBwb3NpdGlvbiwgY2IpO1xuICAgIHRoaXMuYWN0dWFsVmFsdWUgPSB0aGlzLmdldEFjdHVhbFZhbHVlKHJlc3VsdCk7XG5cbiAgICAvLyBoYW5kbGUgc29tZSBzZXBhcmF0b3IgaW1wbGljYXRpb25zOlxuICAgIC8vIGEuKSBhZGp1c3QgZGVjaW1hbE1hcmtlciBkZWZhdWx0ICguIC0+ICwpIGlmIHRob3VzYW5kU2VwYXJhdG9yIGlzIGEgZG90XG4gICAgaWYgKHRoaXMudGhvdXNhbmRTZXBhcmF0b3IgPT09ICcuJyAmJiB0aGlzLmRlY2ltYWxNYXJrZXIgPT09ICcuJykge1xuICAgICAgdGhpcy5kZWNpbWFsTWFya2VyID0gJywnO1xuICAgIH1cblxuICAgIC8vIGIpIHJlbW92ZSBkZWNpbWFsIG1hcmtlciBmcm9tIGxpc3Qgb2Ygc3BlY2lhbCBjaGFyYWN0ZXJzIHRvIG1hc2tcbiAgICBpZiAodGhpcy5tYXNrRXhwcmVzc2lvbi5zdGFydHNXaXRoKCdzZXBhcmF0b3InKSAmJiB0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5maWx0ZXIoKGl0ZW06IHN0cmluZykgPT4gaXRlbSAhPT0gdGhpcy5kZWNpbWFsTWFya2VyKTtcbiAgICB9XG5cbiAgICB0aGlzLmZvcm1Db250cm9sUmVzdWx0KHJlc3VsdCk7XG5cbiAgICBpZiAoIXRoaXMuc2hvd01hc2tUeXBlZCkge1xuICAgICAgaWYgKHRoaXMuaGlkZGVuSW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID8gdGhpcy5oaWRlSW5wdXQocmVzdWx0LCB0aGlzLm1hc2tFeHByZXNzaW9uKSA6IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0IHJlc0xlbjogbnVtYmVyID0gcmVzdWx0Lmxlbmd0aDtcbiAgICBjb25zdCBwcmVmTm1hc2s6IHN0cmluZyA9IHRoaXMucHJlZml4ICsgdGhpcy5tYXNrSXNTaG93bjtcbiAgICByZXR1cm4gcmVzdWx0ICsgKHRoaXMubWFza0V4cHJlc3Npb24gPT09ICdJUCcgPyBwcmVmTm1hc2sgOiBwcmVmTm1hc2suc2xpY2UocmVzTGVuKSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlWYWx1ZUNoYW5nZXMocG9zaXRpb246IG51bWJlciA9IDAsIGNiOiBGdW5jdGlvbiA9ICgpID0+IHsgfSk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlID0gdGhpcy5hcHBseU1hc2sodGhpcy5fZm9ybUVsZW1lbnQudmFsdWUsIHRoaXMubWFza0V4cHJlc3Npb24sIHBvc2l0aW9uLCBjYik7XG4gICAgaWYgKHRoaXMuX2Zvcm1FbGVtZW50ID09PSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2hGbigpO1xuICB9XG5cbiAgcHVibGljIGhpZGVJbnB1dChpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBpbnB1dFZhbHVlXG4gICAgICAuc3BsaXQoJycpXG4gICAgICAubWFwKChjdXJyOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zICYmXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25baW5kZXhdXSAmJlxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2luZGV4XV0uc3ltYm9sXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltpbmRleF1dLnN5bWJvbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycjtcbiAgICAgIH0pXG4gICAgICAuam9pbignJyk7XG4gIH1cblxuICAvLyB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBuZWNlc3NhcnksIGl0IGNoZWNrcyByZXN1bHQgYWdhaW5zdCBtYXNrRXhwcmVzc2lvblxuICBwdWJsaWMgZ2V0QWN0dWFsVmFsdWUocmVzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbXBhcmU6IHN0cmluZ1tdID0gcmVzXG4gICAgICAuc3BsaXQoJycpXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAoc3ltYm9sOiBzdHJpbmcsIGk6IG51bWJlcikgPT5cbiAgICAgICAgICB0aGlzLl9jaGVja1N5bWJvbE1hc2soc3ltYm9sLCB0aGlzLm1hc2tFeHByZXNzaW9uW2ldKSB8fFxuICAgICAgICAgICh0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyh0aGlzLm1hc2tFeHByZXNzaW9uW2ldKSAmJiBzeW1ib2wgPT09IHRoaXMubWFza0V4cHJlc3Npb25baV0pXG4gICAgICApO1xuICAgIGlmIChjb21wYXJlLmpvaW4oJycpID09PSByZXMpIHtcbiAgICAgIHJldHVybiBjb21wYXJlLmpvaW4oJycpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIHNoaWZ0VHlwZWRTeW1ib2xzKGlucHV0VmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHN5bWJvbFRvUmVwbGFjZSA9ICcnO1xuICAgIGNvbnN0IG5ld0lucHV0VmFsdWU6IHN0cmluZ1tdID1cbiAgICAgIChpbnB1dFZhbHVlICYmXG4gICAgICAgIGlucHV0VmFsdWUuc3BsaXQoJycpLm1hcCgoY3VyclN5bWJvbDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXMoaW5wdXRWYWx1ZVtpbmRleCArIDFdKSAmJlxuICAgICAgICAgICAgaW5wdXRWYWx1ZVtpbmRleCArIDFdICE9PSB0aGlzLm1hc2tFeHByZXNzaW9uW2luZGV4ICsgMV1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN5bWJvbFRvUmVwbGFjZSA9IGN1cnJTeW1ib2w7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXRWYWx1ZVtpbmRleCArIDFdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3ltYm9sVG9SZXBsYWNlLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcmVwbGFjZVN5bWJvbDogc3RyaW5nID0gc3ltYm9sVG9SZXBsYWNlO1xuICAgICAgICAgICAgc3ltYm9sVG9SZXBsYWNlID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZVN5bWJvbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGN1cnJTeW1ib2w7XG4gICAgICAgIH0pKSB8fFxuICAgICAgW107XG4gICAgcmV0dXJuIG5ld0lucHV0VmFsdWUuam9pbignJyk7XG4gIH1cblxuICBwdWJsaWMgc2hvd01hc2tJbklucHV0KGlucHV0VmFsPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zaG93TWFza1R5cGVkICYmICEhdGhpcy5zaG93bk1hc2tFeHByZXNzaW9uKSB7XG4gICAgICBpZiAodGhpcy5tYXNrRXhwcmVzc2lvbi5sZW5ndGggIT09IHRoaXMuc2hvd25NYXNrRXhwcmVzc2lvbi5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXNrIGV4cHJlc3Npb24gbXVzdCBtYXRjaCBtYXNrIHBsYWNlaG9sZGVyIGxlbmd0aCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd25NYXNrRXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd01hc2tUeXBlZCkge1xuICAgICAgaWYgKGlucHV0VmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja0ZvcklwKGlucHV0VmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm1hc2tFeHByZXNzaW9uLnJlcGxhY2UoL1xcdy9nLCB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHVibGljIGNsZWFySWZOb3RNYXRjaEZuKCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoICYmXG4gICAgICB0aGlzLnByZWZpeC5sZW5ndGggKyB0aGlzLm1hc2tFeHByZXNzaW9uLmxlbmd0aCArIHRoaXMuc3VmZml4Lmxlbmd0aCAhPT1cbiAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLnJlcGxhY2UoL18vZywgJycpLmxlbmd0aFxuICAgICkge1xuICAgICAgdGhpcy5mb3JtRWxlbWVudFByb3BlcnR5ID0gWyd2YWx1ZScsICcnXTtcbiAgICAgIHRoaXMuYXBwbHlNYXNrKHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLCB0aGlzLm1hc2tFeHByZXNzaW9uKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGZvcm1FbGVtZW50UHJvcGVydHkoW25hbWUsIHZhbHVlXTogW3N0cmluZywgc3RyaW5nIHwgYm9vbGVhbl0pIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9mb3JtRWxlbWVudCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGNoZWNrU3BlY2lhbENoYXJBbW91bnQobWFzazogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBjaGFyczogc3RyaW5nW10gPSBtYXNrLnNwbGl0KCcnKS5maWx0ZXIoKGl0ZW06IHN0cmluZykgPT4gdGhpcy5fZmluZFNwZWNpYWxDaGFyKGl0ZW0pKTtcbiAgICByZXR1cm4gY2hhcnMubGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tGb3JJcChpbnB1dFZhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoaW5wdXRWYWwgPT09ICcjJykge1xuICAgICAgcmV0dXJuIGAke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9YDtcbiAgICB9XG4gICAgY29uc3QgYXJyOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRWYWwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpbnB1dFZhbFtpXS5tYXRjaCgnXFxcXGQnKSkge1xuICAgICAgICBhcnIucHVzaChpbnB1dFZhbFtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhcnIubGVuZ3RoIDw9IDMpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn1gO1xuICAgIH1cbiAgICBpZiAoYXJyLmxlbmd0aCA+IDMgJiYgYXJyLmxlbmd0aCA8PSA2KSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfWA7XG4gICAgfVxuICAgIGlmIChhcnIubGVuZ3RoID4gNiAmJiBhcnIubGVuZ3RoIDw9IDkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyO1xuICAgIH1cbiAgICBpZiAoYXJyLmxlbmd0aCA+IDkgJiYgYXJyLmxlbmd0aCA8PSAxMikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwcml2YXRlIGZvcm1Db250cm9sUmVzdWx0KGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSkge1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLl9yZW1vdmVNYXNrKHRoaXMuX3JlbW92ZVN1ZmZpeCh0aGlzLl9yZW1vdmVQcmVmaXgoaW5wdXRWYWx1ZSkpLCB0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycykpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fY2hlY2tTeW1ib2xzKGlucHV0VmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLl9yZW1vdmVTdWZmaXgodGhpcy5fcmVtb3ZlUHJlZml4KGlucHV0VmFsdWUpKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTWFzayh2YWx1ZTogc3RyaW5nLCBzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZTogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UodGhpcy5fcmVnRXhwRm9yUmVtb3ZlKHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlKSwgJycpIDogdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVQcmVmaXgodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnByZWZpeCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS5yZXBsYWNlKHRoaXMucHJlZml4LCAnJykgOiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZVN1ZmZpeCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuc3VmZml4KSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UodGhpcy5zdWZmaXgsICcnKSA6IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmV0cmlldmVTZXBhcmF0b3JWYWx1ZShyZXN1bHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW92ZU1hc2sodGhpcy5fcmVtb3ZlU3VmZml4KHRoaXMuX3JlbW92ZVByZWZpeChyZXN1bHQpKSwgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnRXhwRm9yUmVtb3ZlKHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlOiBzdHJpbmdbXSk6IFJlZ0V4cCB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmUubWFwKChpdGVtOiBzdHJpbmcpID0+IGBcXFxcJHtpdGVtfWApLmpvaW4oJ3wnKSwgJ2dpJyk7XG4gIH1cblxuICBwcml2YXRlIF9jaGVja1N5bWJvbHMocmVzdWx0OiBzdHJpbmcpOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICBpZiAocmVzdWx0ID09PSAnJykge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCBzZXBhcmF0b3JQcmVjaXNpb246IG51bWJlciB8IG51bGwgPSB0aGlzLl9yZXRyaWV2ZVNlcGFyYXRvclByZWNpc2lvbih0aGlzLm1hc2tFeHByZXNzaW9uKTtcbiAgICBsZXQgc2VwYXJhdG9yVmFsdWU6IHN0cmluZyA9IHRoaXMuX3JldHJpZXZlU2VwYXJhdG9yVmFsdWUocmVzdWx0KTtcbiAgICBpZiAodGhpcy5kZWNpbWFsTWFya2VyICE9PSAnLicpIHtcbiAgICAgIHNlcGFyYXRvclZhbHVlID0gc2VwYXJhdG9yVmFsdWUucmVwbGFjZSh0aGlzLmRlY2ltYWxNYXJrZXIsICcuJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNOdW1iZXJWYWx1ZSkge1xuICAgICAgaWYgKHNlcGFyYXRvclByZWNpc2lvbikge1xuICAgICAgICBpZiAocmVzdWx0ID09PSB0aGlzLmRlY2ltYWxNYXJrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tQcmVjaXNpb24odGhpcy5tYXNrRXhwcmVzc2lvbiwgc2VwYXJhdG9yVmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihzZXBhcmF0b3JWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZXBhcmF0b3JWYWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIHNob3VsZCB0aGluayBhYm91dCBoZWxwZXJzIG9yIHNlcGFydGluZyBkZWNpbWFsIHByZWNpc2lvbiB0byBvd24gcHJvcGVydHlcbiAgcHJpdmF0ZSBfcmV0cmlldmVTZXBhcmF0b3JQcmVjaXNpb24obWFza0V4cHJldGlvbjogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgbWF0Y2hlcjogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwgPSBtYXNrRXhwcmV0aW9uLm1hdGNoKG5ldyBSZWdFeHAoYF5zZXBhcmF0b3JcXFxcLihbXmRdKilgKSk7XG4gICAgcmV0dXJuIG1hdGNoZXIgPyBOdW1iZXIobWF0Y2hlclsxXSkgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tQcmVjaXNpb24oc2VwYXJhdG9yRXhwcmVzc2lvbjogc3RyaW5nLCBzZXBhcmF0b3JWYWx1ZTogc3RyaW5nKTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgICBpZiAoc2VwYXJhdG9yRXhwcmVzc2lvbi5pbmRleE9mKCcyJykgPiAwKSB7XG4gICAgICByZXR1cm4gTnVtYmVyKHNlcGFyYXRvclZhbHVlKS50b0ZpeGVkKDIpO1xuICAgIH1cbiAgICByZXR1cm4gTnVtYmVyKHNlcGFyYXRvclZhbHVlKTtcbiAgfVxufVxuIl19