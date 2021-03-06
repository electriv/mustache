const { Compiler, RunTime, CompileQuick } = require('../dist');
const template = 'Not much is currently known about {{ data::tag }}! content allowed after <p>correct replace</p>';
// const template = 'Hello, {{ data::message }}! \n{{ "*" }} {{! comment }}';
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
  const compiler = new Compiler(template, {});
  const compiled = compiler.compile(true);
  console.log(compiled);
  // console.log(await CompileQuick(template));
}

main();
