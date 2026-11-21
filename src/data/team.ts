/**
 * Seed / sample content for the Falcons site.
 *
 * Coaches edit the live copy through `/portal` — those saves land in
 * `data/site-content.json` (and later Supabase). This file stays as the
 * built-in fallback until the first portal save.
 */

export type {
  Campaign,
  Grade,
  Match,
  MatchResult,
  Player,
  SponsorTier,
} from "@/content/types";

export const team = {
  school: "Fertile-Beltrami High School",
  program: "Falcons Volleyball",
  shortName: "Falcons",
  town: "Fertile, Minnesota",
  conference: "Pine to Prairie Conference",
  section: "Section 8A, MSHSL Class A",
  gym: "Falcon Gymnasium",
  address: "408 S Mill St, Fertile, MN 56540",
  // Placeholder contact info — swap in the activities office details.
  email: "falconvolleyball@example.org",
  phone: "(218) 555-0137",
  ticketNote: "Adults $7, students $5, activity passes honored at the door.",
} as const;

export const coaches = [
  {
    name: "Dana Olsgaard",
    role: "Head Coach",
    detail: "9th season leading the Falcons",
  },
  {
    name: "Marcy Tollefson",
    role: "Assistant Coach",
    detail: "Varsity defense and serve receive",
  },
  { name: "Jess Haugen", role: "Junior Varsity Coach", detail: "JV and 9th grade" },
  {
    name: "Tim Berg",
    role: "Student Manager / Stats",
    detail: "Film exchange and match stats",
  },
] as const;

export const roster = [
  {
    number: 1,
    name: "Avery Lindgren",
    grade: "Senior",
    position: "Setter",
    height: "5-8",
    captain: true,
    note: "Three-year starter, 1,100 career assists",
  },
  {
    number: 3,
    name: "Josie Kvamme",
    grade: "Senior",
    position: "Outside Hitter",
    height: "5-10",
    captain: true,
    note: "All-Conference 2026",
  },
  {
    number: 5,
    name: "Brynn Halvorson",
    grade: "Senior",
    position: "Libero",
    height: "5-5",
    note: "Led the team in digs in 2026",
  },
  {
    number: 7,
    name: "Taryn Nesseth",
    grade: "Junior",
    position: "Middle Blocker",
    height: "6-0",
    captain: true,
    note: "Team leader in blocks",
  },
  {
    number: 8,
    name: "Reese Sandberg",
    grade: "Junior",
    position: "Right Side",
    height: "5-9",
  },
  {
    number: 9,
    name: "Elsa Thorsgard",
    grade: "Junior",
    position: "Outside Hitter",
    height: "5-7",
  },
  {
    number: 11,
    name: "Maren Bjerke",
    grade: "Junior",
    position: "Defensive Specialist",
    height: "5-4",
  },
  {
    number: 12,
    name: "Hadley Rustad",
    grade: "Sophomore",
    position: "Setter",
    height: "5-6",
  },
  {
    number: 14,
    name: "Nora Aakre",
    grade: "Sophomore",
    position: "Middle Blocker",
    height: "5-11",
  },
  {
    number: 15,
    name: "Payton Grove",
    grade: "Sophomore",
    position: "Outside Hitter",
    height: "5-8",
  },
  {
    number: 17,
    name: "Lydia Mork",
    grade: "Sophomore",
    position: "Defensive Specialist",
    height: "5-5",
  },
  {
    number: 21,
    name: "Sylvie Ranum",
    grade: "Freshman",
    position: "Right Side",
    height: "5-9",
  },
  {
    number: 22,
    name: "Greta Lunde",
    grade: "Freshman",
    position: "Libero",
    height: "5-3",
  },
  {
    number: 24,
    name: "Ada Vigeland",
    grade: "Freshman",
    position: "Middle Blocker",
    height: "5-10",
  },
];

export const currentSeason = "2027";

export const schedule = [
  {
    id: "2027-08-26-clearbrook-gonvick",
    date: "2027-08-26",
    time: "7:15 PM",
    opponent: "Clearbrook-Gonvick",
    site: "Home",
    venue: team.gym,
    type: "Non-conference",
  },
  {
    id: "2027-08-31-win-e-mac",
    date: "2027-08-31",
    time: "7:15 PM",
    opponent: "Win-E-Mac",
    site: "Away",
    venue: "Erskine, MN",
    type: "Conference",
  },
  {
    id: "2027-09-04-falcon-invite",
    date: "2027-09-04",
    time: "9:00 AM",
    opponent: "Falcon Early Bird Invitational (6 teams)",
    site: "Home",
    venue: team.gym,
    type: "Tournament",
  },
  {
    id: "2027-09-09-ada-borup-west",
    date: "2027-09-09",
    time: "7:15 PM",
    opponent: "Ada-Borup-West",
    site: "Away",
    venue: "Ada, MN",
    type: "Conference",
  },
  {
    id: "2027-09-14-bagley",
    date: "2027-09-14",
    time: "7:15 PM",
    opponent: "Bagley",
    site: "Home",
    venue: team.gym,
    type: "Conference",
  },
  {
    id: "2027-09-17-red-lake-falls",
    date: "2027-09-17",
    time: "7:15 PM",
    opponent: "Red Lake County Central",
    site: "Away",
    venue: "Oklee, MN",
    type: "Conference",
  },
  {
    id: "2027-09-21-norman-county-east",
    date: "2027-09-21",
    time: "7:15 PM",
    opponent: "Norman County East",
    site: "Home",
    venue: `${team.gym} — Parents Night`,
    type: "Conference",
  },
  {
    id: "2027-09-25-crookston",
    date: "2027-09-25",
    time: "6:00 PM",
    opponent: "Crookston",
    site: "Away",
    venue: "Crookston, MN",
    type: "Non-conference",
  },
  {
    id: "2027-09-30-climax-shelly",
    date: "2027-09-30",
    time: "7:15 PM",
    opponent: "Climax-Shelly",
    site: "Home",
    venue: team.gym,
    type: "Conference",
  },
  {
    id: "2027-10-05-mahnomen-waubun",
    date: "2027-10-05",
    time: "7:15 PM",
    opponent: "Mahnomen-Waubun",
    site: "Away",
    venue: "Mahnomen, MN",
    type: "Conference",
  },
  {
    id: "2027-10-09-prairie-classic",
    date: "2027-10-09",
    time: "9:00 AM",
    opponent: "Prairie Classic (8 teams)",
    site: "Neutral",
    venue: "Thief River Falls, MN",
    type: "Tournament",
  },
  {
    id: "2027-10-14-fosston",
    date: "2027-10-14",
    time: "7:15 PM",
    opponent: "Fosston",
    site: "Home",
    venue: `${team.gym} — Senior Night`,
    type: "Conference",
  },
  {
    id: "2027-10-19-section-quarterfinal",
    date: "2027-10-19",
    time: "7:00 PM",
    opponent: "Section 8A Quarterfinal",
    site: "Neutral",
    venue: "Seeding announced in October",
    type: "Section",
  },
];

export const lastSeason = "2026";

export const lastSeasonResults = [
  {
    id: "2026-08-27-clearbrook-gonvick",
    date: "2026-08-27",
    time: "7:15 PM",
    opponent: "Clearbrook-Gonvick",
    site: "Away",
    type: "Non-conference",
    result: { outcome: "W", sets: ["25-18", "25-21", "25-19"] },
  },
  {
    id: "2026-09-01-win-e-mac",
    date: "2026-09-01",
    time: "7:15 PM",
    opponent: "Win-E-Mac",
    site: "Home",
    type: "Conference",
    result: { outcome: "W", sets: ["25-22", "23-25", "25-20", "25-17"] },
  },
  {
    id: "2026-09-08-ada-borup-west",
    date: "2026-09-08",
    time: "7:15 PM",
    opponent: "Ada-Borup-West",
    site: "Home",
    type: "Conference",
    result: { outcome: "L", sets: ["21-25", "25-23", "19-25", "22-25"] },
  },
  {
    id: "2026-09-15-bagley",
    date: "2026-09-15",
    time: "7:15 PM",
    opponent: "Bagley",
    site: "Away",
    type: "Conference",
    result: { outcome: "W", sets: ["25-14", "25-20", "25-23"] },
  },
  {
    id: "2026-09-22-norman-county-east",
    date: "2026-09-22",
    time: "7:15 PM",
    opponent: "Norman County East",
    site: "Away",
    type: "Conference",
    result: { outcome: "W", sets: ["25-19", "25-16", "25-22"] },
  },
  {
    id: "2026-09-29-climax-shelly",
    date: "2026-09-29",
    time: "7:15 PM",
    opponent: "Climax-Shelly",
    site: "Away",
    type: "Conference",
    result: { outcome: "W", sets: ["25-20", "25-18", "25-13"] },
  },
  {
    id: "2026-10-06-mahnomen-waubun",
    date: "2026-10-06",
    time: "7:15 PM",
    opponent: "Mahnomen-Waubun",
    site: "Home",
    type: "Conference",
    result: { outcome: "W", sets: ["25-23", "25-19", "26-24"] },
  },
  {
    id: "2026-10-13-fosston",
    date: "2026-10-13",
    time: "7:15 PM",
    opponent: "Fosston",
    site: "Away",
    type: "Conference",
    result: { outcome: "L", sets: ["25-22", "20-25", "23-25", "18-25"] },
  },
  {
    id: "2026-10-20-section-quarterfinal",
    date: "2026-10-20",
    time: "7:00 PM",
    opponent: "Section 8A Quarterfinal vs. Stephen-Argyle",
    site: "Home",
    type: "Section",
    result: { outcome: "W", sets: ["25-18", "25-21", "25-17"] },
  },
  {
    id: "2026-10-24-section-semifinal",
    date: "2026-10-24",
    time: "7:00 PM",
    opponent: "Section 8A Semifinal vs. Ada-Borup-West",
    site: "Neutral",
    venue: "Crookston, MN",
    type: "Section",
    result: {
      outcome: "L",
      sets: ["25-23", "22-25", "24-26", "20-25"],
      note: "Season ends one win short of the section final.",
    },
  },
];

export const seasonSnapshot = {
  season: lastSeason,
  overall: "19-9",
  conference: "9-3",
  finish: "Section 8A semifinalist",
  note: "A second straight season of at least 18 wins.",
} as const;

export const programRecords = [
  { label: "Kills, single match", value: "31", holder: "Kari Sundby", year: "2014" },
  { label: "Kills, season", value: "487", holder: "Kari Sundby", year: "2014" },
  { label: "Assists, season", value: "912", holder: "Avery Lindgren", year: "2026" },
  { label: "Digs, single match", value: "42", holder: "Brynn Halvorson", year: "2026" },
  { label: "Digs, season", value: "631", holder: "Taylor Mandt", year: "2011" },
  { label: "Blocks, season", value: "148", holder: "Taryn Nesseth", year: "2026" },
  { label: "Aces, season", value: "96", holder: "Renae Floden", year: "2008" },
  { label: "Team wins, season", value: "27", holder: "2013 Falcons", year: "2013" },
] as const;

export const seasonHistory = [
  { season: "2026", overall: "19-9", conference: "9-3", postseason: "Section 8A semifinal" },
  { season: "2025", overall: "18-10", conference: "8-4", postseason: "Section 8A quarterfinal" },
  { season: "2024", overall: "14-13", conference: "6-6", postseason: "Section 8A first round" },
  { season: "2023", overall: "21-8", conference: "10-2", postseason: "Section 8A semifinal" },
  { season: "2022", overall: "12-16", conference: "5-7", postseason: "Section 8A first round" },
  { season: "2021", overall: "16-12", conference: "7-5", postseason: "Section 8A quarterfinal" },
  { season: "2020", overall: "9-7", conference: "5-3", postseason: "Shortened season" },
  { season: "2019", overall: "20-9", conference: "9-3", postseason: "Section 8A semifinal" },
  { season: "2018", overall: "17-11", conference: "8-4", postseason: "Section 8A quarterfinal" },
  { season: "2014", overall: "24-7", conference: "11-1", postseason: "Section 8A runner-up" },
  { season: "2013", overall: "27-5", conference: "12-0", postseason: "State tournament, 5th place" },
] as const;

export const careerLeaders = [
  {
    category: "Career kills",
    rows: [
      { name: "Kari Sundby", value: "1,412", years: "2011-2014" },
      { name: "Renae Floden", value: "1,188", years: "2005-2008" },
      { name: "Josie Kvamme", value: "1,034", years: "2024-2026" },
      { name: "Mikayla Berdahl", value: "981", years: "2016-2019" },
      { name: "Danielle Stokke", value: "944", years: "2009-2012" },
    ],
  },
  {
    category: "Career assists",
    rows: [
      { name: "Avery Lindgren", value: "2,744", years: "2024-2026" },
      { name: "Jenna Aune", value: "2,510", years: "2011-2014" },
      { name: "Paige Solberg", value: "2,088", years: "2017-2020" },
      { name: "Laura Dahl", value: "1,903", years: "2006-2009" },
      { name: "Hallie Myrom", value: "1,742", years: "2020-2023" },
    ],
  },
  {
    category: "Career digs",
    rows: [
      { name: "Taylor Mandt", value: "1,996", years: "2008-2011" },
      { name: "Brynn Halvorson", value: "1,702", years: "2024-2026" },
      { name: "Emma Rosten", value: "1,588", years: "2015-2018" },
      { name: "Kelsey Nygaard", value: "1,421", years: "2012-2015" },
      { name: "Maria Hovland", value: "1,310", years: "2019-2022" },
    ],
  },
  {
    category: "Career blocks",
    rows: [
      { name: "Taryn Nesseth", value: "412", years: "2025-present" },
      { name: "Shelby Gunderson", value: "398", years: "2013-2016" },
      { name: "Anna Lysne", value: "371", years: "2007-2010" },
      { name: "Tessa Fladeland", value: "344", years: "2018-2021" },
      { name: "Nicole Birkeland", value: "318", years: "2003-2006" },
    ],
  },
] as const;

export const programMilestones = [
  {
    year: "2013",
    title: "State tournament berth",
    detail:
      "A 27-5 season ended with the program's first trip to the Class A state tournament and a fifth-place finish.",
  },
  {
    year: "2014",
    title: "Section 8A runner-up",
    detail:
      "Kari Sundby set the single-season kills record on the way to a 24-7 campaign.",
  },
  {
    year: "2019",
    title: "Conference co-champions",
    detail: "Shared the Pine to Prairie title at 9-3 and reached the section semifinals.",
  },
  {
    year: "2023",
    title: "21-win season",
    detail: "The Falcons swept 10 conference opponents and returned to the section semifinals.",
  },
  {
    year: "2026",
    title: "19 wins and a section semifinal",
    detail:
      "Three all-conference selections and a program record 912 assists from the setter position.",
  },
] as const;

export const honors = [
  { season: "2026", items: ["Josie Kvamme — All-Conference", "Avery Lindgren — All-Conference", "Taryn Nesseth — All-Conference Honorable Mention", "Brynn Halvorson — Academic All-State"] },
  { season: "2025", items: ["Josie Kvamme — All-Conference Honorable Mention", "Avery Lindgren — All-Conference", "Team — MSHSL Academic Gold Award"] },
  { season: "2024", items: ["Hallie Myrom — All-Conference", "Team — Section 8A Sportsmanship Award"] },
] as const;

export const campaigns = [
  {
    id: "uniforms",
    name: "2027 Uniform Replacement",
    goalCents: 850000,
    raisedCents: 512500,
    summary:
      "Two full sets of jerseys plus warmups for varsity and JV. The current set is in its seventh season.",
    closes: "Closes July 1, 2027",
  },
  {
    id: "travel",
    name: "Tournament Travel Fund",
    goalCents: 400000,
    raisedCents: 236000,
    summary:
      "Covers bus costs and meals for the Prairie Classic and two out-of-section tournaments.",
    closes: "Closes August 15, 2027",
  },
  {
    id: "gym",
    name: "Gym Equipment & Serving Machine",
    goalCents: 650000,
    raisedCents: 148000,
    summary:
      "A serving machine, two new net systems and padded standards for the practice gym.",
    closes: "Ongoing",
  },
  {
    id: "scholarship",
    name: "Falcon Senior Scholarship",
    goalCents: 250000,
    raisedCents: 250000,
    summary:
      "Two $1,250 scholarships awarded each spring to graduating players continuing their education.",
    closes: "Funded for 2027",
  },
];

export const sponsorTiers = [
  {
    name: "Falcon Circle",
    amount: "$1,000+",
    perks: [
      "Banner in Falcon Gymnasium",
      "Logo on the team warmup shirts",
      "Season pass for two",
      "Recognition at Senior Night",
    ],
    featured: true,
  },
  {
    name: "Navy Level",
    amount: "$500",
    perks: [
      "Logo in the program and on this site",
      "PA recognition at home matches",
      "Season pass for one",
    ],
  },
  {
    name: "Red Level",
    amount: "$250",
    perks: ["Name in the printed program", "PA recognition at two home matches"],
  },
  {
    name: "Friend of the Program",
    amount: "Any amount",
    perks: ["Name listed on the supporter wall in the gym lobby"],
  },
];

export const fundraisingEvents = [
  {
    date: "Feb 14, 2027",
    name: "Pancake Feed",
    detail: "Fertile Community Center, 8:00-11:30 AM. Players serve, families cook.",
  },
  {
    date: "Apr 11, 2027",
    name: "Serve-a-Thon",
    detail: "Pledge per serve in. Last year's event raised $4,180 in one afternoon.",
  },
  {
    date: "Jun 20, 2027",
    name: "Falcon Golf Scramble",
    detail: "Four-person teams, hole sponsorships available at $100.",
  },
  {
    date: "Aug 29, 2027",
    name: "Tip-Off Dinner & Silent Auction",
    detail: "Meet the varsity squad before the home opener.",
  },
] as const;

export const designations = [
  { value: "general", label: "General program fund" },
  { value: "uniforms", label: "2027 uniform replacement" },
  { value: "travel", label: "Tournament travel" },
  { value: "gym", label: "Gym equipment & serving machine" },
  { value: "scholarship", label: "Falcon senior scholarship" },
] as const;

export const fundraisingFaq = [
  {
    question: "Is my gift tax deductible?",
    answer:
      "Gifts to the Falcons Volleyball Booster Club are processed through the school activities account. Ask for a receipt at checkout and we will send documentation for your records.",
  },
  {
    question: "Can my employer match my gift?",
    answer:
      "Many regional employers match gifts to school activity programs. Check the employer match box when you give and the booster club will send the paperwork you need.",
  },
  {
    question: "Can I give to a specific need?",
    answer:
      "Yes. Every gift can be designated to uniforms, travel, equipment or the senior scholarship. Undesignated gifts go to the general program fund, which covers whatever comes up during the season.",
  },
  {
    question: "Do you accept in-kind donations?",
    answer:
      "We do. Printing, meals for road trips, auction items and equipment are all welcome. Email the booster club and we will match the donation to a need.",
  },
] as const;

export const quickLinks = [
  { label: "Season schedule", href: "/schedule", detail: "Match dates, times and sites" },
  { label: "Varsity roster", href: "/roster", detail: "Players, positions and coaches" },
  { label: "Record book", href: "/history", detail: "Program records and season history" },
  { label: "Support the Falcons", href: "/fundraising", detail: "Campaigns, sponsors and events" },
] as const;
