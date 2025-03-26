import React, { useState } from 'react';
import { Result } from '../types';
import { BarChart, Activity, Star, Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import { DarkTriadGraph } from './DarkTriadGraph';
import { historicalFigures } from '../data/historical-figures';

interface ResultsProps {
  result: Result;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const calculateSimilarity = (userTraits: Result['darkTriad'], figureTraits: typeof historicalFigures[0]['traits']) => {
    const diff = Math.abs(userTraits.narcissism - figureTraits.narcissism) +
                Math.abs(userTraits.machiavellianism - figureTraits.machiavellianism) +
                Math.abs(userTraits.psychopathy - figureTraits.psychopathy);
    return Math.max(0, 100 - (diff / 3));
  };

  const similarities = historicalFigures.map(figure => ({
    ...figure,
    similarity: calculateSimilarity(result.darkTriad, figure.traits)
  })).sort((a, b) => b.similarity - a.similarity);

  const pages = [
    {
      title: "Overall Dark Triad Analysis",
      trait: "overall",
      description: "Your complete psychological profile across all dimensions",
      icon: Star,
    },
    {
      title: "Narcissism Analysis",
      trait: "narcissism",
      description: "Your tendency towards self-importance and grandiosity",
      icon: Trophy,
    },
    {
      title: "Machiavellianism Analysis",
      trait: "machiavellianism",
      description: "Your strategic and manipulative tendencies",
      icon: BarChart,
    },
    {
      title: "Psychopathy Analysis",
      trait: "psychopathy",
      description: "Your emotional detachment and impulsivity levels",
      icon: Activity,
    },
  ];

  const currentPageData = pages[currentPage];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 backdrop-blur-lg bg-opacity-90
                    transform hover:scale-[1.01] transition-transform duration-500">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`p-2 rounded-full ${currentPage === 0 ? 'text-gray-600' : 'text-purple-400 hover:bg-purple-900 hover:bg-opacity-20'}`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center flex-grow">
            {React.createElement(currentPageData.icon, { 
              className: "w-12 h-12 text-purple-400 animate-bounce-slow mr-3" 
            })}
            <h2 className="text-3xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-purple-400 to-pink-400">
              {currentPageData.title}
            </h2>
          </div>

          <button 
            onClick={() => setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1))}
            disabled={currentPage === pages.length - 1}
            className={`p-2 rounded-full ${currentPage === pages.length - 1 ? 'text-gray-600' : 'text-purple-400 hover:bg-purple-900 hover:bg-opacity-20'}`}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-300 text-center mb-8">
          {currentPageData.description}
        </p>

        <div className="min-h-[800px] flex flex-col items-center justify-center">
          {currentPage === 0 ? (
            <DarkTriadGraph 
              trait="overall"
              score={0} // Not used for overall view
              deviation={0} // Not used for overall view
              similarities={similarities}
              allScores={result.darkTriad}
            />
          ) : (
            <DarkTriadGraph 
              trait={currentPageData.trait}
              score={result.darkTriad[currentPageData.trait as keyof typeof result.darkTriad]}
              deviation={result.deviation[currentPageData.trait as keyof typeof result.deviation]}
              similarities={similarities}
              allScores={result.darkTriad}
            />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index 
                    ? 'bg-purple-400 w-6' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600
                     text-white rounded-lg font-medium transform hover:scale-105 hover:shadow-xl
                     transition-all duration-300 ease-out"
          >
            Explore Deeper
          </button>
        </div>
      </div>
    </div>
  );
};