const { Compiler } = require('../dist');
const template = 'Hello, {{ data::message }}! \n{{ "*" }} {{! comment }}';
//{{ "string" . "concat" }} {{ "string concat with message: " . data::message }} ~ Work in progress

const compiler = new Compiler(template, {});
compiler.compile();
