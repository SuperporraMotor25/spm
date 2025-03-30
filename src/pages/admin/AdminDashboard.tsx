
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Flag, Car, CalendarDays } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-racing-red" />
              Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,248</p>
            <p className="text-sm text-gray-400 mt-1">Total de usuarios registrados</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Flag className="mr-2 h-5 w-5 text-racing-red" />
              Carreras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-gray-400 mt-1">Carreras programadas</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-racing-red" />
              Pilotos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">68</p>
            <p className="text-sm text-gray-400 mt-1">Pilotos activos</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Car className="mr-2 h-5 w-5 text-racing-red" />
              Equipos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">20</p>
            <p className="text-sm text-gray-400 mt-1">Equipos registrados</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-racing-red mr-3"></div>
                <div>
                  <p className="font-medium">Actualización de resultados - GP de España</p>
                  <p className="text-sm text-gray-400">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-racing-red mr-3"></div>
                <div>
                  <p className="font-medium">Nuevo usuario registrado</p>
                  <p className="text-sm text-gray-400">Hace 3 horas</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-racing-red mr-3"></div>
                <div>
                  <p className="font-medium">Actualización de clasificación general</p>
                  <p className="text-sm text-gray-400">Hace 5 horas</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-racing-red mr-3"></div>
                <div>
                  <p className="font-medium">Cambio de equipo - Piloto Carlos Sainz</p>
                  <p className="text-sm text-gray-400">Hace 1 día</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
