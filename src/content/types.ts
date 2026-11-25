/**
 * Site content shape. The portal edits this object; the public site reads it.
 * When Supabase is wired up, each top-level key becomes a table (or a JSONB
 * row) — keep field names stable.
 */

export type Grade = "Senior" | "Junior" | "Sophomore" | "Freshman" | "8th Grade";

export type Player = {
  number: number;
  name: string;
  grade: Grade;
  position: string;
  height: string;
  captain?: boolean;
  note?: string;
};

export type Coach = {
  name: string;
  role: string;
  detail: string;
};

export type MatchResult = {
  outcome: "W" | "L";
  sets: string[];
  note?: string;
};

export type Match = {
  id: string;
  date: string;
  time: string;
  opponent: string;
  site: "Home" | "Away" | "Neutral";
  venue?: string;
  type: "Conference" | "Non-conference" | "Tournament" | "Section";
  result?: MatchResult;
};

export type TeamInfo = {
  school: string;
  program: string;
  shortName: string;
  town: string;
  conference: string;
  section: string;
  gym: string;
  address: string;
  email: string;
  phone: string;
  ticketNote: string;
};

export type SeasonSnapshot = {
  season: string;
  overall: string;
  conference: string;
  finish: string;
  note: string;
};

export type RecordScope = "season" | "match";

export type ProgramRecord = {
  label: string;
  value: string;
  holder: string;
  year: string;
  /** Season totals vs. single-match marks. */
  scope: RecordScope;
};

export const RECORD_SCOPES: RecordScope[] = ["season", "match"];

export type SeasonRow = {
  season: string;
  overall: string;
  conference: string;
  postseason: string;
};

export type LeaderBoard = {
  category: string;
  rows: { name: string; value: string; years: string }[];
};

export type Milestone = {
  year: string;
  title: string;
  detail: string;
};

export type HonorYear = {
  season: string;
  items: string[];
};

/** Past varsity players who went on to play college volleyball. */
export type CollegeAthlete = {
  name: string;
  college: string;
  /** High school graduation year (e.g. "2022"). */
  graduationYear: string;
};

export type Campaign = {
  id: string;
  name: string;
  goalCents: number;
  raisedCents: number;
  summary: string;
  closes: string;
};

export type SponsorTier = {
  name: string;
  amount: string;
  perks: string[];
  featured?: boolean;
};

export type FundraisingEvent = {
  date: string;
  name: string;
  detail: string;
};

export type Designation = {
  value: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type QuickLink = {
  label: string;
  href: string;
  detail: string;
};

export type SiteContent = {
  version: number;
  updatedAt: string;
  team: TeamInfo;
  coaches: Coach[];
  roster: Player[];
  currentSeason: string;
  schedule: Match[];
  lastSeason: string;
  lastSeasonResults: Match[];
  seasonSnapshot: SeasonSnapshot;
  programRecords: ProgramRecord[];
  seasonHistory: SeasonRow[];
  careerLeaders: LeaderBoard[];
  programMilestones: Milestone[];
  honors: HonorYear[];
  collegeAthletes: CollegeAthlete[];
  campaigns: Campaign[];
  sponsorTiers: SponsorTier[];
  fundraisingEvents: FundraisingEvent[];
  designations: Designation[];
  fundraisingFaq: FaqItem[];
  quickLinks: QuickLink[];
};

export type ContentSection = keyof Omit<SiteContent, "version" | "updatedAt">;

export const GRADES: Grade[] = [
  "Senior",
  "Junior",
  "Sophomore",
  "Freshman",
  "8th Grade",
];

export const MATCH_SITES: Match["site"][] = ["Home", "Away", "Neutral"];
export const MATCH_TYPES: Match["type"][] = [
  "Conference",
  "Non-conference",
  "Tournament",
  "Section",
];

export const PORTAL_SECTIONS = [
  { slug: "team", label: "Team info", description: "School, gym, contacts, tickets" },
  { slug: "roster", label: "Roster & coaches", description: "Players and staff" },
  { slug: "schedule", label: "Schedule", description: "This season and last season" },
  { slug: "history", label: "History & stats", description: "Records, leaders, honors" },
  {
    slug: "college",
    label: "College athletes",
    description: "Alumni who played in college",
  },
  { slug: "fundraising", label: "Fundraising", description: "Campaigns, sponsors, events" },
] as const;

export type PortalSectionSlug = (typeof PORTAL_SECTIONS)[number]["slug"];
