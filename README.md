# Calculadora de envío

Calculadora web que indica el costo de envío de una compra según su subtotal.

## Regla de negocio

| Subtotal | Costo de envío |
|---|---|
| Menor a 100.000 COP | 8.000 COP |
| Igual o mayor a 100.000 COP | 0 COP (envío gratis) |
| Vacío, negativo o decimal | Error de validación |

## Cómo usar la calculadora

1. Abre `index.html` en un navegador (o la versión publicada en GitHub Pages).
2. Ingresa el monto **sin puntos ni comas**.
3. Pulsa **Calcular**.

Ejemplos:

- Si escribes `99999`, el envío mostrado debe ser **8.000 COP**.
- Si escribes `100000`, el envío mostrado debe ser **0 COP**.
- Si dejas el campo vacío y pulsas Calcular, aparece el mensaje *"Ingresa un subtotal para calcular el envío."*

## Cómo ejecutar las pruebas

Requisito: **Node.js 22 o superior** (no necesita instalar dependencias).

En la carpeta del proyecto ejecuta:

```bash
node --test
```

Resultado esperado: `# pass 5` y `# fail 0`.

### Casos de prueba

| # | Caso | Entrada | Esperado | Qué valida |
|---|---|---|---|---|
| 1 | Debajo del límite | 99999 | 8000 | Se cobra envío por debajo de 100.000 |
| 2 | Límite exacto | 100000 | 0 | El valor exacto del límite ya tiene envío gratis |
| 3 | Sobre el límite | 100001 | 0 | Envío gratis por encima del límite |
| 4 | Negativo | -1 | RangeError | Se rechazan montos negativos |
| 5 | **Decimal (caso adicional)** | 99999.5 | RangeError | Se rechazan decimales en vez de redondearlos hacia el límite |

## Defecto encontrado y corrección

La versión inicial usaba `subtotal > 100000`, lo que dejaba fuera el valor exacto del límite: con 100.000 COP cobraba 8.000 COP.
Se cambió el operador a `>=` en `envios.js`:

```js
return subtotal >= LIMITE_ENVIO_GRATIS ? 0 : COSTO_ENVIO;
```

- Antes de la corrección: 4 pruebas aprobadas, 1 fallida (`evidencias/salida-pruebas-antes.txt`).
- Después de la corrección: 5 pruebas aprobadas (`evidencias/salida-pruebas-despues.txt`).

La prueba del límite se mantiene para detectar una regresión si el error reaparece.

## Estructura

```
index.html          Interfaz de la calculadora
envios.js           Función calcularEnvio (regla de negocio)
envios.test.js      Pruebas unitarias con el ejecutor de Node.js
evidencias/         Salidas de pruebas y capturas
```

## Despliegue

URL publicada: https://andresjesusbueno-prog.github.io/calculadora-envios/

Publicado con GitHub Pages desde la rama `main`, carpeta `/(root)`
(Settings → Pages → Deploy from a branch).
