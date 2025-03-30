
import { useState } from 'react';
import RaceHeader from '@/components/admin/RaceHeader';
import RaceTable from '@/components/admin/RaceTable';
import { useToast } from "@/components/ui/use-toast";

interface Race {
  id: number;
  name: string;
  circuit: string;
  category: 'F1' | 'MotoGP';
  date: string;
  status: string;
}

// Datos de ejemplo
const mockRaces: Race[] = [
  { id: 1, name: 'GP de España', circuit: 'Circuito de Jerez', category: 'MotoGP', date: '28/04/2024', status: 'Completado' },
  { id: 2, name: 'GP de Francia', circuit: 'Le Mans', category: 'MotoGP', date: '12/05/2024', status: 'Próximo' },
  { id: 3, name: 'GP de Italia', circuit: 'Mugello', category: 'MotoGP', date: '02/06/2024', status: 'Próximo' },
  { id: 4, name: 'GP de Bahréin', circuit: 'Circuito Int. de Bahréin', category: 'F1', date: '02/03/2024', status: 'Completado' },
  { id: 5, name: 'GP de Arabia Saudita', circuit: 'Jeddah Corniche', category: 'F1', date: '09/03/2024', status: 'Completado' },
  { id: 6, name: 'GP de Australia', circuit: 'Albert Park', category: 'F1', date: '24/03/2024', status: 'Completado' },
];

const AdminRaces = () => {
  const [races, setRaces] = useState<Race[]>(mockRaces);
  const { toast } = useToast();

  const handleImportSuccess = (importedData: any[]) => {
    // Transformar los datos importados al formato de la aplicación
    const newRaces = importedData.map(item => {
      // Validate and ensure category is either 'F1' or 'MotoGP'
      let validatedCategory: 'F1' | 'MotoGP' = 'F1'; // Default
      
      if (item.tipo === 'F1' || item.tipo === 'MotoGP') {
        validatedCategory = item.tipo as 'F1' | 'MotoGP';
      } else {
        // Log invalid category for debugging
        console.warn(`Invalid category found: ${item.tipo}. Defaulting to F1.`);
      }
      
      return {
        id: parseInt(item.id),
        name: item.nombre_carrera,
        date: item.fecha,
        circuit: item.circuito,
        category: validatedCategory,
        status: 'Próximo' // Valor por defecto
      };
    });

    // Actualizar el estado con los nuevos datos
    setRaces(prevRaces => {
      // Filtrar las carreras existentes para evitar duplicados
      const existingIds = new Set(prevRaces.map(race => race.id));
      const uniqueNewRaces = newRaces.filter(race => !existingIds.has(race.id));
      
      // Combinar las carreras existentes con las nuevas
      return [...prevRaces, ...uniqueNewRaces];
    });
  };

  const handleAddNewRace = () => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: "La creación de nuevas carreras estará disponible próximamente",
    });
  };

  const handleEditRace = (race: Race) => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: `Edición de carrera: ${race.name}`,
    });
  };

  const handleDeleteRace = (raceId: number) => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: `Eliminación de carrera con ID: ${raceId}`,
    });
  };

  return (
    <div>
      <RaceHeader 
        races={races}
        onImportSuccess={handleImportSuccess}
        onAddNewRace={handleAddNewRace}
      />
      
      <RaceTable 
        races={races}
        onEditRace={handleEditRace}
        onDeleteRace={handleDeleteRace}
      />
    </div>
  );
};

export default AdminRaces;
