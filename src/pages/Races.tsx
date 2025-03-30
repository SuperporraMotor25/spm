import { useState } from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Datos combinados de carreras
const allRaces = [
  {
    name: "Gran Premio de Japón",
    circuit: "Suzuka International Racing Course",
    location: "Suzuka, Japón",
    date: "8 abr",
    time: "06:00 GMT",
    imageUrl: "https://images.unsplash.com/photo-1567635293438-c5c56035fd60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isUpcoming: true,
    category: "formula1",
    trackImage: "/lovable-uploads/db94f501-aa58-46d8-9666-b69a7ea5bdd4.png"
  },
  {
    name: "Gran Premio de las Américas",
    circuit: "Circuit of The Americas",
    location: "Austin, USA",
    date: "30 mar",
    time: "20:00 GMT",
    imageUrl: "https://images.unsplash.com/photo-1566194256005-2fb15e7adac8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isUpcoming: true,
    category: "motogp",
    trackImage: "/lovable-uploads/db94f501-aa58-46d8-9666-b69a7ea5bdd4.png"
  },
  {
    name: "Gran Premio de Baréin",
    circuit: "Bahrain International Circuit",
    location: "Sakhir, Baréin",
    date: "13 abr",
    time: "16:00 GMT",
    imageUrl: "https://images.unsplash.com/photo-1542873087-a797250a01a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isUpcoming: true,
    category: "formula1",
    trackImage: "/lovable-uploads/db94f501-aa58-46d8-9666-b69a7ea5bdd4.png"
  },
  {
    name: "Gran Premio de Catar",
    circuit: "Lusail International Circuit",
    location: "Lusail, Catar",
    date: "13 abr",
    time: "18:00 GMT",
    imageUrl: "https://images.unsplash.com/photo-1626059215256-de233337c333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isUpcoming: true,
    category: "motogp",
    trackImage: "/lovable-uploads/db94f501-aa58-46d8-9666-b69a7ea5bdd4.png"
  },
  {
    name: "Gran Premio de Arabia Saudita",
    circuit: "Jeddah Corniche Circuit",
    location: "Jeddah, Arabia Saudita",
    date: "20 abr",
    time: "18:00 GMT",
    imageUrl: "https://images.unsplash.com/photo-1614036419632-31e8989562df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isUpcoming: true,
    category: "formula1",
    trackImage: "/lovable-uploads/db94f501-aa58-46d8-9666-b69a7ea5bdd4.png"
  },
  {
    name: "Gran Premio de España",
    circuit: "Circuito de Jerez - Ángel Nieto",
    location: "Jerez, España",
    date: "27 abr",
    time: "14:00 GMT",
    imageUrl: "https://images.unsplash.com/photo-1617645752518-515f0683cceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isUpcoming: true,
    category: "motogp",
    trackImage: "/lovable-uploads/db94f501-aa58-46d8-9666-b69a7ea5bdd4.png"
  },
  {
    name: "Gran Premio de Abu Dhabi",
    circuit: "Yas Marina Circuit",
    location: "Abu Dhabi, UAE",
    date: "8 dic, 2024",
    time: "13:00 GMT",
    imageUrl: "https://images.unsplash.com/photo-1662644828055-25277a7d971a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isPredicted: false,
    category: "formula1",
    isCompleted: true,
    trackImage: "/lovable-uploads/db94f501-aa58-46d8-9666-b69a7ea5bdd4.png"
  },
  {
    name: "Gran Premio de Las Vegas",
    circuit: "Las Vegas Street Circuit",
    location: "Las Vegas, USA",
    date: "24 nov, 2024",
    time: "06:00 GMT",
    imageUrl: "https://images.unsplash.com/photo-1642205304189-29e999ce2b61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isPredicted: true,
    category: "formula1",
    isCompleted: true,
    trackImage: "/lovable-uploads/db94f501-aa58-46d8-9666-b69a7ea5bdd4.png"
  },
];

const RaceCircuit = ({ race }) => {
  const { name, circuit, location, date, category, time } = race;
  
  return (
    <div className="bg-black border border-gray-800 rounded-lg overflow-hidden relative">
      <div className="absolute top-2 left-2 z-10">
        <div className="bg-racing-red text-white text-xs px-2 py-1 rounded-sm">
          {category === "formula1" ? "F1" : "MotoGP"}
        </div>
      </div>
      
      <div className="p-3 flex flex-col">
        <div className="mb-2 flex justify-center">
          <div className="w-full h-32 border border-gray-700 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 300 150" 
                className="text-white stroke-current w-full h-full p-4"
              >
                <path 
                  d="M50,50 C80,30 140,30 170,60 C200,90 260,70 280,100" 
                  fill="none" 
                  strokeWidth="2"
                  className="stroke-white" 
                />
              </svg>
            </div>
          </div>
        </div>
        
        <h3 className="text-white text-sm font-medium mb-1 truncate">{name}</h3>
        <p className="text-gray-400 text-xs mb-2 truncate">{circuit}</p>
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <Calendar size={12} className="text-gray-500 mr-1" />
              <span className="text-gray-400 text-xs">{date}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 text-xs">{time}</span>
            </div>
          </div>
          <Link 
            to="#" 
            className="text-xs text-racing-red hover:text-white transition-colors"
          >
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

const Races = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtrado por categoría (F1 o MotoGP) y completadas vs. próximas
  const filterRaces = () => {
    let filtered = [...allRaces];
    
    if (filter === "formula1") {
      filtered = filtered.filter(race => race.category === "formula1");
    } else if (filter === "motogp") {
      filtered = filtered.filter(race => race.category === "motogp");
    }
    
    // Búsqueda
    if (searchQuery) {
      filtered = filtered.filter(race => 
        race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        race.circuit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        race.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  const filteredRaces = filterRaces();
  
  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-3xl font-display text-white mb-4">Calendario de Carreras</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-500" size={18} />
              </div>
              <input
                type="text"
                placeholder="Buscar carreras..."
                className="pl-10 pr-4 py-2 w-full bg-gray-900 text-white border border-gray-800 rounded-md focus:outline-none focus:border-racing-red"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex">
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors ${filter === 'all' ? 'bg-racing-red text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
                onClick={() => setFilter('all')}
              >
                Todos
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors ${filter === 'formula1' ? 'bg-racing-red text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
                onClick={() => setFilter('formula1')}
              >
                Fórmula 1
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors ${filter === 'motogp' ? 'bg-racing-red text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
                onClick={() => setFilter('motogp')}
              >
                MotoGP
              </button>
            </div>
          </div>
          
          {filteredRaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRaces.map((race, index) => (
                <RaceCircuit key={index} race={race} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🏎️</div>
              <h3 className="text-xl font-medium text-white mb-2">No se encontraron carreras</h3>
              <p className="text-gray-400">
                Intenta ajustar tu búsqueda o criterios de filtro
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Races;

