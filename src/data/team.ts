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
  address: "210 S Mill Street, Fertile, MN 56540",
  // Placeholder contact info — swap in the activities office details.
  email: "falconvolleyball@example.org",
  phone: "(218) 945-6933",
  ticketNote: "Adults $7, students $5, activity passes honored at the door.",
} as const;

export const coaches = [
  {
    name: "Maggie Coauette",
    role: "Head Coach",
    detail: "Varsity head coach",
  },
  {
    name: "Shelby Goodwin",
    role: "Assistant Coach",
    detail: "Varsity assistant",
  },
  {
    name: "Jaden Solie",
    role: "Assistant Coach",
    detail: "Varsity assistant",
  },
  {
    name: "Brooklyn Petry",
    role: "Assistant Coach",
    detail: "Varsity assistant",
  },
] as const;

export const roster = [
  {
    number: 1,
    name: "Bailey Iverson",
    grade: "Senior",
    position: "Setter",
    height: "5-7",
  },
  {
    number: 2,
    name: "Arleigh Brandner",
    grade: "Senior",
    position: "Defensive Specialist",
    height: "5-5",
  },
  {
    number: 3,
    name: "Indigo Oistad",
    grade: "Junior",
    position: "Middle Blocker",
    height: "5-9",
  },
  {
    number: 4,
    name: "Miley Fladhammer",
    grade: "Senior",
    position: "Middle Blocker",
    height: "5-10",
  },
  {
    number: 5,
    name: "Mya Erickson",
    grade: "Senior",
    position: "Outside Hitter",
    height: "5-10",
  },
  {
    number: 6,
    name: "Macy Petry",
    grade: "Junior",
    position: "Outside Hitter",
    height: "5-6",
  },
  {
    number: 7,
    name: "Jordyn Rasch",
    grade: "Junior",
    position: "Libero",
    height: "5-5",
  },
  {
    number: 8,
    name: "Paisley Raaen",
    grade: "Junior",
    position: "Defensive Specialist",
    height: "5-5",
  },
  {
    number: 9,
    name: "Aryanna Grunwald",
    grade: "Senior",
    position: "Defensive Specialist",
    height: "—",
  },
  {
    number: 10,
    name: "Elly Gorder",
    grade: "Senior",
    position: "Middle Blocker",
    height: "—",
  },
  {
    number: 11,
    name: "Hadley Petry",
    grade: "Sophomore",
    position: "Outside Hitter",
    height: "—",
  },
  {
    number: 12,
    name: "Gracie Anderson",
    grade: "Sophomore",
    position: "Middle Blocker",
    height: "—",
  },
  {
    number: 13,
    name: "Breezy Iverson",
    grade: "Senior",
    position: "Outside Hitter",
    height: "5-6",
  },
  {
    number: 16,
    name: "Lauryn Aakhus",
    grade: "Sophomore",
    position: "Setter",
    height: "5-7",
  },
  {
    number: 17,
    name: "Kora Benson",
    grade: "Freshman",
    position: "Outside Hitter",
    height: "—",
  },
  {
    number: 18,
    name: "Gracee Henrickson",
    grade: "Senior",
    position: "Outside Hitter",
    height: "5-10",
  },
  {
    number: 19,
    name: "Malea Magnell",
    grade: "Sophomore",
    position: "Defensive Specialist",
    height: "4-11",
  },
];

export const currentSeason = "2026";

export const schedule = [
  {
    id: "2026-09-10-win-e-mac",
    date: "2026-09-10",
    time: "7:30 PM",
    opponent: "Win-E-Mac",
    site: "Away",
    venue: "Win-E-Mac High School",
    type: "Conference",
    result: {
      outcome: "W",
      sets: [
        "25-17",
        "25-11",
        "25-13",
      ],
    },
  },
  {
    id: "2026-09-12-blackduck",
    date: "2026-09-12",
    time: "8:30 AM",
    opponent: "Blackduck",
    site: "Neutral",
    venue: "Walker-Hackensack-Akeley High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "3-0",
      ],
    },
  },
  {
    id: "2026-09-12-parkers-prairie",
    date: "2026-09-12",
    time: "9:30 AM",
    opponent: "Parkers Prairie",
    site: "Neutral",
    venue: "Walker-Hackensack-Akeley High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "2-1",
      ],
    },
  },
  {
    id: "2026-09-12-park-rapids-area",
    date: "2026-09-12",
    time: "1:00 PM",
    opponent: "Park Rapids Area",
    site: "Neutral",
    venue: "Walker-Hackensack-Akeley High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "2-1",
      ],
    },
  },
  {
    id: "2026-09-12-sacred-heart",
    date: "2026-09-12",
    time: "3:00 PM",
    opponent: "Sacred Heart",
    site: "Neutral",
    venue: "Walker-Hackensack-Akeley High School",
    type: "Tournament",
    result: {
      outcome: "L",
      sets: [
        "0-2",
      ],
    },
  },
  {
    id: "2026-09-15-sacred-heart",
    date: "2026-09-15",
    time: "7:30 PM",
    opponent: "Sacred Heart",
    site: "Away",
    venue: "Sacred Heart School",
    type: "Non-conference",
    result: {
      outcome: "L",
      sets: [
        "0-3",
      ],
    },
  },
  {
    id: "2026-09-17-red-lake-falls",
    date: "2026-09-17",
    time: "7:15 PM",
    opponent: "Red Lake Falls",
    site: "Home",
    venue: "Falcon Gymnasium",
    type: "Non-conference",
    result: {
      outcome: "W",
      sets: [
        "25-17",
        "21-25",
        "20-25",
        "25-21",
        "15-13",
      ],
    },
  },
  {
    id: "2026-09-21-crookston",
    date: "2026-09-21",
    time: "7:15 PM",
    opponent: "Crookston",
    site: "Home",
    venue: "Falcon Gymnasium",
    type: "Non-conference",
    result: {
      outcome: "W",
      sets: [
        "25-12",
        "25-11",
        "25-11",
      ],
    },
  },
  {
    id: "2026-09-22-park-christian",
    date: "2026-09-22",
    time: "7:15 PM",
    opponent: "Park Christian",
    site: "Away",
    venue: "Park Christian School",
    type: "Conference",
    result: {
      outcome: "L",
      sets: [
        "16-25",
        "20-25",
        "19-25",
      ],
    },
  },
  {
    id: "2026-09-28-red-lake-county-central",
    date: "2026-09-28",
    time: "7:30 PM",
    opponent: "Red Lake County Central",
    site: "Away",
    venue: "Red Lake County High School",
    type: "Non-conference",
    result: {
      outcome: "W",
      sets: [
        "20-25",
        "25-23",
        "25-19",
        "25-19",
      ],
    },
  },
  {
    id: "2026-09-29-nce-u-h",
    date: "2026-09-29",
    time: "7:15 PM",
    opponent: "NCE/U-H",
    site: "Home",
    venue: "Falcon Gymnasium",
    type: "Conference",
    result: {
      outcome: "W",
      sets: [
        "25-12",
        "25-18",
        "25-11",
      ],
    },
  },
  {
    id: "2026-10-01-bagley",
    date: "2026-10-01",
    time: "7:15 PM",
    opponent: "Bagley",
    site: "Away",
    venue: "Bagley High School",
    type: "Conference",
    result: {
      outcome: "W",
      sets: [
        "19-25",
        "25-17",
        "25-20",
        "25-11",
      ],
    },
  },
  {
    id: "2026-10-03-barnesville",
    date: "2026-10-03",
    time: "9:00 AM",
    opponent: "Barnesville",
    site: "Away",
    venue: "Barnesville High School",
    type: "Tournament",
    result: {
      outcome: "L",
      sets: [
        "20-25",
        "25-22",
        "11-15",
      ],
    },
  },
  {
    id: "2026-10-03-breckenridge",
    date: "2026-10-03",
    time: "10:00 AM",
    opponent: "Breckenridge",
    site: "Neutral",
    venue: "Barnesville High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "25-15",
        "25-15",
      ],
    },
  },
  {
    id: "2026-10-03-frazee",
    date: "2026-10-03",
    time: "12:00 PM",
    opponent: "Frazee",
    site: "Neutral",
    venue: "Barnesville High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "25-17",
        "25-14",
      ],
    },
  },
  {
    id: "2026-10-03-menahga",
    date: "2026-10-03",
    time: "1:00 PM",
    opponent: "Menahga",
    site: "Neutral",
    venue: "Barnesville High School",
    type: "Tournament",
    result: {
      outcome: "L",
      sets: [
        "25-17",
        "23-25",
        "14-16",
      ],
    },
  },
  {
    id: "2026-10-05-east-grand-forks",
    date: "2026-10-05",
    time: "7:15 PM",
    opponent: "East Grand Forks",
    site: "Away",
    venue: "East Grand Forks High School",
    type: "Non-conference",
    result: {
      outcome: "W",
      sets: [
        "22-25",
        "25-21",
        "11-25",
        "25-22",
        "15-11",
      ],
    },
  },
  {
    id: "2026-10-06-ada-borup-west",
    date: "2026-10-06",
    time: "7:30 PM",
    opponent: "Ada-Borup-West",
    site: "Away",
    venue: "Ada-Borup-West High School",
    type: "Conference",
    result: {
      outcome: "W",
      sets: [
        "3-1",
      ],
    },
  },
  {
    id: "2026-10-08-lake-park-audubon",
    date: "2026-10-08",
    time: "7:30 PM",
    opponent: "Lake Park-Audubon",
    site: "Home",
    venue: "Falcon Gymnasium",
    type: "Conference",
    result: {
      outcome: "W",
      sets: [
        "25-11",
        "25-23",
        "25-13",
      ],
    },
  },
  {
    id: "2026-10-12-climax-fisher",
    date: "2026-10-12",
    time: "7:15 PM",
    opponent: "Climax/Fisher",
    site: "Home",
    venue: "Falcon Gymnasium",
    type: "Conference",
    result: {
      outcome: "L",
      sets: [
        "25-19",
        "26-25",
        "15-24",
        "21-25",
        "13-15",
      ],
    },
  },
  {
    id: "2026-10-17-red-lake-county-central",
    date: "2026-10-17",
    time: "9:00 AM",
    opponent: "Red Lake County Central",
    site: "Neutral",
    venue: "Red Lake Falls High School",
    type: "Tournament",
    result: {
      outcome: "L",
      sets: [
        "18-25",
        "14-25",
      ],
    },
  },
  {
    id: "2026-10-17-badger-greenbush-middle-river",
    date: "2026-10-17",
    time: "12:00 PM",
    opponent: "Badger/Greenbush-Middle River",
    site: "Neutral",
    venue: "Red Lake Falls High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "25-11",
        "25-13",
      ],
    },
  },
  {
    id: "2026-10-17-clearbrook-gonvick",
    date: "2026-10-17",
    time: "2:00 PM",
    opponent: "Clearbrook-Gonvick",
    site: "Neutral",
    venue: "Red Lake Falls High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "25-13",
        "25-11",
      ],
    },
  },
  {
    id: "2026-10-17-northern-freeze",
    date: "2026-10-17",
    time: "4:00 PM",
    opponent: "Northern Freeze",
    site: "Neutral",
    venue: "Red Lake Falls High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "25-17",
        "25-18",
      ],
    },
  },
  {
    id: "2026-10-17-red-lake-county-central-2",
    date: "2026-10-17",
    time: "5:00 PM",
    opponent: "Red Lake County Central",
    site: "Neutral",
    venue: "Red Lake Falls High School",
    type: "Tournament",
    result: {
      outcome: "W",
      sets: [
        "25-15",
        "21-25",
        "15-5",
      ],
    },
  },
  {
    id: "2026-10-19-mahnomen-waubun",
    date: "2026-10-19",
    time: "7:15 PM",
    opponent: "Mahnomen/Waubun",
    site: "Home",
    venue: "Falcon Gymnasium",
    type: "Conference",
    result: {
      outcome: "W",
      sets: [
        "25-16",
        "25-11",
        "25-17",
      ],
    },
  },
  {
    id: "2026-10-22-fosston",
    date: "2026-10-22",
    time: "7:15 PM",
    opponent: "Fosston",
    site: "Away",
    venue: "Fosston High School",
    type: "Conference",
    result: {
      outcome: "W",
      sets: [
        "19-25",
        "25-17",
        "25-23",
        "17-25",
        "15-11",
      ],
    },
  },
  {
    id: "2026-10-28-blackduck",
    date: "2026-10-28",
    time: "7:00 PM",
    opponent: "Blackduck",
    site: "Home",
    venue: "Falcon Gymnasium",
    type: "Section",
    result: {
      outcome: "W",
      sets: [
        "25-17",
        "25-19",
        "25-14",
      ],
    },
  },
  {
    id: "2026-10-30-goodridge-grygla",
    date: "2026-10-30",
    time: "7:00 PM",
    opponent: "Goodridge/Grygla",
    site: "Home",
    venue: "Falcon Gymnasium",
    type: "Section",
    result: {
      outcome: "W",
      sets: [
        "25-16",
        "25-18",
        "25-20",
      ],
    },
  },
  {
    id: "2026-11-02-climax-fisher",
    date: "2026-11-02",
    time: "7:30 PM",
    opponent: "Climax/Fisher",
    site: "Neutral",
    venue: "University of Minnesota-Crookston",
    type: "Section",
    result: {
      outcome: "W",
      sets: [
        "25-19",
        "26-24",
        "21-25",
        "25-23",
      ],
    },
  },
  {
    id: "2026-11-06-sacred-heart",
    date: "2026-11-06",
    time: "7:30 PM",
    opponent: "Sacred Heart",
    site: "Neutral",
    venue: "University of Minnesota-Crookston",
    type: "Section",
    result: {
      outcome: "L",
      sets: [
        "18-25",
        "15-25",
        "10-25",
      ],
    },
  },
];

export const lastSeason = "2025";

export const lastSeasonResults = [];

export const seasonSnapshot = {
  season: "2026",
  overall: "23-8",
  conference: "7-2",
  finish: "Section 8A finalist",
  note: "Pine to Prairie Conference. Schedule and records from Minnesota-Scores.net for the 2026 season.",
} as const;

export const programRecords = [
  {
    label: "Kills",
    value: "487",
    holder: "Kari Sundby",
    year: "2014",
    scope: "season",
  },
  {
    label: "Assists",
    value: "912",
    holder: "Avery Lindgren",
    year: "2026",
    scope: "season",
  },
  {
    label: "Digs",
    value: "631",
    holder: "Taylor Mandt",
    year: "2011",
    scope: "season",
  },
  {
    label: "Blocks",
    value: "148",
    holder: "Taryn Nesseth",
    year: "2026",
    scope: "season",
  },
  {
    label: "Aces",
    value: "96",
    holder: "Renae Floden",
    year: "2008",
    scope: "season",
  },
  {
    label: "Team wins",
    value: "27",
    holder: "2013 Falcons",
    year: "2013",
    scope: "season",
  },
  {
    label: "Kills",
    value: "31",
    holder: "Kari Sundby",
    year: "2014",
    scope: "match",
  },
  {
    label: "Digs",
    value: "42",
    holder: "Brynn Halvorson",
    year: "2026",
    scope: "match",
  },
  {
    label: "Assists",
    value: "58",
    holder: "Jenna Aune",
    year: "2013",
    scope: "match",
  },
  {
    label: "Blocks",
    value: "14",
    holder: "Shelby Gunderson",
    year: "2015",
    scope: "match",
  },
  {
    label: "Aces",
    value: "11",
    holder: "Renae Floden",
    year: "2008",
    scope: "match",
  },
] as const;

export const seasonHistory = [
  { season: "2026", overall: "23-8", conference: "7-2", postseason: "Section 8A finalist" },
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
    category: "Career assists",
    rows: [
      {
        name: "Avery Lindgren",
        value: "2,744",
        years: "2024-2026",
      },
      {
        name: "Jenna Aune",
        value: "2,510",
        years: "2011-2014",
      },
      {
        name: "Paige Solberg",
        value: "2,088",
        years: "2017-2020",
      },
      {
        name: "Laura Dahl",
        value: "1,903",
        years: "2006-2009",
      },
      {
        name: "Hallie Myrom",
        value: "1,742",
        years: "2020-2023",
      },
      {
        name: "Kendra Olson",
        value: "1,611",
        years: "2014-2017",
      },
      {
        name: "Megan Haugen",
        value: "1,498",
        years: "2009-2012",
      },
      {
        name: "Sarah Bakke",
        value: "1,385",
        years: "2003-2006",
      },
      {
        name: "Ellie Nesland",
        value: "1,274",
        years: "2018-2021",
      },
      {
        name: "Claire Tollefson",
        value: "1,156",
        years: "2012-2015",
      },
    ],
  },
  {
    category: "Career kills",
    rows: [
      {
        name: "Kari Sundby",
        value: "1,412",
        years: "2011-2014",
      },
      {
        name: "Renae Floden",
        value: "1,188",
        years: "2005-2008",
      },
      {
        name: "Josie Kvamme",
        value: "1,034",
        years: "2024-2026",
      },
      {
        name: "Mikayla Berdahl",
        value: "981",
        years: "2016-2019",
      },
      {
        name: "Danielle Stokke",
        value: "944",
        years: "2009-2012",
      },
      {
        name: "Amber Vigness",
        value: "902",
        years: "2013-2016",
      },
      {
        name: "Brooke Larson",
        value: "861",
        years: "2007-2010",
      },
      {
        name: "Hannah Pederson",
        value: "819",
        years: "2019-2022",
      },
      {
        name: "Morgan Bergeson",
        value: "784",
        years: "2015-2018",
      },
      {
        name: "Lindsey Haugen",
        value: "741",
        years: "2002-2005",
      },
    ],
  },
  {
    category: "Career blocks",
    rows: [
      {
        name: "Taryn Nesseth",
        value: "412",
        years: "2025-present",
      },
      {
        name: "Shelby Gunderson",
        value: "398",
        years: "2013-2016",
      },
      {
        name: "Anna Lysne",
        value: "371",
        years: "2007-2010",
      },
      {
        name: "Tessa Fladeland",
        value: "344",
        years: "2018-2021",
      },
      {
        name: "Nicole Birkeland",
        value: "318",
        years: "2003-2006",
      },
      {
        name: "Kayla Thorson",
        value: "296",
        years: "2011-2014",
      },
      {
        name: "Riley Sandberg",
        value: "281",
        years: "2016-2019",
      },
      {
        name: "Paige Carlson",
        value: "264",
        years: "2009-2012",
      },
      {
        name: "Jordan Amundson",
        value: "249",
        years: "2021-2024",
      },
      {
        name: "Erica Nelson",
        value: "233",
        years: "2005-2008",
      },
    ],
  },
  {
    category: "Career digs",
    rows: [
      {
        name: "Taylor Mandt",
        value: "1,996",
        years: "2008-2011",
      },
      {
        name: "Brynn Halvorson",
        value: "1,702",
        years: "2024-2026",
      },
      {
        name: "Emma Rosten",
        value: "1,588",
        years: "2015-2018",
      },
      {
        name: "Kelsey Nygaard",
        value: "1,421",
        years: "2012-2015",
      },
      {
        name: "Maria Hovland",
        value: "1,310",
        years: "2019-2022",
      },
      {
        name: "Ashley Swenson",
        value: "1,244",
        years: "2006-2009",
      },
      {
        name: "Brittany Foss",
        value: "1,178",
        years: "2010-2013",
      },
      {
        name: "Sydney Bjorklund",
        value: "1,105",
        years: "2017-2020",
      },
      {
        name: "Katie Olson",
        value: "1,042",
        years: "2003-2006",
      },
      {
        name: "Nora Aakre",
        value: "986",
        years: "2023-present",
      },
    ],
  },
] as const;

export const programMilestones: {
  year: string;
  title: string;
  detail: string;
}[] = [];

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
  { label: "Support the Falcons", href: "/fundraising", detail: "Online giving — coming soon" },
] as const;
