'use client';

import { useState, useEffect } from 'react';
import { Calendar, Plus, Clock } from 'lucide-react';
import { WeddingConfig } from '@/types/wedding';

interface CountdownProps {
  targetDate: string;
  config: WeddingConfig;
}

export default function SaveTheDate({ targetDate, config }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleAddToCalendar = () => {
    const { calendarTitle, calendarDescription } = config.eventDate;
    const { name, address } = config.venue;
    const startIso = new Date(config.eventDate.weddingDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(new Date(config.eventDate.weddingDate).getTime() + 8 * 3600 * 1000);
    const endIso = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      calendarTitle
    )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
      calendarDescription
    )}&location=${encodeURIComponent(`${name}, ${address}`)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section id="save-the-date" className="py-24 bg-[#1f271c] text-warmIvory relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-px bg-[#d4af37]/40" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Save Our Date</span>
          <div className="w-12 h-px bg-[#d4af37]/40" />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-warmIvory mb-6 tracking-wide">
          Countdown to the Celebration
        </h2>

        <p className="text-sandBeige/80 text-sm md:text-base font-light max-w-lg mx-auto mb-12">
          {config.eventDate.dayOfWeek}, {config.eventDate.month} {config.eventDate.day}, {config.eventDate.year} &bull; {config.eventDate.time}
        </p>

        {/* Live Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto mb-12">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#2a3424]/60 backdrop-blur-md border border-[#d4af37]/20 flex flex-col items-center justify-center shadow-lg"
            >
              <span className="font-serif text-4xl md:text-5xl font-bold text-[#d4af37] tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-sandBeige/70 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c0926d] text-[#1f271c] font-medium text-xs tracking-[0.2em] uppercase hover:brightness-110 transition-all shadow-md active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </button>
        </div>
      </div>
    </section>
  );
}
