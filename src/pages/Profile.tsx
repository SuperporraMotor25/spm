
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("view");
  
  // Datos de usuario (simulados)
  const userData = {
    nombre: "Raúl",
    apellido: "García Gimenez",
    fechaNacimiento: "08/01/1978",
    pais: "España",
    email: "raulgarcia@infomalena.info",
    tipo: "Admin",
    miembroDesde: "19 de marzo de 2025",
    fotoPerfil: "/lovable-uploads/c6a0ff50-94bf-465f-809a-198dea606eb2.png"
  };

  return (
    <div className="w-full pt-28 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Mi <span className="text-racing-red">Perfil</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Foto y cambiar foto */}
          <div className="md:col-span-1">
            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Foto de Perfil</h2>
              <p className="text-gray-400 text-sm mb-4">Sube una foto para personalizar tu perfil</p>
              
              <div className="flex flex-col items-center justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-racing-red mb-4">
                  <img 
                    src={userData.fotoPerfil} 
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <Button 
                  className="bg-racing-red hover:bg-racing-red/90 w-full"
                >
                  <Camera size={18} className="mr-2" /> Cambiar foto
                </Button>
              </div>
            </div>
            
            {/* Información de la cuenta */}
            <div className="bg-black border border-gray-800 rounded-lg p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Información de Cuenta</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Tipo de cuenta</p>
                  <p className="font-medium">{userData.tipo}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Miembro desde</p>
                  <p className="font-medium">{userData.miembroDesde}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Información principal del perfil */}
          <div className="md:col-span-2">
            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="flex border-b border-gray-800">
                <button 
                  className={`flex-1 py-3 px-4 text-center transition-colors ${activeTab === 'view' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-900'}`}
                  onClick={() => setActiveTab('view')}
                >
                  Ver Perfil
                </button>
                <button 
                  className={`flex-1 py-3 px-4 text-center transition-colors ${activeTab === 'edit' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-900'}`}
                  onClick={() => setActiveTab('edit')}
                >
                  Editar Perfil
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'view' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-400 mb-1">Nombre</h3>
                      <p className="text-xl font-medium">{userData.nombre}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-400 mb-1">Apellido</h3>
                      <p className="text-xl font-medium">{userData.apellido}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-400 mb-1">Fecha de nacimiento</h3>
                      <p className="text-xl font-medium">{userData.fechaNacimiento}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-400 mb-1">País</h3>
                      <p className="text-xl font-medium">{userData.pais}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-8">
                    Para editar tu perfil, por favor visita la sección de Configuración.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
