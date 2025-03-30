
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import ImportExportData from '@/components/admin/ImportExportData';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created: string;
}

interface UserHeaderProps {
  users: User[];
  onImportSuccess: (data: any[]) => void;
  onAddNewUser: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  users,
  onImportSuccess,
  onAddNewUser
}) => {
  // Exportar mapping function
  const exportMapping = (user: User) => ({
    id: user.id,
    nombre: user.name,
    email: user.email,
    rol: user.role,
    estado: user.status,
    fecha_registro: user.created
  });

  // Expected headers for import
  const expectedImportHeaders = ['id', 'nombre', 'email', 'rol', 'estado', 'fecha_registro'];

  // Export headers
  const exportHeaders = ['id', 'nombre', 'email', 'rol', 'estado', 'fecha_registro'];

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
      <div className="flex gap-2">
        <ImportExportData
          data={users}
          exportHeaders={exportHeaders}
          exportMapping={exportMapping}
          expectedImportHeaders={expectedImportHeaders}
          onImportSuccess={onImportSuccess}
          exportFileName="usuarios"
          entityName="usuarios"
        />
        
        <Button 
          className="bg-racing-red hover:bg-racing-red/90"
          onClick={onAddNewUser}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
