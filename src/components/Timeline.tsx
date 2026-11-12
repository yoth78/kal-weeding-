import { Clock, MapPin, Heart, Church, Wine, Sparkles, Moon } from 'lucide-react';

interface TimelineProps {
  timeline: Array<{
    id: string;
    time: string;
    title: string;
    location: string;
    description: string;
    icon: string;
  }>;
}

export default function Timeline({ timeline }: TimelineProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'church':
        return <Church className="w-5 h-5 text-[#d4af37]" />;
      case 'wine':
        return <Wine className="w-5 h-5 text-[#d4af37]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
      case 'moon':
        return <Moon className="w-5 h-5 text-[#d4af37]" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-[#d4af37]" />;
      default:
        return <Clock className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <section id="timeline" className="py-24 bg-[#232b1f] text-warmIvory relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-px bg-[#d4af37]/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Day Schedule</span>
            <div className="w-12 h-px bg-[#d4af37]/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-warmIvory tracking-wide">
            Event Timeline
          </h2>
          <p className="text-sandBeige/70 text-sm mt-3 font-light">
            Follow the flow of our special day from sunrise gathering to starry night
          </p>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-[#d4af37]/30 ml-4 md:ml-32 space-y-12">
          {timeline.map((item) => (
            <div key={item.id} className="relative pl-8 md:pl-12 group">
              {/* Dot / Icon badge */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#1b2218] border-2 border-[#d4af37] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>

              {/* Time display on desktop (outside card) */}
              <div className="hidden md:block md:absolute md:-left-36 md:top-2 md:w-28 md:text-right font-serif text-sm tracking-wider text-[#d4af37] font-semibold">
                {item.time}
              </div>

              {/* Card content */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#2a3424]/80 backdrop-blur-md border-2 border-[#fadb5f]/70 hover:border-[#ffd700] transition-all shadow-[0_0_25px_rgba(250,219,95,0.2)]">
                {/* Ultra Bright, High-Contrast Starting Time Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ffe57f] to-[#f5c518] text-[#1a2316] font-black text-sm tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(255,229,127,0.8)] animate-pulse">
                  <Clock className="w-4 h-4 text-[#1a2316] stroke-[2.5]" />
                  <span>{item.time}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 font-semibold tracking-wide drop-shadow-sm">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#ffe082] font-medium mb-3">
                  <MapPin className="w-4 h-4 text-[#ffd700]" />
                  <span>{item.location}</span>
                </div>
                <p className="text-[#f5f0e8] text-sm md:text-base font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
