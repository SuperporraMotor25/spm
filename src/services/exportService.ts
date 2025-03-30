
/**
 * Servicio para la exportación e importación de datos en diferentes formatos
 */

/**
 * Exporta datos a un archivo CSV y lo descarga
 * @param data Array de objetos a exportar
 * @param filename Nombre del archivo (sin extensión)
 * @param headers Cabeceras personalizadas (si no se proporcionan, se usarán las keys del primer objeto)
 */
export const exportToCSV = <T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: string[]
): void => {
  if (!data.length) {
    console.warn('No hay datos para exportar');
    return;
  }

  // Si no se proporcionan cabeceras, usar las claves del primer objeto
  const csvHeaders = headers || Object.keys(data[0]);
  
  // Crear las filas de datos
  const csvRows = [
    csvHeaders.join(','), // Fila de cabeceras
    ...data.map(row => 
      csvHeaders.map(header => {
        // Manejar valores que podrían contener comas, comillas o saltos de línea
        const cell = String(row[header] !== undefined ? row[header] : '');
        if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    )
  ];
  
  // Unir todas las filas en un solo string con saltos de línea
  const csvContent = csvRows.join('\n');
  
  // Crear blob y enlace para descargar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Configurar y triggear la descarga
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  
  // Limpiar
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Importa datos desde un archivo CSV
 * @param file Archivo CSV a importar
 * @param expectedHeaders Cabeceras esperadas (para validación)
 * @returns Promise con los datos importados
 */
export const importFromCSV = <T extends Record<string, any>>(
  file: File,
  expectedHeaders: string[]
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target || !event.target.result) {
          throw new Error('Error al leer el archivo');
        }
        
        const csvContent = event.target.result as string;
        const lines = csvContent.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length < 2) {
          throw new Error('El archivo no contiene datos suficientes');
        }
        
        // Obtener y validar las cabeceras
        const headers = lines[0].split(',').map(header => header.trim().replace(/^"(.+)"$/, '$1'));
        
        // Verificar que todas las cabeceras esperadas estén presentes
        for (const expected of expectedHeaders) {
          if (!headers.includes(expected)) {
            throw new Error(`La cabecera "${expected}" no está presente en el archivo CSV`);
          }
        }
        
        // Procesar los datos
        const data: T[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          // Manejar correctamente valores con comas dentro de comillas
          const values: string[] = [];
          let currentValue = '';
          let insideQuotes = false;
          
          for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            
            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
              values.push(currentValue.replace(/^"(.+)"$/, '$1'));
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          
          values.push(currentValue.replace(/^"(.+)"$/, '$1'));
          
          if (values.length !== headers.length) {
            console.warn(`La línea ${i + 1} tiene un número incorrecto de valores. Se esperaban ${headers.length}, pero se encontraron ${values.length}.`);
            continue;
          }
          
          const row: Record<string, any> = {};
          headers.forEach((header, index) => {
            row[header] = values[index];
          });
          
          data.push(row as T);
        }
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Exporta datos a un archivo JSON y lo descarga
 * @param data Datos a exportar
 * @param filename Nombre del archivo (sin extensión)
 */
export const exportToJSON = <T>(data: T, filename: string): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
