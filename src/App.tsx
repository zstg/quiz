import React, { useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { Question } from './components/Question';
import { ProgressBar } from './components/ProgressBar';
import { Results } from './components/Results';
import { Character } from './components/Character';
import { questions } from './data/questions';
import { UserResponse, Result } from './types';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const calculateResults = (): Result => {
    // Calculate average scores for each trait type
    const totalScores = responses.reduce((acc, response) => {
      const question = questions.find(q => q.id === response.questionId);
      if (!question) return acc;
      
      // Distribute the score across all three traits with different weights
      if (question.type === 'personality') {
        acc.narcissism += response.selectedScore * 0.4;
        acc.machiavellianism += response.selectedScore * 0.3;
        acc.psychopathy += response.selectedScore * 0.3;
      } else { // aptitude
        acc.narcissism += response.selectedScore * 0.3;
        acc.machiavellianism += response.selectedScore * 0.4;
        acc.psychopathy += response.selectedScore * 0.3;
      }
      return acc;
    }, { narcissism: 0, machiavellianism: 0, psychopathy: 0 });

    // Calculate final scores (normalized to 0-100)
    const maxPossibleScore = questions.length * 5; // 5 is max score per question
    const darkTriad = {
      narcissism: Math.round((totalScores.narcissism / maxPossibleScore) * 100),
      machiavellianism: Math.round((totalScores.machiavellianism / maxPossibleScore) * 100),
      psychopathy: Math.round((totalScores.psychopathy / maxPossibleScore) * 100)
    };

    // Calculate deviation from average (50%)
    const deviation = {
      narcissism: darkTriad.narcissism - 50,
      machiavellianism: darkTriad.machiavellianism - 50,
      psychopathy: darkTriad.psychopathy - 50
    };

    return {
      darkTriad,
      deviation
    };
  };

  const handleAnswer = (score: number) => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1000);

    setResponses([
      ...responses,
      { questionId: questions[currentQuestion].id, selectedScore: score },
    ]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 relative overflow-hidden">
      {showSparkle && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-24 h-24 text-purple-400 animate-sparkle" />
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8 relative">
        {!showResults ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <Brain className="w-12 h-12 text-purple-400 animate-float" />
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-purple-600 rounded-full animate-ping" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                Dark Psychology: Shadow Test
              </h1>
              <p className="text-lg text-gray-300">
                Explore the depths of your psyche
              </p>
            </div>

            <div className="relative">
              <Character progress={(currentQuestion / questions.length) * 100} />
              
              <div className="bg-gray-800 rounded-2xl shadow-lg p-8 backdrop-blur-lg bg-opacity-90 
                          transform transition-all duration-500 hover:scale-[1.02]">
                <ProgressBar
                  current={currentQuestion + 1}
                  total={questions.length}
                />
                <Question
                  question={questions[currentQuestion]}
                  onAnswer={handleAnswer}
                />
              </div>
            </div>
          </div>
        ) : (
          <Results result={calculateResults()} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}

export default App;