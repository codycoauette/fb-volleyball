/**
 * Team photography. Drop new files in `public/photos/` and add an entry here —
 * the hero carousel, the photo rail and the page heroes all read from this list.
 *
 * `position` is the CSS object-position used when the photo is cropped to a wide
 * hero; pick the spot that keeps players in frame.
 */
export type Photo = {
  src: string;
  alt: string;
  position: string;
  kicker: string;
  headline: string;
  blurb: string;
  caption: string;
};

export const heroPhotos: Photo[] = [
  {
    src: "/photos/hands-up-home-crowd.jpg",
    alt: "Falcons players raise their hands to signal a play as a packed home crowd watches from the bleachers.",
    position: "50% 38%",
    kicker: "Falcon Gymnasium",
    headline: "Fall nights belong to the Falcons",
    blurb:
      "Doors open an hour before serve. Bring the family, find a spot in the bleachers and get loud.",
    caption: "A full house for senior night in Fertile",
  },
  {
    src: "/photos/point-celebration-crowd.jpg",
    alt: "Five Falcons players shout and celebrate a point at the net in front of a full student section.",
    position: "50% 42%",
    kicker: "Section 8A",
    headline: "Every point, together",
    blurb:
      "Fourteen players, three captains, and a student section that travels. This is Falcons volleyball.",
    caption: "Celebrating a block in front of the student section",
  },
  {
    src: "/photos/celebration-home-net.jpg",
    alt: "Falcons teammates hug and laugh after winning a long rally at the net.",
    position: "50% 40%",
    kicker: "This is the program",
    headline: "Built on the team in front of you",
    blurb:
      "Two straight seasons of at least 18 wins, built by players who grew up in this gym.",
    caption: "Match point, and the bench empties",
  },
  {
    src: "/photos/team-huddle-section.jpg",
    alt: "The Falcons huddle in warmups with one finger raised before a section tournament match.",
    position: "50% 45%",
    kicker: "Postseason",
    headline: "One more match",
    blurb:
      "The section tournament is the goal every October, and the Falcons have been there eleven straight falls.",
    caption: "Pregame huddle before the section semifinal",
  },
];

export const galleryPhotos = heroPhotos;
