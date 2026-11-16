import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | 'prepared'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please write a message of at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (_) {}

    // Formulate direct mailto URL so user genuinely sends via email
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    setSubmissionStatus('prepared');
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative py-28 bg-surface/40 overflow-hidden border-t border-border-subtle">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-violet/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs uppercase tracking-widest font-mono mb-4"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Initiate Transmission</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4"
          >
            Have an Idea? Let's Build It.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary max-w-xl text-base md:text-lg"
          >
            Whether you have a technical query, project collaboration, or opportunity in AI and full-stack development, feel free to reach out.
          </motion.p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Quick Email Card */}
            <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 hover:border-accent-blue/30 transition-all">
              <span className="text-xs font-mono text-accent-blue uppercase tracking-wider block mb-2">
                Direct Contact
              </span>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Start a Conversation
              </h3>
              <p className="text-xs text-content-secondary leading-relaxed mb-6">
                Send an email directly or copy the address to your clipboard.
              </p>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface border border-white/10">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-accent-blue shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-content-primary truncate">
                    {personalInfo.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-surface-card hover:bg-white/10 text-content-secondary hover:text-white transition-colors shrink-0"
                  aria-label="Copy Email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Location & Institution Card */}
            <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-accent-blue shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-content-muted uppercase">Base Location</span>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-3 border-t border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-accent-violet shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-content-muted uppercase">Status</span>
                    <p className="text-sm font-semibold text-emerald-400 mt-0.5">
                      Open to Collaborative Projects & Engineering Roles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10">
              <span className="text-xs font-mono text-content-muted uppercase tracking-wider block mb-4">
                Connect on Networks
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-surface border border-white/10 hover:border-accent-blue/40 text-content-primary hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-content-secondary group-hover:text-white" />
                    <span className="text-xs font-semibold">GitHub</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-content-muted group-hover:text-accent-blue" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-surface border border-white/10 hover:border-accent-blue/40 text-content-primary hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-accent-blue" />
                    <span className="text-xs font-semibold">LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-content-muted group-hover:text-accent-blue" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl relative">
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-content-secondary mb-8">
                Fill in the details below. This will validate and open your email client with your message securely pre-formatted.
              </p>

              {submissionStatus === 'prepared' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-200">
                    <p className="font-semibold text-emerald-300">Message Ready!</p>
                    <p className="mt-0.5">Your email client has been triggered. If it didn't open, click below to send directly to {personalInfo.email}.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-content-secondary uppercase mb-2">
                      Your Name <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Hunter"
                      className={`w-full px-4 py-3 rounded-2xl bg-surface border text-sm text-white placeholder-content-muted focus:outline-none focus:ring-1 transition-all ${
                        errors.name
                          ? 'border-rose-500/60 focus:ring-rose-500'
                          : 'border-white/10 focus:border-accent-blue focus:ring-accent-blue'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-content-secondary uppercase mb-2">
                      Email Address <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className={`w-full px-4 py-3 rounded-2xl bg-surface border text-sm text-white placeholder-content-muted focus:outline-none focus:ring-1 transition-all ${
                        errors.email
                          ? 'border-rose-500/60 focus:ring-rose-500'
                          : 'border-white/10 focus:border-accent-blue focus:ring-accent-blue'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-content-secondary uppercase mb-2">
                    Subject <span className="text-accent-blue">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / AI Collaboration"
                    className={`w-full px-4 py-3 rounded-2xl bg-surface border text-sm text-white placeholder-content-muted focus:outline-none focus:ring-1 transition-all ${
                      errors.subject
                        ? 'border-rose-500/60 focus:ring-rose-500'
                        : 'border-white/10 focus:border-accent-blue focus:ring-accent-blue'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-content-secondary uppercase mb-2">
                    Message <span className="text-accent-blue">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or questions..."
                    className={`w-full px-4 py-3 rounded-2xl bg-surface border text-sm text-white placeholder-content-muted focus:outline-none focus:ring-1 transition-all resize-none ${
                      errors.message
                        ? 'border-rose-500/60 focus:ring-rose-500'
                        : 'border-white/10 focus:border-accent-blue focus:ring-accent-blue'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-accent-blue hover:bg-blue-500 text-white font-semibold text-sm shadow-glow-blue flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </button>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
