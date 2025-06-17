import { Testable } from '../src/testable';

describe('Simple expression tests', () => {
  test('Check literal value', () => {
    const data = 'Hello World';

    const testable = new Testable(data);
    expect(testable.data).toBe(data);
  });
});
