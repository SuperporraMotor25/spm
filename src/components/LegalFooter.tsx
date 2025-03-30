
import { Link } from "react-router-dom";

const LegalFooter = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-2">
        <Link to="/" className="inline-block mb-4">
          <span className="font-display text-racing-red text-2xl tracking-wider">MOTOR<span className="text-white">PORRA</span></span>
        </Link>
        <p className="text-racing-silver mb-6 max-w-md">
          El juego definitivo para los aficionados de MotoGP y Fórmula 1. Crea tu equipo ideal y compite con tus amigos.
        </p>
      </div>
      
      <div>
        <h3 className="text-white font-medium mb-3">Enlaces rápidos</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-racing-silver hover:text-white transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/classification" className="text-racing-silver hover:text-white transition-colors">
              Clasificación
            </Link>
          </li>
          <li>
            <Link to="/rules" className="text-racing-silver hover:text-white transition-colors">
              Reglas
            </Link>
          </li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-white font-medium mb-3">Documentos legales</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/terms" className="text-racing-silver hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
          </li>
          <li>
            <Link to="/general-conditions" className="text-racing-silver hover:text-white transition-colors">
              Condiciones Generales
            </Link>
          </li>
          <li>
            <Link to="/legal-notice" className="text-racing-silver hover:text-white transition-colors">
              Aviso Legal
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="text-racing-silver hover:text-white transition-colors">
              Política de Privacidad
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LegalFooter;
