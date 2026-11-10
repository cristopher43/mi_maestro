import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { buscarPresupuesto } from '../services/baseDatos';
import type { Presupuesto } from '../types/modelos';
import { calcularPresupuesto, leerNumero } from '../utils/calculos';
import { decimal, dinero, fechaCorta } from '../utils/formato';
import { Boton } from '../components/ui/Boton';
import { Ayuda } from '../components/ui/Ayuda';

const escapar = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c));

export default function PresupuestoGuardadoWeb() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [p, setP] = useState<Presupuesto | null>(null);

  useEffect(() => {
    buscarPresupuesto(String(id)).then(setP);
  }, [id]);

  if (!p) return <View style={s.pagina}><Text style={s.titulo}>Buscando el presupuesto…</Text></View>;

  const calculo = calcularPresupuesto(
    p.medidas,
    p.tarifa,
    p.materiales,
    p.modalidad ?? 'mano_obra',
    p.precioObra ?? '',
    p.materialesIncluidos ?? false
  );
  const fecha = fechaCorta(p.actualizado);
  const folio = p.id ? `#P-${p.id.slice(-6).toUpperCase()}` : '#P-001';

  function crearPdf() {
    const esObraVendida = p!.modalidad === 'obra_vendida';

    // Filas de medidas
    const filasMedidas = p!.medidas.length
      ? p!.medidas
          .map((m, i) => {
            const largoNum = leerNumero(m.largo) ?? 0;
            const anchoNum = leerNumero(m.ancho) ?? 0;
            const area = largoNum * anchoNum;
            const nombreTramo = m.nombre && m.nombre.trim() ? m.nombre.trim() : `Tramo ${i + 1}`;
            return `
              <tr>
                <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;font-weight:600;color:#0B1C30;">${escapar(nombreTramo)}</td>
                <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;text-align:right;color:#4A5568;">${decimal(largoNum)} m</td>
                <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;text-align:right;color:#4A5568;">${decimal(anchoNum)} m</td>
                <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;text-align:right;font-weight:700;color:#006A47;">${decimal(area)} m²</td>
              </tr>
            `;
          })
          .join('')
      : '';

    // Filas de materiales
    const filasMateriales = p!.materiales.length
      ? p!.materiales
          .map((m) => {
            const cant = leerNumero(m.cantidad) ?? 0;
            const prec = leerNumero(m.precio) ?? 0;
            const subt = cant * prec;
            return `
              <tr>
                <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;font-weight:600;color:#0B1C30;">${escapar(m.nombre)}</td>
                <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;text-align:center;color:#4A5568;">${escapar(m.cantidad)}</td>
                <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;text-align:right;color:#4A5568;">${dinero(prec)}</td>
                <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;text-align:right;font-weight:700;color:#006A47;">${dinero(subt)}</td>
              </tr>
            `;
          })
          .join('')
      : '';

    const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Presupuesto ${escapar(p!.trabajo)} - ${escapar(p!.cliente || 'Cliente')}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #F8F9FA; color: #0B1C30; line-height: 1.5; font-size: 14px; padding-bottom: 40px; }
    .hoja { max-width: 820px; margin: 24px auto; background: #FFFFFF; border-radius: 16px; box-shadow: 0 4px 24px rgba(11,28,48,0.08); overflow: hidden; border: 1px solid #E2E8F0; }
    
    /* Barra superior de acción (no se imprime) */
    .barra-accion { position: sticky; top: 0; background: #0B1C30; color: #fff; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; z-index: 100; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    .btn-imprimir { background: #006A47; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.2s; display: inline-flex; align-items: center; gap: 8px; }
    .btn-imprimir:hover { background: #21845D; }
    .btn-cerrar { background: transparent; color: #CBD5E1; border: 1px solid #475569; padding: 8px 16px; border-radius: 8px; font-size: 13px; cursor: pointer; }

    /* Encabezado formal */
    .header { padding: 32px 36px 24px; border-bottom: 2px solid #E2E8F0; display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
    .logo-badge { display: inline-flex; align-items: center; gap: 8px; background: #E7F3EC; color: #006A47; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 10px; }
    .titulo-doc { font-size: 26px; font-weight: 900; color: #0B1C30; letter-spacing: -0.5px; line-height: 1.2; }
    .subtitulo-doc { font-size: 13px; color: #64748B; margin-top: 4px; font-weight: 500; }
    .meta-box { text-align: right; background: #F8FAFC; padding: 14px 18px; border-radius: 12px; border: 1px solid #E2E8F0; min-width: 200px; }
    .meta-folio { font-size: 15px; font-weight: 900; color: #006A47; }
    .meta-fecha { font-size: 13px; color: #475569; margin-top: 3px; font-weight: 600; }
    .meta-validez { font-size: 11px; color: #64748B; margin-top: 4px; display: inline-block; background: #EDF2F7; padding: 2px 8px; border-radius: 10px; }

    /* Contenido */
    .cuerpo { padding: 28px 36px; display: flex; flex-direction: column; gap: 24px; }

    /* Tarjetas de cliente y trabajo */
    .grid-info { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .card-info { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px 18px; }
    .card-label { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #006A47; letter-spacing: 0.8px; margin-bottom: 6px; }
    .card-valor { font-size: 17px; font-weight: 800; color: #0B1C30; }
    .card-detalle { font-size: 13px; color: #64748B; margin-top: 4px; }

    /* Secciones y tablas */
    .seccion-titulo { font-size: 15px; font-weight: 800; color: #0B1C30; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; }
    .tabla-contenedor { border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
    thead th { background: #0B1C30; color: #FFFFFF; font-weight: 700; padding: 11px 14px; text-align: left; font-size: 12px; letter-spacing: 0.5px; text-transform: uppercase; }
    tbody tr:nth-child(even) { background: #F8FAFC; }
    .fila-total-tabla { background: #E7F3EC !important; font-weight: 800; }
    .fila-total-tabla td { padding: 12px 14px; border-top: 2px solid #006A47; color: #005236; }

    /* Explicación de cálculo */
    .calculo-box { background: #F1F5F9; border-radius: 10px; padding: 12px 16px; margin-top: 10px; font-size: 13px; color: #334155; display: flex; justify-content: space-between; align-items: center; }

    /* Caja de totales final */
    .caja-total { background: #E7F3EC; border: 2px solid #21845D; border-radius: 14px; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
    .caja-total-etiqueta { font-size: 14px; font-weight: 800; color: #005236; text-transform: uppercase; letter-spacing: 0.5px; }
    .caja-total-desglose { font-size: 12px; color: #2E7D5B; margin-top: 3px; }
    .caja-total-numero { font-size: 30px; font-weight: 900; color: #005236; letter-spacing: -0.5px; }

    /* Condiciones comerciales */
    .condiciones { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px 20px; font-size: 12.5px; color: #475569; display: flex; flex-direction: column; gap: 6px; }
    .condiciones-titulo { font-size: 13px; font-weight: 800; color: #0B1C30; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .condiciones li { margin-left: 18px; margin-bottom: 4px; }

    /* Firmas */
    .firmas-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 28px; padding-top: 20px; page-break-inside: avoid; }
    .firma-col { display: flex; flex-direction: column; align-items: center; text-align: center; }
    .firma-linea { width: 100%; height: 1px; background: #64748B; margin-bottom: 8px; }
    .firma-nombre { font-size: 13px; font-weight: 800; color: #0B1C30; }
    .firma-cargo { font-size: 11px; color: #64748B; margin-top: 2px; }

    /* Pie formal */
    .footer { text-align: center; padding: 20px; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0; background: #FAFAFA; }

    /* Modo impresión (PDF) */
    @media print {
      body { background: #FFFFFF; padding: 0; }
      .barra-accion { display: none !important; }
      .hoja { max-width: 100%; margin: 0; box-shadow: none; border: none; border-radius: 0; }
      .header { padding: 12mm 15mm 8mm; }
      .cuerpo { padding: 8mm 15mm; }
      .footer { padding: 6mm 15mm; }
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      @page { size: A4; margin: 0; }
    }
  </style>
</head>
<body>

  <!-- Barra de control en pantalla -->
  <div class="barra-accion">
    <div style="font-weight:700;font-size:14px;letter-spacing:0.5px;">Vista previa del presupuesto</div>
    <div style="display:flex;gap:10px;">
      <button class="btn-imprimir" onclick="window.print()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
        Guardar como PDF / Imprimir
      </button>
      <button class="btn-cerrar" onclick="window.close()">Cerrar</button>
    </div>
  </div>

  <div class="hoja">
    <!-- Encabezado -->
    <div class="header">
      <div>
        <div class="logo-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          Mi Maestro
        </div>
        <h1 class="titulo-doc">PRESUPUESTO DE TRABAJO</h1>
        <p class="subtitulo-doc">Servicios profesionales de construcción, pintura y terminaciones</p>
      </div>
      <div class="meta-box">
        <div class="meta-folio">${escapar(folio)}</div>
        <div class="meta-fecha">${escapar(fecha)}</div>
        <div class="meta-validez">Validez: 15 días corridos</div>
      </div>
    </div>

    <div class="cuerpo">
      <!-- Datos de las partes -->
      <div class="grid-info">
        <div class="card-info">
          <div class="card-label">Cliente</div>
          <div class="card-valor">${escapar(p!.cliente || 'Cliente Particular')}</div>
          <div class="card-detalle">Cotización formal de faenas</div>
        </div>
        <div class="card-info">
          <div class="card-label">Proyecto / Trabajo a Realizar</div>
          <div class="card-valor">${escapar(p!.trabajo)}</div>
          <div class="card-detalle">Modalidad: <strong>${esObraVendida ? 'Obra Vendida (Precio Cerrado)' : 'Mano de Obra por Medidas'}</strong></div>
        </div>
      </div>

      <!-- Tabla 1: Medidas y Superficie (si hay tramos) -->
      ${
        filasMedidas
          ? `
        <div>
          <div class="seccion-titulo">
            <span>1. Desglose de Medidas y Superficie</span>
            <span style="font-size:12px;color:#006A47;font-weight:700;">${p!.medidas.length} tramos registrados</span>
          </div>
          <div class="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>Área / Tramo</th>
                  <th style="text-align:right;">Largo (m)</th>
                  <th style="text-align:right;">Ancho (m)</th>
                  <th style="text-align:right;">Superficie (m²)</th>
                </tr>
              </thead>
              <tbody>
                ${filasMedidas}
                <tr class="fila-total-tabla">
                  <td colspan="3" style="text-align:right;font-weight:800;letter-spacing:0.5px;">SUPERFICIE TOTAL ACUMULADA:</td>
                  <td style="text-align:right;font-weight:900;font-size:15px;">${decimal(calculo.superficie)} m²</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="calculo-box">
            <span>Cálculo Mano de Obra: ${
              esObraVendida
                ? 'Precio cerrado acordado para el proyecto'
                : `${decimal(calculo.superficie)} m² a ${dinero(calculo.precioMetro)} por m²`
            }</span>
            <strong style="color:#006A47;font-size:15px;">${dinero(esObraVendida ? calculo.precioFijo : calculo.manoObra)}</strong>
          </div>
        </div>
      `
          : ''
      }

      <!-- Tabla 2: Materiales e Insumos -->
      <div>
        <div class="seccion-titulo">
          <span>2. Detalle de Materiales e Insumos</span>
          <span style="font-size:12px;color:#64748B;">${
            p!.materiales.length ? `${p!.materiales.length} artículos` : esObraVendida && p!.materialesIncluidos ? 'Incluidos' : 'No contempla'
          }</span>
        </div>
        ${
          filasMateriales
            ? `
          <div class="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>Material / Insumo</th>
                  <th style="text-align:center;">Cantidad</th>
                  <th style="text-align:right;">Precio Unitario</th>
                  <th style="text-align:right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${filasMateriales}
                <tr class="fila-total-tabla">
                  <td colspan="3" style="text-align:right;font-weight:800;">TOTAL MATERIALES:</td>
                  <td style="text-align:right;font-weight:900;font-size:15px;">${dinero(calculo.subtotalMateriales)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
            : `
          <div style="background:#F8FAFC;border:1px dashed #CBD5E1;border-radius:10px;padding:14px 18px;font-size:13px;color:#64748B;">
            ${
              esObraVendida && p!.materialesIncluidos
                ? '✓ Los materiales e insumos necesarios para la ejecución completa del trabajo están <strong>incluidos en el valor total</strong>.'
                : '• Este presupuesto contempla <strong>únicamente la mano de obra calificada</strong>. Los materiales serán provistos por el cliente.'
            }
          </div>
        `
        }
      </div>

      <!-- Resumen Económico Destacado -->
      <div class="caja-total">
        <div>
          <div class="caja-total-etiqueta">Total Presupuestado a Pagar</div>
          <div class="caja-total-desglose">
            Mano de Obra: ${dinero(esObraVendida ? calculo.precioFijo : calculo.manoObra)}
            ${calculo.subtotalMateriales > 0 ? ` + Materiales: ${dinero(calculo.subtotalMateriales)}` : ''}
          </div>
        </div>
        <div class="caja-total-numero">${dinero(calculo.total)}</div>
      </div>

      <!-- Condiciones Comerciales -->
      <div class="condiciones">
        <div class="condiciones-titulo">Condiciones Generales del Servicio</div>
        <ul>
          <li><strong>Forma de pago:</strong> 50% de anticipo al inicio de los trabajos y 50% restante al término y entrega a entera satisfacción del cliente.</li>
          <li><strong>Garantía:</strong> Todos los trabajos cuentan con garantía de calidad y satisfacción en terminaciones.</li>
          <li><strong>Plazo de ejecución:</strong> A coordinar de común acuerdo según condiciones climáticas y disponibilidad del espacio.</li>
        </ul>
      </div>

      <!-- Firmas formales -->
      <div class="firmas-grid">
        <div class="firma-col">
          <div class="firma-linea"></div>
          <div class="firma-nombre">Firma Maestro / Contratista</div>
          <div class="firma-cargo">Responsable de faena</div>
        </div>
        <div class="firma-col">
          <div class="firma-linea"></div>
          <div class="firma-nombre">Aceptación del Cliente</div>
          <div class="firma-cargo">${escapar(p!.cliente || 'Conforme con presupuesto y condiciones')}</div>
        </div>
      </div>
    </div>

    <!-- Pie formal -->
    <div class="footer">
      Documento generado profesionalmente por Mi Maestro • Garantía de trabajo bien hecho
    </div>
  </div>

  <script>
    // Al abrir, sugerir la impresión automáticamente tras cargar estilos
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>`;

    const ventana = window.open('', '_blank');
    if (!ventana) {
      window.alert('El navegador bloqueó la ventana emergente. Por favor permite ventanas emergentes en tu navegador para ver y descargar el PDF.');
      return;
    }
    ventana.document.open();
    ventana.document.write(html);
    ventana.document.close();
  }

  async function compartir() {
    const mensaje = `Presupuesto ${p!.trabajo} — Cliente: ${p!.cliente || 'Sin indicar'} — Total: ${dinero(calculo.total)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Presupuesto Mi Maestro', text: mensaje });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(mensaje);
        window.alert('Resumen copiado. Puedes pegarlo en WhatsApp o en otro mensaje.');
      } else {
        window.alert(mensaje);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        window.alert('No se pudo abrir la opción de compartir.');
      }
    }
  }

  return (
    <View style={s.pagina}>
      <View style={s.barra}>
        <View>
          <Text style={s.marca}>Mi Maestro</Text>
          <Text style={s.tituloBarra}>Presupuesto listo</Text>
        </View>
        <Ayuda tema="Guardado en tu teléfono" />
      </View>
      <ScrollView contentContainerStyle={s.contenido}>
        <View style={s.exito}>
          <Text style={s.check}>✓</Text>
          <Text style={s.titulo}>¡Presupuesto guardado!</Text>
          <Text style={s.ayuda}>
            Quedó guardado en tu teléfono/computador. Para guardarlo como documento PDF, pulsa el botón "Crear PDF / Imprimir" y elige la opción "Guardar como PDF".
          </Text>
        </View>
        <View style={s.tarjeta}>
          <Text style={s.etiqueta}>RESUMEN DEL TRABAJO</Text>
          <Text style={s.trabajo}>{p.trabajo}</Text>
          <Text style={s.texto}>Cliente: {p.cliente || 'Sin indicar'}</Text>
          <Text style={s.texto}>Fecha: {fecha}</Text>
          <View style={s.separador} />
          <Text style={s.texto}>
            {p.modalidad === 'obra_vendida' ? 'Obra vendida' : 'Mano de obra'}:{' '}
            {dinero(p.modalidad === 'obra_vendida' ? calculo.precioFijo : calculo.manoObra)}
          </Text>
          <Text style={s.texto}>Materiales: {dinero(calculo.subtotalMateriales)}</Text>
          <View style={s.filaTotal}>
            <Text style={s.totalEtiqueta}>Total</Text>
            <Text style={s.total}>{dinero(calculo.total)}</Text>
          </View>
        </View>
        <Boton titulo="📄  Crear PDF / Imprimir" alTocar={crearPdf} />
        <Boton titulo="Compartir presupuesto" secundario alTocar={() => void compartir()} />
        <Text style={s.ayuda}>Tú eliges con quién compartirlo. No se envía solo.</Text>
        <Boton titulo="Ver mis trabajos" secundario alTocar={() => router.replace('/(tabs)/mis-trabajos')} />
        <Boton titulo="Volver al inicio" secundario alTocar={() => router.replace('/(tabs)')} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  pagina: { flex: 1, width: '100%', maxWidth: 900, alignSelf: 'center', paddingTop: 44, backgroundColor: '#F8F9FF' },
  barra: { minHeight: 68, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  marca: { fontSize: 14, fontWeight: '800', color: '#006A47' },
  tituloBarra: { fontSize: 22, fontWeight: '900', color: '#0B1C30', marginTop: 2 },
  contenido: { padding: 18, gap: 14, paddingBottom: 30 },
  exito: { backgroundColor: '#EFF4FF', borderRadius: 22, padding: 20, gap: 10, alignItems: 'flex-start' },
  check: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#006A47',
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 44,
  },
  titulo: { fontSize: 26, lineHeight: 34, fontWeight: '900', color: '#0B1C30' },
  ayuda: { fontSize: 16, lineHeight: 24, color: '#3E4942' },
  tarjeta: { backgroundColor: '#fff', borderRadius: 20, padding: 18, gap: 11, borderWidth: 1, borderColor: '#DCE4F3' },
  etiqueta: { fontSize: 12, fontWeight: '900', letterSpacing: 1, color: '#006A47' },
  trabajo: { fontSize: 22, fontWeight: '900', color: '#0B1C30' },
  texto: { fontSize: 16, lineHeight: 22, color: '#52665B' },
  separador: { height: 1, backgroundColor: '#DCE4F3', marginVertical: 2 },
  filaTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#98F5C6', padding: 14, borderRadius: 14 },
  totalEtiqueta: { fontSize: 17, fontWeight: '800', color: '#0B1C30' },
  total: { fontSize: 26, fontWeight: '900', color: '#005236' },
});
