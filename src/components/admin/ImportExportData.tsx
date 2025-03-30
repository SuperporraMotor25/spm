
import { ChangeEvent, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { exportToCSV, importFromCSV } from "@/services/exportService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ImportExportDataProps<T> {
  data: T[];
  exportHeaders: string[];
  exportMapping: (item: T) => Record<string, any>;
  expectedImportHeaders: string[];
  onImportSuccess: (importedData: any[]) => void;
  exportFileName: string;
  entityName: string;
}

const ImportExportData = <T extends Record<string, any>>({
  data,
  exportHeaders,
  exportMapping,
  expectedImportHeaders,
  onImportSuccess,
  exportFileName,
  entityName
}: ImportExportDataProps<T>) => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = () => {
    // Formatear los datos para exportar
    const dataToExport = data.map(exportMapping);
    
    // Exportar los datos
    exportToCSV(dataToExport, `${exportFileName}_${new Date().toISOString().slice(0, 10)}`, exportHeaders);
    
    // Mostrar notificación
    toast({
      title: "Exportación completada",
      description: `Datos de ${entityName} exportados correctamente`,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Importar los datos desde el CSV
    importFromCSV(file, expectedImportHeaders)
      .then(importedData => {
        // Pasar los datos al componente padre
        onImportSuccess(importedData);

        // Cerrar el diálogo y mostrar mensaje de éxito
        setIsImportDialogOpen(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        toast({
          title: "Importación completada",
          description: `Se han importado ${importedData.length} ${entityName} correctamente`,
        });
      })
      .catch(error => {
        console.error(`Error al importar el archivo CSV de ${entityName}:`, error);
        toast({
          title: "Error de importación",
          description: error.message || `Hubo un error al procesar el archivo CSV de ${entityName}`,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        className="border-gray-700 hover:bg-gray-800"
        onClick={handleExport}
      >
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Importar {entityName}</DialogTitle>
            <DialogDescription>
              Sube un archivo CSV con las siguientes columnas: {expectedImportHeaders.join(', ')}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full items-center gap-4 py-4">
            <Label htmlFor="csv-file" className="text-left">
              Archivo CSV
            </Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsImportDialogOpen(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportExportData;
