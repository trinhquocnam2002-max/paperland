import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Trophy, ArrowRight, HelpCircle } from 'lucide-react';

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockDiscount: (code: string) => void;
}

interface Question {
  id: number;
  clue: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    clue: 'Which paper weight (GSM) prevents heavy fountain pens and brush markers from bleeding or ghosting?',
    options: ['70gsm (Mass Market)', '130gsm (Paper Land Standard)', '45gsm (Tracing paper)'],
    correctAnswer: '130gsm (Paper Land Standard)',
    explanation: 'Standard supermarket paper (70-80gsm) causes ink strike-through; Paper Land uses 130gsm bamboo paper for a bleed-free experience.'
  },
  {
    id: 2,
    clue: 'What note-taking layout features a left cue column, central notes, and bottom summary block?',
    options: ['Cornell Method', 'Isometric Grid', 'Plain Blank'],
    correctAnswer: 'Cornell Method',
    explanation: 'The Cornell system was designed by Walter Pauk to boost academic retention for university lectures and exam prep.'
  },
  {
    id: 3,
    clue: 'What spine binding technique allows a journal to lie completely 180° flat on your desk without fighting your hand?',
    options: ['Glued Perfect Bind', 'Smyth-Sewn Thread Binding', 'Plastic Comb'],
    correctAnswer: 'Smyth-Sewn Thread Binding',
    explanation: 'Smyth-sewn sections allow effortless two-page spreads without cracked spines.'
  },
  {
    id: 4,
    clue: 'What is the sweet-spot price range for Paper Land in Australia, filling the gap between $5 mass stationery and $33 luxury imports?',
    options: ['$5 – $9 AUD', '$15 – $19 AUD', '$40 – $55 AUD'],
    correctAnswer: '$15 – $19 AUD',
    explanation: 'Paper Land positions high aesthetic design and 130gsm paper at $15–$19 AUD to remain genuinely accessible to students and junior workers.'
  }
];

export const MiniGame: React.FC<MiniGameProps> = ({ isOpen, onClose, onUnlockDiscount }) => {
  if (!isOpen) return null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleClaimReward = () => {
    onUnlockDiscount('STUDENT15');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#fcfbf9] rounded-xl shadow-2xl border border-[#ded8cb] overflow-hidden my-auto p-6 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#eee8dc] text-[#555d54] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div className="space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#84725d] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pillar 3: Participate · Paper Quiz</span>
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#1f261f] mt-1">
                The Paper Land Stationery Trivia
              </h3>
              <p className="text-xs text-[#5e665d] mt-1">
                Answer 4 quick stationery trivia questions to unlock a secret 15% discount code for your order.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-[#717b70]">
                <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full h-1.5 bg-[#e4ded0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#293229] transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 bg-white rounded-lg border border-[#e2dcce] space-y-3">
              <p className="font-serif-title text-sm font-semibold text-[#222922] leading-snug">
                {currentQ.clue}
              </p>

              <div className="space-y-2">
                {currentQ.options.map((opt) => {
                  let btnStyle = 'bg-[#faf8f4] border-[#ded7c8] hover:bg-[#f3ede1] text-[#2c332c]';
                  if (isAnswered) {
                    if (opt === currentQ.correctAnswer) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                    } else if (opt === selectedAnswer) {
                      btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                    } else {
                      btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isAnswered}
                      className={`w-full p-2.5 rounded text-left text-xs transition-all border cursor-pointer ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-2.5 bg-[#f6f2e8] rounded border border-[#ded8cb] text-xs text-[#50584f] space-y-1 animate-fade-in">
                  <div className="font-semibold text-[#252c25] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Stationery Note</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-2.5 px-4 bg-[#283228] hover:bg-[#1a211a] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{currentQuestionIndex + 1 < QUESTIONS.length ? 'Next Question' : 'View Your Reward'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          /* Completion & Reward Screen */
          <div className="text-center py-4 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#f4ebd9] text-[#7d674b] mx-auto flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif-title text-2xl font-bold text-[#1f261f]">
                Paper Trivia Champion!
              </h3>
              <p className="text-xs text-[#5f685f]">
                You scored <strong>{score} of {QUESTIONS.length}</strong>. You truly understand the value of honest 130gsm paper.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-emerald-800 font-semibold">
                Your 15% Student & Creative Voucher
              </span>
              <div className="font-mono text-xl font-bold text-emerald-950 tracking-wider">
                STUDENT15
              </div>
              <p className="text-[11px] text-emerald-800">
                15% off any Paper Land notebook, bullet journal, or planner order.
              </p>
            </div>

            <button
              onClick={handleClaimReward}
              className="w-full py-3 px-6 bg-[#283228] hover:bg-[#1a211a] text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
            >
              Apply STUDENT15 & Go to Cart
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
