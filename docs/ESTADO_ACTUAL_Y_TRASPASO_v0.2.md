> Nota histórica: este informe describe el estado antes de recrear la app con la guía v0.2. El código nuevo y el estado actual están en docs/INFORME_IMPLEMENTACION_v0.2.md.

# Mi Maestro — estado actual y traspaso v0.2

**Fecha:** 6 de noviembre de 2026  
**Estado:** reinicio acordado; documentación lista; código aún no recreado.  
**Nueva ubicación del proyecto:** `C:\Users\crisc\OneDrive\Desktop\mi contrustor`  
**Referencia de UX prioritaria:** `docs/GUIA_PANTALLAS_MI_MAESTRO_v0.2.md`.

## Resumen

El usuario pidió borrar el proyecto y comenzar desde cero. Después aclaró que se conservaran los informes y se eliminara solo el código, aportó una nueva guía v0.2 de pantallas y fijó como ubicación nueva `C:\Users\crisc\OneDrive\Desktop\mi contrustor`.

La carpeta previa de Escritorio (`C:\Users\crisc\Desktop\Mi Maestro`) quedó vacía tras la operación interrumpida. Los informes anteriores siguen disponibles y fueron copiados al nuevo destino como documentos históricos. No se copió código anterior al nuevo destino.

## Documentos actuales en el nuevo proyecto

- `README.md`: indica que el proyecto se reinicia y define reglas de continuidad.
- `docs/PRD.md`: PRD inicial v1.0.
- `docs/GUIA_PANTALLAS_MI_MAESTRO_v0.2.md`: nueva especificación de UX y contenido para 8 pantallas.
- `docs/INFORME_ESTADO_Y_TRASPASO_ANTERIOR.md`: reporte de la implementación anterior; conservar como histórico, no tomarlo como estado actual del código.
- `docs/PROMPT_STITCH_ANTERIOR.md`: prompt previo de Stitch; la guía v0.2 lo reemplaza como referencia visual/UX.

## Requisitos nuevos de la guía v0.2

- En todas las pantallas, responder con claridad: dónde estoy, para qué sirve y qué debo tocar ahora.
- Una sola acción principal por pantalla; ayuda visible de máximo dos líneas.
- Usar trato de “tú” de forma consistente.
- Estado único: **“Guardado en tu teléfono”**. Evitar afirmaciones como “100% seguro”.
- Barra con Volver, título, ayuda “¿Qué es esto?” y, durante presupuestos, progreso `Paso N de 5`.
- Dos pestañas inferiores: **Presupuestar** y **Mis trabajos**. Sin perfil/cuentas en el MVP.
- Al volver atrás, conservar el trabajo como borrador.
- Flujo: inicio; describir trabajo/cliente; foto o ingreso de medidas; revisar y corregir medidas; definir mano de obra y materiales; revisar; guardar; PDF/compartir; lista de trabajos.
- Explicar términos cotidianos en la primera aparición y en ayuda contextual.
- No enviar nada sin acción explícita del trabajador.
- La fecha del presupuesto debe ser dinámica.
- Lista de trabajos con nombres completos y estados simples: Guardado o Borrador.

## Estado de implementación

**No hay código de aplicación en la nueva carpeta.** La ubicación contiene documentación únicamente. La implementación anterior no debe presentarse como código activo ni reintroducirse sin revisar la guía nueva.

## Prioridades para empezar

### P0 — Base y primer flujo

1. Crear una nueva app Expo + React Native + TypeScript con Expo Router en la ubicación nueva.
2. Implementar primero el sistema de navegación y ocho pantallas según la guía v0.2, con textos de “tú”, una acción primaria por pantalla y barra de ayuda.
3. Implementar borradores locales desde el comienzo: volver atrás conserva lo escrito; se muestra el único estado “Guardado en tu teléfono”.
4. Determinar el locale numérico: aceptar coma decimal (`8,5`), mostrar las operaciones con coma y definir redondeo antes de presentar cálculos.
5. En foto, solicitar permiso con el texto aprobado por la guía. No afirmar que se leyó la imagen hasta tener lectura real. Los datos dudosos requieren confirmación manual.
6. Probar en Android real el flujo paso a paso, navegación atrás, cámara/galería, teclado y persistencia.

### P1 — Completar el MVP

- Lectura de escritura manuscrita integrada de forma segura, solo si se decide proveedor y costo; las claves privadas no van dentro de la app.
- Cálculos visibles de largo × ancho y suma de tramos.
- Captura/edición de materiales, cantidades y precios ingresados por el maestro.
- Total con mano de obra/materiales; definir tratamiento de IVA antes de mostrarlo como incluido.
- Mis trabajos: abrir presupuestos guardados y continuar borradores; preservar el nombre del cliente en una línea legible.
- PDF con detalle, fecha actual y acción de compartir manual.
- Exportación/backup simple para que el usuario pueda mover sus datos si cambia de teléfono.

### P2 — Después de validar con usuarios

- Asistente de voz, sincronización en nube, cuentas, estadísticas y funcionalidades por oficio, según prioridades futuras del PRD.

## Decisiones pendientes de producto

- IVA: si el total es neto, incluye IVA o presenta ambos valores.
- Unidades admitidas y redondeo para área, cantidades, dinero y moneda.
- Cómo detectar y representar un dato dudoso además de números ilegibles.
- Exportación local de respaldo para usuarios sin cuenta.
- Qué proveedor/solución gratuita de lectura manuscrita puede cubrir privacidad, disponibilidad y costo; no asumir que IA será gratuita.

## Instrucción para la siguiente persona o conversación

> El proyecto Mi Maestro fue reiniciado desde cero. Trabaja en `C:\Users\crisc\OneDrive\Desktop\mi contrustor`. Lee primero `README.md`, `docs/PRD.md` y, sobre todo, `docs/GUIA_PANTALLAS_MI_MAESTRO_v0.2.md`. El único material de implementación anterior es histórico y su código fue eliminado; no lo restaures sin revisar esta guía. Empieza con Expo + React Native + TypeScript + Expo Router, navegación Android y borradores locales. La guía exige una pregunta/acción principal por pantalla, ayuda breve, “tú”, progreso de cinco pasos, Volver sin perder datos, el estado literal “Guardado en tu teléfono”, foto de cuaderno con confirmación de medidas y ausencia de afirmaciones de seguridad absoluta. Acepta coma decimal. No inventes medidas/precios ni integres un servicio de pago o una clave privada. Implementa y valida en Android en incrementos pequeños.

---

**Fin del informe actual.**

