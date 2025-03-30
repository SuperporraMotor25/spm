
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-lg">
        <div className="glass-panel rounded-xl p-12 animate-fade-in">
          <h1 className="text-8xl font-display text-racing-red mb-4">404</h1>
          <h2 className="text-2xl font-medium text-racing-dark mb-6">Page Not Found</h2>
          <p className="text-racing-gray mb-8">
            The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the home page.
          </p>
          <Link to="/" className="btn-racing inline-flex items-center gap-2 group">
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
