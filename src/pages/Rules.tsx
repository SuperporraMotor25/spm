
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

const Rules = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-4xl font-display mb-2 text-center">
            <span className="text-racing-red">Reglas</span> del juego
          </h1>
          
          <div className="mt-8 bg-black border border-gray-800 rounded-lg p-8">
            <div className="mb-8">
              <h2 className="text-xl font-display mb-1 text-white">Reglas Generales</h2>
              <p className="text-gray-400 text-sm">Información básica sobre Super Porra Motor</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-2">¿Qué es Super Porra Motor?</h3>
              <p className="text-gray-300">
                Super Porra Motor es un juego de pronósticos para aficionados de deportes de motor donde podrás crear equipos y competir contra amigos prediciendo resultados de MotoGP y Fórmula 1.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-3">Principios básicos</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span>Crea un equipo para cada competición: MotoGP y Fórmula 1.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span>Selecciona pilotos y equipos respetando el presupuesto máximo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span>Gana puntos en función de los resultados reales de cada Gran Premio.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span>Compite en la clasificación general contra otros participantes.</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-3">Formación del Equipo</h3>
              <p className="text-gray-300 mb-2">Tu equipo debe incluir:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span>MotoGP: 7 pilotos titulares de MotoGP.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span>Fórmula 1: 7 pilotos titulares de F1.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span>El total del presupuesto no puede exceder 1400 puntos en ambas categorías.</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-3">Puntuación por carrera</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-3 text-left text-gray-400 font-medium">Posición</th>
                      <th className="py-3 text-left text-gray-400 font-medium">Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">1º</td>
                      <td className="py-3 text-gray-300">20</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">2º</td>
                      <td className="py-3 text-gray-300">15</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">3º</td>
                      <td className="py-3 text-gray-300">11</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">4º</td>
                      <td className="py-3 text-gray-300">10</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">5º</td>
                      <td className="py-3 text-gray-300">9</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">6º</td>
                      <td className="py-3 text-gray-300">8</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">7º</td>
                      <td className="py-3 text-gray-300">7</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">8º</td>
                      <td className="py-3 text-gray-300">6</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">9º</td>
                      <td className="py-3 text-gray-300">5</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">10º</td>
                      <td className="py-3 text-gray-300">4</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">11º</td>
                      <td className="py-3 text-gray-300">3</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">12º</td>
                      <td className="py-3 text-gray-300">2</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">13º</td>
                      <td className="py-3 text-gray-300">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-3">Puntos extra</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span><strong>Vuelta Rápida:</strong> +3 puntos si tu piloto logra la vuelta rápida y termina entre los 13 primeros.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span><strong>Pole Position:</strong> +3 puntos si tu piloto consigue la pole y termina entre los 13 primeros.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span><strong>¡El Triunfo Completo!</strong> +5 puntos extras si tu piloto logra la pole, la vuelta rápida y termina entre los 13 primeros.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span><strong>No Finalizar la Carrera:</strong> -3 puntos si tu piloto no termina la carrera.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span><strong>No Empezar la Carrera:</strong> 0 puntos si tu piloto no comienza la carrera.</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-3">Cambios y sustituciones</h3>
              <p className="text-gray-300 mb-2">Durante la temporada, se pueden dar distintas situaciones:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span><strong>Cambio de escudería:</strong> Si un piloto cambia de escudería tu equipo continúa con el mismo piloto.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span><strong>Sustitución de pilotos:</strong> si un piloto es sustituido el nuevo piloto formará parte de tu equipo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">•</span>
                  <span>Si ocurriera un cambio de escudería y una sustitución entre los pilotos afectados en el cambio, se realizará primero el cambio de escudería y después la sustitución.</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-3">Preguntas frecuentes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-1">¿Puedo cambiar mi equipo durante la temporada?</h4>
                  <p className="text-gray-300">No, los equipos son únicos e irrepetibles.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">¿Cómo se determina el valor de los pilotos y equipos?</h4>
                  <p className="text-gray-300">El valor se asigna en función de su rendimiento histórico, potencial y resultados recientes.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">¿Hay límite de equipos en la superporra motor?</h4>
                  <p className="text-gray-300">Los equipos registrados son ilimitados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
