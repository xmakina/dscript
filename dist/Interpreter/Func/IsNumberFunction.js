"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
class IsNumberFunction extends Types_1.DScriptCallable {
    constructor() {
        super(...arguments);
        this.arity = () => 1;
        this.toString = () => "<native fun 'is_number'>";
        this.call = async (_interpreter, args) => typeof args[0] === 'number';
    }
}
exports.default = IsNumberFunction;
