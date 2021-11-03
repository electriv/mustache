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

import { rule } from './parser';

/**
 * Final stage of a tag to build it out / compile
 * @example
 * // Example#1
 * const rules = [
 *  { type: 'identifier', value: 'data' },
 *  { type: 'dot', value: '.' },
 *  { type: 'identifier', value: 'message' }
 * ];
 * const tagCompiler = new TagCompiler(buildLine);
 * console.log(tagCompiler.compile(rules));
 * // _OUTPUT = _OUTPUT.concat(data.message)
 */
export default class TagCompiler {
  compile(rules: rule[]): string | null {
    if (rules.length <= 0) return null;

    //! Needs work for later on added features.
    return `_OUTPUT = _OUTPUT.concat(${rules.map(i => i.value.replace(/\n/g, '\\n')).join('')});`;
  }
}
