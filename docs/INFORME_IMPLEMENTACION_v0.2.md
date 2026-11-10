# Mi Maestro — informe de implementación v0.2

**Fecha:** 6 de noviembre de 2026  
**Estado:** prototipo Android implementado y preparado para build local; pendiente de probar en dispositivo físico.  
**Ubicación:** `C:\Users\crisc\OneDrive\Desktop\mi contrustor`.

## Resumen

Se reinició el código anterior y se creó una nueva app Expo + React Native + TypeScript, siguiendo la guía `GUIA_PANTALLAS_MI_MAESTRO_v0.2.md` y tomando el diseño Stitch como referencia visual. La guía exige un chat guiado, cinco pasos, una acción principal, indicaciones claras, guardado local y cero envíos automáticos.

## Funciones implementadas

1. Inicio con las dos acciones indicadas: empezar presupuesto y ver trabajos.
2. Dos pestañas inferiores: Presupuestar / Mis trabajos.
3. Presupuesto en cinco pasos: trabajo/cliente, foto, revisión de medidas, precios/materiales, revisión final.
4. Barra de progreso, volver, botón `¿Qué es esto?` y glosario.
5. Botones y campos reutilizables con texto grande y etiquetas visibles.
6. Captura o selección de foto; copia de la foto al directorio local de la aplicación.
7. OCR local Android con `expo-mlkit-ocr` (Google ML Kit en dispositivo); no manda la imagen a un servidor. El OCR sugiere tramos solo cuando reconoce un patrón `largo × ancho`; cada tramo debe ser corregido/confirmado. Si no puede leerlo, admite ingreso manual.
8. Cálculos deterministas con coma decimal: suma las superficies, multiplica por tarifa y suma cantidad × precio unitario de materiales.
9. Guardado de borradores tras una pausa y recuperación desde Mis trabajos, con SQLite local.
10. Generación local de PDF, fecha dinámica y compartir mediante el menú Android tras acción del usuario.

## Herramientas gratuitas

- Expo SDK 58, React Native, TypeScript, Expo Router.
- SQLite local (`expo-sqlite`).
- Fotos (`expo-image-picker`).
- OCR local (`expo-mlkit-ocr`, código abierto).
- PDF y compartir (`expo-print`, `expo-sharing`).
- Zustand para estado compartido.

No se integró backend, clave de API, cuenta, suscripción ni proveedor remoto de IA. El OCR nativo requiere una build Android de desarrollo y no funciona dentro de Expo Go. `npm run android` compila en local; no requiere EAS Build pagado.

## Organización del código

- `app/`: pantallas y navegación.
- `components/ui/`: `Boton`, `Campo`, `Ayuda` y `MensajeAsistente` reutilizables.
- `components/presupuesto/`: tarjeta reutilizable en historial.
- `services/baseDatos.ts`: tabla, escritura y consultas SQLite.
- `services` + `expo-print`: composición del PDF/compartir en pantalla guardada.
- `store/usePresupuesto.ts`: estado común del presupuesto mientras se edita.
- `types/modelos.ts`: datos de presupuesto, tramo y materiales.
- `utils/calculos.ts`: lectura de números, coma decimal y cálculos.
- `utils/formato.ts`: fechas y moneda.
- `docs/COMO_FUNCIONA.md`: explicación sencilla para el desarrollador que toma el proyecto.

## Verificaciones realizadas

- `npx tsc --noEmit`: terminó sin errores.
- `npx expo config --type public`: reconoció rutas, plugins y permisos de Android.
- `npx expo prebuild --platform android --no-install`: generó el proyecto nativo Android sin errores.
- No se ejecutaron pruebas automatizadas ni se confirmó el funcionamiento desde un teléfono Android. Cámara/OCR, guardado, PDF y compartir requieren prueba manual en el dispositivo.

## Pendientes conocidos

- Probar build/uso real en Android y validar permisos, lectura manuscrita, decimales, fotos, SQLite y PDF.
- La identificación automática de medidas depende del patrón `7 x 8,5`; anotaciones complejas/no estructuradas pasan a corrección manual.
- El micrófono `Hablar` mencionado en la guía no está implementado aún. El dictado por voz aparece como prioridad futura, pues puede depender del servicio/disponibilidad del Android y requiere consentimiento/permisos claros.
- Resolver IVA, redondeo comercial, respaldo/exportación de datos, formato regional de moneda y cliente/contacto.
- Revisar mensajes con pruebas de usabilidad con el padre del desarrollador y trabajadores.

## Cómo iniciar

Desde PowerShell en la carpeta del proyecto:

```powershell
npm install
npm run android
```

Se necesita Android Studio/SDK y un dispositivo/emulador. Para Metro: `npm run dev`. Después de cambiar plugins: `npx expo run:android`.

## Traspaso a otro chat/desarrollador

> Continúa Mi Maestro en `C:\Users\crisc\OneDrive\Desktop\mi contrustor`. Lee `README.md`, `docs/PRD.md`, `docs/GUIA_PANTALLAS_MI_MAESTRO_v0.2.md` y `docs/COMO_FUNCIONA.md`. El código actual es Expo + React Native + TypeScript, con estructura en español, componentes reutilizables, SQLite local, cámara/galería, OCR ML Kit local, cálculo de área y costos, borradores, PDF y compartir. Ya pasaron `tsc`, `expo config` y prebuild Android; falta validar en teléfono real. No uses Expo Go para probar OCR; corre `npm run android` con Android Studio/SDK. Mantén los cinco pasos y el tono “tú”; nunca inventes medidas/precios, confirma cada tramo, respeta el estado “Guardado en tu teléfono” y no envíes nada sin acción explícita. Mantén todo gratis y sin API remota por ahora.

---

Fin del informe.

**Nota de dependencias:** la instalación npm informó cinco avisos moderados en dependencias transitivas; no se ejecutó una actualización forzada, ya que podría romper compatibilidad.
