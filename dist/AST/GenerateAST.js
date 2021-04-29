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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const setArgs = (fields) => fields.map((field) => {
    const [, name] = field.split(' ');
    return `this.${name.replace('?', '')} = ${name.replace('?', '')}`;
});
const declareArgs = (fields) => fields.map((field) => {
    const [type, name] = field.split(' ');
    return `${name}: ${type}`;
});
const declareFields = (fields) => fields.map((field) => {
    const [type, name] = field.split(' ');
    return `public readonly ${name}: ${type}`;
});
const defineType = (writer, baseName, className, fieldList) => {
    const fields = fieldList.split(', ');
    writer.write(`export class ${className}${baseName} extends ${baseName} {
  ${declareFields(fields).join('\n')}
  constructor (${declareArgs(fields).join(', ')}) {
    super('${className}')
    ${setArgs(fields).join('\n')}
  }
  
  accept<R>(visitor: ${baseName}Visitor<R>): R {
    return visitor.visit${className}${baseName}(this)
  }
}
`);
};
const declareVisitor = (baseName, types) => types.map((type) => {
    const [name] = type.split(':').map((split) => split.trim());
    return `visit${name}${baseName}: (${baseName.toLowerCase()}: ${name}${baseName}) => R`;
});
const defineAst = (outputDir, baseName, types, header) => {
    const path = `${outputDir}\\${baseName}.ts`;
    const stream = fs.createWriteStream(path);
    stream.write(`${header}
export interface ${baseName}Visitor<R> {
  ${declareVisitor(baseName, types).join('\n')}
}

export abstract class ${baseName} {
  readonly type: string
  abstract accept<R>(visitor: ${baseName}Visitor<R>): R

  constructor(type: string) {
    this.type = type
  }
}
`);
    types.forEach((type) => {
        const [className, fields] = type.split(':').map((split) => split.trim());
        defineType(stream, baseName, className, fields);
    });
    stream.close();
};
function run() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error('Usage: generate_ast <output directory>');
        return 64;
    }
    const expressions = [
        'Binary       : Expr left, Token operator, Expr right',
        'Grouping     : Expr expression',
        'Literal      : DScriptObject value',
        'Unary        : Token operator, Expr right',
        'Call         : Expr callee, Token paren, Expr[] args',
        'Logical      : Expr left, Token operator, Expr right',
        'Variable     : Token name',
        'ArrayVariable: Token name, Expr index',
        'Assign       : Token name, Expr value',
        'ArrayAssign  : Token name, Expr index, Expr value'
    ];
    const statements = [
        'Block      : Stmt[] statements',
        'Expression : Expr expression',
        'Function   : Token name, Token[] params, Stmt[] body',
        'If         : Expr condition, Stmt thenBranch, Stmt elseBranch?',
        'Input      : Token name, Expr prompt',
        'Print      : Expr expression',
        'Append     : Expr expression',
        'Replace    : Expr expression',
        'Return     : Token keyword, Expr|null value',
        'While      : Expr condition, Stmt body',
        'Let        : Token name, Expr initializer',
        'Dim        : Token name',
        'Set        : Token name, Expr value',
        'SetArray   : Token name, Expr index, Expr value'
    ];
    const outputDir = args[0];
    defineAst(outputDir, 'Expr', expressions, `import { Token } from '../Scanner/Token'
    import { DScriptObject } from '../Types'`);
    defineAst(outputDir, 'Stmt', statements, `import { Expr } from './Expr'
      import { Token } from '../Scanner/Token'`);
    return 0;
}
run();
