/**
 * Team photography. Drop new files in `public/photos/` and add an entry here —
 * the hero carousel, the photo rail and the page heroes all read from this list.
 *
 * `position` is the CSS object-position used when the photo is cropped to a wide
 * hero; pick the spot that keeps players in frame.
 *
 * Carousel slides map to site sections: team home, schedule, roster, support.
 */
export type Photo = {
  src: string;
  alt: string;
  position: string;
  kicker: string;
  headline: string;
  blurb: string;
  caption: string;
  href?: string;
  cta?: string;
};

export const heroPhotos: Photo[] = [
  {
    src: "/photos/team-huddle-section.jpg",
    alt: "The Falcons huddle in warmups with one finger raised before a section tournament match.",
    position: "50% 45%",
    kicker: "Fertile-Beltrami volleyball",
    headline: "Fly together",
    blurb:
      "One gym, one roster, one flock. Falcons volleyball is built on trust, grind, and the kid next to you.",
    caption: "Pregame huddle — one team, one purpose",
    href: "/roster",
    cta: "Meet the roster",
  },
  {
    src: "/photos/hands-up-home-crowd.jpg",
    alt: "Falcons players raise their hands to signal a play as a packed home crowd watches from the bleachers.",
    position: "50% 38%",
    kicker: "Schedule",
    headline: "Match nights in Fertile",
    blurb:
      "Conference nights, tournament Saturdays, and section play — every date, result, and gym on the calendar.",
    caption: "A full house for a home match in Falcon Gymnasium",
    href: "/schedule",
    cta: "See the schedule",
  },
  {
    src: "/photos/point-celebration-crowd.jpg",
    alt: "Five Falcons players shout and celebrate a point at the net in front of a full student section.",
    position: "50% 42%",
    kicker: "Roster",
    headline: "Names on the jersey",
    blurb:
      "Seniors leading, underclassmen climbing. Numbers, positions, and the coaches who run practice every day.",
    caption: "Celebrating a block in front of the student section",
    href: "/roster",
    cta: "View the roster",
  },
  {
    src: "/photos/celebration-home-net.jpg",
    alt: "Falcons teammates hug and laugh after winning a long rally at the net.",
    position: "50% 40%",
    kicker: "Support the program",
    headline: "Keep the Falcons flying",
    blurb:
      "Online fundraising is coming soon. Boosters and fans still keep this program in the air.",
    caption: "Match point, and the bench empties",
    href: "/fundraising",
    cta: "Coming soon",
  },
];

export const galleryPhotos = heroPhotos;
