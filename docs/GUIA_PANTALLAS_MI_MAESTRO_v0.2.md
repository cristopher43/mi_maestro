# Guía de pantallas — Mi Maestro (v0.2)

Base: concepto de Stitch `mi_maestro_ai_estimator` (8 pantallas) y `DESIGN.md`.
Objetivo: que un maestro sin experiencia en tecnología sepa, en cada pantalla,
**dónde está, para qué sirve y qué debe tocar ahora**.

---

## 1. Reglas de texto (aplican a todas las pantallas)

1. **Tres preguntas en orden:** dónde estoy (título + paso), qué hago aquí (una frase de ayuda), qué hago ahora (un botón principal).
2. **Un solo botón principal** por pantalla. Lo demás es secundario o texto.
3. **Frase de ayuda de máximo dos líneas**, en tono "tú", con verbo al inicio. Ejemplo: "Escriba el nombre del cliente."
4. **Explicar la palabra técnica la primera vez** que aparece, con un ejemplo cotidiano.
5. **Un solo texto para el estado de guardado:** "Guardado en tu teléfono". Sin variantes ("activo", "Seguro", "100% SEGURO").
6. **Decir siempre qué pasa con los datos:** nada se envía sin que el maestro lo decida.
7. **Botón "¿Qué es esto?" (?)** en la barra superior de cada pantalla, con una explicación más larga.
8. **Nunca frases de seguridad que la app no puede garantizar** (por ejemplo, "100% seguro").

---

## 2. Navegación

- **Dos pestañas inferiores:** *Presupuestar* | *Mis trabajos*.
- **Barra superior:** "Volver" (siempre visible), título de la pantalla, botón de ayuda (?).
- **Progreso visible** en el flujo de presupuesto: "Paso 2 de 5: Foto del cuaderno" con barra.
- **Volver nunca borra nada:** lo ya escrito queda guardado como borrador.
- El perfil de usuario queda fuera del MVP (no hay cuentas).

---

## 3. Glosario para el maestro

Estos textos se muestran en el botón "¿Qué es esto?" y en la primera aparición de cada término.

| Término | Texto para el maestro |
|---|---|
| Superficie | Los metros cuadrados que se cubren o pintan. Se calcula largo × ancho. |
| Tramo | Una parte de la superficie, por ejemplo, un lado del techo. |
| Mano de obra | Lo que usted cobra por su trabajo. |
| Materiales | Lo que se compra para la obra: planchas, tornillos, pintura. |
| Dato dudoso | Un número que la foto no dejó claro. Confírmelo usted. |
| Borrador | Presupuesto a medio hacer. No se ha enviado a nadie. |
| Total | Mano de obra más materiales. *(Pendiente: IVA, ver sección 5.)* |
| Guardado en tu teléfono | Sus datos quedan aquí aunque no haya internet. |

---

## 4. Pantallas

Para cada pantalla: **título**, **ayuda visible**, **botón principal**, **simplificación**.

### 4.1 Inicio
- **Título:** Vamos a preparar un presupuesto paso a paso.
- **Ayuda:** Aquí hace presupuestos. Sus trabajos se guardan en este teléfono. No necesita crear una cuenta.
- **Botón principal:** Empezar un presupuesto.
- **Secundario:** Ver mis trabajos guardados.
- **Simplificación:** Dejar solo estos dos botones. Quitar cualquier otro acceso desde aquí.

### 4.2 Describir el trabajo (paso 1 de 5)
- **Título:** ¿Qué trabajo es y para quién?
- **Ayuda:** Escriba el trabajo y el nombre del cliente. También puede tocar una opción de abajo.
- **Ejemplo gris:** Por ejemplo: reparar un techo para Juan Pérez.
- **Botón principal:** Enviar (campo grande, siempre visible).
- **Simplificación:** Quitar la cámara de esta pantalla. El micrófono se llama "Hablar" (no "Dictado por voz").
- **Pendiente:** al escribir un cliente nuevo, la app debe crear el cliente. Confirmar que lo haga sin pasos extra.

### 4.3 Foto del cuaderno (paso 2 de 5)
- **Título:** Sáquele foto al cuaderno.
- **Ayuda:** La app lee los números de la foto. Si algo no se lee bien, lo corrige usted.
- **Consejos (tres, cortos):** Ponga el cuaderno sobre una superficie plana. Busque buena luz. Que se vean todos los números.
- **Botón principal:** Sacar foto.
- **Secundario:** Escribir las medidas.
- **Enlace pequeño:** Elegir una foto guardada.
- **Permiso de cámara:** "La app necesita permiso para usar la cámara. Solo se usa para esta foto."
- **Simplificación:** Hoy hay 5 acciones en la pantalla. Quedan 2 botones y un enlace. Quitar las respuestas rápidas "Sí / No" y el campo de texto con el cuadro "¿Prefieres teclear?".

### 4.4 Revisión de medidas (paso 3 de 5)
- **Título:** Revise las medidas que leímos de su foto.
- **Ayuda:** Si un número está mal, toque **Corregir** junto a esa línea.
- **Explicación bajo el título:** Cada línea es un tramo. Superficie = largo × ancho.
- **Dato dudoso:** "No se pudo leer con seguridad. Escriba el número usted." Botón **Ingresar a mano**.
- **Botón principal:** Sí, están bien.
- **Secundario:** Corregir medidas.
- **Pie de página:** "La app propone estos valores. Usted tiene la última palabra."
- **Simplificación:** Un solo icono para "Ver foto" y "Tomar otra foto", con texto. Acortar el título del encabezado para que no se corte.

### 4.5 Precios y materiales (paso 4 de 5)
- **Título:** Ponga sus precios.
- **Ayuda:** Solo usted define los precios. La app solo multiplica y suma.
- **Pregunta:** ¿Cuánto cobra por metro cuadrado? Ejemplo: $8.000.
- **Cálculo a la vista:** 115,84 m² × $8.000 = $926.720. Mostrar siempre la operación.
- **Materiales:** "¿Quiere agregar materiales?" Sí / No.
- **Ayuda para materiales:** Diga o escriba el material y su precio. Ejemplo: 25 planchas de zinc, $250.000.
- **Botón principal:** Continuar a la revisión final.
- **Simplificación:** Los dos botones "Sí, agregar" y "Agregar otro material" son el mismo acto. Dejar uno. El total queda fijo abajo para que siempre se vea.

### 4.6 Revisión final (paso 5 de 5)
- **Título:** Revise el presupuesto antes de guardarlo.
- **Ayuda:** Revise que los números sean correctos. Guardarlo no envía nada a nadie.
- **Botón principal:** Guardar presupuesto.
- **Secundario:** Volver a corregir.
- **Simplificación:** Las flechas de editar (lápiz) ya permiten cambiar cada parte. Quitar el botón duplicado "Cambiar algún dato".
- **Pendiente:** Mostrar IVA (ver sección 5).

### 4.7 Presupuesto guardado y PDF
- **Título:** Presupuesto guardado en este teléfono.
- **Ayuda:** Ya quedó guardado. Puede verlo sin internet.
- **Botón principal:** Crear PDF.
- **Secundario:** Compartir presupuesto.
- **Texto bajo "Compartir":** Usted elige a quién enviarlo. Nunca se envía solo.
- **Simplificación:** Quitar "Privacidad y control total" como bloque aparte; el texto de compartir ya lo dice.
- **Corrección:** La fecha no puede ser fija ("24 de octubre"). Debe salir del día real.

### 4.8 Mis trabajos
- **Título:** Mis trabajos.
- **Ayuda:** Aquí están sus presupuestos guardados en este teléfono.
- **Estados con texto simple:**
  - **Guardado:** ya está listo.
  - **Borrador:** falta terminarlo. Botón **Continuar presupuesto**.
- **Botón principal:** Empezar un presupuesto.
- **Corrección:** El nombre del cliente se corta ("Juan / Pérez"). Dar al cliente una línea propia con ancho completo.

---

## 5. Pendientes y observaciones del concepto

**Textos y navegación**
- Cambiar "usted" por "tú" en todos los textos: el concepto ya usa "tú". Ajustar `assistant.ts` y el README.
- Unificar el texto de estado (ver regla 5).
- Eliminar frases de seguridad absolutas ("100% SEGURO").

**Diseño visual**
- `DESIGN.md` define Inter, pero la pantalla de inicio se ve con tipografía serif. Revisar `code.html`.
- Textos cortados en: encabezado de revisión de medidas, botón "Escribir medidas", campo de texto del paso 1 y nombre del cliente en "Mis trabajos".
- La fecha del presupuesto aparece fija. Debe ser dinámica.

**Reglas de negocio aún sin definir (PRD)**
- **IVA:** ¿el total muestra neto, IVA y total? El concepto no lo muestra.
- **Unidades y redondeos:** confirmar que los decimales usan coma (21,24 m²) y cómo se redondea el total.
- **Respaldo:** sin cuentas, el usuario pierde todo si cambia de teléfono. Definir una exportación simple.
- **Regla de "dato dudoso":** hoy se marca cuando la foto no se lee. Confirmar si hay otros casos.
- **Medidas en la foto:** la IA propone, pero el maestro confirma. Esto ya está bien en el concepto.

**Lo que el concepto hace bien y se conserva**
- Cálculo a la vista, con la operación escrita.
- Separación clara de mano de obra y materiales.
- Confirmación en cada paso importante.
- Estados de guardado y funcionamiento sin internet.
- Pestañas inferiores simples.
