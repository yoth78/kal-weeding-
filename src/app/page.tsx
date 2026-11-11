import Navbar from '@/components/Navbar';
import SaveTheDate from '@/components/SaveTheDate';
import Timeline from '@/components/Timeline';
import Venue from '@/components/Venue';
import Gallery from '@/components/Gallery';
import RSVPForm from '@/components/RSVPForm';
import { getWeddingConfig } from '@/lib/storage';

export const revalidate = 0;

export default function HomePage() {
  const config = getWeddingConfig();

  return (
    <div className="bg-[#1b2218] min-h-screen text-warmIvory selection:bg-[#d4af37] selection:text-[#1b2218]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Background Wedding Photography with Dark Olive Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={config.couple.heroImage}
            alt="Julian &amp; Elena Wedding Cover"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.08] scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b2218] via-[#1b2218]/40 to-[#1b2218]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-6 pt-16">
          {/* Top Monogram / Accent */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase font-light">
              Wedding Invitation
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          {/* Couple Names in Serif */}
          <div className="space-y-1">
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-wide text-warmIvory drop-shadow-md">
              {config.couple.groomName}
            </h1>
            <div className="flex items-center justify-center gap-4 my-2">
              <div className="w-12 h-px bg-[#d4af37]/60" />
              <span className="font-serif italic text-3xl sm:text-4xl text-[#d4af37]">&amp;</span>
              <div className="w-12 h-px bg-[#d4af37]/60" />
            </div>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-wide text-warmIvory drop-shadow-md">
              {config.couple.brideName}
            </h1>
          </div>

          {/* Tagline & Invitation message */}
          <div className="space-y-3 max-w-xl mx-auto pt-2">
            <p className="text-sandBeige/90 text-xs sm:text-sm tracking-[0.25em] uppercase font-light">
              {config.couple.tagline}
            </p>
            <p className="text-sandBeige/70 text-sm italic font-serif leading-relaxed px-4">
              &ldquo;{config.couple.invitationMessage}&rdquo;
            </p>
          </div>

          {/* Date & Location summary badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 py-3 px-8 rounded-full bg-[#1b2218]/70 border border-[#d4af37]/30 backdrop-blur-md text-xs tracking-[0.2em] uppercase text-warmIvory">
            <span>{config.eventDate.month} {config.eventDate.day}, {config.eventDate.year}</span>
            <span className="hidden sm:inline text-[#d4af37]">&bull;</span>
            <span>{config.venue.name}</span>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#rsvp"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c0926d] text-[#1b2218] font-semibold text-xs uppercase tracking-[0.25em] hover:brightness-110 active:scale-95 transition-all shadow-xl"
            >
              Confirm Attendance
            </a>
            <a
              href="#save-the-date"
              className="px-8 py-3.5 rounded-full bg-[#1b2218]/60 border border-[#d4af37]/40 text-[#d4af37] text-xs uppercase tracking-[0.25em] hover:bg-[#d4af37]/15 transition-all backdrop-blur-sm"
            >
              Explore Schedule
            </a>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-[0.3em] text-sandBeige">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#d4af37] to-transparent animate-pulse" />
        </div>
      </section>

      {/* Save The Date & Live Countdown */}
      <SaveTheDate targetDate={config.eventDate.weddingDate} config={config} />

      {/* Event Timeline */}
      <Timeline timeline={config.timeline} />

      {/* Venue Showcase */}
      <Venue venue={config.venue} />

      {/* Wedding Memories Photo Gallery */}
      <Gallery gallery={config.gallery} />

      {/* Guest RSVP Form */}
      <RSVPForm />

      {/* Elegant Footer */}
      <footer className="py-16 bg-[#161c14] border-t border-[#d4af37]/15 text-center text-xs tracking-widest text-sandBeige/60">
        <div className="max-w-2xl mx-auto px-6 space-y-4">
          <p className="font-serif text-lg tracking-widest text-[#d4af37]">
            {config.couple.groomName} &amp; {config.couple.brideName}
          </p>
          <p className="text-sandBeige/50 uppercase text-[10px] tracking-[0.25em]">
            With our deepest gratitude &bull; {config.eventDate.year}
          </p>
        </div>
      </footer>
    </div>
  );
}
