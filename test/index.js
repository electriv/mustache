const { Compiler, RunTime, CompileQuick } = require('../dist');
const template = 'Hello, {{ data::message }}! \n{{ "*" }} {{! comment }}';
//{{ "string" . "concat" }} {{ "string concat with message: " . data::message }} ~ Work in progress

// const compiler = new Compiler(template, {});
// const compiled = compiler.compile(true);
// if (typeof compiled == 'string') {
//   console.time('Run');
//   console.log(new RunTime().run(compiled));
//   console.timeEnd('Run');
// } else {
//   throw compiled;
// }
async function main() {
  console.log(await CompileQuick(template));
}

main();
