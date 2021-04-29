"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stringify = exports.isTruthy = void 0;
const isTruthy = (object) => object === null ? false
    : typeof object === 'boolean' ? object
        : true;
exports.isTruthy = isTruthy;
function Stringify(value) {
    if (value === null)
        return 'null';
    if (typeof value === 'number') {
        let text = value.toString();
        if (text.endsWith('.0'))
            text = text.substring(0, text.length - 2);
        return text;
    }
    return value.toString();
}
exports.Stringify = Stringify;
