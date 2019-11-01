/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config, timeMasks, withoutValidation } from './config';
import { MaskService } from './mask.service';
// tslint:disable deprecation
var MaskDirective = /** @class */ (function () {
    function MaskDirective(document, _maskService, _config) {
        this.document = document;
        this._maskService = _maskService;
        this._config = _config;
        this.maskExpression = '';
        this.specialCharacters = [];
        this.patterns = {};
        this.prefix = '';
        this.suffix = '';
        this.thousandSeparator = ' ';
        this.decimalMarker = '.';
        this.dropSpecialCharacters = null;
        this.hiddenInput = null;
        this.showMaskTyped = null;
        this.placeHolderCharacter = null;
        this.shownMaskExpression = null;
        this.showTemplate = null;
        this.clearIfNotMatch = null;
        this.validation = null;
        this.separatorLimit = null;
        this._maskValue = '';
        this._position = null;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouch = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MaskDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var maskExpression = changes.maskExpression, specialCharacters = changes.specialCharacters, patterns = changes.patterns, prefix = changes.prefix, suffix = changes.suffix, thousandSeparator = changes.thousandSeparator, decimalMarker = changes.decimalMarker, dropSpecialCharacters = changes.dropSpecialCharacters, hiddenInput = changes.hiddenInput, showMaskTyped = changes.showMaskTyped, placeHolderCharacter = changes.placeHolderCharacter, shownMaskExpression = changes.shownMaskExpression, showTemplate = changes.showTemplate, clearIfNotMatch = changes.clearIfNotMatch, validation = changes.validation, separatorLimit = changes.separatorLimit;
        if (maskExpression) {
            this._maskValue = changes.maskExpression.currentValue || '';
        }
        if (specialCharacters) {
            if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
                return;
            }
            else {
                this._maskService.maskSpecialCharacters = changes.specialCharacters.currentValue || [];
            }
        }
        if (patterns) {
            this._maskService.maskAvailablePatterns = patterns.currentValue;
        }
        if (prefix) {
            this._maskService.prefix = prefix.currentValue;
        }
        if (suffix) {
            this._maskService.suffix = suffix.currentValue;
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator.currentValue;
        }
        if (decimalMarker) {
            this._maskService.decimalMarker = decimalMarker.currentValue;
        }
        if (dropSpecialCharacters) {
            this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
        }
        if (hiddenInput) {
            this._maskService.hiddenInput = hiddenInput.currentValue;
        }
        if (showMaskTyped) {
            this._maskService.showMaskTyped = showMaskTyped.currentValue;
        }
        if (placeHolderCharacter) {
            this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
        }
        if (shownMaskExpression) {
            this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
        }
        if (showTemplate) {
            this._maskService.showTemplate = showTemplate.currentValue;
        }
        if (clearIfNotMatch) {
            this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
        }
        if (validation) {
            this._maskService.validation = validation.currentValue;
        }
        if (separatorLimit) {
            this._maskService.separatorLimit = separatorLimit.currentValue;
        }
        this._applyMask();
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    MaskDirective.prototype.validate = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var value = _a.value;
        if (!this._maskService.validation) {
            return null;
        }
        if (this._maskService.ipError) {
            return { 'Mask error': true };
        }
        if (this._maskValue.startsWith('separator')) {
            return null;
        }
        if (withoutValidation.includes(this._maskValue)) {
            return null;
        }
        if (this._maskService.clearIfNotMatch) {
            return null;
        }
        if (timeMasks.includes(this._maskValue)) {
            return this._validateTime(value);
        }
        if (value && value.toString().length >= 1) {
            /** @type {?} */
            var counterOfOpt = 0;
            var _loop_1 = function (key) {
                if (this_1._maskService.maskAvailablePatterns[key].optional &&
                    this_1._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this_1._maskValue.indexOf(key) !== this_1._maskValue.lastIndexOf(key)) {
                        /** @type {?} */
                        var opt = this_1._maskValue
                            .split('')
                            .filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i === key; }))
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this_1._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this_1._maskValue.indexOf(key) !== -1 && value.toString().length >= this_1._maskValue.indexOf(key)) {
                        return { value: null };
                    }
                    if (counterOfOpt === this_1._maskValue.length) {
                        return { value: null };
                    }
                }
            };
            var this_1 = this;
            for (var key in this._maskService.maskAvailablePatterns) {
                var state_1 = _loop_1(key);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            if (this._maskValue.indexOf('{') === 1 &&
                value.toString().length === this._maskValue.length + Number(this._maskValue.split('{')[1].split('}')[0]) - 4) {
                return null;
            }
            if (this._maskValue.indexOf('*') === 1 || this._maskValue.indexOf('?') === 1) {
                return null;
            }
            else if ((this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*')) ||
                (this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?')) ||
                this._maskValue.indexOf('{') === 1) {
                return { 'Mask error': true };
            }
            if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
                /** @type {?} */
                var length_1 = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length_1) {
                    return { 'Mask error': true };
                }
            }
        }
        return null;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        var position = el.selectionStart === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : ((/** @type {?} */ (el.selectionStart)));
        /** @type {?} */
        var caretShift = 0;
        /** @type {?} */
        var backspaceShift = false;
        this._maskService.applyValueChanges(position, (/**
         * @param {?} shift
         * @param {?} _backspaceShift
         * @return {?}
         */
        function (shift, _backspaceShift) {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        }));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        /** @type {?} */
        var positionToApply = this._position
            ? this._inputValue.length + position + caretShift
            : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
        el.setSelectionRange(positionToApply, positionToApply);
        if ((this.maskExpression.includes('H') || this.maskExpression.includes('M')) && caretShift === 0) {
            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) + 1, ((/** @type {?} */ (el.selectionStart))) + 1);
        }
        this._position = null;
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        /** @type {?} */
        var posStart = 0;
        /** @type {?} */
        var posEnd = 0;
        if (el !== null &&
            el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            ((/** @type {?} */ (e))).keyCode !== 38)
            if (this._maskService.showMaskTyped) {
                // We are showing the mask in the input
                this._maskService.maskIsShown = this._maskService.showMaskInInput();
                if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
                    // the input ONLY contains the mask, so position the cursor at the start
                    el.focus();
                    el.setSelectionRange(posStart, posEnd);
                }
                else {
                    // the input contains some characters already
                    if (el.selectionStart > this._maskService.actualValue.length) {
                        // if the user clicked beyond our value's length, position the cursor at the end of our value
                        el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
                    }
                }
            }
        /** @type {?} */
        var nextValue = !el.value || el.value === this._maskService.prefix
            ? this._maskService.prefix + this._maskService.maskIsShown
            : el.value;
        /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */
        if (el.value !== nextValue) {
            el.value = nextValue;
        }
        /** fix of cursor position with prefix when mouse click occur */
        if ((((/** @type {?} */ (el.selectionStart))) || ((/** @type {?} */ (el.selectionEnd)))) <= this._maskService.prefix.length) {
            el.selectionStart = this._maskService.prefix.length;
            return;
        }
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onKeyDown = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._code = e.code ? e.code : e.key;
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 46) {
            if (e.keyCode === 8 && el.value.length === 0) {
                el.selectionStart = el.selectionEnd;
            }
            if (e.keyCode === 8 && ((/** @type {?} */ (el.selectionStart))) !== 0) {
                // If specialChars is false, (shouldn't ever happen) then set to the defaults
                this.specialCharacters = this.specialCharacters || this._config.specialCharacters;
                if (this.prefix.length > 1 && ((/** @type {?} */ (el.selectionStart))) <= this.prefix.length) {
                    el.setSelectionRange(this.prefix.length, this.prefix.length);
                }
                else {
                    if (this._inputValue.length !== ((/** @type {?} */ (el.selectionStart))) &&
                        ((/** @type {?} */ (el.selectionStart))) !== 1) {
                        while (this.specialCharacters.includes(this._inputValue[((/** @type {?} */ (el.selectionStart))) - 1].toString()) &&
                            ((this.prefix.length >= 1 && ((/** @type {?} */ (el.selectionStart))) > this.prefix.length) ||
                                this.prefix.length === 0)) {
                            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
                        }
                    }
                    this.suffixCheckOnPressDelete(e.keyCode, el);
                }
            }
            this.suffixCheckOnPressDelete(e.keyCode, el);
            if (((/** @type {?} */ (el.selectionStart))) <= this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionEnd))) <= this._maskService.prefix.length) {
                e.preventDefault();
            }
            /** @type {?} */
            var cursorStart = el.selectionStart;
            // this.onFocus(e);
            if (e.keyCode === 8 &&
                !el.readOnly &&
                cursorStart === 0 &&
                el.selectionEnd === el.value.length &&
                el.value.length !== 0) {
                this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
                this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
            }
        }
        if (!!this.suffix &&
            this.suffix.length > 1 &&
            this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
            el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }
        this._maskService.selStart = el.selectionStart;
        this._maskService.selEnd = el.selectionEnd;
    };
    /** It writes the value in the input */
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    MaskDirective.prototype.writeValue = /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                if (typeof inputValue === 'number') {
                    inputValue = String(inputValue);
                    inputValue = this.decimalMarker !== '.' ? inputValue.replace('.', this.decimalMarker) : inputValue;
                    this._maskService.isNumberValue = true;
                }
                (inputValue && this._maskService.maskExpression) ||
                    (this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped))
                    ? (this._maskService.formElementProperty = [
                        'value',
                        this._maskService.applyMask(inputValue, this._maskService.maskExpression),
                    ])
                    : (this._maskService.formElementProperty = ['value', inputValue]);
                this._inputValue = inputValue;
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouch = fn;
    };
    /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    MaskDirective.prototype.suffixCheckOnPressDelete = /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    function (keyCode, el) {
        if (keyCode === 46 && this.suffix.length > 0) {
            if (this._inputValue.length - this.suffix.length <= ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
        }
        if (keyCode === 8) {
            if (this.suffix.length > 1 &&
                this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
            if (this.suffix.length === 1 && this._inputValue.length === ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
            }
        }
    };
    /** It disables the input element */
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    MaskDirective.prototype.setDisabledState = /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onModelChange = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!e) {
            this._maskService.actualValue = '';
        }
    };
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    MaskDirective.prototype._repeatPatternSymbols = /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    function (maskExp) {
        var _this = this;
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((/**
             * @param {?} accum
             * @param {?} currval
             * @param {?} index
             * @return {?}
             */
            function (accum, currval, index) {
                _this._start = currval === '{' ? index : _this._start;
                if (currval !== '}') {
                    return _this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                _this._end = index;
                /** @type {?} */
                var repeatNumber = Number(maskExp.slice(_this._start + 1, _this._end));
                /** @type {?} */
                var repaceWith = new Array(repeatNumber + 1).join(maskExp[_this._start - 1]);
                return accum + repaceWith;
            }), '')) ||
            maskExp);
    };
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._applyMask = 
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    function () {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskDirective.prototype._validateTime = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var rowMaskLen = this._maskValue.split('').filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s !== ':'; })).length;
        if (+value[value.length - 1] === 0 && value.length < rowMaskLen) {
            return { 'Mask error': true };
        }
        if (value.length <= rowMaskLen - 2) {
            return { 'Mask error': true };
        }
        return null;
    };
    MaskDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mask]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        MaskService,
                    ],
                },] }
    ];
    /** @nocollapse */
    MaskDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: MaskService },
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
    ]; };
    MaskDirective.propDecorators = {
        maskExpression: [{ type: Input, args: ['mask',] }],
        specialCharacters: [{ type: Input }],
        patterns: [{ type: Input }],
        prefix: [{ type: Input }],
        suffix: [{ type: Input }],
        thousandSeparator: [{ type: Input }],
        decimalMarker: [{ type: Input }],
        dropSpecialCharacters: [{ type: Input }],
        hiddenInput: [{ type: Input }],
        showMaskTyped: [{ type: Input }],
        placeHolderCharacter: [{ type: Input }],
        shownMaskExpression: [{ type: Input }],
        showTemplate: [{ type: Input }],
        clearIfNotMatch: [{ type: Input }],
        validation: [{ type: Input }],
        separatorLimit: [{ type: Input }],
        onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
        onBlur: [{ type: HostListener, args: ['blur',] }],
        onFocus: [{ type: HostListener, args: ['click', ['$event'],] }],
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onModelChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
    };
    return MaskDirective;
}());
export { MaskDirective };
if (false) {
    /** @type {?} */
    MaskDirective.prototype.maskExpression;
    /** @type {?} */
    MaskDirective.prototype.specialCharacters;
    /** @type {?} */
    MaskDirective.prototype.patterns;
    /** @type {?} */
    MaskDirective.prototype.prefix;
    /** @type {?} */
    MaskDirective.prototype.suffix;
    /** @type {?} */
    MaskDirective.prototype.thousandSeparator;
    /** @type {?} */
    MaskDirective.prototype.decimalMarker;
    /** @type {?} */
    MaskDirective.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskDirective.prototype.hiddenInput;
    /** @type {?} */
    MaskDirective.prototype.showMaskTyped;
    /** @type {?} */
    MaskDirective.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskDirective.prototype.shownMaskExpression;
    /** @type {?} */
    MaskDirective.prototype.showTemplate;
    /** @type {?} */
    MaskDirective.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskDirective.prototype.validation;
    /** @type {?} */
    MaskDirective.prototype.separatorLimit;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._inputValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._position;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._start;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._end;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._code;
    /** @type {?} */
    MaskDirective.prototype.onChange;
    /** @type {?} */
    MaskDirective.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype.document;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskService;
    /**
     * @type {?}
     * @protected
     */
    MaskDirective.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBcUMsYUFBYSxFQUFFLGlCQUFpQixFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUc3QztJQXlDRSx1QkFDNEIsUUFBYSxFQUMvQixZQUF5QixFQUNQLE9BQWdCO1FBRmhCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDUCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBM0J0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUNsQyxzQkFBaUIsR0FBaUMsRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBd0IsRUFBRSxDQUFDO1FBQ25DLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLHNCQUFpQixHQUFpQyxHQUFHLENBQUM7UUFDdEQsa0JBQWEsR0FBNkIsR0FBRyxDQUFDO1FBQzlDLDBCQUFxQixHQUE0QyxJQUFJLENBQUM7UUFDdEUsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBQ2xELGtCQUFhLEdBQW9DLElBQUksQ0FBQztRQUN0RCx5QkFBb0IsR0FBMkMsSUFBSSxDQUFDO1FBQ3BFLHdCQUFtQixHQUEwQyxJQUFJLENBQUM7UUFDbEUsaUJBQVksR0FB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QUFrRTs7SUFDbEUsc0NBQXNFOztJQUN0RSw2Q0FBb0Y7O0lBQ3BGLDRDQUFrRjs7SUFDbEYscUNBQW9FOztJQUNwRSx3Q0FBMEU7O0lBQzFFLG1DQUFnRTs7SUFDaEUsdUNBQXdFOzs7OztJQUN4RSxtQ0FBZ0M7Ozs7O0lBQ2hDLG9DQUE2Qjs7Ozs7SUFDN0Isa0NBQXdDOzs7OztJQUV4QywrQkFBd0I7Ozs7O0lBQ3hCLDZCQUFzQjs7Ozs7SUFDdEIsOEJBQXVCOztJQVF2QixpQ0FBa0M7O0lBQ2xDLGdDQUEyQjs7Ozs7SUFOekIsaUNBQXVDOzs7OztJQUN2QyxxQ0FBaUM7Ozs7O0lBQ2pDLGdDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEN1c3RvbUtleWJvYXJkRXZlbnQgfSBmcm9tICcuL2N1c3RvbS1rZXlib2FyZC1ldmVudCc7XG5pbXBvcnQgeyBjb25maWcsIElDb25maWcsIHRpbWVNYXNrcywgd2l0aG91dFZhbGlkYXRpb24gfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYXNrU2VydmljZSB9IGZyb20gJy4vbWFzay5zZXJ2aWNlJztcblxuLy8gdHNsaW50OmRpc2FibGUgZGVwcmVjYXRpb25cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXNrXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWFza0RpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXNrRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgTWFza1NlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hc2tEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCdtYXNrJykgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcHVibGljIHNwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydzcGVjaWFsQ2hhcmFjdGVycyddID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXR0ZXJuczogSUNvbmZpZ1sncGF0dGVybnMnXSA9IHt9O1xuICBASW5wdXQoKSBwdWJsaWMgcHJlZml4OiBJQ29uZmlnWydwcmVmaXgnXSA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgc3VmZml4OiBJQ29uZmlnWydzdWZmaXgnXSA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgdGhvdXNhbmRTZXBhcmF0b3I6IElDb25maWdbJ3Rob3VzYW5kU2VwYXJhdG9yJ10gPSAnICc7XG4gIEBJbnB1dCgpIHB1YmxpYyBkZWNpbWFsTWFya2VyOiBJQ29uZmlnWydkZWNpbWFsTWFya2VyJ10gPSAnLic7XG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wU3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ2Ryb3BTcGVjaWFsQ2hhcmFjdGVycyddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRkZW5JbnB1dDogSUNvbmZpZ1snaGlkZGVuSW5wdXQnXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01hc2tUeXBlZDogSUNvbmZpZ1snc2hvd01hc2tUeXBlZCddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZUhvbGRlckNoYXJhY3RlcjogSUNvbmZpZ1sncGxhY2VIb2xkZXJDaGFyYWN0ZXInXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd25NYXNrRXhwcmVzc2lvbjogSUNvbmZpZ1snc2hvd25NYXNrRXhwcmVzc2lvbiddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93VGVtcGxhdGU6IElDb25maWdbJ3Nob3dUZW1wbGF0ZSddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhcklmTm90TWF0Y2g6IElDb25maWdbJ2NsZWFySWZOb3RNYXRjaCddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0aW9uOiBJQ29uZmlnWyd2YWxpZGF0aW9uJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvckxpbWl0OiBJQ29uZmlnWydzZXBhcmF0b3JMaW1pdCddIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX21hc2tWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2lucHV0VmFsdWUhOiBzdHJpbmc7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHByaXZhdGUgX3N0YXJ0ITogbnVtYmVyO1xuICBwcml2YXRlIF9lbmQhOiBudW1iZXI7XG4gIHByaXZhdGUgX2NvZGUhOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIF9tYXNrU2VydmljZTogTWFza1NlcnZpY2UsXG4gICAgQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnXG4gICkgeyB9XG5cbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHsgfTtcblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHtcbiAgICAgIG1hc2tFeHByZXNzaW9uLFxuICAgICAgc3BlY2lhbENoYXJhY3RlcnMsXG4gICAgICBwYXR0ZXJucyxcbiAgICAgIHByZWZpeCxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgZGVjaW1hbE1hcmtlcixcbiAgICAgIGRyb3BTcGVjaWFsQ2hhcmFjdGVycyxcbiAgICAgIGhpZGRlbklucHV0LFxuICAgICAgc2hvd01hc2tUeXBlZCxcbiAgICAgIHBsYWNlSG9sZGVyQ2hhcmFjdGVyLFxuICAgICAgc2hvd25NYXNrRXhwcmVzc2lvbixcbiAgICAgIHNob3dUZW1wbGF0ZSxcbiAgICAgIGNsZWFySWZOb3RNYXRjaCxcbiAgICAgIHZhbGlkYXRpb24sXG4gICAgICBzZXBhcmF0b3JMaW1pdCxcbiAgICB9ID0gY2hhbmdlcztcbiAgICBpZiAobWFza0V4cHJlc3Npb24pIHtcbiAgICAgIHRoaXMuX21hc2tWYWx1ZSA9IGNoYW5nZXMubWFza0V4cHJlc3Npb24uY3VycmVudFZhbHVlIHx8ICcnO1xuICAgIH1cbiAgICBpZiAoc3BlY2lhbENoYXJhY3RlcnMpIHtcbiAgICAgIGlmICghc3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlIHx8ICFBcnJheS5pc0FycmF5KHNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gY2hhbmdlcy5zcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWUgfHwgW107XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXR0ZXJucykge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gcGF0dGVybnMuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAocHJlZml4KSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggPSBwcmVmaXguY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc3VmZml4KSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zdWZmaXggPSBzdWZmaXguY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhvdXNhbmRTZXBhcmF0b3IpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnRob3VzYW5kU2VwYXJhdG9yID0gdGhvdXNhbmRTZXBhcmF0b3IuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoZGVjaW1hbE1hcmtlcikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuZGVjaW1hbE1hcmtlciA9IGRlY2ltYWxNYXJrZXIuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPSBkcm9wU3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoaGlkZGVuSW5wdXQpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmhpZGRlbklucHV0ID0gaGlkZGVuSW5wdXQuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2hvd01hc2tUeXBlZCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCA9IHNob3dNYXNrVHlwZWQuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAocGxhY2VIb2xkZXJDaGFyYWN0ZXIpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnBsYWNlSG9sZGVyQ2hhcmFjdGVyID0gcGxhY2VIb2xkZXJDaGFyYWN0ZXIuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2hvd25NYXNrRXhwcmVzc2lvbikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd25NYXNrRXhwcmVzc2lvbiA9IHNob3duTWFza0V4cHJlc3Npb24uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2hvd1RlbXBsYXRlKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93VGVtcGxhdGUgPSBzaG93VGVtcGxhdGUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2xlYXJJZk5vdE1hdGNoKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2ggPSBjbGVhcklmTm90TWF0Y2guY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAodmFsaWRhdGlvbikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UudmFsaWRhdGlvbiA9IHZhbGlkYXRpb24uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VwYXJhdG9yTGltaXQpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNlcGFyYXRvckxpbWl0ID0gc2VwYXJhdG9yTGltaXQuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICB0aGlzLl9hcHBseU1hc2soKTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3ljbG9tYXRpYy1jb21wbGV4aXR5XG4gIHB1YmxpYyB2YWxpZGF0ZSh7IHZhbHVlIH06IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGlmICghdGhpcy5fbWFza1NlcnZpY2UudmFsaWRhdGlvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9tYXNrU2VydmljZS5pcEVycm9yKSB7XG4gICAgICByZXR1cm4geyAnTWFzayBlcnJvcic6IHRydWUgfTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5zdGFydHNXaXRoKCdzZXBhcmF0b3InKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh3aXRob3V0VmFsaWRhdGlvbi5pbmNsdWRlcyh0aGlzLl9tYXNrVmFsdWUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aW1lTWFza3MuaW5jbHVkZXModGhpcy5fbWFza1ZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlVGltZSh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSAxKSB7XG4gICAgICBsZXQgY291bnRlck9mT3B0ID0gMDtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJucykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zW2tleV0ub3B0aW9uYWwgJiZcbiAgICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnNba2V5XS5vcHRpb25hbCA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gdGhpcy5fbWFza1ZhbHVlLmxhc3RJbmRleE9mKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdDogc3RyaW5nID0gdGhpcy5fbWFza1ZhbHVlXG4gICAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgICAgLmZpbHRlcigoaTogc3RyaW5nKSA9PiBpID09PSBrZXkpXG4gICAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgICAgIGNvdW50ZXJPZk9wdCArPSBvcHQubGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvdW50ZXJPZk9wdCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gLTEgJiYgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gdGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb3VudGVyT2ZPcHQgPT09IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZigneycpID09PSAxICYmXG4gICAgICAgIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID09PSB0aGlzLl9tYXNrVmFsdWUubGVuZ3RoICsgTnVtYmVyKHRoaXMuX21hc2tWYWx1ZS5zcGxpdCgneycpWzFdLnNwbGl0KCd9JylbMF0pIC0gNFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykgPT09IDEgfHwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJz8nKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID4gMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykpIHx8XG4gICAgICAgICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID4gMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykpIHx8XG4gICAgICAgIHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCd7JykgPT09IDFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4geyAnTWFzayBlcnJvcic6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID09PSAtMSB8fCB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID09PSAtMSkge1xuICAgICAgICBjb25zdCBsZW5ndGg6IG51bWJlciA9IHRoaXMuX21hc2tTZXJ2aWNlLmRyb3BTcGVjaWFsQ2hhcmFjdGVyc1xuICAgICAgICAgID8gdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCAtIHRoaXMuX21hc2tTZXJ2aWNlLmNoZWNrU3BlY2lhbENoYXJBbW91bnQodGhpcy5fbWFza1ZhbHVlKSAtIGNvdW50ZXJPZk9wdFxuICAgICAgICAgIDogdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCAtIGNvdW50ZXJPZk9wdDtcbiAgICAgICAgaWYgKHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHsgJ01hc2sgZXJyb3InOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbklucHV0KGU6IEN1c3RvbUtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xuICAgIGlmICghdGhpcy5fbWFza1ZhbHVlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGVsLnZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9XG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9PT0gMVxuICAgICAgICA/IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxuICAgICAgICA6IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuICAgIGxldCBjYXJldFNoaWZ0ID0gMDtcbiAgICBsZXQgYmFja3NwYWNlU2hpZnQgPSBmYWxzZTtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseVZhbHVlQ2hhbmdlcyhwb3NpdGlvbiwgKHNoaWZ0OiBudW1iZXIsIF9iYWNrc3BhY2VTaGlmdDogYm9vbGVhbikgPT4ge1xuICAgICAgY2FyZXRTaGlmdCA9IHNoaWZ0O1xuICAgICAgYmFja3NwYWNlU2hpZnQgPSBfYmFja3NwYWNlU2hpZnQ7XG4gICAgfSk7XG4gICAgLy8gb25seSBzZXQgdGhlIHNlbGVjdGlvbiBpZiB0aGUgZWxlbWVudCBpcyBhY3RpdmVcbiAgICBpZiAodGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uID09PSAxICYmIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoID09PSAxID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xuICAgIGNvbnN0IHBvc2l0aW9uVG9BcHBseTogbnVtYmVyID0gdGhpcy5fcG9zaXRpb25cbiAgICAgID8gdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggKyBwb3NpdGlvbiArIGNhcmV0U2hpZnRcbiAgICAgIDogcG9zaXRpb24gKyAodGhpcy5fY29kZSA9PT0gJ0JhY2tzcGFjZScgJiYgIWJhY2tzcGFjZVNoaWZ0ID8gMCA6IGNhcmV0U2hpZnQpO1xuICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHBvc2l0aW9uVG9BcHBseSwgcG9zaXRpb25Ub0FwcGx5KTtcbiAgICBpZiAoKHRoaXMubWFza0V4cHJlc3Npb24uaW5jbHVkZXMoJ0gnKSB8fCB0aGlzLm1hc2tFeHByZXNzaW9uLmluY2x1ZGVzKCdNJykpICYmIGNhcmV0U2hpZnQgPT09IDApIHtcbiAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgMSwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyAxKTtcbiAgICB9XG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHB1YmxpYyBvbkJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoRm4oKTtcbiAgICB0aGlzLm9uVG91Y2goKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRm9jdXMoZTogTW91c2VFdmVudCB8IEN1c3RvbUtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgcG9zU3RhcnQgPSAwO1xuICAgIGNvbnN0IHBvc0VuZCA9IDA7XG4gICAgaWYgKFxuICAgICAgZWwgIT09IG51bGwgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ICE9PSBudWxsICYmXG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9PT0gZWwuc2VsZWN0aW9uRW5kICYmXG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA+IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGggJiZcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgKGUgYXMgYW55KS5rZXlDb2RlICE9PSAzOFxuICAgIClcbiAgICAgIGlmICh0aGlzLl9tYXNrU2VydmljZS5zaG93TWFza1R5cGVkKSB7XG4gICAgICAgIC8vIFdlIGFyZSBzaG93aW5nIHRoZSBtYXNrIGluIHRoZSBpbnB1dFxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93biA9IHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrSW5JbnB1dCgpO1xuICAgICAgICBpZiAoZWwuc2V0U2VsZWN0aW9uUmFuZ2UgJiYgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ICsgdGhpcy5fbWFza1NlcnZpY2UubWFza0lzU2hvd24gPT09IGVsLnZhbHVlKSB7XG4gICAgICAgICAgLy8gdGhlIGlucHV0IE9OTFkgY29udGFpbnMgdGhlIG1hc2ssIHNvIHBvc2l0aW9uIHRoZSBjdXJzb3IgYXQgdGhlIHN0YXJ0XG4gICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShwb3NTdGFydCwgcG9zRW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGUgaW5wdXQgY29udGFpbnMgc29tZSBjaGFyYWN0ZXJzIGFscmVhZHlcbiAgICAgICAgICBpZiAoZWwuc2VsZWN0aW9uU3RhcnQgPiB0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSB1c2VyIGNsaWNrZWQgYmV5b25kIG91ciB2YWx1ZSdzIGxlbmd0aCwgcG9zaXRpb24gdGhlIGN1cnNvciBhdCB0aGUgZW5kIG9mIG91ciB2YWx1ZVxuICAgICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoLCB0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIGNvbnN0IG5leHRWYWx1ZTogc3RyaW5nIHwgbnVsbCA9XG4gICAgICAhZWwudmFsdWUgfHwgZWwudmFsdWUgPT09IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeFxuICAgICAgICA/IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCArIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duXG4gICAgICAgIDogZWwudmFsdWU7XG5cbiAgICAvKiogRml4IG9mIGN1cnNvciBwb3NpdGlvbiBqdW1waW5nIHRvIGVuZCBpbiBtb3N0IGJyb3dzZXJzIG5vIG1hdHRlciB3aGVyZSBjdXJzb3IgaXMgaW5zZXJ0ZWQgb25Gb2N1cyAqL1xuICAgIGlmIChlbC52YWx1ZSAhPT0gbmV4dFZhbHVlKSB7XG4gICAgICBlbC52YWx1ZSA9IG5leHRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogZml4IG9mIGN1cnNvciBwb3NpdGlvbiB3aXRoIHByZWZpeCB3aGVuIG1vdXNlIGNsaWNrIG9jY3VyICovXG4gICAgaWYgKCgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSB8fCAoZWwuc2VsZWN0aW9uRW5kIGFzIG51bWJlcikpIDw9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGgpIHtcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN5Y2xvbWF0aWMtY29tcGxleGl0eVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uS2V5RG93bihlOiBDdXN0b21LZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29kZSA9IGUuY29kZSA/IGUuY29kZSA6IGUua2V5O1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gZWwudmFsdWU7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSA4IHx8IGUua2V5Q29kZSA9PT0gNDYpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDggJiYgZWwudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gZWwuc2VsZWN0aW9uRW5kO1xuICAgICAgfVxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOCAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAhPT0gMCkge1xuICAgICAgICAvLyBJZiBzcGVjaWFsQ2hhcnMgaXMgZmFsc2UsIChzaG91bGRuJ3QgZXZlciBoYXBwZW4pIHRoZW4gc2V0IHRvIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLnNwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5zcGVjaWFsQ2hhcmFjdGVycyB8fCB0aGlzLl9jb25maWcuc3BlY2lhbENoYXJhY3RlcnM7XG4gICAgICAgIGlmICh0aGlzLnByZWZpeC5sZW5ndGggPiAxICYmIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIDw9IHRoaXMucHJlZml4Lmxlbmd0aCkge1xuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMucHJlZml4Lmxlbmd0aCwgdGhpcy5wcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAhPT0gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgJiZcbiAgICAgICAgICAgIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICE9PSAxXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB3aGlsZSAoXG4gICAgICAgICAgICAgIHRoaXMuc3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5faW5wdXRWYWx1ZVsoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDFdLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgICAoKHRoaXMucHJlZml4Lmxlbmd0aCA+PSAxICYmIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpID4gdGhpcy5wcmVmaXgubGVuZ3RoKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMucHJlZml4Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEsIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc3VmZml4Q2hlY2tPblByZXNzRGVsZXRlKGUua2V5Q29kZSwgZWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnN1ZmZpeENoZWNrT25QcmVzc0RlbGV0ZShlLmtleUNvZGUsIGVsKTtcbiAgICAgIGlmIChcbiAgICAgICAgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxuICAgICAgICAoZWwuc2VsZWN0aW9uRW5kIGFzIG51bWJlcikgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxuICAgICAgKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnNvclN0YXJ0OiBudW1iZXIgfCBudWxsID0gZWwuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAvLyB0aGlzLm9uRm9jdXMoZSk7XG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSA9PT0gOCAmJlxuICAgICAgICAhZWwucmVhZE9ubHkgJiZcbiAgICAgICAgY3Vyc29yU3RhcnQgPT09IDAgJiZcbiAgICAgICAgZWwuc2VsZWN0aW9uRW5kID09PSBlbC52YWx1ZS5sZW5ndGggJiZcbiAgICAgICAgZWwudmFsdWUubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggPyB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoIDogMDtcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCwgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24sIHRoaXMuX3Bvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgISF0aGlzLnN1ZmZpeCAmJlxuICAgICAgdGhpcy5zdWZmaXgubGVuZ3RoID4gMSAmJlxuICAgICAgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGggPCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKVxuICAgICkge1xuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgsIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uuc2VsU3RhcnQgPSBlbC5zZWxlY3Rpb25TdGFydDtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5zZWxFbmQgPSBlbC5zZWxlY3Rpb25FbmQ7XG4gIH1cblxuICAvKiogSXQgd3JpdGVzIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgKi9cbiAgcHVibGljIGFzeW5jIHdyaXRlVmFsdWUoaW5wdXRWYWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGlucHV0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5wdXRWYWx1ZSA9ICcnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGlucHV0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBpbnB1dFZhbHVlID0gU3RyaW5nKGlucHV0VmFsdWUpO1xuICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuZGVjaW1hbE1hcmtlciAhPT0gJy4nID8gaW5wdXRWYWx1ZS5yZXBsYWNlKCcuJywgdGhpcy5kZWNpbWFsTWFya2VyKSA6IGlucHV0VmFsdWU7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5pc051bWJlclZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgKGlucHV0VmFsdWUgJiYgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24pIHx8XG4gICAgICAodGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24gJiYgKHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCB8fCB0aGlzLl9tYXNrU2VydmljZS5zaG93TWFza1R5cGVkKSlcbiAgICAgID8gKHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhpbnB1dFZhbHVlLCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiksXG4gICAgICBdKVxuICAgICAgOiAodGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsndmFsdWUnLCBpbnB1dFZhbHVlXSk7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGlucHV0VmFsdWU7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoID0gZm47XG4gIH1cblxuICBwdWJsaWMgc3VmZml4Q2hlY2tPblByZXNzRGVsZXRlKGtleUNvZGU6IG51bWJlciwgZWw6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAoa2V5Q29kZSA9PT0gNDYgJiYgdGhpcy5zdWZmaXgubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoIDw9IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpKSB7XG4gICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoLCB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChrZXlDb2RlID09PSA4KSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDEgJiZcbiAgICAgICAgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGggPCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKVxuICAgICAgKSB7XG4gICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoLCB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdWZmaXgubGVuZ3RoID09PSAxICYmIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoID09PSAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSkge1xuICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEsIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEl0IGRpc2FibGVzIHRoZSBpbnB1dCBlbGVtZW50ICovXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gWydkaXNhYmxlZCcsIGlzRGlzYWJsZWRdO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbmdNb2RlbENoYW5nZScsIFsnJGV2ZW50J10pXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55XG4gIHB1YmxpYyBvbk1vZGVsQ2hhbmdlKGU6IGFueSk6IHZvaWQge1xuICAgIGlmICghZSkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXBlYXRQYXR0ZXJuU3ltYm9scyhtYXNrRXhwOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAoXG4gICAgICAobWFza0V4cC5tYXRjaCgve1swLTldK30vKSAmJlxuICAgICAgICBtYXNrRXhwLnNwbGl0KCcnKS5yZWR1Y2UoKGFjY3VtOiBzdHJpbmcsIGN1cnJ2YWw6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgICAgdGhpcy5fc3RhcnQgPSBjdXJydmFsID09PSAneycgPyBpbmRleCA6IHRoaXMuX3N0YXJ0O1xuXG4gICAgICAgICAgaWYgKGN1cnJ2YWwgIT09ICd9Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLl9maW5kU3BlY2lhbENoYXIoY3VycnZhbCkgPyBhY2N1bSArIGN1cnJ2YWwgOiBhY2N1bTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fZW5kID0gaW5kZXg7XG4gICAgICAgICAgY29uc3QgcmVwZWF0TnVtYmVyOiBudW1iZXIgPSBOdW1iZXIobWFza0V4cC5zbGljZSh0aGlzLl9zdGFydCArIDEsIHRoaXMuX2VuZCkpO1xuICAgICAgICAgIGNvbnN0IHJlcGFjZVdpdGg6IHN0cmluZyA9IG5ldyBBcnJheShyZXBlYXROdW1iZXIgKyAxKS5qb2luKG1hc2tFeHBbdGhpcy5fc3RhcnQgLSAxXSk7XG4gICAgICAgICAgcmV0dXJuIGFjY3VtICsgcmVwYWNlV2l0aDtcbiAgICAgICAgfSwgJycpKSB8fFxuICAgICAgbWFza0V4cFxuICAgICk7XG4gIH1cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBwcml2YXRlIF9hcHBseU1hc2soKTogYW55IHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiA9IHRoaXMuX3JlcGVhdFBhdHRlcm5TeW1ib2xzKHRoaXMuX21hc2tWYWx1ZSB8fCAnJyk7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFtcbiAgICAgICd2YWx1ZScsXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2sodGhpcy5faW5wdXRWYWx1ZSwgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24pLFxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0ZVRpbWUodmFsdWU6IHN0cmluZyk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICBjb25zdCByb3dNYXNrTGVuOiBudW1iZXIgPSB0aGlzLl9tYXNrVmFsdWUuc3BsaXQoJycpLmZpbHRlcigoczogc3RyaW5nKSA9PiBzICE9PSAnOicpLmxlbmd0aDtcbiAgICBpZiAoK3ZhbHVlW3ZhbHVlLmxlbmd0aCAtIDFdID09PSAwICYmIHZhbHVlLmxlbmd0aCA8IHJvd01hc2tMZW4pIHtcbiAgICAgIHJldHVybiB7ICdNYXNrIGVycm9yJzogdHJ1ZSB9O1xuICAgIH1cbiAgICBpZiAodmFsdWUubGVuZ3RoIDw9IHJvd01hc2tMZW4gLSAyKSB7XG4gICAgICByZXR1cm4geyAnTWFzayBlcnJvcic6IHRydWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==