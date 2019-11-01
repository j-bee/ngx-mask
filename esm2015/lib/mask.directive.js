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
export class MaskDirective {
    /**
     * @param {?} document
     * @param {?} _maskService
     * @param {?} _config
     */
    constructor(document, _maskService, _config) {
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
        (_) => { });
        this.onTouch = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { maskExpression, specialCharacters, patterns, prefix, suffix, thousandSeparator, decimalMarker, dropSpecialCharacters, hiddenInput, showMaskTyped, placeHolderCharacter, shownMaskExpression, showTemplate, clearIfNotMatch, validation, separatorLimit, } = changes;
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
    }
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    validate({ value }) {
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
            let counterOfOpt = 0;
            for (const key in this._maskService.maskAvailablePatterns) {
                if (this._maskService.maskAvailablePatterns[key].optional &&
                    this._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this._maskValue.indexOf(key) !== this._maskValue.lastIndexOf(key)) {
                        /** @type {?} */
                        const opt = this._maskValue
                            .split('')
                            .filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        (i) => i === key))
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this._maskValue.indexOf(key) !== -1 && value.toString().length >= this._maskValue.indexOf(key)) {
                        return null;
                    }
                    if (counterOfOpt === this._maskValue.length) {
                        return null;
                    }
                }
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
                const length = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length) {
                    return { 'Mask error': true };
                }
            }
        }
        return null;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInput(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        const position = el.selectionStart === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : ((/** @type {?} */ (el.selectionStart)));
        /** @type {?} */
        let caretShift = 0;
        /** @type {?} */
        let backspaceShift = false;
        this._maskService.applyValueChanges(position, (/**
         * @param {?} shift
         * @param {?} _backspaceShift
         * @return {?}
         */
        (shift, _backspaceShift) => {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        }));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        /** @type {?} */
        const positionToApply = this._position
            ? this._inputValue.length + position + caretShift
            : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
        el.setSelectionRange(positionToApply, positionToApply);
        if ((this.maskExpression.includes('H') || this.maskExpression.includes('M')) && caretShift === 0) {
            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) + 1, ((/** @type {?} */ (el.selectionStart))) + 1);
        }
        this._position = null;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onFocus(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        /** @type {?} */
        const posStart = 0;
        /** @type {?} */
        const posEnd = 0;
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
        const nextValue = !el.value || el.value === this._maskService.prefix
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
    }
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        this._code = e.code ? e.code : e.key;
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
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
            const cursorStart = el.selectionStart;
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
    }
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    writeValue(inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, /** @this {!MaskDirective} */ function* () {
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
        });
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    suffixCheckOnPressDelete(keyCode, el) {
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
    }
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onModelChange(e) {
        if (!e) {
            this._maskService.actualValue = '';
        }
    }
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    _repeatPatternSymbols(maskExp) {
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((/**
             * @param {?} accum
             * @param {?} currval
             * @param {?} index
             * @return {?}
             */
            (accum, currval, index) => {
                this._start = currval === '{' ? index : this._start;
                if (currval !== '}') {
                    return this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                this._end = index;
                /** @type {?} */
                const repeatNumber = Number(maskExp.slice(this._start + 1, this._end));
                /** @type {?} */
                const repaceWith = new Array(repeatNumber + 1).join(maskExp[this._start - 1]);
                return accum + repaceWith;
            }), '')) ||
            maskExp);
    }
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    _applyMask() {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _validateTime(value) {
        /** @type {?} */
        const rowMaskLen = this._maskValue.split('').filter((/**
         * @param {?} s
         * @return {?}
         */
        (s) => s !== ':')).length;
        if (+value[value.length - 1] === 0 && value.length < rowMaskLen) {
            return { 'Mask error': true };
        }
        if (value.length <= rowMaskLen - 2) {
            return { 'Mask error': true };
        }
        return null;
    }
}
MaskDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mask]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MaskDirective)),
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MaskDirective)),
                        multi: true,
                    },
                    MaskService,
                ],
            },] }
];
/** @nocollapse */
MaskDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: MaskService },
    { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBcUMsYUFBYSxFQUFFLGlCQUFpQixFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQW1CN0MsTUFBTSxPQUFPLGFBQWE7Ozs7OztJQXlCeEIsWUFDNEIsUUFBYSxFQUMvQixZQUF5QixFQUNQLE9BQWdCO1FBRmhCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDUCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBM0J0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUNsQyxzQkFBaUIsR0FBaUMsRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBd0IsRUFBRSxDQUFDO1FBQ25DLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLHNCQUFpQixHQUFpQyxHQUFHLENBQUM7UUFDdEQsa0JBQWEsR0FBNkIsR0FBRyxDQUFDO1FBQzlDLDBCQUFxQixHQUE0QyxJQUFJLENBQUM7UUFDdEUsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBQ2xELGtCQUFhLEdBQW9DLElBQUksQ0FBQztRQUN0RCx5QkFBb0IsR0FBMkMsSUFBSSxDQUFDO1FBQ3BFLHdCQUFtQixHQUEwQyxJQUFJ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Qiw4QkFBdUI7O0lBUXZCLGlDQUFrQzs7SUFDbEMsZ0NBQTJCOzs7OztJQU56QixpQ0FBdUM7Ozs7O0lBQ3ZDLHFDQUFpQzs7Ozs7SUFDakMsZ0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ3VzdG9tS2V5Ym9hcmRFdmVudCB9IGZyb20gJy4vY3VzdG9tLWtleWJvYXJkLWV2ZW50JztcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZywgdGltZU1hc2tzLCB3aXRob3V0VmFsaWRhdGlvbiB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1hc2tTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLnNlcnZpY2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZSBkZXByZWNhdGlvblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hc2tdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXNrRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hc2tEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICBNYXNrU2VydmljZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFza0RpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuICBASW5wdXQoJ21hc2snKSBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgc3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ3NwZWNpYWxDaGFyYWN0ZXJzJ10gPSBbXTtcbiAgQElucHV0KCkgcHVibGljIHBhdHRlcm5zOiBJQ29uZmlnWydwYXR0ZXJucyddID0ge307XG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVmaXg6IElDb25maWdbJ3ByZWZpeCddID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdWZmaXg6IElDb25maWdbJ3N1ZmZpeCddID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0aG91c2FuZFNlcGFyYXRvcjogSUNvbmZpZ1sndGhvdXNhbmRTZXBhcmF0b3InXSA9ICcgJztcbiAgQElucHV0KCkgcHVibGljIGRlY2ltYWxNYXJrZXI6IElDb25maWdbJ2RlY2ltYWxNYXJrZXInXSA9ICcuJztcbiAgQElucHV0KCkgcHVibGljIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogSUNvbmZpZ1snZHJvcFNwZWNpYWxDaGFyYWN0ZXJzJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIGhpZGRlbklucHV0OiBJQ29uZmlnWydoaWRkZW5JbnB1dCddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TWFza1R5cGVkOiBJQ29uZmlnWydzaG93TWFza1R5cGVkJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHBsYWNlSG9sZGVyQ2hhcmFjdGVyOiBJQ29uZmlnWydwbGFjZUhvbGRlckNoYXJhY3RlciddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93bk1hc2tFeHByZXNzaW9uOiBJQ29uZmlnWydzaG93bk1hc2tFeHByZXNzaW9uJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHNob3dUZW1wbGF0ZTogSUNvbmZpZ1snc2hvd1RlbXBsYXRlJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIGNsZWFySWZOb3RNYXRjaDogSUNvbmZpZ1snY2xlYXJJZk5vdE1hdGNoJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHZhbGlkYXRpb246IElDb25maWdbJ3ZhbGlkYXRpb24nXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgc2VwYXJhdG9yTGltaXQ6IElDb25maWdbJ3NlcGFyYXRvckxpbWl0J10gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfbWFza1ZhbHVlOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfaW5wdXRWYWx1ZSE6IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHJpdmF0ZSBfc3RhcnQhOiBudW1iZXI7XG4gIHByaXZhdGUgX2VuZCE6IG51bWJlcjtcbiAgcHJpdmF0ZSBfY29kZSE6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgX21hc2tTZXJ2aWNlOiBNYXNrU2VydmljZSxcbiAgICBASW5qZWN0KGNvbmZpZykgcHJvdGVjdGVkIF9jb25maWc6IElDb25maWdcbiAgKSB7IH1cblxuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG4gIHB1YmxpYyBvblRvdWNoID0gKCkgPT4geyB9O1xuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgbWFza0V4cHJlc3Npb24sXG4gICAgICBzcGVjaWFsQ2hhcmFjdGVycyxcbiAgICAgIHBhdHRlcm5zLFxuICAgICAgcHJlZml4LFxuICAgICAgc3VmZml4LFxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsTWFya2VyLFxuICAgICAgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzLFxuICAgICAgaGlkZGVuSW5wdXQsXG4gICAgICBzaG93TWFza1R5cGVkLFxuICAgICAgcGxhY2VIb2xkZXJDaGFyYWN0ZXIsXG4gICAgICBzaG93bk1hc2tFeHByZXNzaW9uLFxuICAgICAgc2hvd1RlbXBsYXRlLFxuICAgICAgY2xlYXJJZk5vdE1hdGNoLFxuICAgICAgdmFsaWRhdGlvbixcbiAgICAgIHNlcGFyYXRvckxpbWl0LFxuICAgIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChtYXNrRXhwcmVzc2lvbikge1xuICAgICAgdGhpcy5fbWFza1ZhbHVlID0gY2hhbmdlcy5tYXNrRXhwcmVzc2lvbi5jdXJyZW50VmFsdWUgfHwgJyc7XG4gICAgfVxuICAgIGlmIChzcGVjaWFsQ2hhcmFjdGVycykge1xuICAgICAgaWYgKCFzcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWUgfHwgIUFycmF5LmlzQXJyYXkoc3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSBjaGFuZ2VzLnNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZSB8fCBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhdHRlcm5zKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSBwYXR0ZXJucy5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChwcmVmaXgpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCA9IHByZWZpeC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzdWZmaXgpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnN1ZmZpeCA9IHN1ZmZpeC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmICh0aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UudGhvdXNhbmRTZXBhcmF0b3IgPSB0aG91c2FuZFNlcGFyYXRvci5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChkZWNpbWFsTWFya2VyKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5kZWNpbWFsTWFya2VyID0gZGVjaW1hbE1hcmtlci5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChkcm9wU3BlY2lhbENoYXJhY3RlcnMpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmRyb3BTcGVjaWFsQ2hhcmFjdGVycyA9IGRyb3BTcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChoaWRkZW5JbnB1dCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuaGlkZGVuSW5wdXQgPSBoaWRkZW5JbnB1dC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzaG93TWFza1R5cGVkKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93TWFza1R5cGVkID0gc2hvd01hc2tUeXBlZC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChwbGFjZUhvbGRlckNoYXJhY3Rlcikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UucGxhY2VIb2xkZXJDaGFyYWN0ZXIgPSBwbGFjZUhvbGRlckNoYXJhY3Rlci5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzaG93bk1hc2tFeHByZXNzaW9uKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93bk1hc2tFeHByZXNzaW9uID0gc2hvd25NYXNrRXhwcmVzc2lvbi5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzaG93VGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNob3dUZW1wbGF0ZSA9IHNob3dUZW1wbGF0ZS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjbGVhcklmTm90TWF0Y2gpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaCA9IGNsZWFySWZOb3RNYXRjaC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmICh2YWxpZGF0aW9uKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS52YWxpZGF0aW9uID0gdmFsaWRhdGlvbi5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChzZXBhcmF0b3JMaW1pdCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2VwYXJhdG9yTGltaXQgPSBzZXBhcmF0b3JMaW1pdC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX2FwcGx5TWFzaygpO1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjeWNsb21hdGljLWNvbXBsZXhpdHlcbiAgcHVibGljIHZhbGlkYXRlKHsgdmFsdWUgfTogRm9ybUNvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLl9tYXNrU2VydmljZS52YWxpZGF0aW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLmlwRXJyb3IpIHtcbiAgICAgIHJldHVybiB7ICdNYXNrIGVycm9yJzogdHJ1ZSB9O1xuICAgIH1cbiAgICBpZiAodGhpcy5fbWFza1ZhbHVlLnN0YXJ0c1dpdGgoJ3NlcGFyYXRvcicpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHdpdGhvdXRWYWxpZGF0aW9uLmluY2x1ZGVzKHRoaXMuX21hc2tWYWx1ZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRpbWVNYXNrcy5pbmNsdWRlcyh0aGlzLl9tYXNrVmFsdWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVUaW1lKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49IDEpIHtcbiAgICAgIGxldCBjb3VudGVyT2ZPcHQgPSAwO1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnNba2V5XS5vcHRpb25hbCAmJlxuICAgICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1trZXldLm9wdGlvbmFsID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSB0aGlzLl9tYXNrVmFsdWUubGFzdEluZGV4T2Yoa2V5KSkge1xuICAgICAgICAgICAgY29uc3Qgb3B0OiBzdHJpbmcgPSB0aGlzLl9tYXNrVmFsdWVcbiAgICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgICAuZmlsdGVyKChpOiBzdHJpbmcpID0+IGkgPT09IGtleSlcbiAgICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICAgICAgY291bnRlck9mT3B0ICs9IG9wdC5sZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgY291bnRlck9mT3B0Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSAtMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvdW50ZXJPZk9wdCA9PT0gdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCd7JykgPT09IDEgJiZcbiAgICAgICAgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPT09IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGggKyBOdW1iZXIodGhpcy5fbWFza1ZhbHVlLnNwbGl0KCd7JylbMV0uc3BsaXQoJ30nKVswXSkgLSA0XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJyonKSA9PT0gMSB8fCB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykgPiAxICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJyonKSkgfHxcbiAgICAgICAgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykgPiAxICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJz8nKSkgfHxcbiAgICAgICAgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJ3snKSA9PT0gMVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB7ICdNYXNrIGVycm9yJzogdHJ1ZSB9O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykgPT09IC0xIHx8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykgPT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5fbWFza1NlcnZpY2UuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzXG4gICAgICAgICAgPyB0aGlzLl9tYXNrVmFsdWUubGVuZ3RoIC0gdGhpcy5fbWFza1NlcnZpY2UuY2hlY2tTcGVjaWFsQ2hhckFtb3VudCh0aGlzLl9tYXNrVmFsdWUpIC0gY291bnRlck9mT3B0XG4gICAgICAgICAgOiB0aGlzLl9tYXNrVmFsdWUubGVuZ3RoIC0gY291bnRlck9mT3B0O1xuICAgICAgICBpZiAodmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4geyAnTWFzayBlcnJvcic6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uSW5wdXQoZTogQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gZWwudmFsdWU7XG4gICAgaWYgKCF0aGlzLl9tYXNrVmFsdWUpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoZWwudmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID1cbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID09PSAxXG4gICAgICAgID8gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXG4gICAgICAgIDogKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG4gICAgbGV0IGNhcmV0U2hpZnQgPSAwO1xuICAgIGxldCBiYWNrc3BhY2VTaGlmdCA9IGZhbHNlO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5VmFsdWVDaGFuZ2VzKHBvc2l0aW9uLCAoc2hpZnQ6IG51bWJlciwgX2JhY2tzcGFjZVNoaWZ0OiBib29sZWFuKSA9PiB7XG4gICAgICBjYXJldFNoaWZ0ID0gc2hpZnQ7XG4gICAgICBiYWNrc3BhY2VTaGlmdCA9IF9iYWNrc3BhY2VTaGlmdDtcbiAgICB9KTtcbiAgICAvLyBvbmx5IHNldCB0aGUgc2VsZWN0aW9uIGlmIHRoZSBlbGVtZW50IGlzIGFjdGl2ZVxuICAgIGlmICh0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fcG9zaXRpb24gPT09IDEgJiYgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggPT09IDEgPyBudWxsIDogdGhpcy5fcG9zaXRpb247XG4gICAgY29uc3QgcG9zaXRpb25Ub0FwcGx5OiBudW1iZXIgPSB0aGlzLl9wb3NpdGlvblxuICAgICAgPyB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCArIHBvc2l0aW9uICsgY2FyZXRTaGlmdFxuICAgICAgOiBwb3NpdGlvbiArICh0aGlzLl9jb2RlID09PSAnQmFja3NwYWNlJyAmJiAhYmFja3NwYWNlU2hpZnQgPyAwIDogY2FyZXRTaGlmdCk7XG4gICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UocG9zaXRpb25Ub0FwcGx5LCBwb3NpdGlvblRvQXBwbHkpO1xuICAgIGlmICgodGhpcy5tYXNrRXhwcmVzc2lvbi5pbmNsdWRlcygnSCcpIHx8IHRoaXMubWFza0V4cHJlc3Npb24uaW5jbHVkZXMoJ00nKSkgJiYgY2FyZXRTaGlmdCA9PT0gMCkge1xuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyAxLCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSArIDEpO1xuICAgIH1cbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIG9uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2hGbigpO1xuICAgIHRoaXMub25Ub3VjaCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Gb2N1cyhlOiBNb3VzZUV2ZW50IHwgQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBwb3NTdGFydCA9IDA7XG4gICAgY29uc3QgcG9zRW5kID0gMDtcbiAgICBpZiAoXG4gICAgICBlbCAhPT0gbnVsbCAmJlxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgIT09IG51bGwgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID09PSBlbC5zZWxlY3Rpb25FbmQgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID4gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAoZSBhcyBhbnkpLmtleUNvZGUgIT09IDM4XG4gICAgKVxuICAgICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgICAgLy8gV2UgYXJlIHNob3dpbmcgdGhlIG1hc2sgaW4gdGhlIGlucHV0XG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duID0gdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tJbklucHV0KCk7XG4gICAgICAgIGlmIChlbC5zZXRTZWxlY3Rpb25SYW5nZSAmJiB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggKyB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93biA9PT0gZWwudmFsdWUpIHtcbiAgICAgICAgICAvLyB0aGUgaW5wdXQgT05MWSBjb250YWlucyB0aGUgbWFzaywgc28gcG9zaXRpb24gdGhlIGN1cnNvciBhdCB0aGUgc3RhcnRcbiAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHBvc1N0YXJ0LCBwb3NFbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoZSBpbnB1dCBjb250YWlucyBzb21lIGNoYXJhY3RlcnMgYWxyZWFkeVxuICAgICAgICAgIGlmIChlbC5zZWxlY3Rpb25TdGFydCA+IHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIHVzZXIgY2xpY2tlZCBiZXlvbmQgb3VyIHZhbHVlJ3MgbGVuZ3RoLCBwb3NpdGlvbiB0aGUgY3Vyc29yIGF0IHRoZSBlbmQgb2Ygb3VyIHZhbHVlXG4gICAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGgsIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgY29uc3QgbmV4dFZhbHVlOiBzdHJpbmcgfCBudWxsID1cbiAgICAgICFlbC52YWx1ZSB8fCBlbC52YWx1ZSA9PT0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4XG4gICAgICAgID8gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ICsgdGhpcy5fbWFza1NlcnZpY2UubWFza0lzU2hvd25cbiAgICAgICAgOiBlbC52YWx1ZTtcblxuICAgIC8qKiBGaXggb2YgY3Vyc29yIHBvc2l0aW9uIGp1bXBpbmcgdG8gZW5kIGluIG1vc3QgYnJvd3NlcnMgbm8gbWF0dGVyIHdoZXJlIGN1cnNvciBpcyBpbnNlcnRlZCBvbkZvY3VzICovXG4gICAgaWYgKGVsLnZhbHVlICE9PSBuZXh0VmFsdWUpIHtcbiAgICAgIGVsLnZhbHVlID0gbmV4dFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBmaXggb2YgY3Vyc29yIHBvc2l0aW9uIHdpdGggcHJlZml4IHdoZW4gbW91c2UgY2xpY2sgb2NjdXIgKi9cbiAgICBpZiAoKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIHx8IChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSkgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCkge1xuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3ljbG9tYXRpYy1jb21wbGV4aXR5XG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlEb3duKGU6IEN1c3RvbUtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2RlID0gZS5jb2RlID8gZS5jb2RlIDogZS5rZXk7XG4gICAgY29uc3QgZWw6IEhUTUxJbnB1dEVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuX2lucHV0VmFsdWUgPSBlbC52YWx1ZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAzOCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDggfHwgZS5rZXlDb2RlID09PSA0Nikge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOCAmJiBlbC52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQ7XG4gICAgICB9XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA4ICYmIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICE9PSAwKSB7XG4gICAgICAgIC8vIElmIHNwZWNpYWxDaGFycyBpcyBmYWxzZSwgKHNob3VsZG4ndCBldmVyIGhhcHBlbikgdGhlbiBzZXQgdG8gdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuc3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLnNwZWNpYWxDaGFyYWN0ZXJzIHx8IHRoaXMuX2NvbmZpZy5zcGVjaWFsQ2hhcmFjdGVycztcbiAgICAgICAgaWYgKHRoaXMucHJlZml4Lmxlbmd0aCA+IDEgJiYgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgPD0gdGhpcy5wcmVmaXgubGVuZ3RoKSB7XG4gICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5wcmVmaXgubGVuZ3RoLCB0aGlzLnByZWZpeC5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoICE9PSAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAmJlxuICAgICAgICAgICAgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgIT09IDFcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnB1dFZhbHVlWyhlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMV0udG9TdHJpbmcoKVxuICAgICAgICAgICAgICApICYmXG4gICAgICAgICAgICAgICgodGhpcy5wcmVmaXgubGVuZ3RoID49IDEgJiYgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgPiB0aGlzLnByZWZpeC5sZW5ndGgpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmaXgubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdWZmaXhDaGVja09uUHJlc3NEZWxldGUoZS5rZXlDb2RlLCBlbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc3VmZml4Q2hlY2tPblByZXNzRGVsZXRlKGUua2V5Q29kZSwgZWwpO1xuICAgICAgaWYgKFxuICAgICAgICAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoICYmXG4gICAgICAgIChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXG4gICAgICApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgY3Vyc29yU3RhcnQ6IG51bWJlciB8IG51bGwgPSBlbC5zZWxlY3Rpb25TdGFydDtcbiAgICAgIC8vIHRoaXMub25Gb2N1cyhlKTtcbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlID09PSA4ICYmXG4gICAgICAgICFlbC5yZWFkT25seSAmJlxuICAgICAgICBjdXJzb3JTdGFydCA9PT0gMCAmJlxuICAgICAgICBlbC5zZWxlY3Rpb25FbmQgPT09IGVsLnZhbHVlLmxlbmd0aCAmJlxuICAgICAgICBlbC52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCA/IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGggOiAwO1xuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2sodGhpcy5fbWFza1NlcnZpY2UucHJlZml4LCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiwgdGhpcy5fcG9zaXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoXG4gICAgICAhIXRoaXMuc3VmZml4ICYmXG4gICAgICB0aGlzLnN1ZmZpeC5sZW5ndGggPiAxICYmXG4gICAgICB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCA8IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpXG4gICAgKSB7XG4gICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCwgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgIH1cbiAgICB0aGlzLl9tYXNrU2VydmljZS5zZWxTdGFydCA9IGVsLnNlbGVjdGlvblN0YXJ0O1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNlbEVuZCA9IGVsLnNlbGVjdGlvbkVuZDtcbiAgfVxuXG4gIC8qKiBJdCB3cml0ZXMgdGhlIHZhbHVlIGluIHRoZSBpbnB1dCAqL1xuICBwdWJsaWMgYXN5bmMgd3JpdGVWYWx1ZShpbnB1dFZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoaW5wdXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpbnB1dFZhbHVlID0gJyc7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaW5wdXRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlucHV0VmFsdWUgPSBTdHJpbmcoaW5wdXRWYWx1ZSk7XG4gICAgICBpbnB1dFZhbHVlID0gdGhpcy5kZWNpbWFsTWFya2VyICE9PSAnLicgPyBpbnB1dFZhbHVlLnJlcGxhY2UoJy4nLCB0aGlzLmRlY2ltYWxNYXJrZXIpIDogaW5wdXRWYWx1ZTtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmlzTnVtYmVyVmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgICAoaW5wdXRWYWx1ZSAmJiB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbikgfHxcbiAgICAgICh0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiAmJiAodGhpcy5fbWFza1NlcnZpY2UucHJlZml4IHx8IHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpKVxuICAgICAgPyAodGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFtcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKGlucHV0VmFsdWUsIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSxcbiAgICAgIF0pXG4gICAgICA6ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gWyd2YWx1ZScsIGlucHV0VmFsdWVdKTtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzdWZmaXhDaGVja09uUHJlc3NEZWxldGUoa2V5Q29kZTogbnVtYmVyLCBlbDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICAgIGlmIChrZXlDb2RlID09PSA0NiAmJiB0aGlzLnN1ZmZpeC5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGggPD0gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikpIHtcbiAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgsIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGtleUNvZGUgPT09IDgpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5zdWZmaXgubGVuZ3RoID4gMSAmJlxuICAgICAgICB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCA8IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpXG4gICAgICApIHtcbiAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgsIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN1ZmZpeC5sZW5ndGggPT09IDEgJiYgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggPT09IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpKSB7XG4gICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogSXQgZGlzYWJsZXMgdGhlIGlucHV0IGVsZW1lbnQgKi9cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbJ2Rpc2FibGVkJywgaXNEaXNhYmxlZF07XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCduZ01vZGVsQ2hhbmdlJywgWyckZXZlbnQnXSlcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnlcbiAgcHVibGljIG9uTW9kZWxDaGFuZ2UoZTogYW55KTogdm9pZCB7XG4gICAgaWYgKCFlKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlcGVhdFBhdHRlcm5TeW1ib2xzKG1hc2tFeHA6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgIChtYXNrRXhwLm1hdGNoKC97WzAtOV0rfS8pICYmXG4gICAgICAgIG1hc2tFeHAuc3BsaXQoJycpLnJlZHVjZSgoYWNjdW06IHN0cmluZywgY3VycnZhbDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICB0aGlzLl9zdGFydCA9IGN1cnJ2YWwgPT09ICd7JyA/IGluZGV4IDogdGhpcy5fc3RhcnQ7XG5cbiAgICAgICAgICBpZiAoY3VycnZhbCAhPT0gJ30nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFza1NlcnZpY2UuX2ZpbmRTcGVjaWFsQ2hhcihjdXJydmFsKSA/IGFjY3VtICsgY3VycnZhbCA6IGFjY3VtO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9lbmQgPSBpbmRleDtcbiAgICAgICAgICBjb25zdCByZXBlYXROdW1iZXI6IG51bWJlciA9IE51bWJlcihtYXNrRXhwLnNsaWNlKHRoaXMuX3N0YXJ0ICsgMSwgdGhpcy5fZW5kKSk7XG4gICAgICAgICAgY29uc3QgcmVwYWNlV2l0aDogc3RyaW5nID0gbmV3IEFycmF5KHJlcGVhdE51bWJlciArIDEpLmpvaW4obWFza0V4cFt0aGlzLl9zdGFydCAtIDFdKTtcbiAgICAgICAgICByZXR1cm4gYWNjdW0gKyByZXBhY2VXaXRoO1xuICAgICAgICB9LCAnJykpIHx8XG4gICAgICBtYXNrRXhwXG4gICAgKTtcbiAgfVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHByaXZhdGUgX2FwcGx5TWFzaygpOiBhbnkge1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uID0gdGhpcy5fcmVwZWF0UGF0dGVyblN5bWJvbHModGhpcy5fbWFza1ZhbHVlIHx8ICcnKTtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gW1xuICAgICAgJ3ZhbHVlJyxcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayh0aGlzLl9pbnB1dFZhbHVlLCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiksXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRlVGltZSh2YWx1ZTogc3RyaW5nKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGNvbnN0IHJvd01hc2tMZW46IG51bWJlciA9IHRoaXMuX21hc2tWYWx1ZS5zcGxpdCgnJykuZmlsdGVyKChzOiBzdHJpbmcpID0+IHMgIT09ICc6JykubGVuZ3RoO1xuICAgIGlmICgrdmFsdWVbdmFsdWUubGVuZ3RoIC0gMV0gPT09IDAgJiYgdmFsdWUubGVuZ3RoIDwgcm93TWFza0xlbikge1xuICAgICAgcmV0dXJuIHsgJ01hc2sgZXJyb3InOiB0cnVlIH07XG4gICAgfVxuICAgIGlmICh2YWx1ZS5sZW5ndGggPD0gcm93TWFza0xlbiAtIDIpIHtcbiAgICAgIHJldHVybiB7ICdNYXNrIGVycm9yJzogdHJ1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19