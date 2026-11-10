import { create } from 'zustand';
import type { Presupuesto } from '../types/modelos';
import { presupuestoVacio } from '../types/modelos';
type Estado = { presupuesto:Presupuesto; iniciar:(p?:Presupuesto)=>void; actualizar:<K extends keyof Presupuesto>(clave:K,valor:Presupuesto[K])=>void; limpiar:()=>void };
export const usePresupuesto = create<Estado>((set)=>({presupuesto:presupuestoVacio(),iniciar:(p)=>set({presupuesto:p??presupuestoVacio()}),actualizar:(clave,valor)=>set(s=>({presupuesto:{...s.presupuesto,[clave]:valor,actualizado:new Date().toISOString()}})),limpiar:()=>set({presupuesto:presupuestoVacio()})}));
