import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Calendar, User, ArrowRight, CheckCircle2, XCircle, LayoutDashboard, Activity } from 'lucide-react';
import { generateDate, getCorrectAnswers, DAYS_NL, MONTHS_NL } from './utils';
import { ScoreEntry } from './types';

export default function App() {
  const [view, setView] = useState<'landing' | 'practice' | 'scoreboard' | 'results'>('landing');
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [currentDate, setCurrentDate] = useState(generateDate());
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; points?: number } | null>(null);
  const [style, setStyle] = useState<'British' | 'American'>('British');
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}`);
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'JOIN' }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'INITIAL_SCORES') {
        setLeaderboard(message.payload);
      }
    };

    return () => ws.close();
  }, []);

  const updateScoreOnServer = (newScore: number) => {
    if (socketRef.current?.readyState === WebSocket.OPEN && name) {
      socketRef.current.send(JSON.stringify({
        type: 'SCORE_UPDATE',
        payload: { name, score: newScore }
      }));
    }
  };

  const startNewGame = () => {
    setScore(0);
    setQuestionNumber(1);
    setCurrentDate(generateDate());
    setStartTime(Date.now());
    setView('practice');
    setFeedback(null);
    setUserInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) return; // Prevent double submission or modification during feedback

    const { british, american } = getCorrectAnswers(currentDate.day, currentDate.monthIndex, currentDate.dayOfWeekIndex);
    const correct = style === 'British' ? british : american;

    const normalizedInput = userInput.trim().replace(/\.$/, '');
    const normalizedCorrect = correct;

    const nextQuestion = () => {
      if (questionNumber < 10) {
        setQuestionNumber(prev => prev + 1);
        setCurrentDate(generateDate());
        setUserInput('');
        setFeedback(null);
        setStartTime(Date.now());
      } else {
        setView('results');
      }
    };

    if (normalizedInput === normalizedCorrect) {
      const endTime = Date.now();
      const secondsElapsed = (endTime - startTime) / 1000;
      
      // Base 10 points + speed bonus (max 20, decreases over 10s)
      const speedBonus = Math.max(0, Math.round(20 - secondsElapsed * 2));
      const pointsEarned = 10 + speedBonus;
      const newScore = score + pointsEarned;
      
      setScore(newScore);
      setFeedback({ 
        isCorrect: true, 
        message: `Correct! +${pointsEarned} points (Speed bonus: ${speedBonus})`,
        points: pointsEarned
      });
      
      updateScoreOnServer(newScore);

      setTimeout(nextQuestion, 1500);
    } else {
      setFeedback({ isCorrect: false, message: `Error: The correct answer is "${correct}"` });
      setTimeout(nextQuestion, 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="scanline" />
      
      <header className="bg-[rgba(0,26,44,0.95)] p-6 text-center border-b-4 border-neon-blue shadow-[0_0_30px_rgba(0,212,255,0.4)] z-10">
        <h1 className="font-orbitron text-3xl tracking-[8px] text-neon-blue uppercase relative inline-block">
          ENGLIFORCE: DATE CYBER-LAB
          <span className="absolute -top-1 -left-1 text-neon-red opacity-30 animate-pulse">ENGLIFORCE: DATE CYBER-LAB</span>
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center p-5 w-full max-w-[1000px] mx-auto z-10">
        {view === 'landing' && (
          <div className="lab-container p-10 w-full flex flex-col flex-grow animate-in fade-in zoom-in duration-500">
            <h2 className="font-orbitron text-sm text-neon-yellow mb-8 uppercase tracking-[0.4em] border-b border-neon-yellow/20 pb-2">SYSTEM_INITIALIZATION:</h2>
            
            <div className="space-y-10 max-w-md mx-auto w-full my-auto">
              <div className="bg-[#0a111a] border-l-4 border-neon-blue p-8 shadow-lg">
                <label className="block font-orbitron text-[0.7rem] text-neon-blue mb-4 uppercase tracking-widest">USER_IDENTIFICATION:</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-blue" size={20} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full pl-12 pr-4 py-4 bg-[#101d2c] border border-neon-blue/30 rounded-sm text-white focus:border-neon-blue focus:shadow-[0_0_15px_rgba(0,212,255,0.2)] outline-none transition-all font-lexend text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <button 
                  disabled={!name}
                  onClick={startNewGame}
                  className="btn-action py-8 text-xl font-bold disabled:opacity-30 flex items-center justify-center gap-4 uppercase tracking-[0.2em]"
                >
                  <Activity size={24} className="animate-pulse" /> Start Test
                </button>

                <button 
                  onClick={() => setView('scoreboard')}
                  className="btn-action py-8 text-xl font-bold border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-black hover:shadow-[0_0_20px_#fefe33] flex items-center justify-center gap-4 uppercase tracking-[0.2em]"
                >
                  <Trophy size={24} /> High Scores
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'scoreboard' && (
          <div className="lab-container p-10 w-full flex flex-col flex-grow animate-in slide-in-from-bottom-10 duration-500">
            <div className="hud flex justify-between font-orbitron text-[0.8rem] text-neon-blue mb-8 border-b border-neon-blue/20 pb-4">
              <span className="flex items-center gap-2"><LayoutDashboard size={16} /> LIVE_DATA_FEED</span>
              <button onClick={() => setView('landing')} className="text-neon-yellow hover:text-white transition-colors uppercase tracking-widest">[ BACK_TO_MENU ]</button>
            </div>

            <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {leaderboard.map((entry, index) => (
                  <motion.div 
                    key={entry.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex items-center justify-between p-6 border-l-8 ${index === 0 ? 'bg-neon-blue/10 border-neon-blue shadow-[0_0_30px_rgba(0,212,255,0.2)]' : 'bg-[#0a111a] border-neon-blue/20'}`}
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-orbitron text-neon-blue/40 text-2xl">{(index + 1).toString().padStart(2, '0')}</span>
                      <span className="font-orbitron text-2xl tracking-tight uppercase text-white">{entry.name}</span>
                    </div>
                    <div className="font-orbitron text-3xl text-neon-yellow">
                      {entry.score.toLocaleString()} <span className="text-xs opacity-50 uppercase">points</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {leaderboard.length === 0 && (
                <div className="text-center py-32 font-orbitron text-neon-blue/20 text-xl uppercase tracking-[0.5em]">Waiting for data...</div>
              )}
            </div>
          </div>
        )}

        {view === 'practice' && (
          <div className="lab-container p-10 w-full flex flex-col flex-grow animate-in fade-in duration-500">
            <div className="hud flex justify-between font-orbitron text-[0.8rem] text-neon-blue mb-8 border-b border-neon-blue/20 pb-4">
              <span className="flex items-center gap-2"><User size={16} /> SUBJECT: {name.toUpperCase()}</span>
              <span className="flex items-center gap-2">QUESTION: {questionNumber}/10</span>
              <span className="flex items-center gap-2">SCORE: <span className={score > 0 ? 'text-neon-green' : 'text-neon-yellow'}>{score} XP</span></span>
            </div>

            <div className={`chamber p-12 mb-10 flex flex-col items-center justify-center min-h-[300px] transition-all duration-500 ${feedback?.isCorrect ? 'success-glow' : feedback ? 'error-glow' : ''}`}>
              <p className="font-orbitron text-[0.7rem] text-neon-blue/60 mb-6 uppercase tracking-[0.4em]">DATA_VISUALIZATION:</p>
              <h2 className="font-lexend text-5xl font-bold text-center tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {DAYS_NL[currentDate.dayOfWeekIndex]}, {currentDate.day} {MONTHS_NL[currentDate.monthIndex]}
              </h2>
            </div>

            <div className="flex justify-center gap-6 mb-10">
              <button 
                onClick={() => setStyle('British')}
                className={`px-8 py-3 font-orbitron text-sm tracking-[0.2em] transition-all border-2 ${style === 'British' ? 'bg-neon-blue text-black border-neon-blue shadow-[0_0_15px_rgba(0,212,255,0.5)]' : 'bg-transparent text-neon-blue border-neon-blue/30 hover:border-neon-blue/60'}`}
              >
                BRITISH_STYLE
              </button>
              <button 
                onClick={() => setStyle('American')}
                className={`px-8 py-3 font-orbitron text-sm tracking-[0.2em] transition-all border-2 ${style === 'American' ? 'bg-neon-blue text-black border-neon-blue shadow-[0_0_15px_rgba(0,212,255,0.5)]' : 'bg-transparent text-neon-blue border-neon-blue/30 hover:border-neon-blue/60'}`}
              >
                AMERICAN_STYLE
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-auto">
              <div className="relative">
                <input 
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Type the ${style === 'British' ? 'British' : 'American'} date here...`}
                  className={`w-full p-6 bg-[#020508] border-2 border-neon-blue/30 rounded-sm text-2xl text-center text-neon-yellow focus:border-neon-blue focus:shadow-[0_0_20px_rgba(0,212,255,0.2)] outline-none transition-all font-lexend ${feedback ? 'opacity-50 cursor-not-allowed' : ''}`}
                  autoFocus
                  disabled={!!feedback}
                />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30" />
              </div>
              <button 
                type="submit"
                className={`btn-action w-full py-6 text-xl font-bold uppercase tracking-[0.3em] ${feedback ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!!feedback}
              >
                VERIFY_DATA
              </button>
            </form>

            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-8 p-6 border-2 font-orbitron text-[0.8rem] flex items-center gap-4 justify-center tracking-widest shadow-lg ${feedback.isCorrect ? 'border-neon-green text-neon-green bg-neon-green/10' : 'border-neon-red text-neon-red bg-neon-red/10'}`}
                >
                  {feedback.isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                  <span>{feedback.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {view === 'results' && (
          <div className="lab-container p-10 w-full flex flex-col flex-grow animate-in zoom-in duration-500 text-center">
            <h2 className="font-orbitron text-4xl text-neon-blue mb-8 uppercase tracking-[0.3em]">TEST_COMPLETE</h2>
            
            <div className="bg-[#0a111a] border-2 border-neon-blue p-12 shadow-[0_0_30px_rgba(0,212,255,0.2)] max-w-md mx-auto w-full my-auto">
              <p className="font-orbitron text-sm text-neon-blue/60 mb-4 uppercase tracking-widest">FINAL_SCORE:</p>
              <div className="font-orbitron text-7xl text-neon-yellow mb-8">{score}</div>
              <p className="font-lexend text-white/80 mb-10">Excellent work, {name}! You have mastered the dates.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={startNewGame}
                  className="btn-action py-4 text-lg font-bold uppercase tracking-widest"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => setView('scoreboard')}
                  className="btn-action py-4 text-lg font-bold border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-black uppercase tracking-widest"
                >
                  View High Scores
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-4 text-center font-orbitron text-[0.6rem] text-neon-blue/20 uppercase tracking-[0.5em] z-10">
        &copy; 2026 ENGLIFORCE_SYSTEMS // DATE_CYBER_LAB
      </footer>
    </div>
  );
}
