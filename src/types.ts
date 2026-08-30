export interface BirthdayReason {
  id: number;
  title: string;
  content: string;
  category: "sweet" | "funny" | "deep" | "future";
  favorite?: boolean;
}

export interface LoveCoupon {
  id: number;
  title: string;
  description: string;
  redeemed: boolean;
}

export interface PolaroidMemory {
  id: number;
  caption: string;
  tag: string;
  imageUrl?: string;
}

export interface LoveLetter {
  salutation: string;
  body: string;
  closing: string;
  signature: string;
}

export interface CustomSettings {
  herName: string;
  petName: string;
  age: number;
  birthdate: string; // ISO date string, e.g. "2007-08-31"
  anniversary: string;
}
