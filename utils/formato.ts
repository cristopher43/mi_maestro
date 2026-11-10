export const dinero = (valor:number) => '$' + Math.round(valor).toLocaleString('es-CL');
export const decimal = (valor:number) => valor.toLocaleString('es-CL',{minimumFractionDigits:2,maximumFractionDigits:2});
export const fechaCorta = (iso:string) => new Date(iso).toLocaleDateString('es-CL',{day:'numeric',month:'long',year:'numeric'});
