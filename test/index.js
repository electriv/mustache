const { Compiler } = require('../dist');
const template = 'Hello, {{ data::message }}! \n{{ "*" }}';

const compiler = new Compiler(template, {});
compiler.compile();
