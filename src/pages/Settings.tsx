
import { useState } from "react";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import { Eye, EyeOff, Save, Trash2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

// Componente principal
const Settings = () => {
  const location = useLocation();
  
  return (
    <div className="w-full pt-28 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6"><span className="text-racing-red">Configuración</span> de cuenta</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="flex overflow-x-auto bg-black border border-gray-800 rounded-lg">
            <NavLink 
              to="/settings" 
              end
              className={({ isActive }) => 
                `px-6 py-3 whitespace-nowrap text-center ${
                  isActive ? "bg-black text-white font-medium" : "text-gray-400 hover:bg-gray-900"
                }`
              }
            >
              Perfil
            </NavLink>
            <NavLink 
              to="/settings/security" 
              className={({ isActive }) => 
                `px-6 py-3 whitespace-nowrap text-center ${
                  isActive ? "bg-black text-white font-medium" : "text-gray-400 hover:bg-gray-900"
                }`
              }
            >
              Seguridad
            </NavLink>
            <NavLink 
              to="/settings/notifications" 
              className={({ isActive }) => 
                `px-6 py-3 whitespace-nowrap text-center ${
                  isActive ? "bg-black text-white font-medium" : "text-gray-400 hover:bg-gray-900"
                }`
              }
            >
              Notificaciones
            </NavLink>
            <NavLink 
              to="/settings/privacy" 
              className={({ isActive }) => 
                `px-6 py-3 whitespace-nowrap text-center ${
                  isActive ? "bg-black text-white font-medium" : "text-gray-400 hover:bg-gray-900"
                }`
              }
            >
              Privacidad
            </NavLink>
          </div>
          
          <Routes>
            <Route path="/" element={<ProfileSettings />} />
            <Route path="/security" element={<SecuritySettings />} />
            <Route path="/notifications" element={<NotificationsSettings />} />
            <Route path="/privacy" element={<PrivacySettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Pestaña de Perfil
const ProfileSettings = () => {
  const form = useForm({
    defaultValues: {
      nombre: "Raúl",
      apellido: "García Gimenez",
      fechaNacimiento: "08/01/1978",
      pais: "España"
    }
  });
  
  const onSubmit = (data: any) => {
    console.log(data);
    // Implementación futura para guardar cambios
  };
  
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Información Personal</h2>
      <p className="text-gray-400 text-sm mb-6">Actualiza tus datos personales</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fechaNacimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <p className="text-xs text-gray-400 mt-1">Formato: DD/MM/AAAA (ej: 01/01/1990)</p>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un país" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="España">España</SelectItem>
                      <SelectItem value="Argentina">Argentina</SelectItem>
                      <SelectItem value="México">México</SelectItem>
                      <SelectItem value="Colombia">Colombia</SelectItem>
                      <SelectItem value="Chile">Chile</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="bg-racing-red hover:bg-racing-red/90 w-full">
            <Save size={18} className="mr-2" /> Guardar cambios
          </Button>
        </form>
      </Form>
    </div>
  );
};

// Pestaña de Seguridad
const SecuritySettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm({
    defaultValues: {
      passwordActual: "",
      passwordNuevo: "",
      passwordConfirmar: ""
    }
  });
  
  const onSubmit = (data: any) => {
    console.log(data);
    // Implementación futura para cambiar contraseña
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Cambiar Contraseña</h2>
        <p className="text-gray-400 text-sm mb-6">Actualiza tu contraseña de acceso</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="passwordActual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="********" 
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="passwordNuevo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showNewPassword ? "text" : "password"} 
                        placeholder="********" 
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="passwordConfirmar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nueva contraseña</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="********" 
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-racing-red hover:bg-racing-red/90">
              Cambiar contraseña
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Eliminar cuenta</h2>
        <p className="text-gray-400 text-sm mb-6">Al eliminar tu cuenta, se eliminarán permanentemente todos tus datos. Esta acción no se puede deshacer.</p>
        
        <Button variant="destructive" className="flex items-center">
          <Trash2 size={18} className="mr-2" /> Eliminar mi cuenta
        </Button>
      </div>
    </div>
  );
};

// Pestaña de Notificaciones (placeholder simple)
const NotificationsSettings = () => {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Preferencias de Notificaciones</h2>
      <p className="text-gray-400 text-center py-10">
        Las opciones de notificaciones estarán disponibles próximamente.
      </p>
    </div>
  );
};

// Pestaña de Privacidad (placeholder simple)
const PrivacySettings = () => {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Ajustes de Privacidad</h2>
      <p className="text-gray-400 text-center py-10">
        Las opciones de privacidad estarán disponibles próximamente.
      </p>
    </div>
  );
};

export default Settings;
