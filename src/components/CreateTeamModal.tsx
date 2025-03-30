
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Car, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Datos temporales para los pilotos
const F1Pilots = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing", number: "1", points: 380, value: 300 },
  { id: 2, name: "Lewis Hamilton", team: "Mercedes", number: "44", points: 280, value: 250 },
  { id: 3, name: "Charles Leclerc", team: "Ferrari", number: "16", points: 270, value: 240 },
  { id: 4, name: "Lando Norris", team: "McLaren", number: "4", points: 260, value: 230 },
  { id: 5, name: "Carlos Sainz", team: "Ferrari", number: "55", points: 250, value: 220 },
  { id: 6, name: "George Russell", team: "Mercedes", number: "63", points: 240, value: 210 },
  { id: 7, name: "Sergio Pérez", team: "Red Bull Racing", number: "11", points: 230, value: 200 },
  { id: 8, name: "Fernando Alonso", team: "Aston Martin", number: "14", points: 220, value: 190 },
  { id: 9, name: "Esteban Ocon", team: "Alpine", number: "31", points: 210, value: 180 },
  { id: 10, name: "Pierre Gasly", team: "Alpine", number: "10", points: 200, value: 170 },
  { id: 11, name: "Oscar Piastri", team: "McLaren", number: "81", points: 190, value: 160 },
  { id: 12, name: "Lance Stroll", team: "Aston Martin", number: "18", points: 180, value: 150 },
];

const MotoGPPilots = [
  { id: 1, name: "Francesco Bagnaia", team: "Ducati Lenovo", number: "1", points: 370, value: 280 },
  { id: 2, name: "Jorge Martín", team: "Prima Pramac", number: "89", points: 350, value: 270 },
  { id: 3, name: "Marc Márquez", team: "Gresini Racing", number: "93", points: 340, value: 260 },
  { id: 4, name: "Fabio Quartararo", team: "Monster Energy Yamaha", number: "20", points: 320, value: 240 },
  { id: 5, name: "Enea Bastianini", team: "Ducati Lenovo", number: "23", points: 300, value: 230 },
  { id: 6, name: "Maverick Viñales", team: "Aprilia Racing", number: "12", points: 290, value: 220 },
  { id: 7, name: "Aleix Espargaró", team: "Aprilia Racing", number: "41", points: 280, value: 210 },
  { id: 8, name: "Johann Zarco", team: "LCR Honda", number: "5", points: 270, value: 200 },
  { id: 9, name: "Franco Morbidelli", team: "Prima Pramac", number: "21", points: 260, value: 190 },
  { id: 10, name: "Álex Rins", team: "Monster Energy Yamaha", number: "42", points: 250, value: 180 },
  { id: 11, name: "Raúl Fernández", team: "Trackhouse Racing", number: "25", points: 240, value: 170 },
  { id: 12, name: "Miguel Oliveira", team: "Trackhouse Racing", number: "88", points: 230, value: 160 },
];

const BUDGET_LIMIT = 1400;

// Esquema de validación
const formSchema = z.object({
  teamName: z.string().min(3, {
    message: "El nombre del equipo debe tener al menos 3 caracteres.",
  }),
  f1Pilots: z.array(z.number()).refine((value) => value.length === 7, {
    message: "Debes seleccionar exactamente 7 pilotos de F1.",
  }),
  motogpPilots: z.array(z.number()).refine((value) => value.length === 7, {
    message: "Debes seleccionar exactamente 7 pilotos de MotoGP.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTeamModal = ({ open, onOpenChange }: CreateTeamModalProps) => {
  const [step, setStep] = useState<'name' | 'f1' | 'motogp' | 'review'>('name');
  const [currentBudgetF1, setCurrentBudgetF1] = useState(0);
  const [currentBudgetMotoGP, setCurrentBudgetMotoGP] = useState(0);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      f1Pilots: [],
      motogpPilots: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "¡Equipo creado con éxito!",
      description: `Has creado el equipo ${data.teamName}`,
    });
    onOpenChange(false);
    form.reset();
    setStep('name');
    setCurrentBudgetF1(0);
    setCurrentBudgetMotoGP(0);
  };

  const handlePilotSelection = (pilotId: number, category: 'f1' | 'motogp') => {
    const fieldName = category === 'f1' ? 'f1Pilots' : 'motogpPilots';
    const currentSelection = form.getValues(fieldName);
    const pilotsList = category === 'f1' ? F1Pilots : MotoGPPilots;
    
    if (currentSelection.includes(pilotId)) {
      // Remover piloto
      const newSelection = currentSelection.filter(id => id !== pilotId);
      form.setValue(fieldName, newSelection);
      
      // Actualizar presupuesto
      const pilot = pilotsList.find(p => p.id === pilotId);
      if (pilot) {
        if (category === 'f1') {
          setCurrentBudgetF1(prev => prev - pilot.value);
        } else {
          setCurrentBudgetMotoGP(prev => prev - pilot.value);
        }
      }
    } else {
      // Verificar si ya tiene 7 pilotos seleccionados
      if (currentSelection.length >= 7) {
        toast({
          title: "No puedes seleccionar más de 7 pilotos",
          description: "Deselecciona algún piloto antes de añadir uno nuevo.",
          variant: "destructive"
        });
        return;
      }
      
      // Añadir piloto
      const pilot = pilotsList.find(p => p.id === pilotId);
      if (pilot) {
        // Verificar presupuesto
        const newBudget = category === 'f1' 
          ? currentBudgetF1 + pilot.value 
          : currentBudgetMotoGP + pilot.value;
        
        if (newBudget > BUDGET_LIMIT) {
          toast({
            title: "Presupuesto excedido",
            description: `El presupuesto máximo es de ${BUDGET_LIMIT} puntos.`,
            variant: "destructive"
          });
          return;
        }
        
        // Actualizar presupuesto
        if (category === 'f1') {
          setCurrentBudgetF1(newBudget);
        } else {
          setCurrentBudgetMotoGP(newBudget);
        }
        
        form.setValue(fieldName, [...currentSelection, pilotId]);
      }
    }
  };

  const nextStep = () => {
    if (step === 'name') {
      // Validar nombre del equipo
      const teamName = form.getValues('teamName');
      if (!teamName || teamName.length < 3) {
        form.setError('teamName', { 
          type: 'manual', 
          message: 'El nombre del equipo debe tener al menos 3 caracteres.' 
        });
        return;
      }
      setStep('f1');
    } else if (step === 'f1') {
      // Validar selección de pilotos F1
      const f1Pilots = form.getValues('f1Pilots');
      if (f1Pilots.length !== 7) {
        toast({
          title: "Selección incompleta",
          description: "Debes seleccionar exactamente 7 pilotos de F1.",
          variant: "destructive"
        });
        return;
      }
      setStep('motogp');
    } else if (step === 'motogp') {
      // Validar selección de pilotos MotoGP
      const motogpPilots = form.getValues('motogpPilots');
      if (motogpPilots.length !== 7) {
        toast({
          title: "Selección incompleta",
          description: "Debes seleccionar exactamente 7 pilotos de MotoGP.",
          variant: "destructive"
        });
        return;
      }
      setStep('review');
    }
  };

  const prevStep = () => {
    if (step === 'f1') setStep('name');
    else if (step === 'motogp') setStep('f1');
    else if (step === 'review') setStep('motogp');
  };

  // Obtener los pilotos seleccionados para la revisión
  const getSelectedPilots = (category: 'f1' | 'motogp') => {
    const ids = form.getValues(category === 'f1' ? 'f1Pilots' : 'motogpPilots');
    const pilotsList = category === 'f1' ? F1Pilots : MotoGPPilots;
    return ids.map(id => pilotsList.find(p => p.id === id)).filter(Boolean);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crear Nuevo Equipo</DialogTitle>
          <DialogDescription className="text-gray-400">
            Sigue los pasos para crear tu equipo para la Super Porra Motor
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 'name' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Paso 1: Nombre del equipo</h3>
                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del equipo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Introduce el nombre de tu equipo" 
                          className="bg-gray-800 border-gray-700" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 'f1' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Paso 2: Selecciona 7 pilotos de Fórmula 1</h3>
                  <div className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                    Presupuesto: <span className={currentBudgetF1 > BUDGET_LIMIT ? "text-red-500" : "text-green-500"}>
                      {currentBudgetF1}/{BUDGET_LIMIT}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {F1Pilots.map((pilot) => {
                    const isSelected = form.getValues('f1Pilots').includes(pilot.id);
                    return (
                      <Card 
                        key={pilot.id} 
                        className={`cursor-pointer transition-all ${
                          isSelected 
                            ? "border-blue-500 bg-blue-500/10" 
                            : "bg-gray-800 border-gray-700 hover:border-gray-600"
                        }`}
                        onClick={() => handlePilotSelection(pilot.id, 'f1')}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-blue-500" : "bg-gray-700"
                          }`}>
                            {isSelected && <Check className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{pilot.name}</p>
                            <p className="text-sm text-gray-400">{pilot.team}</p>
                          </div>
                          <div className="bg-gray-900 px-2 py-1 rounded text-sm">
                            {pilot.value} pts
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <div className="text-sm text-gray-400">
                  Pilotos seleccionados: {form.getValues('f1Pilots').length}/7
                </div>
              </div>
            )}

            {step === 'motogp' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Paso 3: Selecciona 7 pilotos de MotoGP</h3>
                  <div className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                    Presupuesto: <span className={currentBudgetMotoGP > BUDGET_LIMIT ? "text-red-500" : "text-green-500"}>
                      {currentBudgetMotoGP}/{BUDGET_LIMIT}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {MotoGPPilots.map((pilot) => {
                    const isSelected = form.getValues('motogpPilots').includes(pilot.id);
                    return (
                      <Card 
                        key={pilot.id} 
                        className={`cursor-pointer transition-all ${
                          isSelected 
                            ? "border-racing-red bg-racing-red/10" 
                            : "bg-gray-800 border-gray-700 hover:border-gray-600"
                        }`}
                        onClick={() => handlePilotSelection(pilot.id, 'motogp')}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-racing-red" : "bg-gray-700"
                          }`}>
                            {isSelected && <Check className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{pilot.name}</p>
                            <p className="text-sm text-gray-400">{pilot.team}</p>
                          </div>
                          <div className="bg-gray-900 px-2 py-1 rounded text-sm">
                            {pilot.value} pts
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <div className="text-sm text-gray-400">
                  Pilotos seleccionados: {form.getValues('motogpPilots').length}/7
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Revisa tu equipo</h3>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-lg mb-3">
                    {form.getValues('teamName')}
                  </h4>
                  
                  <Tabs defaultValue="f1">
                    <TabsList className="bg-gray-900 mb-4">
                      <TabsTrigger value="f1" className="data-[state=active]:bg-blue-500">
                        <Car className="mr-2 h-4 w-4" />
                        Fórmula 1
                      </TabsTrigger>
                      <TabsTrigger value="motogp" className="data-[state=active]:bg-racing-red">
                        <Trophy className="mr-2 h-4 w-4" />
                        MotoGP
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="f1" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Pilotos de F1</h5>
                        <div className="text-sm bg-gray-900 px-3 py-1 rounded-full">
                          Valor total: <span className="text-blue-400">{currentBudgetF1} pts</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {getSelectedPilots('f1').map((pilot) => (
                          <div key={pilot?.id} className="bg-gray-900 p-2 rounded-md flex justify-between items-center">
                            <div>
                              <span className="font-medium">{pilot?.name}</span>
                              <span className="ml-2 text-sm text-gray-400">({pilot?.team})</span>
                            </div>
                            <span className="text-sm">{pilot?.value} pts</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="motogp" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Pilotos de MotoGP</h5>
                        <div className="text-sm bg-gray-900 px-3 py-1 rounded-full">
                          Valor total: <span className="text-racing-red">{currentBudgetMotoGP} pts</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {getSelectedPilots('motogp').map((pilot) => (
                          <div key={pilot?.id} className="bg-gray-900 p-2 rounded-md flex justify-between items-center">
                            <div>
                              <span className="font-medium">{pilot?.name}</span>
                              <span className="ml-2 text-sm text-gray-400">({pilot?.team})</span>
                            </div>
                            <span className="text-sm">{pilot?.value} pts</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-between">
              {step !== 'name' && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="border-gray-700 bg-transparent text-white hover:bg-gray-800"
                >
                  Anterior
                </Button>
              )}
              
              <div className="ml-auto">
                {step !== 'review' ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="bg-racing-red hover:bg-racing-red/90"
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Crear equipo
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamModal;
