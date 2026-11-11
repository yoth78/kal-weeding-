'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { WeddingConfig } from '@/types/wedding';

interface GalleryProps {
  gallery: WeddingConfig['gallery'];
}

export default function Gallery({ gallery }: GalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + gallery.length) % gallery.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % gallery.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#232b1f] text-warmIvory relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-px bg-[#d4af37]/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Moments</span>
            <div className="w-12 h-px bg-[#d4af37]/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-warmIvory tracking-wide mb-3">
            Wedding Memories
          </h2>
          <p className="text-sandBeige/70 text-sm max-w-lg mx-auto font-light">
            Glimpses from our love story, travels, and cherished memories together
          </p>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => openLightbox(idx)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-[#d4af37]/20 shadow-lg cursor-pointer bg-[#1b2218]"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2218]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between text-warmIvory">
                  <p className="font-serif text-sm tracking-wide text-sandBeige">
                    {photo.caption}
                  </p>
                  <Maximize2 className="w-4 h-4 text-[#d4af37] shrink-0 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 transition-colors"
            aria-label="Close photo"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={gallery[selectedIdx].url}
              alt={gallery[selectedIdx].caption}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />
            <p className="font-serif text-warmIvory text-base tracking-wide text-center mt-4">
              {gallery[selectedIdx].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
