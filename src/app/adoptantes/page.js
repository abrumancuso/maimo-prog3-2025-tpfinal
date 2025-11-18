"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdoptantesPage() {
  const [adoptantes, setAdoptantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAdoptantes() {
      try {
        const res = await fetch(`${API_URL}/adoptantes`);
        if (!res.ok) {
          setError("No se pudieron cargar los adoptantes");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAdoptantes(data.adoptantes || []);
      } catch (e) {
        setError("Hubo un error al buscar los adoptantes");
      } finally {
        setLoading(false);
      }
    }

    fetchAdoptantes();
  }, []);

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-zinc-500">Cargando adoptantes...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
          Personas listas para adoptar
        </h1>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {adoptantes.map((adoptante) => (
          <article
            key={adoptante._id}
            className="flex flex-col rounded-2xl border border-orange-100 bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl bg-orange-50">
              {adoptante.image && (
                <Image
                  src={`/${adoptante.image}`}
                  alt={adoptante.name}
                  fill
                  className="object-cover object-center"
                />
              )}
            </div>

            <div className="flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold text-zinc-900">
                {adoptante.name}
              </h2>
              <span className="text-xs text-zinc-500">
                {adoptante.location}
              </span>
            </div>

            <p className="mt-1 text-xs text-zinc-500">
              {adoptante.age} años · {adoptante.housingType}
            </p>

            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              {adoptante.bio}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-zinc-700">
              <span className="rounded-full bg-orange-50 px-2 py-1">
                {adoptante.household}
              </span>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">
                Lista para adoptar
              </span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
