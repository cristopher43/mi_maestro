import { router } from 'expo-router';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Boton } from '../../components/ui/Boton';
import { Ayuda } from '../../components/ui/Ayuda';

export default function Inicio(){
  return <View style={s.pagina}>
    <View style={s.encabezado}>
      <View><Text style={s.marca}>✳ Mi Maestro</Text><Text style={s.submarca}>Tu ayudante para cada trabajo</Text></View>
      <Ayuda tema="Presupuesto"/>
    </View>
    <ScrollView contentContainerStyle={s.contenido}>
      <View style={s.hero}>
        <View style={s.icono}><Text style={s.iconoTexto}>▤</Text></View>
        <Text style={s.etiqueta}>PRESUPUESTOS SENCILLOS</Text>
        <Text style={s.titulo}>¡Hola! Vamos a preparar tu próximo presupuesto.</Text>
        <Text style={s.ayuda}>Cuéntame qué trabajo harás. Iremos paso a paso y podrás revisar todo antes de guardarlo.</Text>
        <Boton titulo="Empezar un presupuesto" alTocar={()=>router.push('/presupuesto')}/>
        <Text style={s.privado}>No necesitas una cuenta. Tu información queda en este teléfono.</Text>
      </View>
      <View style={s.siguiente}>
        <Text style={s.siguienteTitulo}>¿Ya guardaste un trabajo?</Text>
        <Text style={s.ayuda}>Encuentra tus presupuestos y continúa un borrador.</Text>
        <Boton titulo="Ver mis trabajos" secundario alTocar={()=>router.push('/(tabs)/mis-trabajos')}/>
      </View>
      <Text style={s.guardado}>●  Disponible sin conexión</Text>
    </ScrollView>
  </View>
}
const s=StyleSheet.create({pagina:{flex:1,width:'100%',maxWidth:900,alignSelf:'center',backgroundColor:'#F8F9FF',paddingTop:48},encabezado:{minHeight:68,paddingHorizontal:22,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},marca:{fontSize:24,fontWeight:'900',color:'#0B1C30'},submarca:{fontSize:14,color:'#3E4942',marginTop:2},contenido:{padding:18,gap:16,paddingBottom:24},hero:{backgroundColor:'#EFF4FF',borderRadius:24,padding:22,gap:15,borderWidth:1,borderColor:'#DCE4F3'},icono:{width:56,height:56,borderRadius:18,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},iconoTexto:{fontSize:29,color:'#006A47'},etiqueta:{fontSize:13,fontWeight:'900',letterSpacing:1.2,color:'#006A47'},titulo:{fontSize:29,lineHeight:37,fontWeight:'900',color:'#0B1C30'},ayuda:{fontSize:17,lineHeight:25,color:'#3E4942'},privado:{fontSize:14,lineHeight:20,color:'#52665B',textAlign:'center'},siguiente:{backgroundColor:'#fff',borderRadius:20,padding:18,gap:11,borderWidth:1,borderColor:'#DCE4F3'},siguienteTitulo:{fontSize:20,fontWeight:'800',color:'#0B1C30'},guardado:{textAlign:'center',fontSize:14,color:'#006A47',fontWeight:'700',paddingVertical:6}});
