
import { useState } from 'react';
import PilotHeader from '@/components/admin/PilotHeader';
import PilotTable from '@/components/admin/PilotTable';
import { useToast } from "@/components/ui/use-toast";

interface Pilot {
  id: number;
  name: string;
  number: string;
  team: string;
  category: 'F1' | 'MotoGP';
  nationality: string;
  points: number;
}

// Datos de ejemplo
const mockPilots: Pilot[] = [
  { id: 1, name: 'Marc Márquez', number: '93', team: 'Gresini Racing', category: 'MotoGP', nationality: 'España', points: 75 },
  { id: 2, name: 'Francesco Bagnaia', number: '1', team: 'Ducati Lenovo', category: 'MotoGP', nationality: 'Italia', points: 92 },
  { id: 3, name: 'Jorge Martín', number: '89', team: 'Prima Pramac', category: 'MotoGP', nationality: 'España', points: 87 },
  { id: 4, name: 'Max Verstappen', number: '1', team: 'Red Bull Racing', category: 'F1', nationality: 'Países Bajos', points: 125 },
  { id: 5, name: 'Lewis Hamilton', number: '44', team: 'Mercedes', category: 'F1', nationality: 'Reino Unido', points: 56 },
  { id: 6, name: 'Charles Leclerc', number: '16', team: 'Ferrari', category: 'F1', nationality: 'Mónaco', points: 76 },
];

const AdminPilots = () => {
  const [pilots, setPilots] = useState<Pilot[]>(mockPilots);
  const { toast } = useToast();

  const handleImportSuccess = (importedData: any[]) => {
    // Transformar los datos importados al formato de la aplicación
    const newPilots = importedData.map(item => {
      // Validate and ensure category is either 'F1' or 'MotoGP'
      let validatedCategory: 'F1' | 'MotoGP' = 'F1'; // Default
      
      if (item.categoria === 'F1' || item.categoria === 'MotoGP') {
        validatedCategory = item.categoria as 'F1' | 'MotoGP';
      } else {
        // Log invalid category for debugging
        console.warn(`Invalid category found: ${item.categoria}. Defaulting to F1.`);
      }
      
      return {
        id: parseInt(item.id),
        name: item.nombre,
        number: item.numero,
        team: item.equipo,
        category: validatedCategory,
        nationality: item.nacionalidad,
        points: parseInt(item.puntos)
      };
    });

    // Actualizar el estado con los nuevos datos
    setPilots(prevPilots => {
      // Filtrar los pilotos existentes para evitar duplicados
      const existingIds = new Set(prevPilots.map(pilot => pilot.id));
      const uniqueNewPilots = newPilots.filter(pilot => !existingIds.has(pilot.id));
      
      // Combinar los pilotos existentes con los nuevos
      return [...prevPilots, ...uniqueNewPilots];
    });
  };

  const handleAddNewPilot = () => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: "La creación de nuevos pilotos estará disponible próximamente",
    });
  };

  const handleEditPilot = (pilot: Pilot) => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: `Edición de piloto: ${pilot.name}`,
    });
  };

  const handleDeletePilot = (pilotId: number) => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: `Eliminación de piloto con ID: ${pilotId}`,
    });
  };

  return (
    <div>
      <PilotHeader 
        pilots={pilots}
        onImportSuccess={handleImportSuccess}
        onAddNewPilot={handleAddNewPilot}
      />
      
      <PilotTable 
        pilots={pilots}
        onEditPilot={handleEditPilot}
        onDeletePilot={handleDeletePilot}
      />
    </div>
  );
};

export default AdminPilots;
