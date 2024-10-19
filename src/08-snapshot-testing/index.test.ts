import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([11, 22, 33])).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 33,
        },
        value: 22,
      },
      value: 11,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([111, 222, 333]);
    expect(list).toMatchSnapshot();
  });
});
