import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { HistoricalFigure } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface DarkTriadGraphProps {
  trait: string;
  score: number;
  deviation: number;
  similarities: (HistoricalFigure & { similarity: number })[];
  allScores: {
    narcissism: number;
    machiavellianism: number;
    psychopathy: number;
  };
}

export const DarkTriadGraph: React.FC<DarkTriadGraphProps> = ({ 
  trait, 
  score, 
  deviation,
  similarities,
  allScores
}) => {
  const barData = {
    labels: ['You', ...similarities.slice(0, 5).map(f => f.name)],
    datasets: [
      {
        label: trait.charAt(0).toUpperCase() + trait.slice(1),
        data: [score, ...similarities.slice(0, 5).map(f => f.traits[trait as keyof typeof f.traits])],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          ...similarities.slice(0, 5).map(() => 'rgba(75, 85, 99, 0.5)')
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          ...similarities.slice(0, 5).map(() => 'rgba(75, 85, 99, 1)')
        ],
        borderWidth: 2,
      },
    ],
  };

  const radarData = {
    labels: ['Narcissism', 'Machiavellianism', 'Psychopathy'],
    datasets: [
      {
        label: 'You',
        data: [allScores.narcissism, allScores.machiavellianism, allScores.psychopathy],
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(147, 51, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
      },
      ...similarities.slice(0, 1).map(figure => ({
        label: figure.name,
        data: [
          figure.traits.narcissism,
          figure.traits.machiavellianism,
          figure.traits.psychopathy
        ],
        backgroundColor: 'rgba(75, 85, 99, 0.2)',
        borderColor: 'rgba(75, 85, 99, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 85, 99, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 85, 99, 1)',
      }))
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `${trait}: ${value}%`;
          },
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          backdropColor: 'transparent',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  return (
    <div className="w-full space-y-8">
      <div className="h-[400px]">
        <Bar data={barData} options={barOptions} />
      </div>
      <div className="h-[400px]">
        <Radar data={radarData} options={radarOptions} />
      </div>
      <div className="mt-6 text-center">
        <h4 className="text-purple-400 font-semibold capitalize">{trait}</h4>
        <p className="text-gray-300">
          {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}% from average
        </p>
      </div>
    </div>
  );
};