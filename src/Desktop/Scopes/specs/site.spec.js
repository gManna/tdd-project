import greet from '../site.js';

describe('example', () => {
  it('should be five', () => {
    expect(greet()).toBe('Hello World');
  })
});
