import React from 'react';
import { Question as QuestionType } from '../types';
import { Star, Heart, Zap, Sparkles, Crown } from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (score: number) => void;
}

const icons = [Star, Heart, Zap, Sparkles, Crown];

export const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-100 rounded-full animate-spin-slow opacity-50" />
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-100 rounded-full animate-bounce opacity-50" />
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r 
                     from-purple-400 to-pink-400 p-4 rounded-xl relative z-10
                     animate-float">
          {question.text}
        </h2>
      </div>
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const Icon = icons[index % icons.length];
          return (
            <button
              key={index}
              onClick={() => onAnswer(option.score)}
              className="w-full p-6 text-left rounded-2xl border-2 border-transparent 
                       bg-gradient-to-r from-purple-50 to-pink-50
                       hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 
                       hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                       ease-out relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 
                           opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="flex items-center space-x-4">
                <Icon className="w-6 h-6 text-purple-400 group-hover:text-purple-500 
                             transition-colors duration-300 animate-bounce-slow" />
                <span className="text-gray-700 font-medium text-lg group-hover:text-gray-900 
                             transition-colors duration-300">
                  {option.text}
                </span>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-300 to-pink-300 
                             rounded-full animate-pulse" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};