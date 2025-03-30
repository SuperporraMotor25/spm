
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTeamModal from "@/components/CreateTeamModal";

const Teams = () => {
  // Para propósitos de demostración, no hay equipos creados
  const hasTeams = false;
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  
  return (
    <div className="w-full pt-28 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mis <span className="text-racing-red">Equipos</span></h1>
          <Button 
            className="bg-racing-red hover:bg-racing-red/90"
            onClick={() => setCreateTeamOpen(true)}
          >
            <Plus size={18} className="mr-2" /> Crear Equipo
          </Button>
        </div>
        
        <div className="bg-black border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Reglas para crear equipos:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Debes introducir un nombre único para tu equipo</li>
            <li>Debes seleccionar exactamente 7 pilotos de F1 y 7 pilotos de MotoGP</li>
            <li>La suma de puntos de los pilotos de cada categoría no debe superar los 1400 puntos</li>
            <li>Los equipos serán únicos e irrepetibles</li>
          </ul>
        </div>
        
        {!hasTeams ? (
          <div className="bg-black/70 border border-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg">No has creado ningún equipo todavía.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aquí irían los equipos del usuario, si tuviera alguno */}
          </div>
        )}
        
        {/* Modal de creación de equipo */}
        <CreateTeamModal 
          open={createTeamOpen} 
          onOpenChange={setCreateTeamOpen} 
        />
      </div>
    </div>
  );
};

export default Teams;
