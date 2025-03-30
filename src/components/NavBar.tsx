
import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus, ChevronDown, User, Settings, Package, LogOut, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    setIsAuthenticated(!!token);
    setIsAdmin(userRole === 'admin');
    setIsSuperUser(userRole === 'admin' || userRole === 'superuser');
  }, [location.pathname]); // Actualizar cuando cambia la ruta

  // Suscribirse a cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      setIsAuthenticated(!!token);
      setIsAdmin(userRole === 'admin');
      setIsSuperUser(userRole === 'admin' || userRole === 'superuser');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/login' && isAuthenticated) {
      navigate('/');
    }
  }, [location, isAuthenticated]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/95 shadow-md backdrop-blur-md' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8 md:h-10" />
        </NavLink>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            Inicio
          </NavLink>
          <NavLink to="/rules" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            Reglas
          </NavLink>
          <NavLink to="/races" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            Calendario
          </NavLink>
          <NavLink to="/standings" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            Clasificación
          </NavLink>
          
          {!isAuthenticated ? (
            <>
              <Button asChild variant="ghost" className="text-white hover:text-racing-red">
                <Link to="/login">
                  <LogIn size={18} className="mr-2" /> Iniciar Sesión
                </Link>
              </Button>
              <Button asChild className="bg-racing-red hover:bg-racing-red/90">
                <Link to="/register">
                  <UserPlus size={18} className="mr-2" /> Registrarse
                </Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center text-white hover:text-racing-red">
                  Mi Cuenta <ChevronDown size={16} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/95 border-gray-800">
                <DropdownMenuItem className="text-white hover:bg-gray-800 hover:text-racing-red cursor-pointer">
                  <Link to="/profile" className="flex items-center w-full">
                    <User size={16} className="mr-2" /> Mi Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-800 hover:text-racing-red cursor-pointer">
                  <Link to="/teams" className="flex items-center w-full">
                    <Package size={16} className="mr-2" /> Mis Equipos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-800 hover:text-racing-red cursor-pointer">
                  <Link to="/settings" className="flex items-center w-full">
                    <Settings size={16} className="mr-2" /> Configuración
                  </Link>
                </DropdownMenuItem>
                
                {(isAdmin || isSuperUser) && (
                  <>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem className="text-white hover:bg-gray-800 hover:text-racing-red cursor-pointer">
                      <Link to="/admin" className="flex items-center w-full">
                        <ShieldAlert size={16} className="mr-2" /> Panel Admin
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                {isSuperUser && (
                  <>
                    <DropdownMenuItem className="text-white hover:bg-gray-800 hover:text-racing-red cursor-pointer">
                      <Link to="/superuser/tools" className="flex items-center w-full">
                        <Settings size={16} className="mr-2" /> Herramientas Especiales
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-gray-800 hover:text-racing-red cursor-pointer">
                      <Link to="/superuser/management" className="flex items-center w-full">
                        <Package size={16} className="mr-2" /> Gestión Avanzada
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-white hover:bg-gray-800 hover:text-racing-red cursor-pointer">
                  <button
                    className="flex items-center w-full"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('userRole');
                      setIsAuthenticated(false);
                      setIsAdmin(false);
                      navigate('/');
                    }}
                  >
                    <LogOut size={16} className="mr-2" /> Cerrar Sesión
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-racing-red transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-black absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen shadow-md py-4' : 'max-h-0 overflow-hidden'}`}>
        <nav className="container mx-auto px-4 flex flex-col space-y-4">
          <NavLink to="/" className={({isActive}) => `block py-2 ${isActive ? 'text-racing-red font-medium' : 'text-white'}`}>
            Inicio
          </NavLink>
          <NavLink to="/rules" className={({isActive}) => `block py-2 ${isActive ? 'text-racing-red font-medium' : 'text-white'}`}>
            Reglas
          </NavLink>
          <NavLink to="/races" className={({isActive}) => `block py-2 ${isActive ? 'text-racing-red font-medium' : 'text-white'}`}>
            Calendario
          </NavLink>
          <NavLink to="/standings" className={({isActive}) => `block py-2 ${isActive ? 'text-racing-red font-medium' : 'text-white'}`}>
            Clasificación
          </NavLink>
          
          {!isAuthenticated ? (
            <div className="pt-2 space-y-2">
              <Button asChild variant="outline" className="w-full justify-center">
                <Link to="/login">
                  <LogIn size={18} className="mr-2" /> Iniciar Sesión
                </Link>
              </Button>
              <Button asChild className="w-full bg-racing-red hover:bg-racing-red/90 justify-center">
                <Link to="/register">
                  <UserPlus size={18} className="mr-2" /> Registrarse
                </Link>
              </Button>
            </div>
          ) : (
            <div className="pt-2 space-y-2 border-t border-gray-800">
              <Link to="/profile" className="flex items-center py-2 text-white hover:text-racing-red">
                <User size={18} className="mr-2" /> Mi Perfil
              </Link>
              <Link to="/teams" className="flex items-center py-2 text-white hover:text-racing-red">
                <Package size={18} className="mr-2" /> Mis Equipos
              </Link>
              <Link to="/settings" className="flex items-center py-2 text-white hover:text-racing-red">
                <Settings size={18} className="mr-2" /> Configuración
              </Link>
              
              {(isAdmin || isSuperUser) && (
                <Link to="/admin" className="flex items-center py-2 text-white hover:text-racing-red">
                  <ShieldAlert size={18} className="mr-2" /> Panel Admin
                </Link>
              )}
              
              {isSuperUser && (
                <>
                  <Link to="/superuser/tools" className="flex items-center py-2 text-white hover:text-racing-red">
                    <Settings size={18} className="mr-2" /> Herramientas Especiales
                  </Link>
                  <Link to="/superuser/management" className="flex items-center py-2 text-white hover:text-racing-red">
                    <Package size={18} className="mr-2" /> Gestión Avanzada
                  </Link>
                </>
              )}
              
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsAuthenticated(false);
                  navigate('/');
                }} 
                className="flex items-center py-2 text-white hover:text-racing-red w-full text-left"
              >
                <LogOut size={18} className="mr-2" /> Cerrar Sesión
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
