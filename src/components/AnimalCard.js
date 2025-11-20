"use client";

import Link from "next/link";
import Image from "next/image";

export default function AnimalCard({ animal }) {
  return (
    <Link
      href={`/animales/${animal._id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative w-full overflow-hidden bg-orange-50">
        <div className="relative h-52 w-full sm:h-56">
          {animal.image && (
            <Image
              src={`/${animal.image}`}
              alt={animal.name}
              fill
              className="object-cover object-center transition duration-300 group-hover:scale-105"
            />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-5 pb-5 pt-4">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
          {animal.name}
        </h3>
        <p className="text-xs text-zinc-600">
          {animal.species} · {animal.age} · tamaño {animal.size}
        </p>
        <p className="text-xs text-zinc-500 line-clamp-2">
          {animal.location}
        </p>
      </div>
    </Link>
  );
}
