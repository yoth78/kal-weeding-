'use strict';
'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Heart, Calendar, Clock, MapPin, Image, CheckCircle, Settings } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Invitation', href: '#hero' },
    { label: 'Save the Date', href: '#save-the-date' },
    { label: 'Schedule', href: '#timeline' },
    { label: 'Venue', href: '#venue' },
    { label: 'Memories', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Admin', href: '/admin', isExternal: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#232b1f]/85 backdrop-blur-md shadow-lg border-b border-[#d4af37]/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="font-serif text-lg md:text-xl tracking-widest text-[#f5f0e8] hover:text-[#d4af37] transition-colors flex items-center gap-2"
        >
          <span className="text-[#d4af37] text-base">✦</span>
          <span>K &amp; F</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs tracking-[0.25em] uppercase transition-all duration-300 ${
                link.label === 'RSVP'
                  ? 'border border-[#d4af37] px-4 py-1.5 rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-[#232b1f]'
                  : link.label === 'Admin'
                  ? 'text-champagne/80 hover:text-white flex items-center gap-1.5'
                  : 'text-[#f5f0e8]/80 hover:text-[#d4af37]'
              }`}
            >
              {link.label === 'Admin' && <Settings className="w-3.5 h-3.5" />}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#f5f0e8] hover:text-[#d4af37] focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#1f271c]/95 backdrop-blur-xl border-b border-[#d4af37]/30 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase py-2 ${
                  link.label === 'RSVP'
                    ? 'text-[#d4af37] font-semibold'
                    : 'text-[#f5f0e8] hover:text-[#d4af37]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
