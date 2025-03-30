
import React, { useState } from 'react';
import { Search, Edit, Trash2 } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Pilot {
  id: number;
  name: string;
  number: string;
  team: string;
  category: 'F1' | 'MotoGP';
  nationality: string;
  points: number;
}

interface PilotTableProps {
  pilots: Pilot[];
  onEditPilot?: (pilot: Pilot) => void;
  onDeletePilot?: (pilotId: number) => void;
}

const PilotTable: React.FC<PilotTableProps> = ({ 
  pilots, 
  onEditPilot, 
  onDeletePilot 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  let filteredPilots = pilots.filter(pilot => 
    pilot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pilot.team.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (activeTab === 'f1') {
    filteredPilots = filteredPilots.filter(pilot => pilot.category === 'F1');
  } else if (activeTab === 'motogp') {
    filteredPilots = filteredPilots.filter(pilot => pilot.category === 'MotoGP');
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <Tabs 
        defaultValue="all" 
        className="mb-6"
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-gray-800">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="f1">Fórmula 1</TabsTrigger>
          <TabsTrigger value="motogp">MotoGP</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar pilotos..."
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
              <TableHead className="text-gray-300">Nombre</TableHead>
              <TableHead className="text-gray-300">Número</TableHead>
              <TableHead className="text-gray-300">Equipo</TableHead>
              <TableHead className="text-gray-300">Categoría</TableHead>
              <TableHead className="text-gray-300">Nacionalidad</TableHead>
              <TableHead className="text-gray-300">Puntos</TableHead>
              <TableHead className="text-gray-300 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPilots.map((pilot) => (
              <TableRow key={pilot.id} className="border-gray-800">
                <TableCell className="font-medium text-white">{pilot.name}</TableCell>
                <TableCell className="text-gray-300">
                  <span className="px-2 py-1 bg-gray-800 rounded font-mono">{pilot.number}</span>
                </TableCell>
                <TableCell className="text-gray-300">{pilot.team}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${pilot.category === 'F1' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-racing-red/20 text-racing-red'}`}>
                    {pilot.category}
                  </span>
                </TableCell>
                <TableCell className="text-gray-300">{pilot.nationality}</TableCell>
                <TableCell className="font-medium text-white">{pilot.points}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    onClick={() => onEditPilot && onEditPilot(pilot)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => onDeletePilot && onDeletePilot(pilot.id)}
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

export default PilotTable;
