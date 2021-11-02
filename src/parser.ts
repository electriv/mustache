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

import { Token } from 'moo';

export interface rule {
  type: string;
  value: any;
}

export class Parser {
  private getTagsBuildUp(tokens: Token[], currentIndex: number): string {
    return tokens
      .slice(0, currentIndex)
      .map(t => t.toString())
      .join('');
  }

  private getTokenLineLengthBuildUp(tokens: Token[], currentIndex: number): number {
    return tokens.slice(0, currentIndex).reduce((p, c) => p + c.col, 0);
  }

  private drawUnderLine(tokens: Token[], currentIndex: number, extraLength: number = 0): string {
    let str = '';
    const MSG_LENG = 29 + extraLength;
    str = str.concat(...(new Array(MSG_LENG).fill(null).map(() => ' ') as string[]));

    const erringLength = tokens.slice(0, currentIndex).reduce((p, c) => p + c.toString().length, 0);
    return str.concat(
      ...Array(erringLength)
        .fill(null)
        .map(() => '^')
    );
  }

  parse(tokens: Token[]) {
    const rules: rule[] = [];
    let PARSING_LAST_WAS_DOT = false;

    // TODO: Manualy advance the tokens index
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      switch (token.type) {
        case 'comment':
          break;

        case 'string':
          rules.push({ type: 'string', value: token.value });
          break;

        case 'identifier':
          // TODO: Parse identifier to self build out an object ("data.bar")
          rules.push({ type: 'identifier', value: token.value });
          break;

        case 'doubleColon':
          // TODO: ?Remove/move into the identifier parser
          if (PARSING_LAST_WAS_DOT) {
            const tokenLineLength = this.getTokenLineLengthBuildUp(tokens, index);
            throw SyntaxError(`Unexpected token; Tag:${index + 1}:${tokenLineLength} - ${this.getTagsBuildUp(tokens, index + 1)}
            ${this.drawUnderLine(tokens, index, tokenLineLength)}`);
          }
          PARSING_LAST_WAS_DOT = true;
          rules.push({ type: 'dot', value: '.' });
          break;
      }
    }

    return rules;
  }
}
