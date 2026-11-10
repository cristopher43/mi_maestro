import './global.css';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import { prepararBase } from '../services/baseDatos';

export default function RaizWeb(){
 useEffect(()=>{
  void prepararBase();
  if(process.env.NODE_ENV==='production'&&'serviceWorker'in navigator){void navigator.serviceWorker.register('/service-worker.js').catch(()=>undefined)}
 },[]);
 return <ThemeProvider value={DefaultTheme}><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:'#F8F9FF',flex:1}}}><Stack.Screen name="(tabs)"/><Stack.Screen name="presupuesto"/><Stack.Screen name="guardado"/></Stack></ThemeProvider>
}
