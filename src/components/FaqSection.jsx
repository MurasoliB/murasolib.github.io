import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const faqs = [
  {
    question: "Who is Murasoli Balaji?",
    answer: "Murasoli Balaji is an Information Technology undergraduate at Kongu Engineering College in Tamil Nadu, India. He is an aspiring full-stack developer, software engineer, and AI enthusiast focused on building autonomous voice agents, hydrodynamic GIS models, and enterprise database systems.",
  },
  {
    question: "What is his academic background at Kongu Engineering College?",
    answer: "He is currently pursuing a B.Tech in Information Technology at Kongu Engineering College (Perundurai, Erode, Tamil Nadu, India). Previously, he completed a Diploma in Computer Engineering, establishing deep foundations in computer systems, networking, and applied software engineering.",
  },
  {
    question: "What programming languages and technologies does Murasoli Balaji use?",
    answer: "His verified technical stack covers Java, Python, JavaScript, C/C++, and SQL. In web and application development, he works with React, Node.js, Tailwind CSS, REST APIs, and Flutter. In databases, he utilizes MySQL, MongoDB, and Java JDBC. He also specializes in Artificial Intelligence, NLP, Computer Vision, and GIS spatial modeling.",
  },
  {
    question: "What notable projects has Murasoli Balaji built?",
    answer: "His key projects include:\n• ULTRON AI Assistant: A voice-controlled desktop AI agent built in Python for speech interaction and task automation.\n• Flood Simulation & GIS: A 2D hydrodynamic simulation integrating digital elevation models (DEM) to predict water inundation.\n• Oral Cancer Prediction using AI: Clinical deep learning CNN for early malignancy screening from oral lesion imagery.\n• Student Search via Natural Language: NL-to-SQL query system powered by Groq API for rapid semantic record retrieval.\n• Global Cold Chain Vaccine Audit: Enterprise Java 25 & MongoDB Atlas telemetry platform for pharmaceutical GxP audit compliance.\n• Student Academic Evaluation: Normalized Java JDBC & MySQL continuous assessment engine.\n• Centralised Clubs & Cells: Campus workflow management platform built with React and Node.js.",
  },
  {
    question: "Where can I find his source code and professional profiles?",
    answer: "All verified public projects and source code are available on his official GitHub at https://github.com/murasolib. You can also connect with him on LinkedIn at https://www.linkedin.com/in/murasolibalaji.",
  },
  {
    question: "Is Murasoli Balaji available for projects and collaborations?",
    answer: "Yes, Murasoli is open to innovative full-stack development, AI engineering collaborations, technical projects, and student developer opportunities. You can reach him directly via the contact form on this website or at balajimurasoli@gmail.com.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 md:py-36 border-t border-white/10 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-16 md:mb-20">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
            <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
              // Knowledge &amp; Inquiries
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            FREQUENT QUESTIONS<span className="text-[#FF1493]">.</span>
          </h2>
        </div>

        {/* Clean Hairline Accordion */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="group transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-7 md:py-8 flex items-center justify-between gap-6 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-mono text-xs text-[#FF1493] font-semibold shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-white group-hover:text-[#FF69B4] transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 border-[#FF1493] bg-[#FF1493]/10' : 'group-hover:border-white/30'}`}>
                    <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-[#FF1493]' : 'text-white/60'}`} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-1 pl-8 sm:pl-12 max-w-4xl text-base sm:text-lg text-[#B3B3B3] leading-relaxed font-light whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
