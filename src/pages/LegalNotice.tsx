
import { Link } from "react-router-dom";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-4xl font-display mb-6 text-center">
            Aviso <span className="text-racing-red">Legal</span>
          </h1>
          
          <div className="mt-8 bg-black border border-gray-800 rounded-lg p-8">
            <p className="text-gray-300 mb-6">
              Superporra Motor, responsable del sitio web, en adelante RESPONSABLE, pone a disposición de los usuarios el presente documento con el objetivo de dar cumplimiento a las obligaciones 
              dispuestas en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE), así como informar a todos los usuarios del sitio web respecto a las 
              condiciones de uso.
            </p>
            
            <p className="text-gray-300 mb-6">
              Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones aquí dispuestas, así como a cualquier otra 
              normativa aplicable.
            </p>
            
            <p className="text-gray-300 mb-8">
              El RESPONSABLE se reserva el derecho de modificar cualquier información publicada en el sitio web, sin que exista obligación de preavisar a los usuarios dichas modificaciones. La publicación en 
              el sitio web será suficiente para dar cumplimiento a esta obligación.
            </p>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">1. Datos Identificativos</h2>
              <ul className="space-y-2 text-gray-300">
                <li><strong className="text-white">Nombre de dominio:</strong> www.superporramotor.com</li>
                <li><strong className="text-white">Nombre comercial:</strong> Superporra Motor</li>
                <li><strong className="text-white">Correo electrónico:</strong> info@superporramotor.com</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">2. Derechos de Propiedad Intelectual e Industrial</h2>
              <p className="text-gray-300 mb-4">
                El sitio web, incluyendo pero no limitándose a su programación, diseño, compilación, textos, gráficos y logotipos, son propiedad del RESPONSABLE o cuentan con licencia o autorización expresa 
                de los titulares de derechos. Todos los contenidos están protegidos por las normativas de propiedad intelectual e industrial.
              </p>
              <p className="text-gray-300">
                La reproducción, distribución, modificación o cualquier otro uso no autorizado de los contenidos sin la previa autorización escrita del RESPONSABLE está estrictamente prohibido y será 
                considerado como una infracción grave de los derechos de propiedad intelectual o industrial.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">3. Exención de Responsabilidades</h2>
              <p className="text-gray-300">
                El RESPONSABLE no se hace responsable de la información publicada en el sitio web si esta hubiera sido manipulada o introducida por terceros ajenos al mismo.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Uso de cookies:</h2>
              <p className="text-gray-300 mb-4">
                Este sitio web utiliza cookies técnicas para garantizar el correcto funcionamiento de la plataforma y mejorar la experiencia del usuario. Estas cookies no recogen información personal sin el 
                consentimiento explícito del usuario.
              </p>
              <p className="text-gray-300">
                El usuario puede configurar su navegador para gestionar las cookies, pudiendo aceptarlas, rechazarlas o recibir una alerta antes de su instalación.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">Política de enlaces:</h2>
              <p className="text-gray-300">
                Este sitio web puede incluir enlaces a sitios de terceros. El RESPONSABLE no asume responsabilidad alguna por los contenidos de dichos sitios y retirará cualquier enlace que incumpla las 
                normativas legales o afecte la moral o el orden público.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-3">4. Ley Aplicable y Jurisdicción</h2>
              <p className="text-gray-300">
                Este aviso legal se rige por la legislación española. Para la resolución de cualquier conflicto relacionado con el uso del sitio web o de sus actividades, las partes se someten a la jurisdicción de los 
                juzgados y tribunales españoles que correspondan, de conformidad con la normativa vigente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
