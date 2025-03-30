import { useState } from 'react';
import TeamHeader from '@/components/admin/TeamHeader';
import TeamTable from '@/components/admin/TeamTable';
import { useToast } from "@/components/ui/use-toast";

// Define the Team interface
interface Team {
  id: number;
  name: string;
  category: 'F1' | 'MotoGP';
  country: string;
  pilots: string;
  points: number;
}

// Datos de ejemplo
const mockTeams: Team[] = [
  { id: 1, name: 'Red Bull Racing', category: 'F1', country: 'Austria', pilots: 'Max Verstappen, Sergio Pérez', points: 256 },
  { id: 2, name: 'Mercedes AMG F1', category: 'F1', country: 'Alemania', pilots: 'Lewis Hamilton, George Russell', points: 187 },
  { id: 3, name: 'Ferrari', category: 'F1', country: 'Italia', pilots: 'Charles Leclerc, Carlos Sainz', points: 203 },
  { id: 4, name: 'Ducati Lenovo Team', category: 'MotoGP', country: 'Italia', pilots: 'Francesco Bagnaia, Enea Bastianini', points: 245 },
  { id: 5, name: 'Repsol Honda Team', category: 'MotoGP', country: 'Japón', pilots: 'Joan Mir, Luca Marini', points: 120 },
  { id: 6, name: 'Gresini Racing MotoGP', category: 'MotoGP', country: 'Italia', pilots: 'Marc Márquez, Alex Márquez', points: 178 },
];

const AdminTeams = () => {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const { toast } = useToast();

  const handleImportSuccess = (importedData: any[]) => {
    // Transformar los datos importados al formato de la aplicación
    const newTeams = importedData.map(item => {
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
        category: validatedCategory,
        country: item.pais,
        pilots: item.pilotos,
        points: parseInt(item.puntos)
      };
    });

    // Actualizar el estado con los nuevos datos
    setTeams(prevTeams => {
      // Filtrar los equipos existentes para evitar duplicados
      const existingIds = new Set(prevTeams.map(team => team.id));
      const uniqueNewTeams = newTeams.filter(team => !existingIds.has(team.id));
      
      // Combinar los equipos existentes con los nuevos
      return [...prevTeams, ...uniqueNewTeams];
    });
  };

  const handleAddNewTeam = () => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: "La creación de nuevos equipos estará disponible próximamente",
    });
  };

  const handleEditTeam = (team: Team) => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: `Edición de equipo: ${team.name}`,
    });
  };

  const handleDeleteTeam = (teamId: number) => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: `Eliminación de equipo con ID: ${teamId}`,
    });
  };

  return (
    <div>
      <TeamHeader 
        teams={teams}
        onImportSuccess={handleImportSuccess}
        onAddNewTeam={handleAddNewTeam}
      />
      
      <TeamTable 
        teams={teams}
        onEditTeam={handleEditTeam}
        onDeleteTeam={handleDeleteTeam}
      />
    </div>
  );
};

export default AdminTeams;
