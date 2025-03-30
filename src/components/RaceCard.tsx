
import { Calendar, Clock, Map } from 'lucide-react';

interface RaceCardProps {
  name: string;
  circuit: string;
  location: string;
  date: string;
  time: string;
  imageUrl: string;
  isUpcoming?: boolean;
  isPredicted?: boolean;
}

const RaceCard = ({ 
  name, 
  circuit, 
  location, 
  date, 
  time, 
  imageUrl, 
  isUpcoming = false,
  isPredicted = false
}: RaceCardProps) => {
  return (
    <div className="card-racing h-full flex flex-col group">
      <div className="relative overflow-hidden h-48">
        <img 
          src={imageUrl} 
          alt={`${circuit} circuit`} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-racing-black/70 to-transparent"></div>
        
        {isUpcoming && (
          <div className="absolute top-4 left-4 bg-racing-red text-white text-sm font-medium px-3 py-1 rounded-full">
            Upcoming
          </div>
        )}
        
        {isPredicted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full">
            Predicted
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-display text-xl">{name}</h3>
          <p className="text-white/90 text-sm">{circuit}</p>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-sm text-racing-gray mb-2">
          <Map size={16} />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-racing-gray mb-2">
          <Calendar size={16} />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-racing-gray">
          <Clock size={16} />
          <span>{time}</span>
        </div>
        
        <div className="mt-auto pt-4">
          <button className={`w-full py-2 px-4 rounded font-medium transition-colors ${isPredicted ? 'bg-gray-100 text-racing-dark hover:bg-gray-200' : 'bg-racing-red text-white hover:bg-opacity-90'}`}>
            {isPredicted ? 'View/Edit Prediction' : 'Make Prediction'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
