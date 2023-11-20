import { Math } from "./math";

describe('Math', () => {
  let math: Math;

  beforeEach(() => {
    // Arrange: Create a new instance of the Math before each test
    math = new Math();
  });

  it('should subtract two numbers', () => {
    // Arrange: Set up the input values
    const a = 7;
    const b = 4;

    // Act: Call the method under test
    const result = math.subtract(a, b);

    // Assert: Verify the result
    expect(result).toBe(3);
  });
});
