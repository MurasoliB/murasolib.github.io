import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Send, Minus, X, RotateCcw } from 'lucide-react';
import AmehMascot from './AmehMascot';
import { sendChatMessage } from '../services/geminiService';

const WELCOME_MESSAGE = {
  id: 'welcome',
  sender: 'ai',
  text: "Hey! 👋 I'm AMEH AI, your guide to Murasoli's portfolio and beyond. Want to explore his projects, technical skills, or ask me anything? Ask me anything.",
  timestamp: new Date()
};

const QUICK_PROMPTS = [
  { label: 'Explore Projects', query: "Tell me about Murasoli's featured projects." },
  { label: 'Technical Skills', query: 'What programming languages and technical skills does Murasoli use?' },
  { label: 'About Murasoli', query: 'Who is Murasoli Balaji and what is his background?' },
  { label: 'AI & ML Experience', query: "What is Murasoli's experience in Artificial Intelligence and Machine Learning?" },
  { label: 'Contact Information', query: 'How can I contact Murasoli Balaji or view his profiles?' }
];

// Safe zones: mascot avoids top nav (80px), edges (20px margin)
const MASCOT_SIZE = 100;
const MARGIN = 20;
const NAV_HEIGHT = 80;

/**
 * Pick a random safe position within the viewport.
 * Keeps the mascot away from the navbar and edges.
 */
function getRandomSafePosition() {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  const minX = MARGIN;
  const maxX = vw - MASCOT_SIZE - MARGIN;
  const minY = NAV_HEIGHT + MARGIN;
  const maxY = vh - MASCOT_SIZE - MARGIN;

  return {
    x: minX + Math.random() * Math.max(0, maxX - minX),
    y: minY + Math.random() * Math.max(0, maxY - minY)
  };
}

/** Home position: bottom-right safe corner */
function getHomePosition() {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  return {
    x: vw - MASCOT_SIZE - 24,
    y: vh - MASCOT_SIZE - 24
  };
}

/**
 * Lightweight helper to safely render simple markdown: bold, links, bullets, and linebreaks
 */
function MarkdownText({ content }) {
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-inherit">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) {
          return <div key={lineIdx} className="h-1" />;
        }

        const elements = [];
        let keyCounter = 0;
        const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
        let match;
        let lastIndex = 0;

        while ((match = regex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            elements.push(line.substring(lastIndex, match.index));
          }

          const matchedText = match[0];
          if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
            elements.push(
              <strong key={keyCounter++} className="font-semibold text-white">
                {matchedText.slice(2, -2)}
              </strong>
            );
          } else if (matchedText.startsWith('[') && matchedText.includes('](')) {
            const linkText = matchedText.slice(1, matchedText.indexOf(']('));
            const linkUrl = matchedText.slice(matchedText.indexOf('](') + 2, -1);
            elements.push(
              <a
                key={keyCounter++}
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF69B4] underline decoration-[#FF1493]/60 hover:text-white hover:decoration-white transition-colors"
              >
                {linkText}
              </a>
            );
          }
          lastIndex = regex.lastIndex;
        }

        if (lastIndex < line.length) {
          elements.push(line.substring(lastIndex));
        }

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
        return (
          <p key={lineIdx} className={isBullet ? 'pl-2 text-gray-200' : 'text-gray-200'}>
            {elements}
          </p>
        );
      })}
    </div>
  );
}

export default function PortfolioAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);

  // Living Mascot Emotion State
  const [mascotEmotion, setMascotEmotion] = useState('IDLE');

  // Roaming position state
  const [roamPos, setRoamPos] = useState(getHomePosition);
  const [isHovered, setIsHovered] = useState(false);

  // Spring-based smooth position interpolation
  const springX = useSpring(useMotionValue(roamPos.x), { stiffness: 35, damping: 18, mass: 1.2 });
  const springY = useSpring(useMotionValue(roamPos.y), { stiffness: 35, damping: 18, mass: 1.2 });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const mascotPosRef = useRef(roamPos); // Track current position for distance calc

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ================================================================
  // AUTONOMOUS ROAMING ENGINE
  // Picks a new random safe position every 5–9 seconds.
  // Pauses when chat is open, hovered, or sleeping.
  // ================================================================
  useEffect(() => {
    if (isOpen) return; // Don't roam while chat is open

    let roamTimer;

    const scheduleNextRoam = () => {
      const delay = 5000 + Math.random() * 4000; // 5–9 seconds
      roamTimer = setTimeout(() => {
        if (isHovered || mascotEmotion === 'SLEEP' || mascotEmotion === 'EXCITED') {
          scheduleNextRoam(); // Skip this tick, try again later
          return;
        }

        const newPos = getRandomSafePosition();
        setRoamPos(newPos);
        mascotPosRef.current = newPos;
        scheduleNextRoam();
      }, delay);
    };

    scheduleNextRoam();

    return () => clearTimeout(roamTimer);
  }, [isOpen, isHovered, mascotEmotion]);

  // Sync spring values when roamPos changes
  useEffect(() => {
    springX.set(roamPos.x);
    springY.set(roamPos.y);
  }, [roamPos.x, roamPos.y, springX, springY]);

  // Recalculate home position and safe bounds on resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) return;
      // Clamp current position to new viewport
      setRoamPos((prev) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return {
          x: Math.min(Math.max(prev.x, MARGIN), vw - MASCOT_SIZE - MARGIN),
          y: Math.min(Math.max(prev.y, NAV_HEIGHT + MARGIN), vh - MASCOT_SIZE - MARGIN)
        };
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Listen for global trigger to open AMEH AI from Navbar or other components
  useEffect(() => {
    const handleOpen = () => {
      setMascotEmotion('EXCITED');
      setTimeout(() => {
        setIsOpen(true);
        setMascotEmotion('HAPPY');
      }, 250);
    };
    window.addEventListener('open-ameh-ai', handleOpen);
    return () => window.removeEventListener('open-ameh-ai', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, isLoading]);

  // Inactivity & Mouse Distance Tracking for Living Mascot
  useEffect(() => {
    let inactivityTimer;

    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      if (mascotEmotion === 'SLEEP') {
        setMascotEmotion('IDLE');
      }
      inactivityTimer = setTimeout(() => {
        if (!isOpen && !isLoading) {
          setMascotEmotion('SLEEP');
        }
      }, 40000); // 40 seconds of inactivity -> SLEEP
    };

    const handleMouseMove = (e) => {
      resetInactivity();
      if (isOpen || isLoading) return;

      // Check distance from current roaming position
      const curPos = mascotPosRef.current;
      const mascotCenterX = curPos.x + MASCOT_SIZE / 2;
      const mascotCenterY = curPos.y + MASCOT_SIZE / 2;
      const dist = Math.hypot(e.clientX - mascotCenterX, e.clientY - mascotCenterY);

      if (dist < 180 && mascotEmotion === 'IDLE') {
        setMascotEmotion('CURIOUS');
      } else if (dist >= 250 && mascotEmotion === 'CURIOUS') {
        setMascotEmotion('IDLE');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('keydown', resetInactivity, { passive: true });
    resetInactivity();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', resetInactivity);
      clearTimeout(inactivityTimer);
    };
  }, [isOpen, isLoading, mascotEmotion]);

  const handleMascotClick = useCallback(() => {
    setMascotEmotion('EXCITED');
    // Fly home before opening chat
    setRoamPos(getHomePosition());
    setTimeout(() => {
      setIsOpen(true);
      setMascotEmotion('HAPPY');
    }, 350);
  }, []);

  const handleCloseChat = () => {
    setIsOpen(false);
    setMascotEmotion('IDLE');
    // Resume roaming from home
    setRoamPos(getHomePosition());
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue('');
    setIsLoading(true);
    setMascotEmotion('THINKING');

    try {
      const replyText = await sendChatMessage(nextMessages);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);

      setMascotEmotion('TALKING');
      setTimeout(() => {
        setMascotEmotion('HAPPY');
        setTimeout(() => setMascotEmotion('IDLE'), 2500);
      }, 3000);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackAiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I'm having a momentary connection glitch, but I'm **AMEH AI** and I can help you with Murasoli's projects (**ULTRON AI Assistant**, **Flood Simulation & GIS**, **OralVision AI**, **Student Search via Natural Language**) or any general tech query. You can also reach out to Murasoli directly at **balajimurasoli@gmail.com**!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackAiMessage]);
      setMascotEmotion('IDLE');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (!isLoading) {
      if (val.trim().length > 0) {
        setMascotEmotion('LISTENING');
      } else {
        setMascotEmotion('IDLE');
      }
    }
  };

  const handleQuickPromptClick = (query) => {
    handleSendMessage(query);
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setShowQuickPrompts(true);
    setInputValue('');
    setMascotEmotion('HAPPY');
    setTimeout(() => setMascotEmotion('IDLE'), 1500);
  };

  return (
    <>
      {/* ============================================================== */}
      {/* CHAT PANEL (Fixed bottom-right)                                */}
      {/* ============================================================== */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans antialiased">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.9 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col w-[calc(100vw-28px)] sm:w-[390px] h-[530px] max-h-[85vh] rounded-[24px] bg-[#0A090E]/95 backdrop-blur-2xl border border-[#FF1493]/70 shadow-[0_0_35px_rgba(255,20,147,0.35),0_15px_40px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(255,20,147,0.06)] overflow-hidden"
            >
              {/* Header with Living Mascot Avatar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#110F17]/90 border-b border-white/5 select-none">
                <div className="flex items-center gap-3">
                  <AmehMascot size={36} isFloating={false} emotion={mascotEmotion} />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-white tracking-wide leading-tight">
                      AMEH AI
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981] shadow-[0_0_6px_#10B981]"></span>
                      </span>
                      <span className="text-[11px] font-medium text-[#10B981] tracking-wide">
                        {isLoading ? 'Thinking...' : mascotEmotion === 'LISTENING' ? 'Listening...' : 'Online'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 text-gray-400">
                  <button
                    type="button"
                    onClick={resetChat}
                    title="Restart conversation"
                    className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseChat}
                    title="Minimize"
                    className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseChat}
                    title="Close"
                    className="p-1.5 rounded-lg hover:text-[#FF1493] hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Conversation Body */}
              <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-[#FF1493]/30 scrollbar-track-transparent">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <AmehMascot size={28} isFloating={false} emotion="IDLE" className="mt-1 flex-shrink-0" />
                      )}
                      <div
                        className={`max-w-[85%] text-[13px] rounded-2xl p-3.5 ${
                          isUser
                            ? 'bg-gradient-to-r from-[#FF1493] to-[#E00673] text-white rounded-tr-sm shadow-[0_0_15px_rgba(255,20,147,0.35)]'
                            : 'bg-[#181420]/95 border border-white/10 text-gray-200 rounded-tl-sm shadow-md'
                        }`}
                      >
                        <MarkdownText content={msg.text} />
                      </div>
                    </div>
                  );
                })}

                {/* Quick Prompt Pill Buttons */}
                {showQuickPrompts && messages.length <= 2 && (
                  <div className="pt-2 pb-1 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_PROMPTS.slice(0, 4).map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleQuickPromptClick(p.query)}
                          className="w-full text-center py-2 px-2.5 rounded-full bg-[#121017]/85 border border-[#FF1493]/50 text-white text-[11px] sm:text-xs font-medium hover:border-[#FF1493] hover:bg-[#FF1493]/20 hover:shadow-[0_0_14px_rgba(255,20,147,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer truncate"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleQuickPromptClick(QUICK_PROMPTS[4].query)}
                        className="w-auto px-5 py-2 rounded-full bg-[#121017]/85 border border-[#FF1493]/50 text-white text-[11px] sm:text-xs font-medium hover:border-[#FF1493] hover:bg-[#FF1493]/20 hover:shadow-[0_0_14px_rgba(255,20,147,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                      >
                        {QUICK_PROMPTS[4].label}
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Typing Indicator */}
                {isLoading && (
                  <div className="flex items-start gap-2.5 justify-start">
                    <AmehMascot size={28} isFloating={false} emotion="THINKING" className="mt-1 flex-shrink-0" />
                    <div className="bg-[#181420]/95 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF1493] animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#FF1493] animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#FF1493] animate-bounce"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar & Helper Text */}
              <div className="p-3 bg-[#0E0C13] border-t border-white/5">
                <div className="flex items-center gap-2 bg-[#14121A] border border-[#FF1493]/40 focus-within:border-[#FF1493] focus-within:shadow-[0_0_15px_rgba(255,20,147,0.3)] rounded-full pl-4 pr-1.5 py-1.5 transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                      if (inputValue.trim().length > 0) setMascotEmotion('LISTENING');
                    }}
                    onBlur={() => {
                      if (!isLoading) setMascotEmotion('IDLE');
                    }}
                    placeholder="Ask AMEH AI anything..."
                    disabled={isLoading}
                    className="w-full bg-transparent text-white placeholder-gray-400 text-xs sm:text-[13px] outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    aria-label="Send message"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF1493] hover:bg-[#FF2E93] text-white shadow-[0_0_12px_rgba(255,20,147,0.6)] disabled:opacity-30 disabled:hover:bg-[#FF1493] disabled:shadow-none hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 fill-current transform -translate-x-[0.5px] translate-y-[0.5px]" />
                  </button>
                </div>

                {/* Helper Micro-copy */}
                <p className="text-[10px] text-gray-400 text-center mt-1.5 font-light tracking-wide select-none">
                  Press Enter to send · Shift + Enter for new line
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================== */}
      {/* ROAMING LIVING MASCOT — Autonomous viewport wanderer            */}
      {/* Uses spring physics for smooth organic movement transitions     */}
      {/* ============================================================== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: springX,
              top: springY,
              zIndex: 45,
              pointerEvents: 'auto'
            }}
            className="font-sans antialiased"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative cursor-pointer group">
              {/* The Living Roaming Mascot */}
              <AmehMascot
                size={MASCOT_SIZE}
                isFloating={true}
                emotion={mascotEmotion}
                onClick={handleMascotClick}
                className="drop-shadow-[0_0_22px_rgba(255,20,147,0.35)] transition-transform group-hover:scale-105"
              />

              {/* Floating Status Pill */}
              <div
                onClick={handleMascotClick}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A090E]/95 border border-[#FF1493]/70 shadow-[0_0_10px_rgba(255,20,147,0.5)] cursor-pointer select-none whitespace-nowrap"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
                <span className="text-[9.5px] font-mono font-bold text-white tracking-wider">
                  AMEH AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
