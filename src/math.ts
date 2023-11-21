export function add(a: number, b: number): { sum: number; operands: number[] } {
  return {
    sum: a + b,
    operands: [a, b],
  };
}
