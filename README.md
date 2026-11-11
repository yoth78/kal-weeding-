# 🥂 Premium Interactive Wedding Invitation & Admin Suite

A luxury, interactive, mobile-first digital wedding invitation website crafted with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

### 1. Public Invitation Experience
- **Cinematic Cover / Hero**: Full-screen photography with dark olive vignette, typography in Italian serif, animated entrance, monogram ornament, and couple names.
- **Save the Date & Live Countdown**: Real-time ticker counting down days, hours, minutes, and seconds until the celebration.
- **One-Click "Add to Calendar"**: Automatically generates a formatted Google Calendar entry with venue coordinates and event descriptions.
- **Vertical Event Timeline**: Luxury schedule milestones (Groom/Bride preparations, Ceremony, Cocktail hour, Grand Gala dinner, Fireworks).
- **Venue & Google Maps**: Venue photography showcase, dress code guidance, full address, and embedded interactive Google Maps iframe + driving directions.
- **Memories Photo Gallery**: Grid with interactive full-screen lightbox carousel (swipe / keyboard / next-prev navigation).
- **Interactive RSVP Form**: Full validation for guest names, attendance ("Joyfully Accepts" / "Regretfully Declines"), groom/bride side attribution, plus-ones, dietary restrictions, and personal wishes.

### 2. Live Admin Dashboard (`/admin`)
- **RSVP Roster & Guest Tracking**: Real-time statistics banner showing total responses, confirmed guest heads, declines, and responses list with deletion controls.
- **Couple & Details Editor**: Update bride/groom names, parent names, welcome messages, and venue addresses on the fly.
- **Timeline Manager**: Add, edit, or remove schedule milestones with custom icons and descriptions.
- **Gallery Manager**: Add and manage wedding photos and captions.

---

## 🚀 Running on Localhost

The server is currently running in the background on:
- **Public Invitation**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

To restart or run manually in the future:

```bash
npm run dev
# or
node node_modules/next/dist/bin/next dev
```
