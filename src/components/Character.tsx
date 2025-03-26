import React from 'react';

interface CharacterProps {
  progress: number;
}

export const Character: React.FC<CharacterProps> = ({ progress }) => {
  // Use different sprites based on progress to show character evolution
  const getCharacterSprite = () => {
    if (progress < 33) {
      return "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=200&h=200&q=80&fit=crop";
    } else if (progress < 66) {
      return "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=200&h=200&q=80&fit=crop";
    }
    return "https://images.unsplash.com/photo-1614883752066-0a3e4ee46de7?w=200&h=200&q=80&fit=crop";
  };

  return (
    <div className="absolute -left-28 top-1/2 transform -translate-y-1/2">
      <div className="relative w-48 h-48">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900 
                    px-4 py-2 rounded-full shadow-lg border-2 border-purple-900 z-10
                    animate-bounce-slow">
          <span className="text-purple-400 font-bold">Shadow Level {Math.floor(progress / 20) + 1}</span>
        </div>
        <img
          src={getCharacterSprite()}
          alt="Dark character"
          className="w-full h-full object-cover rounded-full border-4 border-purple-900 shadow-xl
                   animate-float transform hover:scale-110 transition-transform duration-300
                   filter contrast-125 brightness-75"
        />
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-2 
                    bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-900 to-pink-900 rounded-full
                     transition-all duration-1000 ease-out-expo animate-pulse"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute -right-2 top-0 animate-spin-slow">
          <div className="w-8 h-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-purple-600 rounded-full"
                style={{
                  transform: `rotate(${i * 72}deg) translateY(-12px)`,
                  animation: `twinkle ${1 + i * 0.2}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};