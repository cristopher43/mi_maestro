import type { Presupuesto } from '../types/modelos';

const NOMBRE_BASE = 'mi-maestro-web';
const NOMBRE_TABLA = 'presupuestos';
let apertura: Promise<IDBDatabase> | null = null;

function abrirBase(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') return Promise.reject(new Error('Este navegador no permite guardar datos locales.'));
  if (!apertura) {
    apertura = new Promise((resolver, rechazar) => {
      const solicitud = indexedDB.open(NOMBRE_BASE, 1);
      solicitud.onupgradeneeded = () => {
        const base = solicitud.result;
        if (!base.objectStoreNames.contains(NOMBRE_TABLA)) base.createObjectStore(NOMBRE_TABLA, { keyPath: 'id' });
      };
      solicitud.onsuccess = () => resolver(solicitud.result);
      solicitud.onerror = () => rechazar(solicitud.error ?? new Error('No se pudo abrir el almacenamiento local.'));
    });
  }
  return apertura;
}

function transaccion<T>(modo: IDBTransactionMode, accion: (tabla: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return abrirBase().then(base => new Promise<T>((resolver, rechazar) => {
    const tx = base.transaction(NOMBRE_TABLA, modo);
    const solicitud = accion(tx.objectStore(NOMBRE_TABLA));
    solicitud.onsuccess = () => resolver(solicitud.result);
    solicitud.onerror = () => rechazar(solicitud.error ?? new Error('No se pudo guardar el presupuesto.'));
    tx.onabort = () => rechazar(tx.error ?? new Error('Se canceló el guardado.'));
  }));
}

export async function prepararBase(): Promise<void> { await abrirBase(); }

function normalizarPresupuesto(presupuesto: Presupuesto): Presupuesto {
  const antiguo = presupuesto as Presupuesto & { fotosUri?: string[] };
  const fotosUri = Array.isArray(antiguo.fotosUri)
    ? antiguo.fotosUri
    : antiguo.fotoUri ? [antiguo.fotoUri] : [];
  return { ...presupuesto, fotosUri, fotoUri: fotosUri[0] ?? null };
}

export async function guardarPresupuesto(presupuesto: Presupuesto): Promise<Presupuesto> {
  const guardado = { ...normalizarPresupuesto(presupuesto), actualizado: new Date().toISOString() };
  await transaccion<IDBValidKey>('readwrite', tabla => tabla.put(guardado));
  return guardado;
}

export async function buscarPresupuestos(): Promise<Presupuesto[]> {
  const trabajos = await transaccion<Presupuesto[]>('readonly', tabla => tabla.getAll());
  return trabajos.map(normalizarPresupuesto).sort((a, b) => b.actualizado.localeCompare(a.actualizado));
}

export async function buscarPresupuesto(id: string): Promise<Presupuesto | null> {
  const presupuesto = await transaccion<Presupuesto | undefined>('readonly', tabla => tabla.get(id));
  return presupuesto ? normalizarPresupuesto(presupuesto) : null;
}
