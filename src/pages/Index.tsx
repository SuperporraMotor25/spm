
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Users, Flag } from "lucide-react";

const Index = () => {
  return (
    <div className="pt-16 min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <img 
            src="/logo.svg" 
            alt="Super Porra Motor Logo" 
            className="w-64 mb-8"
          />
          
          <h1 className="text-xl md:text-2xl max-w-3xl mx-auto mb-6">
            El juego definitivo para los aficionados de MotoGP y Fórmula 1. Crea tu equipo ideal y compite con tus amigos.
          </h1>
          
          <Link to="/register" className="btn-racing flex items-center gap-2 group">
            Regístrate Ahora
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
      
      {/* Cómo Funciona Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
            Cómo Funciona
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="text-racing-red" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-4">Crea tu Equipo</h3>
              <p className="text-gray-400">
                Selecciona 7 pilotos de F1 y 7 de MotoGP con un presupuesto limitado para formar tu equipo ideal.
              </p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Flag className="text-racing-red" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-4">Sigue las Carreras</h3>
              <p className="text-gray-400">
                Tus pilotos ganan puntos basados en sus resultados reales en las carreras de F1 y MotoGP.
              </p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Trophy className="text-racing-red" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-4">Gana la Competición</h3>
              <p className="text-gray-400">
                Compite en la clasificación general y demuestra que eres el mejor manager.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Próximas Carreras Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
            Próximas Carreras
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute top-2 left-2">
                <div className="bg-racing-red text-white text-xs px-2 py-1 rounded-sm">
                  F1
                </div>
              </div>
              
              <div className="p-4 flex flex-col">
                <div className="mb-3 flex justify-center">
                  <div className="w-full h-24 border border-gray-700">
                    <img 
                      src="https://images.unsplash.com/photo-1567635293438-c5c56035fd60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Suzuka Circuit"
                      className="w-full h-full object-cover opacity-30"
                    />
                  </div>
                </div>
                
                <h3 className="text-white text-sm font-medium mb-1">Gran Premio de Japón</h3>
                <p className="text-gray-400 text-xs mb-2">Suzuka International Racing Course</p>
                
                <div className="flex items-center mt-auto">
                  <span className="text-gray-400 text-xs">8 abr</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute top-2 left-2">
                <div className="bg-racing-red text-white text-xs px-2 py-1 rounded-sm">
                  MotoGP
                </div>
              </div>
              
              <div className="p-4 flex flex-col">
                <div className="mb-3 flex justify-center">
                  <div className="w-full h-24 border border-gray-700">
                    <img 
                      src="https://images.unsplash.com/photo-1566194256005-2fb15e7adac8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Circuit of The Americas"
                      className="w-full h-full object-cover opacity-30"
                    />
                  </div>
                </div>
                
                <h3 className="text-white text-sm font-medium mb-1">Gran Premio de las Américas</h3>
                <p className="text-gray-400 text-xs mb-2">Circuit of The Americas</p>
                
                <div className="flex items-center mt-auto">
                  <span className="text-gray-400 text-xs">30 mar</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute top-2 left-2">
                <div className="bg-racing-red text-white text-xs px-2 py-1 rounded-sm">
                  F1
                </div>
              </div>
              
              <div className="p-4 flex flex-col">
                <div className="mb-3 flex justify-center">
                  <div className="w-full h-24 border border-gray-700">
                    <img 
                      src="https://images.unsplash.com/photo-1542873087-a797250a01a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Bahrain Circuit"
                      className="w-full h-full object-cover opacity-30"
                    />
                  </div>
                </div>
                
                <h3 className="text-white text-sm font-medium mb-1">Gran Premio de Baréin</h3>
                <p className="text-gray-400 text-xs mb-2">Bahrain International Circuit</p>
                
                <div className="flex items-center mt-auto">
                  <span className="text-gray-400 text-xs">13 abr</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute top-2 left-2">
                <div className="bg-racing-red text-white text-xs px-2 py-1 rounded-sm">
                  MotoGP
                </div>
              </div>
              
              <div className="p-4 flex flex-col">
                <div className="mb-3 flex justify-center">
                  <div className="w-full h-24 border border-gray-700">
                    <img 
                      src="https://images.unsplash.com/photo-1626059215256-de233337c333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Lusail Circuit"
                      className="w-full h-full object-cover opacity-30"
                    />
                  </div>
                </div>
                
                <h3 className="text-white text-sm font-medium mb-1">Gran Premio de Catar</h3>
                <p className="text-gray-400 text-xs mb-2">Lusail International Circuit</p>
                
                <div className="flex items-center mt-auto">
                  <span className="text-gray-400 text-xs">13 abr</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/races" className="inline-flex items-center text-racing-red hover:text-white transition-colors">
              Ver Calendario Completo
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-racing-red/30 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-medium mb-6">
            ¿Listo para competir?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Regístrate ahora y comienza a crear tu equipo para la próxima temporada.
          </p>
          
          <Link to="/register" className="btn-racing">
            Empieza Ya
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
