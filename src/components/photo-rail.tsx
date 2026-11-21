import Image from "next/image";

import type { Photo } from "@/data/photos";

/**
 * Edge-to-edge photo rail that drifts sideways. The list is rendered twice so
 * the loop has no seam; hovering the rail stops it.
 */
export function PhotoRail({ photos }: { photos: Photo[] }) {
  const loop = [...photos, ...photos];

  return (
    <div
      className="group relative overflow-hidden bg-navy-950 py-5"
      aria-label="Photos from the season"
    >
      <div className="animate-rail flex w-max gap-4 group-hover:[animation-play-state:paused]">
        {loop.map((photo, slot) => (
          <figure
            key={`${photo.src}-${slot}`}
            className="relative h-56 w-80 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 sm:h-64 sm:w-[26rem]"
          >
            <Image
              src={photo.src}
              alt={slot < photos.length ? photo.alt : ""}
              aria-hidden={slot >= photos.length}
              fill
              sizes="(max-width: 640px) 320px, 416px"
              style={{ objectPosition: photo.position }}
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent px-4 pt-10 pb-3 text-xs font-medium text-white">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
