
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

interface Team {
  id: number;
  name: string;
  category: 'F1' | 'MotoGP';
  country: string;
  pilots: string;
  points: number;
}

interface TeamTableProps {
  teams: Team[];
  onEditTeam?: (team: Team) => void;
  onDeleteTeam?: (teamId: number) => void;
}

const TeamTable: React.FC<TeamTableProps> = ({ 
  teams, 
  onEditTeam, 
  onDeleteTeam 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  let filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    team.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (activeTab === 'f1') {
    filteredTeams = filteredTeams.filter(team => team.category === 'F1');
  } else if (activeTab === 'motogp') {
    filteredTeams = filteredTeams.filter(team => team.category === 'MotoGP');
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
            placeholder="Buscar equipos..."
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
              <TableHead className="text-gray-300">Categoría</TableHead>
              <TableHead className="text-gray-300">País</TableHead>
              <TableHead className="text-gray-300">Pilotos</TableHead>
              <TableHead className="text-gray-300">Puntos</TableHead>
              <TableHead className="text-gray-300 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow key={team.id} className="border-gray-800">
                <TableCell className="font-medium text-white">{team.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${team.category === 'F1' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-racing-red/20 text-racing-red'}`}>
                    {team.category}
                  </span>
                </TableCell>
                <TableCell className="text-gray-300">{team.country}</TableCell>
                <TableCell className="text-gray-300">{team.pilots}</TableCell>
                <TableCell className="font-medium text-white">{team.points}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    onClick={() => onEditTeam && onEditTeam(team)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => onDeleteTeam && onDeleteTeam(team.id)}
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

export default TeamTable;
