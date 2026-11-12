export interface WeddingConfig {
  couple: {
    groomName: string;
    brideName: string;
    groomParents: string;
    brideParents: string;
    tagline: string;
    invitationMessage: string;
    heroImage: string;
    storyImage: string;
  };
  eventDate: {
    weddingDate: string; // ISO string e.g. "2027-06-20T14:00:00"
    dayOfWeek: string;
    month: string;
    day: number;
    year: number;
    time: string;
    calendarTitle: string;
    calendarDescription: string;
  };
  venue: {
    name: string;
    subheading: string;
    address: string;
    cityStateZip: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
    images: string[];
    attire: string;
  };
  timeline: Array<{
    id: string;
    time: string;
    title: string;
    location: string;
    description: string;
    icon: string;
  }>;
  gallery: Array<{
    id: string;
    url: string;
    caption: string;
    category?: string;
  }>;
  theme: {
    primaryColor: string;
    accentColor: string;
    champagneColor: string;
    darkOliveColor: string;
  };
}

export interface RSVPSubmission {
  id: string;
  fullName: string;
  email?: string;
  attendance: 'yes' | 'no';
  side: 'groom' | 'bride' | 'both';
  plusOnes: number;
  dietaryRestrictions?: string;
  message?: string;
  createdAt: string;
}

export const defaultWeddingConfig: WeddingConfig = {
  couple: {
    groomName: "Fish",
    brideName: "Kal",
    groomParents: "Beloved Family of Fish",
    brideParents: "Beloved Family of Kal",
    tagline: "Together with their joyful families, request the honor of your presence",
    invitationMessage: "Two souls, one timeless journey. We invite you to join us as we pledge our love, celebrate our lifelong union, and create unforgettable memories together.",
    heroImage: "/photos/photo_2026-11-11_20-45-27.jpg",
    storyImage: "/photos/photo_2026-11-11_19-38-37.jpg",
  },
  eventDate: {
    weddingDate: "2026-11-15T08:00:00+03:00",
    dayOfWeek: "Sunday",
    month: "November",
    day: 15,
    year: 2026,
    time: "8:00 LT (Local Time)",
    calendarTitle: "Kal & Fish Wedding Celebration",
    calendarDescription: "Join us for Kal & Fish's Wedding Celebration. Location: 8°57'17.8\"N 38°47'00.3\"E",
  },
  venue: {
    name: "Wedding Celebration Venue",
    subheading: "An elegant celebration gathering for family, relatives, and cherished friends",
    address: "8°57'17.8\"N 38°47'00.3\"E",
    cityStateZip: "Addis Ababa, Ethiopia",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=8.954931,38.783421&hl=en&z=16&output=embed",
    googleMapsDirectionsUrl: "https://www.google.com/maps/place/8%C2%B057'17.8%22N+38%C2%B047'00.3%22E/@8.954931,38.783421,16z/data=!4m4!3m3!8m2!3d8.954931!4d38.783421?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D",
    images: [
      "/photos/photo_2026-11-11_19-27-45.jpg",
      "/photos/photo_2026-11-02_15-36-33.jpg",
      "/photos/photo_2026-11-11_19-27-03.jpg",
    ],
    attire: "Elegant Traditional / Formal Celebration Attire",
  },
  timeline: [
    {
      id: "1",
      time: "8:00 LT",
      title: "Wedding Celebration & Gathering",
      location: "Celebration Hall",
      description: "Welcoming guests, blessings, ceremony, feast, and celebration of Kal & Fish.",
      icon: "heart",
    },
  ],
  gallery: [
    {
      id: "g1",
      url: "/photos/photo_2026-11-11_20-45-27.jpg",
      caption: "Kal & Fish - Together in Love",
    },
    {
      id: "g2",
      url: "/photos/photo_2026-11-11_19-38-37.jpg",
      caption: "Cherished Moments",
    },
    {
      id: "g3",
      url: "/photos/photo_2026-11-11_19-28-32.jpg",
      caption: "Joy and Laughter",
    },
    {
      id: "g4",
      url: "/photos/photo_2026-11-11_19-27-45.jpg",
      caption: "Walking into Forever",
    },
    {
      id: "g5",
      url: "/photos/photo_2026-11-02_15-36-33.jpg",
      caption: "Precious Memories",
    },
    {
      id: "g6",
      url: "/photos/photo_2026-11-11_19-27-03.jpg",
      caption: "Celebration of Unity",
    },
    {
      id: "g7",
      url: "/photos/photo_2026-11-03_15-08-10.jpg",
      caption: "Timeless Elegance",
    },
    {
      id: "g8",
      url: "/photos/photo_2026-11-11_20-45-52.jpg",
      caption: "Forever & Always",
    },
  ],
  theme: {
    primaryColor: "#384230",
    accentColor: "#d4af37",
    champagneColor: "#c0926d",
    darkOliveColor: "#232b1f",
  },
};
