
import React, { useState } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Race {
  id: number;
  name: string;
  circuit: string;
  category: 'F1' | 'MotoGP';
  date: string;
  status: string;
}

interface RaceTableProps {
  races: Race[];
  onEditRace?: (race: Race) => void;
  onDeleteRace?: (raceId: number) => void;
}

const RaceTable: React.FC<RaceTableProps> = ({ 
  races, 
  onEditRace, 
  onDeleteRace 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  let filteredRaces = races.filter(race => 
    race.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    race.circuit.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (activeTab === 'f1') {
    filteredRaces = filteredRaces.filter(race => race.category === 'F1');
  } else if (activeTab === 'motogp') {
    filteredRaces = filteredRaces.filter(race => race.category === 'MotoGP');
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <Tabs 
        defaultValue="all" 
        className="mb-6"
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-gray-800">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="f1">Fórmula 1</TabsTrigger>
          <TabsTrigger value="motogp">MotoGP</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar carreras..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border border-gray-800">
        <Table>
          <TableHeader className="bg-gray-800">
            <TableRow>
              <TableHead className="text-gray-300">ID</TableHead>
              <TableHead className="text-gray-300">Nombre</TableHead>
              <TableHead className="text-gray-300">Circuito</TableHead>
              <TableHead className="text-gray-300">Categoría</TableHead>
              <TableHead className="text-gray-300">Fecha</TableHead>
              <TableHead className="text-gray-300">Estado</TableHead>
              <TableHead className="text-gray-300 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRaces.map((race) => (
              <TableRow key={race.id} className="border-gray-800">
                <TableCell className="text-gray-300">{race.id}</TableCell>
                <TableCell className="font-medium text-white">{race.name}</TableCell>
                <TableCell className="text-gray-300">{race.circuit}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${race.category === 'F1' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-racing-red/20 text-racing-red'}`}>
                    {race.category}
                  </span>
                </TableCell>
                <TableCell className="text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    {race.date}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${race.status === 'Completado' ? 'bg-green-500/20 text-green-400' : 
                      'bg-yellow-500/20 text-yellow-400'}`}>
                    {race.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    onClick={() => onEditRace && onEditRace(race)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => onDeleteRace && onDeleteRace(race.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RaceTable;
