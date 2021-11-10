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

import type { Build } from '../build';
export interface TagsToken {
  type: string;
  value: string;
}

export class TagsLexer {
  current: null | string = null;
  position = -1;
  constructor(public buildLine: Build, public template: string) {
    this.advance();
  }

  advance() {
    this.position++;
    this.current = this.position < this.template.length ? this.template[this.position] : null;
    return this.current;
  }

  readNext() {
    return this.template[this.position + 1] || null;
  }

  lexe(): TagsToken[] | [string] {
    const tokens: TagsToken[] = [];
    /**
     * Content processed and added thats not a tag.
     *
     * Example text: This is a test {{ data::foo }} !!
     *
     * The content processed will be tokened as 'content' with the value collected
     * 1) "This is a test"
     * 2) " !!"
     */
    var STRING_BUILD = '',
      /** Build of a tag */
      TAG_BUILD = '',
      /** If we're processing an open string within a tag. Avoding syntax errors */
      IN_STRING = false,
      /** If we're within a tag */
      IN_TAG = false,
      /** Any existing error created during processing */
      ERROR;

    while (this.current !== null) {
      const { current } = this;
      if (!IN_TAG && current !== '{') {
        STRING_BUILD += current;
        this.advance();
      } else if (current === '{' && !IN_STRING) {
        if (IN_TAG) {
          ERROR = `Unexpected token "{" at ${this.position} in side tag`;
          break;
        } else if (!IN_TAG) {
          const next = this.readNext() === '{';
          if (next) this.advance();
          if (STRING_BUILD.length > 0) {
            tokens.push({ type: 'content', value: STRING_BUILD });
            STRING_BUILD = '';
          }

          IN_TAG = true;
        }
        this.advance();
      } else if (current === '}') {
        if (IN_TAG && !IN_STRING) {
          const next = this.readNext() === '}';
          if (next) this.advance();
          if (TAG_BUILD.length > 0) {
            tokens.push({ type: 'tag', value: TAG_BUILD.trim() });
            TAG_BUILD = '';
          }
          IN_TAG = false;
        } else {
          TAG_BUILD += current;
        }
        this.advance();
      } else if (IN_TAG && current !== '}') {
        if (current === '"') {
          IN_STRING = !IN_STRING;
        }
        TAG_BUILD += current;
        this.advance();
      } else {
        // console.log('Unknown: ', current);
        this.advance();
      }
    }

    if (TAG_BUILD.length > 0) ERROR = `Unexpected token ~` + TAG_BUILD;

    if (STRING_BUILD.length) tokens.push({ type: 'content', value: STRING_BUILD.trimEnd() });
    // console.log(`STRING_BUILD: ${STRING_BUILD} TAG_BUILD: ${TAG_BUILD} ERROR ${ERROR}`);
    if (ERROR) return [ERROR];
    tokens.push({ type: 'EOF', value: '' });
    return tokens;
  }
}
