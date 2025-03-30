
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-racing-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.svg" alt="Logo" className="h-8" />
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
                <Link to="/standings" className="text-racing-silver hover:text-white transition-colors">
                  Clasificación
                </Link>
              </li>
              <li>
                <Link to="/rules" className="text-racing-silver hover:text-white transition-colors">
                  Reglas
                </Link>
              </li>
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
          
          <div>
            <h3 className="text-white font-medium mb-3">Recursos oficiales</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.motogp.com" target="_blank" rel="noopener noreferrer" className="text-racing-silver hover:text-white transition-colors">
                  MotoGP Oficial
                </a>
              </li>
              <li>
                <a href="https://www.formula1.com" target="_blank" rel="noopener noreferrer" className="text-racing-silver hover:text-white transition-colors">
                  Fórmula 1 Oficial
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-racing-gray/20 pt-8 text-center">
          <p className="text-racing-silver text-sm">
            © {new Date().getFullYear()} SPM. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
