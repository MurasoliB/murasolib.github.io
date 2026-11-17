import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Send, Mail, Loader2, ExternalLink } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
    const subject = encodeURIComponent(formData.name ? `Portfolio Inquiry from ${formData.name}` : 'Portfolio Inquiry');
    const body = encodeURIComponent(
      formData.message
        ? `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        : 'Hi Murasoli,\n\nI came across your portfolio and wanted to connect regarding...'
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus('submitting');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
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
        setFormData({ name: '', email: '', message: '' });
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
                    <input type="hidden" name="name" value={formData.name} />
                    <input type="hidden" name="email" value={formData.email} />
                    <input type="hidden" name="message" value={formData.message} />
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
                      placeholder="name@email.com"
                      className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF1493] transition-colors"
                    />
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
                    placeholder="Tell me about the project, idea, or problem..."
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
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}