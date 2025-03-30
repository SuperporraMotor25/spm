
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-4xl font-display mb-6 text-center">
            Términos y <span className="text-racing-red">Condiciones</span>
          </h1>
          
          <div className="mt-8 bg-black border border-gray-800 rounded-lg p-8">
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Condiciones Generales</h2>
              <p className="text-gray-300">
                Las siguientes condiciones regulan la participación y el uso de la plataforma SuperporraMotor. Al usar esta plataforma, aceptas estas condiciones en su totalidad.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Objeto</h2>
              <p className="text-gray-300 mb-4">
                SuperporraMotor es una plataforma gratuita diseñada para permitir a los usuarios crear equipos de competición basados en MotoGP y Fórmula 1, gestionar puntuaciones y seguir clasificaciones. 
                Todas las actividades se realizan bajo el marco legal español y están sujetas a las condiciones establecidas en este documento.
              </p>
              <p className="text-gray-300">
                La participación está restringida a mayores de 18 años y a personas que no tengan limitaciones legales para acceder a este tipo de actividades.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Contenido</h2>
              <ol className="space-y-2 text-gray-300 list-decimal pl-6">
                <li>Todos los datos proporcionados en la plataforma provienen de fuentes oficiales de MotoGP y Fórmula 1 o de sistemas internos de SuperporraMotor.</li>
                <li>SuperporraMotor no garantiza que la información esté siempre completamente actualizada o exenta de errores debido a la dependencia de fuentes externas.</li>
                <li>Es responsabilidad del usuario verificar la información importante con las fuentes oficiales antes de tomar decisiones basadas en los datos proporcionados.</li>
              </ol>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Acceso y Uso</h2>
              <ol className="space-y-2 text-gray-300 list-decimal pl-6">
                <li>El acceso y uso de SuperporraMotor es responsabilidad exclusiva del usuario.</li>
                <li>El usuario debe garantizar el uso legal y de buena fe de la plataforma.</li>
                <li>Está prohibido el uso de la plataforma para fines ilegales, fraudulentos o cualquier actividad que perjudique a otros usuarios o a la organización.</li>
              </ol>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Responsabilidad</h2>
              <ol className="space-y-2 text-gray-300 list-decimal pl-6">
                <li>SuperporraMotor no se hace responsable de errores en los resultados, datos informáticos o actividades fraudulentas realizadas por terceros.</li>
                <li>El usuario acepta exonerar a la organización de cualquier daño derivado del uso indebido de la plataforma.</li>
              </ol>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Servicio</h2>
              <ol className="space-y-2 text-gray-300 list-decimal pl-6">
                <li>SuperporraMotor se reserva el derecho de modificar unilateralmente las condiciones de uso, funcionalidades y contenidos de la plataforma.</li>
                <li>El acceso a la plataforma podrá ser suspendido temporalmente por razones técnicas, de mantenimiento u otras circunstancias justificadas.</li>
              </ol>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Propiedad Intelectual</h2>
              <ol className="space-y-2 text-gray-300 list-decimal pl-6">
                <li>Todos los derechos sobre los contenidos, diseño y código de la plataforma pertenecen a SuperporraMotor.</li>
                <li>Queda prohibida la reproducción, distribución o modificación de los contenidos sin autorización expresa.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
