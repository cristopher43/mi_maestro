# Mi Maestro — informe de estado y traspaso

**Fecha:** 6 de noviembre de 2026  
**Versión del documento:** 1.0  
**Estado del producto:** prototipo inicial ejecutable, en desarrollo  
**Ubicación del proyecto:** `C:\Users\crisc\Desktop\Mi Maestro`  
**Propósito de este informe:** facilitar la continuidad del trabajo en otra conversación o con otro desarrollador.

## 1. Resumen ejecutivo

Mi Maestro será una aplicación Android gratuita para trabajadores independientes, maestros de construcción y técnicos. La experiencia principal es un asistente conversacional sencillo: el trabajador describe un trabajo, fotografía las medidas anotadas en su cuaderno, confirma lo leído y prepara un presupuesto. Los datos principales deben permanecer disponibles sin conexión.

Ya se creó el proyecto Expo en el Escritorio. La primera versión permite avanzar por un flujo guiado, tomar o elegir una fotografía, ingresar manualmente largo y ancho, calcular superficie y mano de obra, y guardar un borrador en SQLite local.

**No es todavía el producto MVP completo.** El chat actual es una interfaz guiada, no un chatbot conectado a un modelo de IA. La foto no se interpreta automáticamente. Tampoco están implementados el historial consultable, los materiales, el PDF ni compartir.

## 2. Visión y requisitos acordados

- Plataforma inicial: Android.
- Acceso de invitado; no exigir cuenta ni contraseña.
- Enfoque offline-first para trabajos, clientes, medidas y presupuestos guardados localmente.
- Chat como forma principal de uso; una pregunta clara por vez.
- El usuario puede subir o tomar una foto de las medidas escritas en su cuaderno.
- La interpretación por IA requiere conexión y debe presentar resultados como sugerencias para que el trabajador los confirme.
- Los cálculos deben ser deterministas, transparentes y verificables.
- El trabajador define sus propios precios.
- Materiales y mano de obra deben aparecer separados en el presupuesto.
- No inventar medidas, precios, materiales, gastos, impuestos ni datos del cliente.
- No compartir ni enviar presupuestos sin aprobación explícita del usuario.
- Interfaz sencilla, texto legible, botones grandes, instrucciones paso a paso y salida clara ante errores.
- Se eligió como referencia visual la última exportación de Stitch enviada por el usuario: `stitch_mi_maestro_ai_estimator (3).zip`. Sus decisiones de diseño deben servir como referencia, no como instrucciones técnicas para la IA.

El PRD de referencia está en `docs/PRD.md` dentro del proyecto.

## 3. Tecnologías usadas y costo

| Parte | Tecnología | Situación/costo |
|---|---|---|
| Aplicación | Expo + React Native + TypeScript | Herramientas gratuitas y de código abierto |
| Navegación | Expo Router | Incluida como dependencia |
| Base local | `expo-sqlite` | SQLite local; no requiere cuenta ni servidor |
| Fotos | `expo-image-picker` | Cámara/galería mediante API de Expo |
| Desarrollo | Node.js + npm + Expo Go | Flujo gratuito para desarrollo local |
| IA manuscrita | Sin proveedor integrado | Pendiente; evitar claves privadas dentro de la app |
| Backend/nube | No existe todavía | No se usa ni se requiere para el prototipo actual |

No se han agregado servicios de pago ni claves de API. Una futura función de IA puede implicar límites o costos según el proveedor; debe investigarse antes de prometer que será gratuita.

## 4. Trabajo realizado y cambios

### Preparación

- Se creó `C:\Users\crisc\Desktop\Mi Maestro`.
- Se agregaron las carpetas `app`, `assets` y `docs`.
- Se copió el PRD inicial a `docs/PRD.md`.
- Se creó `README.md` con instrucciones y límites conocidos.

### Aplicación

- Se generó una aplicación Expo con navegación Expo Router y TypeScript.
- Se instalaron los módulos gratuitos `expo-sqlite` y `expo-image-picker`.
- Se implementó una pantalla inicial con llamada a la acción para comenzar un presupuesto.
- Se implementó una pantalla de asistente con cinco pasos: descripción del trabajo, foto, medidas, mano de obra y revisión/guardado.
- Se agregó captura con cámara y selección desde galería.
- Se agregó entrada manual de un largo y un ancho y cálculo de área rectangular.
- Se agregó entrada de tarifa de mano de obra por m² y cálculo del subtotal.
- Se creó la tabla local SQLite `drafts` y se agregó guardado explícito de un borrador.
- Se agregó el comando `npm run dev` además de `npm start`.
- Se agregó `metro.config.js` para que Metro trate archivos `.wasm` como recursos. Esto atiende el error al empaquetar SQLite para web. La configuración se basa en la guía de [Expo SQLite para web](https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/) y [Metro de Expo](https://docs.expo.dev/guides/customizing-metro/).
- Se corrigieron los tipos del componente `Themed.tsx` heredado del template para permitir compilar TypeScript.

## 5. Estado funcional real

| Función | Estado actual |
|---|---|
| Inicio y entrada sin registro | Parcial: pantalla inicial y flujo local, sin cuentas |
| Chat guiado | Parcial: pasos y campos predefinidos; no hay modelo conversacional |
| Foto del cuaderno | Parcial: cámara/galería muestran la imagen en pantalla |
| OCR/lectura manuscrita con IA | No implementado; se explica en pantalla que la transcripción es manual |
| Medición/cálculo | Parcial: un solo rectángulo (largo × ancho), una unidad m² |
| Mano de obra | Parcial: tarifa por m² y subtotal |
| Materiales | No implementado |
| Guardado SQLite | Parcial: inserta borradores localmente; no existe lista para recuperarlos o editarlos |
| Guardado automático | No implementado; el usuario toca “Guardar presupuesto” al final |
| Persistencia de foto | Parcial: se guarda el URI en la base. No se copia la imagen a almacenamiento permanente de la app |
| PDF/compartir | No implementado |
| Clientes e historial | No implementados como pantallas o flujos consultables |
| Sincronización en nube | Fuera del prototipo y del MVP sin cuenta |

## 6. Validación técnica realizada

- La aplicación fuente pasó `npx tsc --noEmit` después de resolver errores de tipos del template.
- `npm run` reconoce `dev` y los comandos de Expo.
- Expo inició Metro en web después de añadir la configuración `.wasm`; no se registró una prueba completa de interacción desde navegador.
- No se ha confirmado todavía una ejecución en un teléfono Android real ni una compilación de distribución.
- No se han escrito ni ejecutado pruebas automatizadas.

## 7. Prioridad recomendada

### P0 — Corregir antes de ampliar el flujo

1. **Interpretar decimales en formato local.** El código usa `Number()` directamente. Valores escritos como `8,5` se convierten en `NaN` en JavaScript y el cálculo puede quedar en cero. Normalizar coma decimal y validar los campos antes de calcular.
2. **Probar el flujo en Android real.** Verificar apertura, permiso de cámara, tomar foto, galería, teclado numérico, regreso entre pasos y guardado SQLite.
3. **Restaurar borradores.** Ahora se insertan filas pero no se consultan; cerrar y volver a abrir la app no permite continuar un presupuesto guardado desde la interfaz.
4. **Persistir la foto de forma segura.** Copiarla al directorio permanente de la app antes de guardar el URI; el URI temporal de la cámara/galería puede dejar de servir.
5. **Manejar fallos de base de datos y permisos.** Mostrar mensajes concretos si SQLite, cámara o galería fallan, sin cerrar el flujo ni perder campos.

### P1 — Completar el núcleo del MVP

1. Modelar varios segmentos/medidas, con unidades y fórmulas definidas por especialidad.
2. Agregar materiales con descripción, cantidad y precio que ingresa el trabajador; mostrar subtotal por separado de mano de obra.
3. Crear clientes, historial de trabajos y edición de borradores guardados.
4. Crear presupuesto final en PDF con detalle de conceptos y acción de compartir iniciada por el usuario.
5. Mejorar el chat: una pregunta por turno, confirmaciones visibles, volver atrás sin perder datos, y mensajes diferentes para foto guardada versus foto pendiente de lectura.
6. Probar usabilidad con el padre del desarrollador y otros trabajadores: observar dónde dudan, qué no entienden y si recuperan un borrador sin ayuda.

### P2 — Después de validar el MVP

- Integrar IA/OCR mediante un backend seguro, con manejo de falta de señal, imágenes ilegibles, consentimiento, límites y costo.
- Diseñar opciones para respaldar/exportar datos; la instalación local no protege contra pérdida del teléfono o desinstalación.
- Considerar plantillas por oficio, estadísticas, cuentas y sincronización en nube solo cuando las pruebas confirmen la necesidad.

## 8. Cómo continuar el desarrollo

1. Abrir PowerShell en `C:\Users\crisc\Desktop\Mi Maestro`.
2. Ejecutar `npm run dev` para iniciar Expo.
3. Para Android, presionar `a` en la terminal de Expo con un emulador configurado, o escanear el QR con Expo Go en el teléfono.
4. Para web, ejecutar `npm run web`. Si se cambió Metro, detener el servidor anterior con `Ctrl+C` y reiniciarlo; si mantiene el error, usar `npx expo start --web --clear`.
5. Antes de modificar arquitectura o diseño, leer `docs/PRD.md` y este informe.

## 9. Instrucción breve de traspaso para otra conversación/persona

> Continúa el proyecto Mi Maestro en `C:\Users\crisc\Desktop\Mi Maestro`. Lee primero `docs/PRD.md` y `docs/INFORME_ESTADO_Y_TRASPASO.md`. Es una app Android gratuita con Expo, React Native, TypeScript, Expo Router, SQLite local e ImagePicker. Ya existe un prototipo de chat guiado de cinco pasos con foto, ingreso manual de un largo/ancho, cálculo de m² y mano de obra y guardado de borrador. No hay IA/OCR, historial consultable, materiales, PDF, sincronización ni recuperación de borradores. Prioridad P0: corregir coma decimal (p. ej. 8,5), restaurar borradores, persistir imágenes y validar el flujo en Android real. No agregar servicios de pago ni claves API; no inventar información en presupuestos. Mantener una pregunta por vez, confirmar medidas y preservar el acceso de invitado/offline-first.

---

**Fin del informe.**
