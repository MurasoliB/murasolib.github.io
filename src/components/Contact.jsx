import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Send, Mail, Loader2, ExternalLink } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Hiring / Job Opportunity',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'activation_needed'

  useEffect(() => {
    // Check if redirected back after FormSubmit confirmation
    if (window.location.search.includes('submitted=true') || window.location.hash.includes('submitted=true')) {
      setStatus('success');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          colors: ['#FF1493', '#FF69B4', '#FFFFFF'],
          origin: { y: 0.85 },
        });
      } catch (_) {}
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWebGmail = () => {
    const org = formData.company ? ` [${formData.company}]` : '';
    const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.inquiryType}${org} - ${formData.name || 'Contact'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany/Organization: ${formData.company || 'Not Specified (Individual)'}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus('submitting');

    try {
      const subjectTag = formData.company ? `[${formData.company}]` : `[${formData.inquiryType}]`;
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          'Company / Organization': formData.company || 'Individual / Personal',
          'Inquiry Type': formData.inquiryType,
          Message: formData.message,
          _subject: `Portfolio Message: ${subjectTag} from ${formData.name}`,
          _template: 'table',
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        setStatus('success');
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            colors: ['#FF1493', '#FF69B4', '#FFFFFF'],
            origin: { y: 0.85 },
          });
        } catch (_) {}
        setFormData({
          name: '',
          email: '',
          company: '',
          inquiryType: 'Hiring / Job Opportunity',
          message: '',
        });
      } else {
        // FormSubmit requires the one-time activation click on first use
        setStatus('activation_needed');
      }
    } catch (_) {
      // If blocked by adblocker / CORS, show one-time activation / web gmail options
      setStatus('activation_needed');
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-44 border-t border-white/10 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
          <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
            // Connection & Inquiries
          </span>
        </div>

        {/* Monumental Aesthetic Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.9] text-white uppercase select-none">
            LET'S BUILD<br />
            SOMETHING<br />
            <span>MEANING</span><span className="text-[#FF1493]">FUL.</span>
          </h2>
        </motion.div>

        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-10 border-t border-white/10">
          
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base sm:text-lg text-[#B3B3B3] leading-relaxed max-w-md font-light">
              Whether you are architecting an autonomous intelligence pipeline, computational simulation, or ambitious full-stack product, my inbox is open.
            </p>

            <div className="space-y-4 font-mono text-xs">
              <span className="text-white/40 uppercase tracking-widest block">Direct Channel</span>
              
              {/* One-click copy email button */}
              <button
                onClick={handleCopy}
                className="group flex items-center justify-between w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493] transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#FF1493] shrink-0" />
                  <span className="text-sm sm:text-base font-mono text-white truncate group-hover:text-[#FF69B4]">
                    {personalInfo.email}
                  </span>
                </div>
                {copied ? (
                  <Check className="w-4 h-4 text-[#FF69B4] shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-[#B3B3B3] group-hover:text-[#FF1493] shrink-0" />
                )}
              </button>

              {/* Compose in Web Gmail (Bypasses desktop mail apps like Outlook) */}
              <button
                onClick={openWebGmail}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-[#B3B3B3] hover:text-white transition-all text-xs font-mono cursor-pointer"
              >
                <span>Compose in Gmail (Browser)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF1493]" />
              </button>
            </div>

            {/* Social Network Links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-[#FF1493]" />
                <span className="border-b border-transparent group-hover:border-white pb-0.5">GitHub ↗</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#FF1493]" />
                <span className="border-b border-transparent group-hover:border-white pb-0.5">LinkedIn ↗</span>
              </a>

              <span className="text-white/30 ml-auto hidden sm:inline">
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Right Column: In-Browser Message Form */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 rounded-2xl bg-white/[0.03] border border-[#FF1493]/40 text-center space-y-4 font-mono"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF1493]/10 border border-[#FF1493] flex items-center justify-center mx-auto text-[#FF1493]">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl text-white font-display font-bold">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-sm text-[#B3B3B3] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your note has been delivered directly to my inbox and I will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-xs text-white hover:border-[#FF1493] hover:text-[#FF1493] transition-colors cursor-pointer"
                >
                  Send Another Note
                </button>
              </motion.div>
            ) : status === 'activation_needed' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-[#FF1493]/30 space-y-5 font-mono text-xs"
              >
                <div className="flex items-center gap-2 text-[#FF69B4] uppercase tracking-wider font-semibold">
                  <span>// One-Time Activation Required</span>
                </div>
                <p className="text-white/80 leading-relaxed text-sm">
                  To prevent spam, FormSubmit sends a 1-click activation link to <strong className="text-white">{personalInfo.email}</strong> on the first use.
                </p>
                <div className="space-y-3 pt-2">
                  {/* Standard POST triggers FormSubmit's confirmation email to your inbox */}
                  <form action={`https://formsubmit.co/${personalInfo.email}`} method="POST">
                    <input type="hidden" name="name" value={formData.name || 'Portfolio Activation Test'} />
                    <input type="hidden" name="email" value={formData.email || 'balajimurasoli@gmail.com'} />
                    <input type="hidden" name="Company / Organization" value={formData.company || 'Not Specified (Individual)'} />
                    <input type="hidden" name="Inquiry Type" value={formData.inquiryType} />
                    <input type="hidden" name="message" value={formData.message || 'One-time activation request from your portfolio contact form.'} />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_next" value="https://murasolib.github.io/?submitted=true#contact" />
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#FF1493] hover:bg-[#FF4FBF] text-white font-semibold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                    >
                      Click to Activate & Dispatch Form
                    </button>
                  </form>

                  {/* Or open in Web Gmail */}
                  <button
                    type="button"
                    onClick={openWebGmail}
                    className="w-full py-3.5 px-6 rounded-full border border-white/20 hover:border-white text-white font-semibold uppercase tracking-wider text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Send via Web Gmail Directly</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FF1493]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="w-full text-center text-white/40 hover:text-white text-[11px] pt-1 transition-colors cursor-pointer"
                  >
                    ← Back to form
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF1493] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF1493] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                      Company / Organization <span className="text-white/30 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Google, Startup, or Individual"
                      className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF1493] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                      Inquiry Type
                    </label>
                    <div className="relative">
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#0D0D0D] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF1493] transition-colors cursor-pointer appearance-none"
                      >
                        <option value="Hiring / Job Opportunity" className="bg-[#111111] text-white">💼 Hiring / Job Opportunity</option>
                        <option value="Project / Contract Work" className="bg-[#111111] text-white">🚀 Project / Contract Work</option>
                        <option value="Tech Collaboration" className="bg-[#111111] text-white">🤝 Tech Collaboration</option>
                        <option value="General Inquiry" className="bg-[#111111] text-white">💬 General Inquiry</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#FF1493]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the role, project, idea, or problem..."
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF1493] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 px-8 rounded-full bg-[#FF1493] hover:bg-[#FF4FBF] text-white font-mono text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,20,147,0.4)] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Dispatching Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Direct 1-click activation link */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setStatus('activation_needed')}
                    className="text-xs font-mono text-white/40 hover:text-[#FF69B4] transition-colors cursor-pointer"
                  >
                    // First time using this? Click here to activate FormSubmit
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}