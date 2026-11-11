'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Image,
  CheckCircle,
  XCircle,
  Save,
  Trash2,
  Plus,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { WeddingConfig, RSVPSubmission } from '@/types/wedding';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'rsvps' | 'info' | 'timeline' | 'gallery'>('rsvps');
  const [config, setConfig] = useState<WeddingConfig | null>(null);
  const [rsvps, setRsvps] = useState<RSVPSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [configRes, rsvpRes] = await Promise.all([
        fetch('/api/config'),
        fetch('/api/rsvp'),
      ]);
      const configData = await configRes.json();
      const rsvpData = await rsvpRes.json();
      setConfig(configData);
      setRsvps(rsvpData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setStatusMsg({ text: 'Failed to load data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!config) return;
    setSaving(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error('Save failed');
      setStatusMsg({ text: 'Wedding configuration saved successfully!', type: 'success' });
    } catch (err) {
      setStatusMsg({ text: 'Failed to save configuration', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRSVP = async (id: string) => {
    if (!confirm('Are you sure you want to remove this RSVP entry?')) return;
    try {
      await fetch(`/api/rsvp/${id}`, { method: 'DELETE' });
      setRsvps(rsvps.filter((r) => r.id !== id));
      setStatusMsg({ text: 'RSVP deleted', type: 'success' });
    } catch (err) {
      setStatusMsg({ text: 'Failed to delete RSVP', type: 'error' });
    }
  };

  if (loading || !config) {
    return (
      <div className="min-h-screen bg-[#1b2218] flex items-center justify-center text-[#d4af37]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-sandBeige">Loading Admin Sanctuary...</p>
        </div>
      </div>
    );
  }

  // RSVP Stats calculations
  const totalSubmissions = rsvps.length;
  const attendingCount = rsvps.filter((r) => r.attendance === 'yes').length;
  const declinedCount = rsvps.filter((r) => r.attendance === 'no').length;
  const totalGuests = rsvps
    .filter((r) => r.attendance === 'yes')
    .reduce((acc, curr) => acc + 1 + (curr.plusOnes || 0), 0);

  return (
    <div className="min-h-screen bg-[#161c14] text-warmIvory p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/20">
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Invitation
            </a>
            <h1 className="font-serif text-3xl md:text-4xl text-warmIvory">
              Wedding Administration Suite
            </h1>
            <p className="text-sandBeige/70 text-xs tracking-wider mt-1">
              Live controller for Julian Vance &amp; Elena Sterling Celebration
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveConfig}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c0926d] text-[#161c14] font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Preserving...' : 'Save All Changes'}
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {statusMsg && (
          <div
            className={`p-4 rounded-xl text-xs tracking-wide border ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/40 border-red-500/40 text-red-200'
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* Quick Statistics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#1f271c] border border-[#d4af37]/20">
            <span className="text-[10px] uppercase tracking-widest text-sandBeige/70 block">
              Responses
            </span>
            <span className="font-serif text-3xl text-warmIvory font-bold">{totalSubmissions}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#1f271c] border border-[#d4af37]/20">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 block">
              Confirmed Guests
            </span>
            <span className="font-serif text-3xl text-emerald-400 font-bold">{totalGuests}</span>
            <span className="text-[10px] text-sandBeige/50 block mt-0.5">({attendingCount} parties)</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#1f271c] border border-[#d4af37]/20">
            <span className="text-[10px] uppercase tracking-widest text-red-400 block">
              Declined
            </span>
            <span className="font-serif text-3xl text-red-400 font-bold">{declinedCount}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#1f271c] border border-[#d4af37]/20">
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] block">
              Wedding Date
            </span>
            <span className="font-serif text-lg text-[#d4af37] font-semibold mt-1 block">
              {config.eventDate.month} {config.eventDate.day}, {config.eventDate.year}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#d4af37]/20 gap-6 text-xs uppercase tracking-widest">
          {[
            { id: 'rsvps', label: 'RSVP Roster', count: rsvps.length },
            { id: 'info', label: 'Couple & Details' },
            { id: 'timeline', label: 'Timeline Schedule' },
            { id: 'gallery', label: 'Gallery Photos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#d4af37] text-[#d4af37] font-semibold'
                  : 'border-transparent text-sandBeige/60 hover:text-sandBeige'
              }`}
            >
              {tab.label} {tab.count !== undefined && `(${tab.count})`}
            </button>
          ))}
        </div>

        {/* Tab 1: RSVP List */}
        {activeTab === 'rsvps' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#d4af37]">Guest RSVP Registry</h2>
            <div className="overflow-x-auto rounded-2xl border border-[#d4af37]/20 bg-[#1f271c]">
              <table className="w-full text-left text-xs text-sandBeige/90">
                <thead className="bg-[#242e21] uppercase tracking-wider text-[10px] text-[#d4af37]">
                  <tr>
                    <th className="p-4">Guest</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Side</th>
                    <th className="p-4">Plus Ones</th>
                    <th className="p-4">Dietary Notes</th>
                    <th className="p-4">Message</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-warmIvory">
                        <div>{rsvp.fullName}</div>
                        {rsvp.email && (
                          <div className="text-[10px] text-sandBeige/50">{rsvp.email}</div>
                        )}
                      </td>
                      <td className="p-4">
                        {rsvp.attendance === 'yes' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                            <CheckCircle className="w-3.5 h-3.5" /> Attending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-400 font-semibold">
                            <XCircle className="w-3.5 h-3.5" /> Declined
                          </span>
                        )}
                      </td>
                      <td className="p-4 capitalize">{rsvp.side}</td>
                      <td className="p-4">{rsvp.plusOnes}</td>
                      <td className="p-4">{rsvp.dietaryRestrictions || '—'}</td>
                      <td className="p-4 max-w-xs truncate italic text-sandBeige/70">
                        {rsvp.message || '—'}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteRSVP(rsvp.id)}
                          className="p-1.5 hover:text-red-400 text-sandBeige/40 transition-colors"
                          title="Remove entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {rsvps.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-sandBeige/50 italic">
                        No RSVP submissions recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Couple & Event Details */}
        {activeTab === 'info' && (
          <div className="p-8 rounded-3xl bg-[#1f271c] border border-[#d4af37]/20 space-y-6">
            <h2 className="font-serif text-2xl text-[#d4af37]">Couple &amp; Invitation Messaging</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                  Groom Full Name
                </label>
                <input
                  type="text"
                  value={config.couple.groomName}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: { ...config.couple, groomName: e.target.value },
                    })
                  }
                  className="w-full p-3 rounded-xl bg-[#161c14] border border-[#d4af37]/20 text-warmIvory text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                  Bride Full Name
                </label>
                <input
                  type="text"
                  value={config.couple.brideName}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: { ...config.couple, brideName: e.target.value },
                    })
                  }
                  className="w-full p-3 rounded-xl bg-[#161c14] border border-[#d4af37]/20 text-warmIvory text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                  Groom Parents
                </label>
                <input
                  type="text"
                  value={config.couple.groomParents}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: { ...config.couple, groomParents: e.target.value },
                    })
                  }
                  className="w-full p-3 rounded-xl bg-[#161c14] border border-[#d4af37]/20 text-warmIvory text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                  Bride Parents
                </label>
                <input
                  type="text"
                  value={config.couple.brideParents}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: { ...config.couple, brideParents: e.target.value },
                    })
                  }
                  className="w-full p-3 rounded-xl bg-[#161c14] border border-[#d4af37]/20 text-warmIvory text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                Tagline / Introductory Line
              </label>
              <input
                type="text"
                value={config.couple.tagline}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: { ...config.couple, tagline: e.target.value },
                  })
                }
                className="w-full p-3 rounded-xl bg-[#161c14] border border-[#d4af37]/20 text-warmIvory text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                Invitation Message
              </label>
              <textarea
                rows={3}
                value={config.couple.invitationMessage}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: { ...config.couple, invitationMessage: e.target.value },
                  })
                }
                className="w-full p-3 rounded-xl bg-[#161c14] border border-[#d4af37]/20 text-warmIvory text-sm resize-none"
              />
            </div>

            <div className="pt-6 border-t border-[#d4af37]/20">
              <h3 className="font-serif text-xl text-[#d4af37] mb-4">Venue &amp; Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={config.venue.name}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        venue: { ...config.venue, name: e.target.value },
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#161c14] border border-[#d4af37]/20 text-warmIvory text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={config.venue.address}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        venue: { ...config.venue, address: e.target.value },
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#161c14] border border-[#d4af37]/20 text-warmIvory text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Timeline Management */}
        {activeTab === 'timeline' && (
          <div className="p-8 rounded-3xl bg-[#1f271c] border border-[#d4af37]/20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#d4af37]">Event Schedule Items</h2>
              <button
                onClick={() => {
                  const newItem = {
                    id: String(Date.now()),
                    time: '12:00 PM',
                    title: 'New Schedule Milestone',
                    location: 'Main Ballroom',
                    description: 'Description of the celebratory event.',
                    icon: 'sparkles',
                  };
                  setConfig({ ...config, timeline: [...config.timeline, newItem] });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#d4af37] text-xs uppercase tracking-widest text-[#d4af37] hover:bg-[#d4af37]/10"
              >
                <Plus className="w-3.5 h-3.5" /> Add Milestone
              </button>
            </div>

            <div className="space-y-4">
              {config.timeline.map((item, index) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#161c14] border border-[#d4af37]/20 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm text-[#d4af37]">Item #{index + 1}</span>
                    <button
                      onClick={() =>
                        setConfig({
                          ...config,
                          timeline: config.timeline.filter((t) => t.id !== item.id),
                        })
                      }
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Time (e.g. 2:30 PM)"
                      value={item.time}
                      onChange={(e) => {
                        const updated = [...config.timeline];
                        updated[index].time = e.target.value;
                        setConfig({ ...config, timeline: updated });
                      }}
                      className="p-2.5 rounded-lg bg-[#1f271c] border border-[#d4af37]/20 text-xs text-warmIvory"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...config.timeline];
                        updated[index].title = e.target.value;
                        setConfig({ ...config, timeline: updated });
                      }}
                      className="p-2.5 rounded-lg bg-[#1f271c] border border-[#d4af37]/20 text-xs text-warmIvory"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={item.location}
                      onChange={(e) => {
                        const updated = [...config.timeline];
                        updated[index].location = e.target.value;
                        setConfig({ ...config, timeline: updated });
                      }}
                      className="p-2.5 rounded-lg bg-[#1f271c] border border-[#d4af37]/20 text-xs text-warmIvory"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...config.timeline];
                      updated[index].description = e.target.value;
                      setConfig({ ...config, timeline: updated });
                    }}
                    className="w-full p-2.5 rounded-lg bg-[#1f271c] border border-[#d4af37]/20 text-xs text-warmIvory resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Gallery Photos */}
        {activeTab === 'gallery' && (
          <div className="p-8 rounded-3xl bg-[#1f271c] border border-[#d4af37]/20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#d4af37]">Gallery Photos</h2>
              <button
                onClick={() => {
                  const newImg = {
                    id: 'g-' + Date.now(),
                    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
                    caption: 'New Memory Photo',
                  };
                  setConfig({ ...config, gallery: [...config.gallery, newImg] });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#d4af37] text-xs uppercase tracking-widest text-[#d4af37] hover:bg-[#d4af37]/10"
              >
                <Plus className="w-3.5 h-3.5" /> Add Photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.gallery.map((img, index) => (
                <div
                  key={img.id || index}
                  className="p-4 rounded-2xl bg-[#161c14] border border-[#d4af37]/20 flex gap-4 items-center"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#d4af37]/30"
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Photo URL"
                      value={img.url}
                      onChange={(e) => {
                        const updated = [...config.gallery];
                        updated[index].url = e.target.value;
                        setConfig({ ...config, gallery: updated });
                      }}
                      className="w-full p-2 rounded-lg bg-[#1f271c] border border-[#d4af37]/20 text-xs text-warmIvory"
                    />
                    <input
                      type="text"
                      placeholder="Caption"
                      value={img.caption}
                      onChange={(e) => {
                        const updated = [...config.gallery];
                        updated[index].caption = e.target.value;
                        setConfig({ ...config, gallery: updated });
                      }}
                      className="w-full p-2 rounded-lg bg-[#1f271c] border border-[#d4af37]/20 text-xs text-warmIvory"
                    />
                  </div>
                  <button
                    onClick={() =>
                      setConfig({
                        ...config,
                        gallery: config.gallery.filter((_, i) => i !== index),
                      })
                    }
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
