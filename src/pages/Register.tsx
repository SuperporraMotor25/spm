
import { useState } from "react";
import { Calendar, Eye, EyeOff, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      country: ""
    }
  });

  const onSubmit = async (data: any) => {
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('https://2025.superporramotor.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password
        })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setSuccess('Registro exitoso. Redirigiendo...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(result.error || 'Error en el registro');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-10 flex flex-col items-center">
      <div className="max-w-2xl w-full px-6 md:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium mb-2">Crear una cuenta</h1>
          <p className="text-gray-400">Ingresa tus datos para registrarte en Super Porra Motor</p>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-500">
              {success}
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Apellido(s)</FormLabel>
                    <FormControl>
                      <Input placeholder="Tus apellidos" {...field} />
                    </FormControl>
                    <p className="text-xs text-gray-500">Introduce todos tus apellidos</p>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@ejemplo.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Contraseña</FormLabel>
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
                    <p className="text-xs text-gray-500">Mínimo 8 caracteres, incluyendo mayúsculas y números</p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Contraseña</FormLabel>
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
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="DD/MM/YYYY" 
                          {...field} 
                        />
                      </FormControl>
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    </div>
                    <p className="text-xs text-gray-500">Debes ser mayor de 18 años</p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 h-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="">Selecciona tu país</option>
                        <option value="ES">España</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CL">Chile</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <div>
                <label htmlFor="terms" className="text-sm font-medium leading-none cursor-pointer">
                  Términos y condiciones
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Al registrarte, aceptas nuestros{" "}
                  <a href="#" className="text-racing-red hover:underline">términos de servicio</a>{" "}
                  y{" "}
                  <a href="#" className="text-racing-red hover:underline">política de privacidad</a>.
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full bg-racing-red hover:bg-racing-red/90" disabled={!acceptTerms}>
              Crear Cuenta
            </Button>

            <div className="flex items-center gap-2 justify-center text-sm text-gray-400 mt-6">
              <Info size={16} />
              <p>Tu información se utilizará exclusivamente para la Super Porra Motor.</p>
            </div>

            <div className="text-center text-sm">
              <p>¿Ya tienes una cuenta? <Link to="/login" className="text-racing-red hover:underline">Iniciar Sesión</Link></p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
