# Mi Maestro

## Product Requirements Document (PRD)

**Versión:** 1.0  
**Estado:** Definición inicial  
**Plataforma:** Android  
**Modelo:** Gratuito  
**Acceso:** Invitado, sin registro obligatorio  
**Arquitectura:** Offline-first  

---

## 1. Resumen del producto

Mi Maestro es una aplicación móvil para que trabajadores independientes, técnicos y pequeñas empresas organicen trabajos, registren medidas, calculen cantidades y preparen presupuestos profesionales. El producto prioriza tareas claras y rápidas, con datos disponibles sin conexión.

La inteligencia artificial podrá interpretar anotaciones manuscritas cuando haya conexión a internet. Sus resultados serán sugerencias que el usuario debe revisar y confirmar antes de incorporarlas a un trabajo o presupuesto.

## 2. Problema y oportunidad

Muchos trabajadores llevan clientes, medidas, materiales y precios en papel o en herramientas dispersas. Esto dificulta recuperar información, calcular cantidades y presentar presupuestos claros. Mi Maestro reúne esas tareas en una aplicación sencilla que acompaña el trabajo en terreno, incluso sin conexión.

## 3. Visión y principio de diseño

Ayudar al trabajador a administrar su trabajo cotidiano con herramientas fáciles de aprender y confiables.

> La tecnología debe adaptarse al trabajador, no el trabajador a la tecnología.

Cada pantalla debe explicar qué hacer, por qué hacerlo y cuál es el siguiente paso, usando lenguaje cotidiano y orientación contextual.

## 4. Público objetivo

- Trabajadores independientes.
- Maestros de construcción.
- Gasfíteres.
- Electricistas.
- Pintores.
- Técnicos de distintas especialidades.
- Pequeñas empresas y contratistas.

## 5. Objetivos del MVP

1. Permitir que una persona comience a usar la aplicación sin crear una cuenta.
2. Organizar clientes, trabajos, medidas y fotografías en un solo lugar.
3. Calcular superficies y cantidades con resultados deterministas y verificables.
4. Preparar presupuestos que separen materiales y mano de obra.
5. Guardar y recuperar la información localmente sin conexión.
6. Generar un PDF compartible con el detalle del presupuesto.
7. Probar la experiencia con trabajadores reales, comenzando por el padre del desarrollador, y mejorarla según sus dificultades observadas.

## 6. No objetivos del MVP

Estas capacidades quedan fuera del alcance inicial:

- Chatbot conversacional general.
- Asistente por voz.
- Sincronización en la nube.
- Registro de cuentas y gestión de identidad.
- Plantillas especializadas por oficio.
- Estadísticas de trabajos e ingresos.
- Reconocimiento de escritura sin conexión.
- Envío automático de presupuestos al cliente.

## 7. Alcance funcional

### 7.1 Acceso y navegación

- La persona podrá entrar como invitada sin registrarse.
- La pantalla principal ofrecerá accesos directos a clientes, trabajos, calculadora y presupuestos.
- La navegación será simple, consistente y adecuada para distintos tamaños de pantalla.
- Las operaciones importantes que puedan modificar o eliminar información requerirán confirmación.

### 7.2 Clientes

- Crear y guardar clientes localmente.
- Consultar clientes y sus trabajos asociados.
- La información mínima de cliente queda por definir; se propone nombre y al menos un medio de contacto opcional.

### 7.3 Trabajos

- Crear trabajos y asociarlos a un cliente.
- Consultar y actualizar la información del trabajo.
- Guardar medidas y fotografías relacionadas con el trabajo.
- El modelo de estados del trabajo queda por definir.

### 7.4 Calculadora de superficies y cantidades

- Permitir introducir medidas y seleccionar la operación de cálculo.
- Mostrar el procedimiento o los datos usados para que el resultado sea verificable.
- Mantener cálculos deterministas: los mismos datos deben producir el mismo resultado.
- Validar unidades y entradas incompletas antes de calcular.
- Las fórmulas y unidades admitidas en la primera versión quedan por definir por tipo de cálculo.

### 7.5 Presupuestos

- Crear un presupuesto asociado a un cliente y, cuando corresponda, a un trabajo.
- Agregar conceptos de materiales y mano de obra en secciones diferenciadas.
- Permitir al trabajador definir precios y cantidades.
- Mostrar subtotales y total de forma comprensible.
- Guardar el presupuesto localmente y permitir recuperarlo posteriormente.
- No enviar ni compartir un presupuesto sin una acción explícita de aprobación del usuario.
- Conservar el detalle de los conceptos en la vista y en el PDF.

### 7.6 Fotografías y anotaciones

- Capturar y guardar fotografías asociadas a un trabajo.
- Cuando haya conexión, permitir enviar una imagen de una anotación manuscrita al servicio de IA para su interpretación.
- Presentar los datos interpretados como sugerencias editables.
- Marcar o destacar resultados dudosos y solicitar confirmación manual antes de guardarlos.
- La aplicación no debe completar datos que la imagen no permita determinar.
- Si no hay conexión, la captura y el almacenamiento local seguirán disponibles; la interpretación quedará pendiente o deshabilitada hasta recuperar conexión.

### 7.7 PDF y compartir

- Generar un PDF del presupuesto con sus conceptos, cantidades, precios, subtotales y total.
- Permitir abrir la acción de compartir del sistema Android para que el usuario elija el destino.
- La generación del archivo debe funcionar con los datos guardados localmente.
- La plantilla, los datos comerciales incluidos y el formato de moneda quedan por definir.

### 7.8 Historial y persistencia

- Mantener un historial local de clientes, trabajos y presupuestos.
- Guardar cambios automáticamente siempre que sea posible y comunicar claramente cuándo la información quedó guardada.
- Los datos deben seguir disponibles después de cerrar y volver a abrir la aplicación.
- El comportamiento al desinstalar la aplicación o cambiar de dispositivo queda fuera de la garantía del MVP, ya que no se contempla sincronización en la nube.

## 8. Historias de usuario principales

1. **Como trabajador**, quiero comenzar sin registrarme para poder usar la aplicación de inmediato.
2. **Como trabajador**, quiero crear un cliente para asociar correctamente sus trabajos y presupuestos.
3. **Como trabajador**, quiero registrar un trabajo con medidas y fotografías para consultar la información en terreno.
4. **Como trabajador**, quiero calcular superficies y cantidades a partir de medidas para preparar una estimación verificable.
5. **Como trabajador**, quiero agregar materiales y mano de obra por separado para presentar un presupuesto claro.
6. **Como trabajador**, quiero guardar el presupuesto sin internet para seguir trabajando en lugares sin señal.
7. **Como trabajador**, quiero generar y compartir un PDF para entregar el presupuesto al cliente.
8. **Como trabajador**, quiero que la IA lea mis anotaciones y me pida confirmar los datos dudosos para reducir la transcripción manual sin perder control.

## 9. Requisitos no funcionales y UX/UI

- **Usabilidad:** interfaz extremadamente sencilla, con botones grandes, tipografía legible y lenguaje cotidiano.
- **Orientación:** instrucciones paso a paso y ayuda contextual, incluyendo explicación del siguiente paso.
- **Adaptabilidad:** diseño utilizable en distintos tamaños de pantalla Android.
- **Persistencia:** las funciones locales principales deben operar sin internet.
- **Confiabilidad:** los cálculos deben ser reproducibles y mostrar los valores de entrada relevantes.
- **Privacidad:** las imágenes y datos enviados a IA deben limitarse a la función solicitada; el detalle de retención y consentimiento debe definirse antes de integrar el servicio.
- **Accesibilidad:** controles legibles y acciones distinguibles sin depender únicamente del color.

## 10. Reglas de negocio

1. Los datos creados en el dispositivo deben permanecer disponibles sin conexión.
2. Los cálculos se realizan con reglas deterministas y verificables.
3. Cada trabajador define sus precios.
4. La IA no inventa ni completa datos ausentes.
5. Los datos dudosos que sugiera la IA requieren confirmación manual.
6. Ningún presupuesto se comparte o envía sin aprobación explícita del usuario.
7. Todo presupuesto diferencia materiales y mano de obra.
8. El PDF conserva el detalle de los conceptos incluidos.
9. Las funciones que dependen de IA requieren conexión; las funciones locales no deben bloquearse por falta de internet.

## 11. Criterios de aceptación del MVP

El MVP será aceptable cuando una persona pueda completar este flujo:

1. Entrar sin registrarse.
2. Crear un cliente.
3. Registrar un trabajo asociado al cliente.
4. Introducir medidas y obtener cálculos de superficies o cantidades.
5. Agregar conceptos de materiales y mano de obra con precios definidos por el usuario.
6. Guardar el presupuesto sin conexión.
7. Generar un PDF con el detalle del presupuesto.
8. Invocar la acción de compartir de Android y elegir cómo compartir el documento.
9. Cerrar y volver a abrir la aplicación y recuperar clientes, trabajos y presupuestos guardados.
10. Con conexión, interpretar una anotación manuscrita como sugerencia y confirmar o corregir los datos antes de guardarlos.

## 12. Arquitectura propuesta

- **Aplicación:** React Native, Expo y TypeScript.
- **Navegación:** Expo Router.
- **Base de datos local:** SQLite.
- **Estado de interfaz:** Zustand.
- **Formularios y validación:** React Hook Form y Zod.
- **Backend futuro:** NestJS.
- **Base de datos remota futura:** PostgreSQL.
- **IA:** API multimodal invocada mediante un backend seguro; no exponer credenciales del proveedor dentro de la aplicación.
- **Documentos:** generación local de PDF.

La arquitectura remota se considera futura, salvo el backend seguro requerido para la integración de IA si esa capacidad forma parte del MVP.

## 13. Dependencias y riesgos

- La interpretación de escritura depende de conexión, calidad de imagen y legibilidad de las anotaciones.
- La llamada a IA requiere definir un backend seguro, costos operativos, límites de uso y tratamiento de imágenes.
- El PDF requiere decisiones sobre moneda, identidad visual y datos de contacto del trabajador.
- La operación offline depende de que los flujos principales y el almacenamiento local no requieran llamadas remotas.
- La ausencia de cuenta y sincronización implica que los datos residen en el dispositivo durante el MVP.

## 14. Validación con usuarios

La primera prueba se realizará con trabajadores reales, comenzando por el padre del desarrollador. Se observará si puede completar sin ayuda las tareas principales: crear cliente, registrar trabajo, introducir medidas, preparar presupuesto, generar el PDF y recuperar la información.

Las dificultades observadas deben convertirse en cambios de interfaz o instrucciones y volver a probarse antes de ampliar el producto a más usuarios.

## 15. Funcionalidades futuras

- Chatbot conversacional.
- Asistente por voz.
- Sincronización en la nube.
- Registro de cuentas.
- Plantillas por especialidad.
- Estadísticas de trabajos e ingresos.
- Reconocimiento de escritura local.

## 16. Decisiones pendientes

Antes de cerrar el alcance de implementación, definir:

- País, moneda, formato de fecha y unidades predeterminadas.
- Campos requeridos para clientes, trabajos y perfil del trabajador.
- Fórmulas, unidades y precisión admitidas por la calculadora del MVP.
- Estados del trabajo y del presupuesto.
- Si se admitirán impuestos, descuentos, anticipos o vigencia del presupuesto.
- Datos de identificación y contacto que aparecerán en el PDF.
- Política de eliminación, respaldo y recuperación de datos locales.
- Proveedor de IA, política de retención de imágenes, costos y límites.
- Qué significa “gratuito” respecto de la IA y posibles límites de uso.
- Dispositivos y versiones mínimas de Android que se soportarán.

---

**Fin del documento**
