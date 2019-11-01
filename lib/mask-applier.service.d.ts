import { IConfig } from './config';
export declare class MaskApplierService {
    protected _config: IConfig;
    dropSpecialCharacters: IConfig['dropSpecialCharacters'];
    hiddenInput: IConfig['hiddenInput'];
    showTemplate: IConfig['showTemplate'];
    clearIfNotMatch: IConfig['clearIfNotMatch'];
    maskExpression: string;
    actualValue: string;
    shownMaskExpression: string;
    maskSpecialCharacters: IConfig['specialCharacters'];
    maskAvailablePatterns: IConfig['patterns'];
    prefix: IConfig['prefix'];
    suffix: IConfig['suffix'];
    thousandSeparator: IConfig['thousandSeparator'];
    decimalMarker: IConfig['decimalMarker'];
    customPattern: IConfig['patterns'];
    ipError?: boolean;
    showMaskTyped: IConfig['showMaskTyped'];
    placeHolderCharacter: IConfig['placeHolderCharacter'];
    validation: IConfig['validation'];
    separatorLimit: IConfig['separatorLimit'];
    private _shift;
    constructor(_config: IConfig);
    applyMaskWithPattern(inputValue: string, maskAndPattern: [string, IConfig['patterns']]): string;
    applyMask(inputValue: string, maskExpression: string, position?: number, cb?: Function): string;
    _findSpecialChar(inputSymbol: string): undefined | string;
    protected _checkSymbolMask(inputSymbol: string, maskSymbol: string): boolean;
    private _formatWithSeparators;
    private percentage;
    private getPrecision;
    private checkInputPrecision;
    private _stripToDecimal;
    private _charToRegExpExpression;
}
