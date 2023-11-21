import { add } from './math';

describe('Math Utility', () => {
  it('should add two numbers correctly', () => {
    const a = 3;
    const b = 7;

    const result = add(a, b);

    expect(result).toEqual({ sum: 10, operands: [3, 7] });
    expect(result.sum).toBe(10);
    expect(result.operands).toContain(3);
  });


  it('should handle negative numbers', () => {
    const a = -5;
    const b = 3;

    const result = add(a, b);

    expect(result).toEqual({ sum: -2, operands: [-5, 3] });
    expect(result.sum).toBeLessThan(0);
    expect(result.operands).toHaveLength(2);
  });

  it('should correctly add floating-point numbers', () => {
    const a = 0.1;
    const b = 0.2;

    const result = add(a, b);

    expect(result.sum).toBeCloseTo(0.3, 5);
    expect(result.operands).toContain(0.1);
  });
});
