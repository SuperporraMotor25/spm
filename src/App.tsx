
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Races from "./pages/Races";
import Standings from "./pages/Standings";
import Rules from "./pages/Rules";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import GeneralConditions from "./pages/GeneralConditions";
import Terms from "./pages/Terms";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRaces from "./pages/admin/AdminRaces";
import AdminPilots from "./pages/admin/AdminPilots";
import AdminTeams from "./pages/admin/AdminTeams";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/races" element={<Races />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/settings/*" element={<Settings />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/legal-notice" element={<LegalNotice />} />
                <Route path="/general-conditions" element={<GeneralConditions />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* Rutas del administrador */}
                <Route path="/admin" element={<Admin />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="races" element={<AdminRaces />} />
                  <Route path="pilots" element={<AdminPilots />} />
                  <Route path="teams" element={<AdminTeams />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
