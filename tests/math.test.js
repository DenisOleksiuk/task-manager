const { fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('should convert 32 F to 0 C', () => {
  expect(fahrenheitToCelsius(32)).toBe(0);
});

test('should convert 0 C to 32 F', () => {
  expect(celsiusToFahrenheit(0)).toBe(32);
});

test('Should add two numbers', async () => {
  const sum = await add(1, 1);
  expect(sum).toBe(2);
});
