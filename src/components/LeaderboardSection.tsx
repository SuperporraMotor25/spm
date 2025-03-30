
import { Trophy, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const leaderboardData = [
  { position: 1, name: "Alex Márquez", points: 245, change: "up" },
  { position: 2, name: "Carlos Sainz", points: 224, change: "same" },
  { position: 3, name: "Lando Norris", points: 196, change: "up" },
  { position: 4, name: "Fernando Alonso", points: 187, change: "down" },
  { position: 5, name: "Max Verstappen", points: 174, change: "down" },
];

const LeaderboardSection = () => {
  return (
    <section className="py-16 md:py-24 bg-racing-silver">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="section-title mb-3">Current Standings</h2>
            <p className="text-racing-gray max-w-2xl">
              See who's leading the championship and how your predictions are performing against the competition.
            </p>
          </div>
          <Link to="/standings" className="group flex items-center gap-2 text-racing-red font-medium mt-4 md:mt-0 hover:underline">
            View Full Leaderboard
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
        
        <div className="glass-panel rounded-xl overflow-hidden shadow-lg animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-racing-dark text-white">
                  <th className="py-4 px-6 text-left">Position</th>
                  <th className="py-4 px-6 text-left">Name</th>
                  <th className="py-4 px-6 text-center">Points</th>
                  <th className="py-4 px-6 text-center">Movement</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr 
                    key={index} 
                    className={`
                      border-b border-gray-200 
                      ${index === 0 ? 'bg-racing-red/5' : ''}
                      hover:bg-racing-silver/50 transition-colors
                    `}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <Trophy className="text-yellow-500" size={20} />
                        )}
                        <span className={`font-medium ${index === 0 ? 'text-racing-red' : 'text-racing-dark'}`}>
                          {entry.position}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium">{entry.name}</td>
                    <td className="py-4 px-6 text-center">{entry.points}</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        {entry.change === 'up' && (
                          <div className="flex items-center gap-1 text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v1zm-1 4a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                              <path d="M5 4a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5z" />
                              <path fillRule="evenodd" d="M15 4a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                            </svg>
                            <span>Up</span>
                          </div>
                        )}
                        {entry.change === 'down' && (
                          <div className="flex items-center gap-1 text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 13a1 1 0 01-1 1H9a1 1 0 01-1-1v-1a1 1 0 011-1h2a1 1 0 011 1v1z" clipRule="evenodd" />
                              <path d="M5 16a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1H6a1 1 0 00-1 1v1z" />
                              <path fillRule="evenodd" d="M15 16a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2a1 1 0 00-1 1v1z" clipRule="evenodd" />
                            </svg>
                            <span>Down</span>
                          </div>
                        )}
                        {entry.change === 'same' && (
                          <div className="flex items-center gap-1 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>Same</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
