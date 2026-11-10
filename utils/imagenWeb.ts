const TAMANO_MAXIMO = 35 * 1024 * 1024;
const LADO_MAXIMO = 2000;

function leerComoDataUrl(archivo: File): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const lector = new FileReader();
    lector.onload = () => typeof lector.result === 'string' ? resolver(lector.result) : rechazar(new Error('No se pudo leer esta foto.'));
    lector.onerror = () => rechazar(new Error('No se pudo abrir esta foto.'));
    lector.readAsDataURL(archivo);
  });
}

function cargarImagen(url: string): Promise<HTMLImageElement> {
  return new Promise((resolver, rechazar) => {
    const imagen = new window.Image();
    imagen.onload = () => resolver(imagen);
    imagen.onerror = () => rechazar(new Error('El navegador no pudo preparar esta foto.'));
    imagen.src = url;
  });
}

/** Reduce fotos grandes para guardarlas en IndexedDB sin perder legibilidad. */
export async function prepararFotoParaGuardar(archivo: File): Promise<string> {
  if (!archivo.type.startsWith('image/')) throw new Error('Elige una foto en formato de imagen.');
  if (archivo.size > TAMANO_MAXIMO) throw new Error('La foto pesa más de 35 MB. Elige una versión más liviana.');

  const original = await leerComoDataUrl(archivo);
  try {
    const imagen = await cargarImagen(original);
    const escala = Math.min(1, LADO_MAXIMO / Math.max(imagen.naturalWidth, imagen.naturalHeight));
    const ancho = Math.max(1, Math.round(imagen.naturalWidth * escala));
    const alto = Math.max(1, Math.round(imagen.naturalHeight * escala));
    const lienzo = document.createElement('canvas');
    lienzo.width = ancho;
    lienzo.height = alto;
    const contexto = lienzo.getContext('2d');
    if (!contexto) return original;
    contexto.fillStyle = '#fff';
    contexto.fillRect(0, 0, ancho, alto);
    contexto.drawImage(imagen, 0, 0, ancho, alto);
    return lienzo.toDataURL('image/jpeg', 0.88);
  } catch {
    // Algunos navegadores no decodifican todos los formatos; conservamos el original.
    return original;
  }
}
