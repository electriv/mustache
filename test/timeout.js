// Timeout execution

// NOTE: Could stream content by Proxying.
// ! Timout not working - to be worked on.
/*
  Process: 2s (higest)
  Run processed function: 14s (higest)
  Execute: 19s (higest)
*/

(async () => {
  const TIMEOUT = 1000;
  const sayHello = `_OUTPUT = _OUTPUT.concat('Hello, ');
  _OUTPUT = _OUTPUT.concat(data.message);
  _OUTPUT = _OUTPUT.concat('!');`;
  const template = `
    return async function main(data, timeout = false) {
      console.time('Process')
      var _OUTPUT = '';
      ${new String(sayHello.repeat(999999))}
      ${new String(sayHello.repeat(999999))}
      console.timeEnd('Process')
      return _OUTPUT
    }
  `;
  const controller = new AbortController();

  console.time('Execute');

  const ft = new Promise((resolve, reject) => {
    const main = new Function(template)();

    console.time('Run processed function');
    const __ID__ = setTimeout(() => {
      console.log('Hit timeout');
      controller.abort();
    }, TIMEOUT);

    main({ message: 'world' })
      .then(output => {
        clearTimeout(__ID__);
        console.timeEnd('Run processed function');
        resolve(output);
      })
      .catch(reject);
  });
  await ft;

  console.timeEnd('Execute');
})();
