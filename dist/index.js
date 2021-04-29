"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const DScript_1 = __importDefault(require("./DScript"));
const readline = __importStar(require("readline"));
const output = {
    replace: console.log,
    print: console.log,
    append: console.log,
    error: console.error,
    prompt: async (message) => {
        const rl = readline.createInterface(process.stdin, process.stdout);
        rl.setPrompt(message.trim() + '> ');
        rl.prompt();
        return await new Promise((resolve) => {
            rl.on('line', (line) => {
                rl.close();
                return resolve(line);
            });
        });
    }
};
const path = process.argv[2];
const file = fs_1.readFileSync(path);
const runner = new DScript_1.default(output, file.toString());
runner.run().then(text => {
    console.log(text);
}, err => {
    console.error(err);
});
