
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-racing-red rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-racing-blue rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block px-3 py-1 text-sm font-medium text-racing-red bg-racing-red/10 rounded-full mb-6">
              Season 2025
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-racing-dark mb-6 leading-tight">
              Predict. Compete. <br />
              <span className="text-racing-red">Win the Championship.</span>
            </h1>
            <p className="text-lg text-racing-gray mb-8 max-w-xl">
              Join the most exciting motorsport prediction game. Test your knowledge, compete against friends, and climb the leaderboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/races" className="btn-racing flex items-center gap-2 group">
                View Upcoming Races
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/rules" className="btn-racing-outline">
                How to Play
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative animate-scale-in">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541356665065-27629ff9030a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Racing cars on track"
                className="w-full h-auto object-cover transition-transform hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-racing-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h3 className="text-lg font-display text-racing-red mb-1">Next Race:</h3>
                  <p className="text-racing-black font-medium">Bahrain Grand Prix - March 12</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-racing-gray">Submission Deadline:</p>
                    <p className="text-sm font-medium">48h 32m 12s</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-racing-red rounded-full mix-blend-multiply blur-2xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-racing-blue rounded-full mix-blend-multiply blur-2xl opacity-20 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="container mx-auto px-4 mt-16 md:mt-24">
        <div className="glass-panel rounded-xl p-6 md:p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-racing-gray mb-1 text-sm">Participants</p>
              <p className="text-3xl md:text-4xl font-display text-racing-dark">2,458</p>
            </div>
            <div className="text-center">
              <p className="text-racing-gray mb-1 text-sm">Predictions</p>
              <p className="text-3xl md:text-4xl font-display text-racing-dark">56,921</p>
            </div>
            <div className="text-center">
              <p className="text-racing-gray mb-1 text-sm">Races</p>
              <p className="text-3xl md:text-4xl font-display text-racing-dark">23</p>
            </div>
            <div className="text-center">
              <p className="text-racing-gray mb-1 text-sm">Prize Pool</p>
              <p className="text-3xl md:text-4xl font-display text-racing-red">€5,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
