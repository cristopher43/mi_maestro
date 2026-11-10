import type { Medida } from '../types/modelos';

const MODELO = 'docscanner-es-v1';
const BASE_MODELOS = 'https://huggingface.co/wycliffeassociates/docscanner-ocr/resolve/main';
const TAMANOS = { detector: 4_819_576, lector: 76_555_610, caracteres: 131_073 } as const;
const DB = 'mi-maestro-modelos';
const TABLA = 'modelos';

type Avance = (porcentaje: number, mensaje: string) => void;
type ModuloOcr = typeof import('paddleocr');
type ServicioOcr = InstanceType<ModuloOcr['PaddleOcrService']>;
type ResultadoOcr = { medidas: Medida[]; texto: string[] };

let basePromesa: Promise<IDBDatabase> | null = null;
let servicioPromesa: Promise<ServicioOcr> | null = null;
let numeroId = 0;

const archivos = [
  { id: 'detector', ruta: 'detector/det_model.onnx', tamano: TAMANOS.detector, nombre: 'Detector de líneas' },
  { id: 'lector', ruta: 'ppocrv6/rec_model.onnx', tamano: TAMANOS.lector, nombre: 'Lector de escritura' },
  { id: 'caracteres', ruta: 'ppocrv6/charset.json', tamano: TAMANOS.caracteres, nombre: 'Caracteres del lector' },
] as const;

function abrirBase(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') return Promise.reject(new Error('Este navegador no permite guardar el lector en el dispositivo.'));
  if (!basePromesa) {
    basePromesa = new Promise((resolver, rechazar) => {
      const solicitud = indexedDB.open(DB, 1);
      solicitud.onupgradeneeded = () => {
        if (!solicitud.result.objectStoreNames.contains(TABLA)) solicitud.result.createObjectStore(TABLA);
      };
      solicitud.onsuccess = () => resolver(solicitud.result);
      solicitud.onerror = () => rechazar(solicitud.error ?? new Error('No se pudo preparar el almacenamiento del lector.'));
    });
  }
  return basePromesa;
}

async function obtenerArchivo(id: string): Promise<ArrayBuffer | undefined> {
  const db = await abrirBase();
  return new Promise((resolver, rechazar) => {
    const solicitud = db.transaction(TABLA, 'readonly').objectStore(TABLA).get(`${MODELO}:${id}`);
    solicitud.onsuccess = () => resolver(solicitud.result as ArrayBuffer | undefined);
    solicitud.onerror = () => rechazar(solicitud.error ?? new Error('No se pudo revisar el lector guardado.'));
  });
}

async function guardarArchivo(id: string, datos: ArrayBuffer): Promise<void> {
  const db = await abrirBase();
  return new Promise((resolver, rechazar) => {
    const tx = db.transaction(TABLA, 'readwrite');
    tx.objectStore(TABLA).put(datos, `${MODELO}:${id}`);
    tx.oncomplete = () => resolver();
    tx.onerror = () => rechazar(tx.error ?? new Error('No hay espacio suficiente para guardar el lector.'));
    tx.onabort = () => rechazar(tx.error ?? new Error('Se interrumpió el guardado del lector.'));
  });
}

export async function lectorDescargado(): Promise<boolean> {
  try {
    const archivosGuardados = await Promise.all(archivos.map(({ id }) => obtenerArchivo(id)));
    return archivosGuardados.every(Boolean);
  } catch {
    return false;
  }
}

async function descargar(url: string, id: string, esperado: number, avance: Avance, inicio: number): Promise<ArrayBuffer> {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error('No se pudo descargar el lector. Conéctate a internet e inténtalo otra vez.');

  const total = Number(respuesta.headers.get('content-length')) || esperado;
  if (!respuesta.body) {
    const datos = await respuesta.arrayBuffer();
    await guardarArchivo(id, datos);
    avance(Math.min(100, inicio + Math.round((datos.byteLength / TAMANO_TOTAL) * 100)), 'Guardando el lector en este dispositivo…');
    return datos;
  }

  const lector = respuesta.body.getReader();
  const partes: Uint8Array[] = [];
  let recibidos = 0;
  while (true) {
    const { done, value } = await lector.read();
    if (done) break;
    if (!value) continue;
    partes.push(value);
    recibidos += value.byteLength;
    const porcentajeArchivo = Math.min(1, recibidos / total);
    avance(Math.min(99, inicio + Math.round((esperado * porcentajeArchivo / TAMANO_TOTAL) * 100)), `Descargando ${archivos.find((archivo) => archivo.id === id)?.nombre ?? 'lector'}…`);
  }
  const bytes = new Uint8Array(recibidos);
  let posicion = 0;
  for (const parte of partes) { bytes.set(parte, posicion); posicion += parte.byteLength; }
  await guardarArchivo(id, bytes.buffer);
  return bytes.buffer;
}

const TAMANO_TOTAL = Object.values(TAMANOS).reduce((total, valor) => total + valor, 0);

async function obtenerArchivos(avance: Avance): Promise<Record<string, ArrayBuffer>> {
  if (typeof navigator !== 'undefined' && navigator.storage?.persist) void navigator.storage.persist();

  const salida: Record<string, ArrayBuffer> = {};
  let completado = 0;
  for (const archivo of archivos) {
    let datos = await obtenerArchivo(archivo.id);
    if (!datos) {
      const inicio = Math.round((completado / TAMANO_TOTAL) * 100);
      datos = await descargar(`${BASE_MODELOS}/${archivo.ruta}?download=true`, archivo.id, archivo.tamano, avance, inicio);
    }
    salida[archivo.id] = datos;
    completado += archivo.tamano;
    avance(Math.min(99, Math.round((completado / TAMANO_TOTAL) * 100)), 'Preparando el agente lector…');
  }
  return salida;
}

function comoArrayBuffer(datos: ArrayBuffer): ArrayBuffer { return datos.slice(0); }

function cargarOrt(): Promise<any> {
  if (typeof window !== 'undefined' && (window as any).ort) {
    return Promise.resolve((window as any).ort);
  }
  return new Promise((resolver, rechazar) => {
    if (typeof document === 'undefined') return rechazar(new Error('Solo disponible en navegador'));
    const id = 'ort-script';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.src = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/ort.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
    const alCargar = () => {
      const ort = (window as any).ort;
      if (ort) resolver(ort);
      else rechazar(new Error('No se pudo inicializar el motor en el navegador.'));
    };
    script.addEventListener('load', alCargar, { once: true });
    script.addEventListener('error', () => rechazar(new Error('No se pudo cargar el motor del lector. Revisa tu conexión a internet.')), { once: true });
    if ((window as any).ort) resolver((window as any).ort);
  });
}

async function obtenerServicio(avance: Avance): Promise<ServicioOcr> {
  if (!servicioPromesa) {
    servicioPromesa = (async () => {
      const [modelos, ort, modulo] = await Promise.all([
        obtenerArchivos(avance),
        cargarOrt(),
        import('paddleocr'),
      ]);

      if (typeof document !== 'undefined') {
        ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/';
        ort.env.wasm.numThreads = 1;
        ort.env.wasm.proxy = false;
      }

      const letras = JSON.parse(new TextDecoder().decode(modelos.caracteres)) as string[];
      letras.push(' ');
      return modulo.PaddleOcrService.createInstance({
        ort,
        modelPreset: 'PP-OCRv6_medium',
        detection: {
          modelBuffer: comoArrayBuffer(modelos.detector),
          channelOrder: 'bgr',
          maxSideLength: 960,
          limitType: 'max',
          maxSideLimit: 4000,
          textPixelThreshold: 0.25,
          boxScoreThreshold: 0.45,
          unclipRatio: 1.8,
        },
        recognition: {
          modelBuffer: comoArrayBuffer(modelos.lector),
          charactersDictionary: letras,
          channelOrder: 'rgb',
          imageHeight: 48,
          imageWidth: 320,
        },
      });
    })().catch((error) => {
      console.error('Error al iniciar el lector:', error);
      servicioPromesa = null;
      throw new Error('No se pudo iniciar el agente lector: ' + (error instanceof Error ? error.message : String(error)));
    });
  }
  return servicioPromesa;
}

function cargarImagen(uri: string): Promise<HTMLImageElement> {
  return new Promise((resolver, rechazar) => {
    const imagen = new Image();
    imagen.onload = () => resolver(imagen);
    imagen.onerror = () => rechazar(new Error('No se pudo abrir una de las fotos.'));
    imagen.src = uri;
  });
}

async function prepararPixeles(uri: string) {
  const imagen = await cargarImagen(uri);
  const mayorLado = Math.max(imagen.naturalWidth, imagen.naturalHeight);
  // Escala óptima: si la imagen es estrecha (ej: recorte de 400px), ampliar al doble para que los trazos de los números tengan buen grosor y no se coman dígitos pequeños como el 2 de 1.20
  const escalaAncho = imagen.naturalWidth < 750 ? Math.min(2.0, 850 / imagen.naturalWidth) : 1.0;
  const escalaMayor = 2200 / mayorLado;
  const escala = Math.min(2.0, Math.min(escalaAncho, escalaMayor));
  const ancho = Math.max(1, Math.round(imagen.naturalWidth * escala));
  const alto = Math.max(1, Math.round(imagen.naturalHeight * escala));
  const lienzo = document.createElement('canvas');
  lienzo.width = ancho;
  lienzo.height = alto;
  const contexto = lienzo.getContext('2d', { willReadFrequently: true });
  if (!contexto) throw new Error('No se pudo preparar la foto para leerla.');
  contexto.fillStyle = '#fff';
  contexto.fillRect(0, 0, ancho, alto);
  try {
    contexto.filter = 'contrast(1.25) brightness(1.02)';
  } catch {}
  contexto.drawImage(imagen, 0, 0, ancho, alto);
  const pixeles = contexto.getImageData(0, 0, ancho, alto);
  return { width: ancho, height: alto, data: new Uint8Array(pixeles.data) };
}

function normalizarTextoMedidas(linea: string): string {
  // Descartar lo que venga después de un signo igual o resultado
  let t = linea.split('=')[0] ?? linea;

  // Palabra "por" entre números por ' x ' (ej: "3 por 4", "3.5 por 2")
  t = t.replace(/(\d)\s*(?:por|POR)\s*(\d)/gi, '$1 x $2');

  // Quitar unidades comunes pegadas a números: 3.5m, 4mts, 3mt, 300cm
  t = t.replace(/(\d+[\.,]?\d*)\s*(?:m(?:etros?|ts?)?|cms?)\b/gi, '$1');

  // Separadores decimales: tildes, comillas, dos puntos entre dígitos -> punto
  t = t.replace(/(\d)[''`\u00b4:;](\d)/g, '$1.$2');

  // Comas decimales entre dígitos: 3,50 -> 3.50
  t = t.replace(/(\d),(\d)/g, '$1.$2');

  // Si un número de 4 dígitos tiene un 0 en segunda posición (el punto se leyó como 0): 3060x -> 3.60x, 2090 -> 2.90
  t = t.replace(/(^|[^\d])([1-9])0(\d{2})(?=[^\d]|$)/g, '$1$2.$3');

  // Ceros confundidos con letras O/o al final de un decimal: 3.6o -> 3.60, 7.OO -> 7.00
  t = t.replace(/(\d+\.[0-9]*)[OoQq]+/g, (_, p: string) => {
    const dec = (p.split('.')[1] ?? '');
    if (dec.length === 0) return p + '00';
    if (dec.length === 1) return p + '0';
    return p;
  });

  // O como dígito inicial de 0.x: O.70 -> 0.70
  t = t.replace(/\b[Oo]\.(\d)/g, '0.$1');
  t = t.replace(/([\s x\u00d7])[Oo]\.(\d)/g, '$10.$2');

  // Letra 'b' como 6 en decimales: 3.b0 -> 3.60
  t = t.replace(/(\d+\.)[bB](\d)/g, '$16$2');

  // Letra 'l', 'I', '|' como 1 junto a decimal: l.80 -> 1.80
  t = t.replace(/(^|[\s x\u00d7])([lI|!])\.(\d)/g, '$11.$3');
  t = t.replace(/(\d\.)([lI|!])/g, '$11');

  // Letra 'S' o 's' como 5 junto a decimal: S.90 -> 5.90
  t = t.replace(/(^|[\s x\u00d7])[Ss]\.(\d)/g, '$15.$2');

  // Separador de multiplicación: x, X, ×, *, ~, guión entre dos números -> ' x '
  t = t.replace(/(\d)\s*[xX\u00d7*yYvVnNkK~\u00b7\-]\s*(\d)/g, '$1 x $2');

  // Dos números decimales separados por espacios -> multiplicación (ej: "3.60   5.90")
  t = t.replace(/(\d+(?:\.\d+)?)\s{1,5}(\d+\.\d+)/g, '$1 x $2');

  return t.trim();
}

function extraerMedidas(textoOriginal: string): Array<{ largo: string; ancho: string; nombre?: string }> {
  const limpias: Array<{ largo: string; ancho: string; nombre?: string }> = [];
  const texto = normalizarTextoMedidas(textoOriginal);

  // Intentar detectar nombre de ambiente o tramo si viene al inicio (ej: "Living: 4 x 3", "Cocina 3.5 x 2", "Pieza 1:")
  let nombreAmbiente = '';
  const matchAmbiente = textoOriginal.match(/^\s*([A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]{2,18})[:\-]\s*\d/);
  if (matchAmbiente && !/^(tramo|medida|total)/i.test(matchAmbiente[1].trim())) {
    nombreAmbiente = matchAmbiente[1].trim();
  }

  function limpiarNumero(val: string): string | null {
    let n = parseFloat(val.replace(',', '.'));
    if (!Number.isFinite(n) || n <= 0) return null;
    // Si viene en centímetros enteros (ej: 350 -> 3.50 m, 240 -> 2.40 m, 180 -> 1.80 m)
    if (n >= 60 && n < 1000) {
      n = n / 100;
    }
    // Rango válido para cualquier trabajo de construcción/pintura: entre 0.10m y 100m
    if (n > 0.05 && n <= 100) {
      // Formatear siempre con 2 decimales para que nunca falten ceros (ej: 7.00 en vez de 7, 8.50 en vez de 8.5)
      return n.toFixed(2);
    }
    return null;
  }

  // Plan A: patrón número x número (cubre 3x4, 3.50 x 2.40, 350 x 240, 3m x 4m, etc.)
  const patronX = /(\d+(?:[.,]\d+)?)\s*[xX\u00d7*\-]\s*(\d+(?:[.,]\d+)?)/gi;
  let coincidencia: RegExpExecArray | null;
  while ((coincidencia = patronX.exec(texto)) !== null) {
    const largo = limpiarNumero(coincidencia[1]);
    const ancho = limpiarNumero(coincidencia[2]);
    if (largo && ancho) {
      limpias.push({ largo, ancho, ...(nombreAmbiente ? { nombre: nombreAmbiente } : {}) });
    }
  }

  // Plan B: si no encontró con 'x', tomar los 2 primeros números en la línea
  if (limpias.length === 0) {
    const nums = texto.match(/\d+(?:[.,]\d+)?/g);
    if (nums && nums.length >= 2) {
      const largo = limpiarNumero(nums[0]);
      const ancho = limpiarNumero(nums[1]);
      if (largo && ancho) {
        limpias.push({ largo, ancho, ...(nombreAmbiente ? { nombre: nombreAmbiente } : {}) });
      }
    }
  }

  return limpias;
}

export async function leerFotosCuaderno(fotos: string[], avance: Avance): Promise<ResultadoOcr> {
  if (typeof document === 'undefined') throw new Error('El lector de fotos está disponible en la versión web de Mi Maestro.');
  const ocr = await obtenerServicio(avance);
  const medidas: Medida[] = [];
  const textos: string[] = [];

  for (let indice = 0; indice < fotos.length; indice++) {
    avance(100, `Leyendo foto ${indice + 1} de ${fotos.length} en este dispositivo…`);
    const pixeles = await prepararPixeles(fotos[indice]);
    const reconocidas = await ocr.recognize(pixeles);
    const items = Array.isArray(reconocidas) ? reconocidas : [];
    const lineas = items.sort((a, b) => (a?.box?.y ?? 0) - (b?.box?.y ?? 0));

    // Agrupar cajas que esten en la misma linea horizontal (diferencia de Y menor a 20px)
    // porque PaddleOCR a veces separa el lado izquierdo "3.60" y el derecho "x 5.90" en dos cajas
    const filas: string[] = [];
    let filaActual: { y: number; textos: Array<{ x: number; t: string }> } | null = null;

    for (const item of lineas) {
      const y = item?.box?.y ?? 0;
      const x = item?.box?.x ?? 0;
      const t = item?.text?.trim() ?? '';
      if (!t) continue;

      if (!filaActual || Math.abs(y - filaActual.y) > 32) {
        if (filaActual) {
          filas.push(filaActual.textos.sort((a, b) => a.x - b.x).map(i => i.t).join(' '));
        }
        filaActual = { y, textos: [{ x, t }] };
      } else {
        filaActual.textos.push({ x, t });
      }
    }
    if (filaActual) {
      filas.push(filaActual.textos.sort((a, b) => a.x - b.x).map(i => i.t).join(' '));
    }

    for (const texto of filas) {
      textos.push(texto);
      for (const itemMedida of extraerMedidas(texto)) {
        medidas.push({ id: `${Date.now()}-${numeroId++}`, nombre: itemMedida.nombre || `Tramo ${medidas.length + 1}`, largo: itemMedida.largo, ancho: itemMedida.ancho, confirmada: false });
      }
    }
  }

  return { medidas, texto: textos };
}













