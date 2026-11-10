# Cómo funciona Mi Maestro (explicado sencillo)

## 1. Qué hace la app

La app guía al trabajador por cinco pasos: describir el trabajo, fotografiar el cuaderno, confirmar medidas, ingresar precios y revisar el total. En web guarda los borradores en el almacenamiento local del navegador. Luego puede imprimir o guardar el presupuesto como PDF. Nada se envía automáticamente.

## 2. Qué pasa con la foto

1. El selector de imágenes del navegador abre la cámara o la galería.
2. La foto se convierte a JPEG y se reduce a un máximo de 2.000 píxeles por lado para guardarla localmente sin una descarga externa.
3. La imagen queda dentro del presupuesto en IndexedDB y se puede abrir ampliada en la revisión.
4. La foto no se lee automáticamente; las medidas se escriben en `app/presupuesto.tsx`, campo por campo o pegadas en varias líneas.
5. El usuario revisa, corrige y confirma cada tramo. Si no se entiende la foto, puede ingresar las medidas a mano.

El OCR significa “reconocimiento de texto”. No está activo en la versión web. La foto se conserva como referencia y las medidas se escriben o pegan manualmente; el sistema extrae los pares que tengan un formato tipo `7,00 x 8,50` del texto que se pega.

## 3. De dónde sale el total

`calcularPresupuesto` suma la superficie de cada tramo (largo × ancho), multiplica por la tarifa por m² que escribe el maestro y suma los subtotales de materiales (cantidad × precio por unidad). `leerNumero` acepta coma decimal como `8,5` y separador de miles como `8.000`. No se agrega IVA automáticamente; esa decisión sigue pendiente.

## 4. Para qué sirve cada carpeta

| Carpeta/archivo | Para qué sirve | Ejemplo de cambio |
|---|---|---|
| `app/(tabs)/index.tsx` | Inicio con los dos botones principales | Cambiar saludo o texto de ayuda |
| `app/(tabs)/mis-trabajos.tsx` | Lista local de presupuestos y borradores | Cambiar la forma de presentar la lista |
| `app/presupuesto.tsx` | Flujo completo de cinco pasos | Cambiar instrucciones o añadir campos del presupuesto |
| `app/guardado.tsx` | Resumen guardado, PDF y compartir | Cambiar el contenido del PDF |
| `components/ui/Boton.tsx` | Botón grande reutilizable | Cambiar color/tamaño de todos los botones |
| `components/ui/Campo.tsx` | Campo con etiqueta visible | Ajustar teclado, altura o estilo de campos |
| `components/ui/Ayuda.tsx` | Botón `?` y glosario | Añadir/editar la explicación de un término |
| `components/presupuesto/FichaPresupuesto.tsx` | Tarjeta reutilizada en “Mis trabajos” | Ajustar el resumen de cada trabajo |
| `services/baseDatos.ts` | Guardar y consultar IndexedDB del navegador | Cambiar el almacenamiento local |
| `store/usePresupuesto.ts` | Estado temporal del presupuesto con Zustand | Añadir un dato al borrador |
| `types/modelos.ts` | Define campos de trabajo, cliente, medida y material | Al añadir un campo, actualizar también el formulario y guardado |
| `utils/calculos.ts` | Cálculos deterministas y lectura de números | Cambiar fórmulas o unidades |
| `utils/formato.ts` | Presentación de dinero, números y fechas | Cambiar moneda o formato regional |
| `app.json` | Nombre y opciones de publicación web | Cambiar nombre, color o modo de salida |
| `public/service-worker.js` | Caché del sitio para abrirlo sin conexión después de la primera carga | Cambiar el comportamiento offline |

## 5. Cómo se complementan

```text
Pantallas en app/
   ├── leen/cambian el borrador compartido (store/)
   ├── calculan y presentan números (utils/)
   ├── usan controles reutilizables (components/)
   └── guardan o recuperan información (services/baseDatos.ts)
                     ↓
                 IndexedDB local

Foto → selector del navegador → IndexedDB
Texto de medidas → propuesta por formato → confirmación del maestro
Datos confirmados → cálculo → revisión → IndexedDB → imprimir/guardar PDF → compartir si el usuario lo decide
```

Un ejemplo: para cambiar el tamaño de todos los botones, edita `components/ui/Boton.tsx`. Para cambiar la fórmula de superficie, edita `utils/calculos.ts`, no cada pantalla. Para agregar el teléfono del cliente, define el campo en `types/modelos.ts`, inclúyelo en el formulario, guárdalo en IndexedDB y muéstralo donde haga falta.

## 6. Dos formas de guardar

- `store/usePresupuesto.ts` mantiene el borrador en memoria mientras la persona avanza.
- `services/baseDatos.ts` lo escribe en IndexedDB tras una pausa corta y permite recuperar los datos desde “Mis trabajos”. Al confirmar la revisión final, cambia el estado a “guardado”.

## 7. Cómo correrla

La versión recomendada se ejecuta en navegador. En PowerShell, ejecuta:

```powershell
npm install
npm run web
```

Expo muestra una dirección local; ábrela en el computador. Para probar en el celular por la misma Wi-Fi puedes usar `npm run web -- --lan` y abrir la dirección de red. Para crear el sitio de producción, usa `npx expo export --platform web`; publica la carpeta `dist` en un hosting estático con HTTPS para instalarlo como app web y habilitar el caché sin conexión.

## 8. Límites actuales

- La lectura automática de la foto no está disponible; cada tramo se escribe y confirma manualmente. El cuadro del chat sí reconoce medidas con formatos como `7 x 8,5`.
- No hay chatbot de IA conversacional, voz, backend, nube, usuarios ni sincronización.
- No hay perfil comercial ni IVA; el tratamiento del IVA está pendiente.
- La app debe validarse en navegadores de teléfono y computador, especialmente cámara, almacenamiento local, PDF y compartir.
- Los datos locales del navegador no se sincronizan entre dispositivos. Si se borra el almacenamiento del navegador, se pierden esos datos; no existe copia en la nube.

