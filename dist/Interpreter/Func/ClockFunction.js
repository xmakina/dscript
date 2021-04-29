"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
class ClockFunction extends Types_1.DScriptCallable {
    constructor() {
        super(...arguments);
        this.arity = () => 0;
        this.toString = () => "<native fun 'clock'>";
        this.call = async () => Date.now().valueOf() / 1000.0;
    }
}
exports.default = ClockFunction;
