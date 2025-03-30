
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import UserHeader from '@/components/admin/UserHeader';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created: string;
}

// Datos de ejemplo
const mockUsers = [
  { id: 1, name: 'Juan Pérez', email: 'juan@ejemplo.com', role: 'Usuario', status: 'Activo', created: '15/04/2024' },
  { id: 2, name: 'María López', email: 'maria@ejemplo.com', role: 'Administrador', status: 'Activo', created: '12/03/2024' },
  { id: 3, name: 'Carlos Rodríguez', email: 'carlos@ejemplo.com', role: 'Usuario', status: 'Inactivo', created: '20/02/2024' },
  { id: 4, name: 'Ana Martínez', email: 'ana@ejemplo.com', role: 'Usuario', status: 'Activo', created: '05/04/2024' },
  { id: 5, name: 'Pedro González', email: 'pedro@ejemplo.com', role: 'Moderador', status: 'Activo', created: '18/03/2024' },
  { id: 6, name: 'Laura Sánchez', email: 'laura@ejemplo.com', role: 'Usuario', status: 'Activo', created: '22/01/2024' },
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const { toast } = useToast();
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImportSuccess = (importedData: any[]) => {
    // Transformar los datos importados al formato de la aplicación
    const newUsers = importedData.map(item => ({
      id: parseInt(item.id),
      name: item.nombre,
      email: item.email,
      role: item.rol,
      status: item.estado,
      created: item.fecha_registro
    }));

    // Actualizar el estado con los nuevos datos
    setUsers(prevUsers => {
      // Filtrar los usuarios existentes para evitar duplicados
      const existingIds = new Set(prevUsers.map(user => user.id));
      const uniqueNewUsers = newUsers.filter(user => !existingIds.has(user.id));
      
      // Combinar los usuarios existentes con los nuevos
      return [...prevUsers, ...uniqueNewUsers];
    });
  };

  const handleAddNewUser = () => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: "La creación de nuevos usuarios estará disponible próximamente",
    });
  };

  const handleEditUser = (user: User) => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: `Edición de usuario: ${user.name}`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: `Eliminación de usuario con ID: ${userId}`,
    });
  };

  return (
    <div>
      <UserHeader 
        users={users}
        onImportSuccess={handleImportSuccess}
        onAddNewUser={handleAddNewUser}
      />
      
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar usuarios..."
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
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Rol</TableHead>
                <TableHead className="text-gray-300">Estado</TableHead>
                <TableHead className="text-gray-300">Fecha de Registro</TableHead>
                <TableHead className="text-gray-300 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-800">
                  <TableCell className="font-medium text-white">{user.name}</TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${user.role === 'Administrador' ? 'bg-racing-red/20 text-racing-red' : 
                        user.role === 'Moderador' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-green-500/20 text-green-400'}`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${user.status === 'Activo' ? 'bg-green-500/20 text-green-400' : 
                        'bg-red-500/20 text-red-400'}`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-300">{user.created}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-white"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                      onClick={() => handleDeleteUser(user.id)}
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
    </div>
  );
};

export default AdminUsers;
