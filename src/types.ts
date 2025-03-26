export interface Question {
  id: number;
  text: string;
  type: 'personality' | 'aptitude';
  options: {
    text: string;
    score: number;
  }[];
}

export interface Result {
  darkTriad: {
    narcissism: number;
    machiavellianism: number;
    psychopathy: number;
  };
  deviation: {
    narcissism: number;
    machiavellianism: number;
    psychopathy: number;
  };
}

export interface UserResponse {
  questionId: number;
  selectedScore: number;
}

export interface HistoricalFigure {
  name: string;
  traits: {
    narcissism: number;
    machiavellianism: number;
    psychopathy: number;
  };
  description: string;
}