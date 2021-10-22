/**
  MIT License

  Copyright (c) 2021 Electriv

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

const INITIAL_DECLORATIONS: string[] = ['_OUTPUT = ""', '_NULL = null'];
/** Initial script buffer data */
const INITIAL_BUFFER = ['async function main(data) {', 'var '.concat(INITIAL_DECLORATIONS.join(', ')).concat(';')];

/**
 * Build managment for final built JS compile string.
 */
export class Build {
  #buffer: string[] = INITIAL_BUFFER;

  push(...items: string[]) {
    if (!items.every(i => typeof i === 'string')) return;
    this.#buffer.push(...items);
  }

  get buffer(): readonly string[] {
    return (<string[]>[]).concat(...this.#buffer);
  }
}
