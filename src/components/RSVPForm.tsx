'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    attendance: 'yes',
    side: 'both',
    plusOnes: 0,
    dietaryRestrictions: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit RSVP');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 bg-[#1b2218] text-warmIvory relative">
      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-px bg-[#d4af37]/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Kindly Reply</span>
            <div className="w-12 h-px bg-[#d4af37]/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-warmIvory tracking-wide mb-3">
            RSVP
          </h2>
          <p className="text-sandBeige/70 text-sm font-light">
            Please respond by May 15, 2027 so we may accommodate you graciously
          </p>
        </div>

        {submitted ? (
          <div className="p-8 md:p-12 rounded-3xl bg-[#232b1f]/90 border border-[#d4af37]/30 backdrop-blur-md text-center shadow-xl space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#d4af37] mx-auto animate-bounce" />
            <h3 className="font-serif text-2xl text-warmIvory">Thank You Graciously!</h3>
            <p className="text-sandBeige/80 text-sm font-light leading-relaxed max-w-md mx-auto">
              Your response has been registered. We are deeply grateful for your presence and warm wishes!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  attendance: 'yes',
                  side: 'both',
                  plusOnes: 0,
                  dietaryRestrictions: '',
                  message: '',
                });
              }}
              className="mt-4 px-6 py-2 rounded-full border border-[#d4af37]/40 text-xs text-[#d4af37] tracking-widest uppercase hover:bg-[#d4af37]/10"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 rounded-3xl bg-[#232b1f]/80 border border-[#d4af37]/25 backdrop-blur-md shadow-2xl space-y-6"
          >
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Guest Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Lord & Lady Hamilton"
                className="w-full px-4 py-3 rounded-xl bg-[#1b2218]/90 border border-[#d4af37]/25 text-warmIvory placeholder-sandBeige/30 focus:outline-none focus:border-[#d4af37] text-sm transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="For invitation updates & schedule notes"
                className="w-full px-4 py-3 rounded-xl bg-[#1b2218]/90 border border-[#d4af37]/25 text-warmIvory placeholder-sandBeige/30 focus:outline-none focus:border-[#d4af37] text-sm transition-colors"
              />
            </div>

            {/* Attendance Radio Buttons */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-3 font-medium">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                  className={`py-3 px-4 rounded-xl border text-sm tracking-wide transition-all ${
                    formData.attendance === 'yes'
                      ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] font-semibold'
                      : 'border-white/10 text-sandBeige/70 hover:border-white/20'
                  }`}
                >
                  ✓ Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'no' })}
                  className={`py-3 px-4 rounded-xl border text-sm tracking-wide transition-all ${
                    formData.attendance === 'no'
                      ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] font-semibold'
                      : 'border-white/10 text-sandBeige/70 hover:border-white/20'
                  }`}
                >
                  ✕ Regretfully Declines
                </button>
              </div>
            </div>

            {/* Family Side Selection */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                Family &amp; Friend Association *
              </label>
              <select
                value={formData.side}
                onChange={(e) => setFormData({ ...formData, side: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl bg-[#1b2218]/90 border border-[#d4af37]/25 text-warmIvory text-sm focus:outline-none focus:border-[#d4af37]"
              >
                <option value="both">Mutual Friends / Both Families</option>
                <option value="groom">Groom&apos;s Side (Julian)</option>
                <option value="bride">Bride&apos;s Side (Elena)</option>
              </select>
            </div>

            {/* Plus Ones count */}
            {formData.attendance === 'yes' && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                  Additional Guests / Plus Ones
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={formData.plusOnes}
                  onChange={(e) => setFormData({ ...formData, plusOnes: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1b2218]/90 border border-[#d4af37]/25 text-warmIvory text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            )}

            {/* Dietary notes */}
            {formData.attendance === 'yes' && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                  Dietary Restrictions or Allergies
                </label>
                <input
                  type="text"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                  placeholder="e.g. Vegetarian, Gluten-free, Nut allergy"
                  className="w-full px-4 py-3 rounded-xl bg-[#1b2218]/90 border border-[#d4af37]/25 text-warmIvory placeholder-sandBeige/30 text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            )}

            {/* Message to Couple */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                Message to the Couple
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your blessings, advice, or song requests..."
                className="w-full px-4 py-3 rounded-xl bg-[#1b2218]/90 border border-[#d4af37]/25 text-warmIvory placeholder-sandBeige/30 text-sm focus:outline-none focus:border-[#d4af37] resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c0926d] text-[#1b2218] font-semibold text-xs uppercase tracking-[0.25em] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Transmitting Response...' : 'Send RSVP'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
