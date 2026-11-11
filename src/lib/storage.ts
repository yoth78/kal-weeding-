import fs from 'fs';
import path from 'path';
import { WeddingConfig, RSVPSubmission, defaultWeddingConfig } from '../types/wedding';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'wedding-config.json');
const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json');

// Ensure data folder and storage files exist
function ensureDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultWeddingConfig, null, 2), 'utf-8');
  }
  if (!fs.existsSync(RSVP_FILE)) {
    const initialRSVPs: RSVPSubmission[] = [
      {
        id: "rsvp-1",
        fullName: "Arthur & Claire Vance",
        email: "arthur.vance@example.com",
        attendance: "yes",
        side: "groom",
        plusOnes: 1,
        dietaryRestrictions: "Vegetarian for Claire",
        message: "We could not be prouder of you both! Looking forward to this magical day.",
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: "rsvp-2",
        fullName: "Dr. Harrison & Elizabeth Sterling",
        email: "harrison.sterling@example.com",
        attendance: "yes",
        side: "bride",
        plusOnes: 1,
        dietaryRestrictions: "None",
        message: "Wishing our beloved daughter and new son endless blessing and joy.",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: "rsvp-3",
        fullName: "Marcus Holloway",
        email: "marcus.h@example.com",
        attendance: "yes",
        side: "both",
        plusOnes: 0,
        dietaryRestrictions: "Gluten-free",
        message: "Can't wait to toast with you both in Napa Valley! See you on the dance floor.",
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
      {
        id: "rsvp-4",
        fullName: "Sophia Lauren",
        email: "sophia.lauren@example.com",
        attendance: "no",
        side: "bride",
        plusOnes: 0,
        dietaryRestrictions: "",
        message: "So sorry to miss it due to international travel, but sending all my deepest love!",
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      }
    ];
    fs.writeFileSync(RSVP_FILE, JSON.stringify(initialRSVPs, null, 2), 'utf-8');
  }
}

export function getWeddingConfig(): WeddingConfig {
  ensureDataStore();
  try {
    const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading wedding config:', err);
    return defaultWeddingConfig;
  }
}

export function saveWeddingConfig(config: WeddingConfig): boolean {
  ensureDataStore();
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving wedding config:', err);
    return false;
  }
}

export function getRSVPs(): RSVPSubmission[] {
  ensureDataStore();
  try {
    const raw = fs.readFileSync(RSVP_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading RSVPs:', err);
    return [];
  }
}

export function saveRSVP(submission: Omit<RSVPSubmission, 'id' | 'createdAt'>): RSVPSubmission {
  ensureDataStore();
  const list = getRSVPs();
  const newRSVP: RSVPSubmission = {
    ...submission,
    id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
  };
  list.unshift(newRSVP);
  fs.writeFileSync(RSVP_FILE, JSON.stringify(list, null, 2), 'utf-8');
  return newRSVP;
}

export function deleteRSVP(id: string): boolean {
  ensureDataStore();
  const list = getRSVPs();
  const filtered = list.filter((item) => item.id !== id);
  fs.writeFileSync(RSVP_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}
