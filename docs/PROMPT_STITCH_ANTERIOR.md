# Correcciones para Mi Maestro en Google Stitch

Pega esta instrucción en el proyecto actual de Stitch para corregir las ocho pantallas. Edita el diseño existente; conserva la identidad visual verde y azul, el chat como experiencia principal y el flujo de fotografiar medidas del cuaderno. No reemplaces la aplicación por formularios ni por un panel administrativo.

## Prompt de corrección

Corrige el diseño actual de Mi Maestro, pantalla por pantalla, para que una persona mayor que usa poco el celular pueda preparar un presupuesto sin perderse. La aplicación es Android, funciona offline-first y su experiencia principal es un chatbot sencillo. El usuario suele anotar las medidas en un cuaderno y quiere fotografiar esa página para evitar transcribirlas.

Conserva el estilo visual actual, pero corrige contradicciones, reduce acciones simultáneas y guía claramente a la persona. Genera las ocho pantallas coherentes como un único flujo: inicio, descripción del trabajo, foto del cuaderno, revisión de medidas, mano de obra y materiales, revisión final, presupuesto guardado y lista de trabajos.

### 1. Inicio

- Mantén un único botón principal grande: **“Empezar un presupuesto”**.
- Mantén “Ver mis trabajos guardados” como acción secundaria.
- Quita la foto decorativa grande si desplaza el botón principal o agrega ruido visual.
- El saludo debe ser neutral: **“Hola. Vamos a preparar un presupuesto paso a paso.”** No uses un nombre inventado.
- Aclara: **“Tus trabajos se guardan en este teléfono. No necesitas crear una cuenta.”**
- No repitas el mensaje de guardado en varios lugares de la misma pantalla.

### 2. Chat: describir el trabajo

- Muestra el progreso de manera consistente como **“Paso 1 de 5: Cuéntame el trabajo”**.
- Haz una sola pregunta: **“¿Qué trabajo necesitas presupuestar y para quién?”**
- Ofrece ejemplos como botones opcionales: “Reparar un techo”, “Pintar una casa”, “Instalar electricidad”.
- Mantén visible el cuadro para escribir y un botón claro para continuar/enviar.
- No marques datos como guardados hasta que la persona haya respondido y el sistema los haya guardado.
- No actives el micrófono por defecto. La voz es opcional y secundaria; el flujo principal es escribir y adjuntar una foto.
- No cortes el título “Asistente de presupuesto” ni el texto del campo de respuesta.

### 3. Chat: fotografiar el cuaderno

- Pregunta: **“¿Tienes las medidas anotadas en tu cuaderno?”** y ofrece “Sí, sacaré una foto”, “Elegir una foto” y “No, las escribiré”.
- Antes de abrir la cámara, explica con tres indicaciones cortas: **“Pon el cuaderno sobre una superficie plana”**, **“Busca buena luz”**, **“Asegúrate de que se vean todos los números”**.
- Botones: **“Abrir cámara”**, **“Elegir foto”** y una opción secundaria **“Escribir medidas”**.
- Elimina la palabra técnica “OCR”. Di **“Leer los números de la foto”**.
- No prometas que se calcularán automáticamente metros, piezas u otros valores hasta comprobar que la foto contiene la información necesaria.
- Si no hay internet, muestra exactamente: **“La foto quedó guardada en este teléfono. La leeremos cuando vuelva internet.”** No muestres a la vez “lector activo” o “listo sin señal”.

### 4. Revisar las medidas leídas

- Encabezado claro: **“Revisa las medidas que leí de tu foto”**.
- Muestra la foto en tamaño suficiente y un control **“Ver foto”**. Incluye **“Tomar otra foto”**.
- Cada medida debe aparecer en su propia fila, con nombre, números, unidad y botón grande **“Corregir”**.
- Explica el cálculo con los datos de entrada: por ejemplo, **“7 m × 8,5 m = 59,5 m²”**.
- Si un número es dudoso, márcalo como **“No se alcanza a leer”** y pide confirmación. Nunca lo adivines ni lo marques como confirmado.
- Debajo del total pregunta **“¿Estas medidas están correctas?”** con botones: **“Sí, continuar”** y **“Corregir medidas”**.
- Añade una indicación breve: **“Puedes tocar Corregir junto a cualquier medida.”**
- El total solo se considera confirmado después de que el usuario toque “Sí, continuar”.

### 5. Mano de obra y materiales

- Mantén el indicador **“Paso 4 de 5: Precios y materiales”**.
- Pregunta una cosa a la vez. Primero: **“¿Cuánto cobrarás por la mano de obra?”**. Permite ingresar un precio total o un precio por unidad y deja clara la unidad usada.
- Muestra el cálculo con los valores ingresados. Ejemplo: **“115,84 m² × $8.000 por m² = $926.720”**.
- Después pregunta: **“¿Quieres agregar materiales?”** con botones “Sí, agregar” y “No, continuar”.
- Para cada material, pide nombre, cantidad y precio. Si falta el precio, pregúntalo o déjalo pendiente; nunca lo inventes.
- No agregues flete, traslado, impuestos, descuentos, vigencia, fotos de faena ni otros cargos si el usuario no los indicó. No los incluyas en el total automáticamente.
- Distingue claramente materiales y mano de obra, como requiere el PRD.
- Evita mostrar simultáneamente muchos globos de chat, tarjetas de cálculo y opciones. Mantén una pregunta y su respuesta como foco de la pantalla.

### 6. Revisión final

- Usa el título **“Revisa el presupuesto antes de guardarlo”** y el indicador **“Paso 5 de 5: Revisión final”**.
- Muestra solamente información que el usuario proporcionó o confirmó: cliente, trabajo, medidas confirmadas, mano de obra, materiales y total.
- Separa **Materiales** y **Mano de obra**. Para cada línea, muestra cantidad, precio unitario y subtotal cuando existan.
- Si falta información, muéstrala como pendiente y no la sumes al total.
- No inventes la vigencia del presupuesto, fechas, impuestos incluidos, identificadores, fotografías ni detalles comerciales. No uses “100% calculado” si hay datos pendientes.
- Muestra el total en una tarjeta destacada y una frase: **“Comprueba que los valores estén correctos.”**
- Botón principal: **“Guardar presupuesto”**. Acción secundaria: **“Cambiar algún dato”**.
- Incluye: **“No se compartirá hasta que tú lo decidas.”**

### 7. Presupuesto guardado

- Confirma con lenguaje sencillo: **“Presupuesto guardado en este teléfono.”**
- Botón principal: **“Crear PDF”**.
- Botón secundario: **“Compartir presupuesto”**. Al tocarlo, deja que el usuario elija el destino; no envíes mensajes automáticamente.
- Incluye **“Volver al inicio”** y **“Ver mis trabajos”**.
- No afirmes que un documento está enviado o aprobado por el cliente si el usuario no lo hizo.

### 8. Mis trabajos guardados

- Mantén una lista sencilla. Cada tarjeta muestra nombre del trabajo, cliente, estado y total.
- En borradores, usa una sola acción principal: **“Continuar presupuesto”**.
- En presupuestos guardados, usa **“Ver presupuesto”** como acción principal. Deja compartir dentro del detalle para evitar dos acciones fuertes en cada tarjeta.
- No uses filtros innecesarios en la primera versión.
- Muestra un solo aviso de guardado local, no un banner por pantalla y otro dentro de cada tarjeta.

## Reglas obligatorias de producto

- No inventar medidas, precios, materiales, impuestos ni datos del cliente.
- La IA propone lecturas; el trabajador las revisa y confirma manualmente.
- Si una foto es borrosa o un número no se entiende, decirlo y pedir otra foto o corrección.
- Los cálculos deben ser deterministas y mostrar sus datos de entrada.
- El trabajador define los precios.
- El presupuesto diferencia materiales y mano de obra y conserva el detalle de los conceptos.
- Los datos y presupuestos se guardan localmente y se pueden consultar sin internet.
- La lectura de la foto por IA necesita internet. La interfaz debe explicar claramente qué quedó guardado y qué falta procesar.
- Ningún presupuesto se guarda como aprobado por el cliente ni se comparte sin acción explícita del usuario.
- Acceso de invitado: no pedir cuenta ni contraseña.

## Reglas de usabilidad para persona mayor

- Una acción principal por pantalla y una pregunta por turno de chat.
- Instrucciones cortas, concretas y ubicadas justo antes de la acción correspondiente.
- Texto principal grande, idealmente 18 px o más; botones altos, con texto explícito y área táctil amplia.
- Usa palabras además de iconos; no uses iconos solos para acciones importantes.
- Mantén “Volver atrás” visible y no borres lo ingresado al volver.
- Muestra claramente el paso actual y el siguiente.
- Mensajes de error deben decir qué pasó y cómo solucionarlo.
- No uses jerga técnica, abreviaturas ni información decorativa que compita con la tarea.

Entrega las ocho pantallas actualizadas, con el mismo vocabulario, numeración coherente y datos de ejemplo consistentes de principio a fin. Revisa que los títulos y botones no estén cortados y que cada pantalla permita identificar inmediatamente qué hacer.
