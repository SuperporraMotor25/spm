
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  interface AuthResponse {
    message: string;
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
    };
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/login.php', data);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      if (rememberMe) {
        localStorage.setItem('email', data.email);
      }

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo!",
      });

      navigate('/profile');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: error.response?.data?.error || "Error al intentar iniciar sesión",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-10 flex flex-col items-center">
      <div className="max-w-md w-full px-6 md:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium mb-2">Iniciar Sesión</h1>
          <p className="text-gray-400">Ingresa tus credenciales para acceder</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
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
                </FormItem>
              )}
            />

            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Recordarme
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-racing-red hover:bg-racing-red/90"
              disabled={isLoading}
            >
              <LogIn size={18} className="mr-2" />
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>

            <div className="space-y-2 text-center text-sm">
              <p>¿No tienes una cuenta? <Link to="/register" className="text-racing-red hover:underline">Regístrate</Link></p>
              <p><a href="#" className="text-racing-red/90 hover:text-racing-red hover:underline">¿Olvidaste tu contraseña?</a></p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
