"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdopterCard({ adopter }) {
  return (
    <Link href={`/adoptantes/${adopter._id}`}>
      <article className="flex items-center gap-4 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        {adopter.image && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-orange-100">
            <Image
              src={`/${adopter.image}`}
              alt={adopter.name}
              fill
              className="object-cover object-center"
            />
          </div>
        )}

        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold text-zinc-900">
            {adopter.name}
          </h3>
          <p className="text-xs text-zinc-500">
            {adopter.age} años · {adopter.location}
          </p>
          <p className="text-xs text-zinc-600 line-clamp-2">
            {adopter.household} · {adopter.housingTypeLabel || adopter.housingType}
          </p>
        </div>
      </article>
    </Link>
  );
}
