import { Testable } from '../src/testable';

describe('Simple expression tests', () => {
  test('Check literal values', () => {
    const data = 'Hello World';

    const testable = new Testable(data);
    expect(testable.data).toBe(data);
  });
});
