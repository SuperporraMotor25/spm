
import React from 'react';
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import ImportExportData from '@/components/admin/ImportExportData';

interface Team {
  id: number;
  name: string;
  category: 'F1' | 'MotoGP';
  country: string;
  pilots: string;
  points: number;
}

interface TeamHeaderProps {
  teams: Team[];
  onImportSuccess: (data: any[]) => void;
  onAddNewTeam: () => void;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({
  teams,
  onImportSuccess,
  onAddNewTeam
}) => {
  // Exportar mapping function
  const exportMapping = (team: Team) => ({
    id: team.id,
    nombre: team.name,
    categoria: team.category,
    pais: team.country,
    pilotos: team.pilots,
    puntos: team.points
  });

  // Expected headers for import
  const expectedImportHeaders = ['id', 'nombre', 'categoria', 'pais', 'pilotos', 'puntos'];

  // Export headers
  const exportHeaders = ['id', 'nombre', 'categoria', 'pais', 'pilotos', 'puntos'];

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Gestión de Equipos</h1>
      <div className="flex gap-2">
        <ImportExportData
          data={teams}
          exportHeaders={exportHeaders}
          exportMapping={exportMapping}
          expectedImportHeaders={expectedImportHeaders}
          onImportSuccess={onImportSuccess}
          exportFileName="equipos"
          entityName="equipos"
        />
        
        <Button 
          className="bg-racing-red hover:bg-racing-red/90"
          onClick={onAddNewTeam}
        >
          <FolderPlus className="mr-2 h-4 w-4" />
          Nuevo Equipo
        </Button>
      </div>
    </div>
  );
};

export default TeamHeader;
