# Mi Maestro — versión web adaptable

Aplicación web gratuita y adaptable para celular y computador. El flujo se presenta como un asistente paso a paso inspirado en el frontend de Stitch. Los trabajos y las fotos se guardan en el almacenamiento local del navegador; no hace falta cuenta ni servidor.

## Ejecutar en el computador

Necesitas Node.js. En PowerShell, dentro de la carpeta del proyecto, ejecuta:

```powershell
npm install
npm run web
```

Expo mostrará una dirección local, normalmente `http://localhost:8081`. Ábrela en Chrome, Edge o Firefox. Para probar desde el celular conectado a la misma Wi-Fi, inicia `npm run web -- --lan` y abre en el teléfono la dirección de red que muestre Expo.

Para generar los archivos que se pueden publicar en un hosting estático gratuito:

```powershell
npx expo export --platform web
```

Los archivos quedan en `dist`. El hosting debe servir `index.html` para las rutas de la aplicación. El proyecto incluye caché del sitio para volver a abrirlo sin conexión después de cargarlo una vez.

Esta versión usa el navegador; no necesitas Android Studio ni Expo Go.

## Funciones actuales

- Dos pestañas: Inicio y Mis trabajos.
- Flujo guiado de cinco pasos, ayuda contextual, avance y diseño centrado adaptable a pantallas anchas y estrechas.
- Captura o selección de fotos grandes; se optimizan, se guardan en IndexedDB y se pueden ampliar al revisar.
- Cargar varios pares de medidas pegados en líneas, editar o eliminar tramos y confirmar todo antes de continuar.
- Modalidad de cobro por mano de obra o por obra vendida.
- Cálculos de superficie, materiales y totales con coma decimal.
- Borradores recuperables en IndexedDB del navegador.
- Imprimir o guardar como PDF desde el diálogo de impresión del navegador; compartir resumen con la hoja nativa del navegador cuando está disponible.

## Estructura y cómo cambiarla

Consulta `docs/COMO_FUNCIONA.md` para entender cada carpeta, los componentes reutilizables y cómo modificar botones, pantallas o cálculos. La guía UX principal es `docs/GUIA_PANTALLAS_MI_MAESTRO_v0.2.md`.

## Importante sobre la lectura de fotos

La versión web **guarda y amplía la foto, pero todavía no lee automáticamente la escritura**. Las medidas se ingresan o pegan manualmente en el cuadro de conversación o en el campo de varias líneas con un formato como `3,2 x 4`. Los pares de números que coinciden con ese formato aparecen en la pantalla de revisión para confirmar.

La app no tiene cuentas, backend, servicio de IA generativa, nube, IVA ni dictado por voz. Los datos quedan en el navegador y no se sincronizan entre computador y celular. Ningún presupuesto se envía automáticamente.
