import { getSiteContent } from "@/content/store";
import { parseLocalDate } from "@/lib/schedule";

function toIcsDate(iso: string) {
  return iso.replaceAll("-", "");
}

function escapeText(value: string) {
  return value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

/** Serves the season as an all-day .ics feed so families can import the dates. */
export async function GET() {
  const { currentSeason, schedule, team } = await getSiteContent();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fertile-Beltrami Falcons Volleyball//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${escapeText(`Falcons Volleyball ${currentSeason}`)}`,
  ];

  for (const match of schedule) {
    const start = parseLocalDate(match.date);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const endIso = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`;

    lines.push(
      "BEGIN:VEVENT",
      `UID:${match.id}@fertile-beltrami-volleyball`,
      `DTSTAMP:${toIcsDate(match.date)}T000000Z`,
      `DTSTART;VALUE=DATE:${toIcsDate(match.date)}`,
      `DTEND;VALUE=DATE:${toIcsDate(endIso)}`,
      `SUMMARY:${escapeText(`${match.site === "Home" ? "vs." : match.site === "Away" ? "at" : "vs."} ${match.opponent}`)}`,
      `LOCATION:${escapeText(match.venue ?? team.gym)}`,
      `DESCRIPTION:${escapeText(`${match.type} match · ${match.time}`)}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="falcons-volleyball-${currentSeason}.ics"`,
    },
  });
}
