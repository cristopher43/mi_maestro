export type Medida = { id: string; nombre: string; largo: string; ancho: string; confirmada: boolean };
export type Material = { id: string; nombre: string; cantidad: string; precio: string };
export type EstadoTrabajo = 'borrador' | 'guardado';
export type ModalidadCobro = 'mano_obra' | 'obra_vendida';
export type Presupuesto = {
 id:string; trabajo:string; cliente:string; fotoUri:string|null; fotosUri:string[]; textoLeido:string; medidas:Medida[]; tarifa:string; materiales:Material[];
 modalidad:ModalidadCobro; precioObra:string; materialesIncluidos:boolean; estado:EstadoTrabajo; actualizado:string;
};
export const presupuestoVacio=():Presupuesto=>({id:Date.now().toString(),trabajo:'',cliente:'',fotoUri:null,fotosUri:[],textoLeido:'',medidas:[],tarifa:'',materiales:[],modalidad:'mano_obra',precioObra:'',materialesIncluidos:false,estado:'borrador',actualizado:new Date().toISOString()});
