const assert = require('power-assert');
import {
  isObjectOrArray,
  same
} from '../src/util.js';

describe('util', () => {
  describe('same()', () => {
    context('ObjectやArrayではない場合', () => {
      it('そのまま比較して結果を返す', () => {
        assert(same('a', 'a') === true);
        assert(same('a', 'b') === false);
      });
    });

    context('Dateの場合', () => {
      it('ミリ秒まで一致するか比較して結果を返す', () => {
        const s = new Date(2017, 0, 1, 0, 0, 0, 0);
        const d = new Date(2017, 0, 1, 0, 0, 0, 0);
        const e = new Date(2017, 0, 1, 0, 0, 0, 1);
        assert(same(s, d) === true);
        assert(same(s, e) === false);
      });
    });

    context('どちらもArrayの場合', () => {
      it('中身を比較して結果を返す', () => {
        assert(same(['a'], ['a']) === true);
        assert(same(['a'], ['b']) === false);
        assert(same([], ['a']) === false);
        assert(same(['a'], []) === false);
        assert(same(['a', 'b', 'c'], []) === false);
        assert(same([], ['a', 'b', 'c']) === false);
      });
    });

    context('どちらもObjectの場合', () => {
      it('構造と値を比較して結果を返す', () => {
        const src = {
          person: {
            name: 'jim',
            age: 20,
            hobby: [
              'sport'
            ]
          }
        };
        const dest = {
          person: {
            name: 'jim',
            age: 20,
            hobby: [
              'sport'
            ]
          }
        };
        assert(same(src, dest) === true);
      });
    });
  });

  describe('isObjectOrArray()', () => {
    context('Objectの場合', () => {
      it('trueを返す', () => {
        assert(isObjectOrArray({}) === true);
      });
    });

    context('Arrayの場合', () => {
      it('trueを返す', () => {
        assert(isObjectOrArray([]) === true);
      });
    });

    context('ObjectまたはArrayではない場合', () => {
      it('falseを返す', () => {
        assert(isObjectOrArray(undefined) === false);
        assert(isObjectOrArray(new Date()) === false);
        assert(isObjectOrArray("abc") === false);
        assert(isObjectOrArray(123) === false);
        assert(isObjectOrArray(false) === false);
        assert(isObjectOrArray(NaN) === false);
      });
    });
  });

});
