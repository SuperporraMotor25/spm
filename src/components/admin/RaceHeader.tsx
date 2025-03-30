
import React from 'react';
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import ImportExportData from '@/components/admin/ImportExportData';

interface Race {
  id: number;
  name: string;
  circuit: string;
  category: 'F1' | 'MotoGP';
  date: string;
  status: string;
}

interface RaceHeaderProps {
  races: Race[];
  onImportSuccess: (data: any[]) => void;
  onAddNewRace: () => void;
}

const RaceHeader: React.FC<RaceHeaderProps> = ({
  races,
  onImportSuccess,
  onAddNewRace
}) => {
  // Exportar mapping function
  const exportMapping = (race: Race) => ({
    id: race.id,
    nombre_carrera: race.name,
    fecha: race.date,
    circuito: race.circuit,
    tipo: race.category
  });

  // Expected headers for import
  const expectedImportHeaders = ['id', 'nombre_carrera', 'fecha', 'circuito', 'tipo'];

  // Export headers
  const exportHeaders = ['id', 'nombre_carrera', 'fecha', 'circuito', 'tipo'];

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Gestión de Carreras</h1>
      <div className="flex gap-2">
        <ImportExportData
          data={races}
          exportHeaders={exportHeaders}
          exportMapping={exportMapping}
          expectedImportHeaders={expectedImportHeaders}
          onImportSuccess={onImportSuccess}
          exportFileName="carreras"
          entityName="carreras"
        />
        
        <Button 
          className="bg-racing-red hover:bg-racing-red/90"
          onClick={onAddNewRace}
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Nueva Carrera
        </Button>
      </div>
    </div>
  );
};

export default RaceHeader;
