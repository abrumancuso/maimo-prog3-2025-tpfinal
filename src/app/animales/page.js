"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const res = await fetch(`${API_URL}/animales`);
        if (!res.ok) {
          setError("No se pudieron cargar los animales");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAnimals(data.animals || []);
      } catch (e) {
        setError("Hubo un problema al conectar con la API");
      } finally {
        setLoading(false);
      }
    }

    fetchAnimals();
  }, []);

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
          Animales en adopción
        </h1>
      
      </header>

      {loading && (
        <div className="flex justify-center py-10">
          <p className="text-sm text-zinc-500">Cargando animales...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex justify-center py-10">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && animals.length === 0 && (
        <div className="flex justify-center py-10">
          <p className="text-sm text-zinc-500">
            Todavía no hay animales cargados.
          </p>
        </div>
      )}

      {!loading && !error && animals.length > 0 && (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {animals.map((animal) => (
            <Link
              key={animal._id}
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

              <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
                    {animal.name}
                  </h2>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {animal.location}
                  </p>
                </div>

                <p className="text-xs text-zinc-600">
                  {animal.species} · {animal.age} · tamaño {animal.size}
                </p>

                <p className="line-clamp-3 text-xs sm:text-sm text-zinc-700">
                  {animal.description}
                </p>

                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-zinc-700">
                  <span className="rounded-full bg-orange-50 px-3 py-1">
                    {animal.species === "perro" ? "Perro" : "Gato"}
                  </span>
                  <span className="rounded-full bg-orange-50 px-3 py-1">
                    Tamaño {animal.size}
                  </span>
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-orange-600">
                    En adopción
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
