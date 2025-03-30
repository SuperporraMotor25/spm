
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import ImportExportData from '@/components/admin/ImportExportData';

interface Pilot {
  id: number;
  name: string;
  number: string;
  team: string;
  category: 'F1' | 'MotoGP';
  nationality: string;
  points: number;
}

interface PilotHeaderProps {
  pilots: Pilot[];
  onImportSuccess: (data: any[]) => void;
  onAddNewPilot: () => void;
}

const PilotHeader: React.FC<PilotHeaderProps> = ({
  pilots,
  onImportSuccess,
  onAddNewPilot
}) => {
  // Exportar mapping function
  const exportMapping = (pilot: Pilot) => ({
    id: pilot.id,
    nombre: pilot.name,
    numero: pilot.number,
    equipo: pilot.team,
    categoria: pilot.category,
    nacionalidad: pilot.nationality,
    puntos: pilot.points
  });

  // Expected headers for import
  const expectedImportHeaders = ['id', 'nombre', 'numero', 'equipo', 'categoria', 'nacionalidad', 'puntos'];

  // Export headers
  const exportHeaders = ['id', 'nombre', 'numero', 'equipo', 'categoria', 'nacionalidad', 'puntos'];

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Gestión de Pilotos</h1>
      <div className="flex gap-2">
        <ImportExportData
          data={pilots}
          exportHeaders={exportHeaders}
          exportMapping={exportMapping}
          expectedImportHeaders={expectedImportHeaders}
          onImportSuccess={onImportSuccess}
          exportFileName="pilotos"
          entityName="pilotos"
        />
        
        <Button 
          className="bg-racing-red hover:bg-racing-red/90"
          onClick={onAddNewPilot}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Piloto
        </Button>
      </div>
    </div>
  );
};

export default PilotHeader;
