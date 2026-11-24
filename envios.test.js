const test = require('node:test');
const assert = require('node:assert');
const { calcularEnvio } = require('./envios.js');

// Casos de clase
test('99.999 COP (justo debajo del límite) cobra 8.000 COP', () => {
  assert.equal(calcularEnvio(99999), 8000);
});

test('100.000 COP (límite exacto) tiene envío gratis', () => {
  assert.equal(calcularEnvio(100000), 0);
});

test('100.001 COP (sobre el límite) tiene envío gratis', () => {
  assert.equal(calcularEnvio(100001), 0);
});

test('-1 COP lanza RangeError', () => {
  assert.throws(() => calcularEnvio(-1), RangeError);
});

// Caso adicional (actividad para entregar):
// Un monto decimal debe rechazarse y no redondearse hacia el límite.
test('99.999,5 COP (decimal) lanza RangeError', () => {
  assert.throws(() => calcularEnvio(99999.5), RangeError);
});
