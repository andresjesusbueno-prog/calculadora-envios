/**
 * Calcula el costo de envío según el subtotal de la compra.
 * Regla: subtotal < 100.000 COP → 8.000 COP; subtotal >= 100.000 COP → 0 COP.
 * El subtotal debe ser un entero no negativo; de lo contrario lanza RangeError.
 */
const LIMITE_ENVIO_GRATIS = 100000;
const COSTO_ENVIO = 8000;

function calcularEnvio(subtotal) {
  if (typeof subtotal !== 'number' || !Number.isInteger(subtotal) || subtotal < 0) {
    throw new RangeError('El subtotal debe ser un número entero y no negativo.');
  }
  return subtotal >= LIMITE_ENVIO_GRATIS ? 0 : COSTO_ENVIO;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcularEnvio, LIMITE_ENVIO_GRATIS, COSTO_ENVIO };
}
