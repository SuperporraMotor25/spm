
import { useState } from "react";
import { Trophy, ArrowUp, ArrowDown, Search, Minus, Calendar, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Datos de ejemplo para cada tipo de clasificación
const generalStandingsData = [
  { position: 1, name: "Alex Márquez", points: 245, change: "up" },
  { position: 2, name: "Carlos Sainz", points: 224, change: "same" },
  { position: 3, name: "Lando Norris", points: 196, change: "up" },
  { position: 4, name: "Fernando Alonso", points: 187, change: "down" },
  { position: 5, name: "Max Verstappen", points: 174, change: "down" },
  { position: 6, name: "Charles Leclerc", points: 168, change: "same" },
  { position: 7, name: "Lewis Hamilton", points: 162, change: "up" },
  { position: 8, name: "Sergio Pérez", points: 156, change: "down" },
  { position: 9, name: "George Russell", points: 145, change: "up" },
  { position: 10, name: "Oscar Piastri", points: 139, change: "same" },
  { position: 11, name: "Esteban Ocon", points: 124, change: "up" },
  { position: 12, name: "Pierre Gasly", points: 118, change: "down" },
  { position: 13, name: "Kevin Magnussen", points: 102, change: "same" },
  { position: 14, name: "Nico Hulkenberg", points: 98, change: "up" },
  { position: 15, name: "Zhou Guanyu", points: 82, change: "down" },
];

const monthlyStandingsData = [
  { position: 1, name: "Fernando Alonso", points: 87, change: "up" },
  { position: 2, name: "Max Verstappen", points: 84, change: "same" },
  { position: 3, name: "Charles Leclerc", points: 78, change: "up" },
  { position: 4, name: "Lewis Hamilton", points: 76, change: "up" },
  { position: 5, name: "Carlos Sainz", points: 72, change: "down" },
  { position: 6, name: "Lando Norris", points: 68, change: "down" },
  { position: 7, name: "George Russell", points: 65, change: "same" },
  { position: 8, name: "Sergio Pérez", points: 62, change: "up" },
  { position: 9, name: "Alex Márquez", points: 58, change: "down" },
  { position: 10, name: "Oscar Piastri", points: 54, change: "same" },
];

const weeklyStandingsData = [
  { position: 1, name: "Lando Norris", points: 25, change: "up" },
  { position: 2, name: "Max Verstappen", points: 23, change: "up" },
  { position: 3, name: "Lewis Hamilton", points: 21, change: "same" },
  { position: 4, name: "Charles Leclerc", points: 19, change: "up" },
  { position: 5, name: "Carlos Sainz", points: 17, change: "down" },
  { position: 6, name: "Sergio Pérez", points: 15, change: "down" },
  { position: 7, name: "Fernando Alonso", points: 13, change: "down" },
  { position: 8, name: "George Russell", points: 11, change: "same" },
  { position: 9, name: "Alex Márquez", points: 9, change: "up" },
  { position: 10, name: "Oscar Piastri", points: 7, change: "down" },
];

const StandingsTable = ({ data, searchQuery }) => {
  const filteredData = data.filter(entry => 
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="glass-panel rounded-xl overflow-hidden shadow-lg animate-fade-in mt-4">
      {filteredData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-racing-dark">
              <TableHead className="text-white">Posición</TableHead>
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white text-center">Puntos</TableHead>
              <TableHead className="text-white text-center">Movimiento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((entry, index) => (
              <TableRow 
                key={index} 
                className={`
                  ${index === 0 ? 'bg-racing-red/5' : index < 3 ? 'bg-racing-silver/30' : ''}
                  hover:bg-racing-silver/50 transition-colors
                `}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <Trophy className="text-yellow-500" size={20} />
                    )}
                    <span className={`font-medium ${index === 0 ? 'text-racing-red' : index < 3 ? 'text-racing-dark' : ''}`}>
                      {entry.position}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{entry.name}</TableCell>
                <TableCell className="text-center">{entry.points}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {entry.change === 'up' && (
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUp size={16} />
                        <span>Subiendo</span>
                      </div>
                    )}
                    {entry.change === 'down' && (
                      <div className="flex items-center gap-1 text-red-600">
                        <ArrowDown size={16} />
                        <span>Bajando</span>
                      </div>
                    )}
                    {entry.change === 'same' && (
                      <div className="flex items-center gap-1 text-gray-500">
                        <Minus size={16} />
                        <span>Igual</span>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-medium text-racing-dark mb-2">No se encontraron equipos</h3>
          <p className="text-racing-gray">
            Intenta ajustar tu criterio de búsqueda
          </p>
        </div>
      )}
    </div>
  );
};

const Standings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-4xl font-display mb-4 text-racing-dark animate-fade-in">Clasificación</h1>
          <p className="text-racing-gray max-w-3xl mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Consulta cómo van todos los equipos en el campeonato de predicciones. La clasificación se actualiza después de cada carrera.
          </p>
          
          <Tabs defaultValue="general" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Trophy size={16} />
                  <span>General</span>
                </TabsTrigger>
                <TabsTrigger value="monthly" className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Mensual</span>
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center gap-2">
                  <Users size={16} />
                  <span>Semanal</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="relative max-w-xs w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-racing-gray" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Buscar equipos..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-racing-red focus:ring-2 focus:ring-racing-red/20 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="general">
              <StandingsTable data={generalStandingsData} searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="monthly">
              <StandingsTable data={monthlyStandingsData} searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="weekly">
              <StandingsTable data={weeklyStandingsData} searchQuery={searchQuery} />
            </TabsContent>
          </Tabs>
          
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standings;
