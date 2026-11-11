import { MapPin, Navigation, Compass, Shield } from 'lucide-react';
import { WeddingConfig } from '@/types/wedding';

interface VenueProps {
  venue: WeddingConfig['venue'];
}

export default function Venue({ venue }: VenueProps) {
  return (
    <section id="venue" className="py-24 bg-[#1b2218] text-warmIvory relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-px bg-[#d4af37]/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Destination</span>
            <div className="w-12 h-px bg-[#d4af37]/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-warmIvory tracking-wide mb-3">
            The Venue &amp; Location
          </h2>
          <p className="text-sandBeige/70 text-sm max-w-xl mx-auto font-light">
            {venue.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Venue Info & Photo Showcase */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#232b1f]/70 border border-[#d4af37]/20 backdrop-blur-md shadow-xl space-y-6">
              <h3 className="font-serif text-2xl md:text-3xl text-[#d4af37]">
                {venue.name}
              </h3>
              
              <div className="space-y-2 text-sm text-sandBeige/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-warmIvory">{venue.address}</p>
                    <p>{venue.cityStateZip}</p>
                  </div>
                </div>
              </div>

              {/* Attire code note */}
              {venue.attire && (
                <div className="pt-4 border-t border-[#d4af37]/15">
                  <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                    Dress Code
                  </span>
                  <p className="text-sm text-sandBeige/90 font-light">
                    {venue.attire}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <a
                  href={venue.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1b2218] text-xs uppercase tracking-widest font-medium transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  Get Google Maps Directions
                </a>
              </div>
            </div>

            {/* Thumbnail photos */}
            <div className="grid grid-cols-3 gap-3">
              {venue.images.map((img, idx) => (
                <div key={idx} className="h-28 rounded-2xl overflow-hidden border border-[#d4af37]/20 shadow-md">
                  <img
                    src={img}
                    alt={`Venue showcase ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="h-[420px] rounded-3xl overflow-hidden border border-[#d4af37]/20 shadow-2xl relative">
            <iframe
              src={venue.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(0.9)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
