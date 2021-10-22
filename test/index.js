const { Compiler } = require('../dist');
const template = 'Hello, {{ data::message }}!';

const compiler = new Compiler(template, {});
console.log(compiler.compile());
