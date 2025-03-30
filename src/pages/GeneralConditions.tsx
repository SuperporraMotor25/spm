
import { Link } from "react-router-dom";

const GeneralConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-4xl font-display mb-6 text-center">
            Condiciones <span className="text-racing-red">Generales</span> de Contratación
          </h1>
          
          <div className="mt-8 bg-black border border-gray-800 rounded-lg p-8">
            <p className="text-gray-300 mb-6">
              Este documento regula las Condiciones Generales para la participación en la plataforma Superporra Motor. Al registrarse y participar en la plataforma, el USUARIO acepta estas condiciones en su 
              totalidad.
            </p>
            
            <p className="text-gray-300 mb-6">
              Estas Condiciones estarán publicadas en el sitio web de forma accesible para el USUARIO y podrán ser modificadas en cualquier momento por Superporra Motor. Es responsabilidad del 
              USUARIO revisar periódicamente las Condiciones, ya que las aplicables serán las vigentes en el momento de su participación.
            </p>
            
            <p className="text-gray-300 mb-6">
              Al aceptar estas Condiciones, el USUARIO declara que:
            </p>
            <ul className="space-y-2 text-gray-300 pl-6 list-disc mb-8">
              <li>Ha leído, entiende y comprende lo aquí dispuesto.</li>
              <li>Es mayor de edad y tiene la capacidad necesaria para participar.</li>
              <li>Asume las obligaciones descritas en estas Condiciones.</li>
            </ul>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">1. Identidad de las partes</h2>
              <p className="text-gray-300">
                Superporra Motor es el responsable de la plataforma y proporciona los servicios gratuitos para que los usuarios participen en competiciones virtuales de MotoGP y Fórmula 1. El USUARIO es la 
                persona que se registra en la plataforma mediante un nombre de usuario y contraseña, asumiendo la responsabilidad de los datos proporcionados.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">2. Objeto del contrato</h2>
              <p className="text-gray-300">
                Este contrato regula la relación entre Superporra Motor y el USUARIO, permitiendo la participación en competiciones virtuales de MotoGP y Fórmula 1 a través de la creación de equipos 
                personalizados y el seguimiento de clasificaciones.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">3. Registro y participación</h2>
              <p className="text-gray-300 mb-4">Para participar, el USUARIO deberá:</p>
              <ul className="space-y-2 text-gray-300 pl-6 list-disc">
                <li>Registrarse en la plataforma proporcionando los datos requeridos.</li>
                <li>Crear equipos de competición seleccionando 7 pilotos de MotoGP y 7 pilotos de Fórmula 1.</li>
                <li>Asegurarse de que los equipos creados no superen los 1400 puntos en cada categoría.</li>
                <li>Registrar los equipos antes del inicio de la primera carrera de la temporada.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">4. Términos de participación</h2>
              <ul className="space-y-2 text-gray-300 pl-6 list-disc">
                <li><strong className="text-white">Selección de pilotos:</strong> Los equipos deben cumplir con los límites establecidos en puntos y número de pilotos.</li>
                <li><strong className="text-white">Fechas de inscripción:</strong> El registro y modificación de equipos estará disponible únicamente hasta el inicio de la primera carrera de la temporada.</li>
                <li><strong className="text-white">Puntuación:</strong> Los puntos se asignarán en función de los resultados oficiales de las carreras y se actualizarán en la plataforma.</li>
                <li><strong className="text-white">Clasificaciones:</strong> Habrá clasificaciones semanales, mensuales y generales.</li>
                <li><strong className="text-white">Premios:</strong> Este año, la participación es gratuita y los premios consistirán en regalos patrocinados, que se anunciarán durante la temporada.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">5. Limitaciones de responsabilidad</h2>
              <p className="text-gray-300">
                Superporra Motor no se responsabiliza por errores técnicos, interrupciones del servicio o información incorrecta proporcionada por fuentes externas. El USUARIO es responsable de garantizar el 
                uso adecuado de su cuenta y de cumplir con las normas de la plataforma.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">6. Modificación del servicio</h2>
              <p className="text-gray-300">
                Superporra Motor se reserva el derecho de modificar las condiciones, reglas de participación y contenido de la plataforma en cualquier momento. Estas modificaciones se publicarán en el sitio 
                web y entrarán en vigor de forma inmediata.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">7. Resolución de litigios</h2>
              <p className="text-gray-300">
                Cualquier controversia relacionada con la plataforma será resuelta conforme a la legislación española. Las partes se someterán a los juzgados y tribunales competentes según la normativa 
                vigente.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">8. Aceptación de las condiciones</h2>
              <p className="text-gray-300">
                Al registrarse en la plataforma y participar en las competiciones, el USUARIO declara haber leído, comprendido y aceptado estas Condiciones Generales en su totalidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralConditions;
