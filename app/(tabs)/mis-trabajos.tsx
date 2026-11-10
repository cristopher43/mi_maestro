import { useCallback, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { buscarPresupuestos } from '../../services/baseDatos';
import type { Presupuesto } from '../../types/modelos';
import { Boton } from '../../components/ui/Boton';
import { Ayuda } from '../../components/ui/Ayuda';
import { FichaPresupuesto } from '../../components/presupuesto/FichaPresupuesto';

export default function MisTrabajos(){
 const [lista,setLista]=useState<Presupuesto[]>([]);const [cargando,setCargando]=useState(true);
 useFocusEffect(useCallback(()=>{let activa=true;buscarPresupuestos().then(v=>{if(activa)setLista(v)}).finally(()=>{if(activa)setCargando(false)});return()=>{activa=false}},[]));
 return <View style={s.pagina}>
  <View style={s.encabezado}><View><Text style={s.marca}>Mi Maestro</Text><Text style={s.tituloBarra}>Mis trabajos</Text></View><Ayuda tema="Borrador"/></View>
  <ScrollView contentContainerStyle={s.lista}>
   <View style={s.intro}><Text style={s.ayuda}>Tus presupuestos están guardados en este teléfono.</Text><Text style={s.offline}>●  Puedes consultarlos sin internet</Text></View>
   <Boton titulo="＋  Nuevo presupuesto" alTocar={()=>router.push('/presupuesto')}/>
   {cargando?<Text style={s.texto}>Cargando tus trabajos…</Text>:lista.length===0?<View style={s.vacio}><Text style={s.icono}>▤</Text><Text style={s.vacioTitulo}>Todavía no hay trabajos</Text><Text style={s.texto}>Cuando guardes un presupuesto, aparecerá aquí.</Text></View>:lista.map(p=><FichaPresupuesto key={p.id} presupuesto={p} alAbrir={()=>router.push(p.estado==='borrador'?`/presupuesto?id=${p.id}`:`/guardado?id=${p.id}`)}/>)}
  </ScrollView>
 </View>
}
const s=StyleSheet.create({pagina:{flex:1,width:'100%',maxWidth:900,alignSelf:'center',paddingTop:48,backgroundColor:'#F8F9FF'},encabezado:{paddingHorizontal:20,minHeight:76,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},marca:{fontSize:14,fontWeight:'800',color:'#006A47'},tituloBarra:{fontSize:27,fontWeight:'900',color:'#0B1C30',marginTop:2},lista:{padding:18,gap:14,paddingBottom:28},intro:{backgroundColor:'#EFF4FF',borderRadius:18,padding:16,gap:8},ayuda:{fontSize:17,lineHeight:24,color:'#3E4942'},offline:{fontSize:14,color:'#006A47',fontWeight:'800'},texto:{fontSize:16,lineHeight:23,color:'#52665B'},vacio:{padding:26,alignItems:'center',gap:10,backgroundColor:'#fff',borderRadius:20,borderWidth:1,borderColor:'#DCE4F3'},icono:{fontSize:35,color:'#006A47'},vacioTitulo:{fontSize:21,fontWeight:'900',color:'#0B1C30'}});
