import { Action, simpleCalculator } from './index';

const positiveTestCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 10, b: 20, action: Action.Add, expected: 30 },
  { a: 10, b: 20, action: Action.Subtract, expected: -10 },
  { a: 10, b: 20, action: Action.Multiply, expected: 200 },
  { a: 20, b: 10, action: Action.Divide, expected: 2 },
];

describe('simpleCalculator', () => {
  test.each(positiveTestCases)(
    '$a $action $b should return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test.each`
    a       | b            | action
    ${9}    | ${3}         | ${999}
    ${null} | ${10}        | ${Action.Multiply}
    ${2}    | ${undefined} | ${Action.Add}
  `(
    'Calculator should return null on incorrect input: $a $action $b',
    ({ a, b, action }) => {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    },
  );
});
