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

import { Build } from './build';
import { TagsLexer } from './lexer/tagsLexer';

/**
 * Quickly compile and run Electriv Mustache template
 */
export async function CompileQuick(template: string): Promise<string> {
  return template;
}

/**
 * Electrive Compiler
 * Content compiled to js for faster and repeditve templating.
 * Only having to save the js compile and quickly create content without parsing+
 * Frontend/JS/Browser should take care of the rest.
 *
 * @example
 * Template: "Hello, {{ data::message }}!"
 * Compiled:
 * async function main(data) {
 *  var _OUT = "";
 *  _OUT = _OUT.concat("Hello, ");
 *  _OUT = _OUT.concat(data.message);
 *  _OUT = _OUT.concat("!");
 *  return _OUT;
 * }
 */
export class Compiler {
  private _template: string;
  private _data: any;
  private buildLine = new Build();

  constructor(templateString: string, data: any = {}) {
    if (typeof templateString !== 'string') throw new TypeError('"templateString" must be a string');
    if (typeof data !== 'object') throw new TypeError('"data" must be an object');
    this._template = templateString;
    this._data = data;
  }

  // TODO: Compiler, Parser, Lexer...
  compile() {
    const tagsLexer = new TagsLexer(this.buildLine, this._template);
    console.log(this._data, this.buildLine.buffer);
    console.log(tagsLexer.lexe());

    return this._template;
  }
}
