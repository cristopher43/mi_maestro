import { Stack, router } from 'expo-router'; import { StyleSheet, Text, View } from 'react-native'; import { Boton } from '../components/ui/Boton';
export default function NoEncontrada(){return <><Stack.Screen options={{title:'Pantalla no encontrada'}}/><View style={s.pagina}><Text style={s.titulo}>No encontramos esta pantalla.</Text><Text style={s.texto}>Vuelve al inicio para seguir con tu presupuesto.</Text><Boton titulo="Volver al inicio" alTocar={()=>router.replace("/(tabs)")}/></View></>}
const s=StyleSheet.create({pagina:{flex:1,justifyContent:'center',padding:24,gap:16,backgroundColor:'#F5F7F6'},titulo:{fontSize:25,fontWeight:'800',color:'#172B3A'},texto:{fontSize:18,color:'#344b42'}});

