


export function convertirFechaISOaFormatoCorto(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // getMonth() devuelve 0-11
    const anio = fecha.getFullYear().toString().substring(2); // obtiene los últimos 2 dígitos del año
  
    return `${dia}/${mes}/${anio}`;
  }