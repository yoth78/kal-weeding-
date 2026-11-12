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
              <div className="p-6 rounded-2xl bg-[#2a3424]/50 backdrop-blur-sm border border-[#d4af37]/15 hover:border-[#d4af37]/40 transition-all shadow-md">
                {/* Bright, bold starting time badge optimized for mobile */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#ffd700] text-xs font-bold tracking-widest uppercase mb-3 shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                  <Clock className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>{item.time}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-warmIvory mb-2 font-medium">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#c0926d] mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <p className="text-sandBeige/80 text-sm font-light leading-relaxed">
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
