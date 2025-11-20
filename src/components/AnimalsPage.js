"use client";

import { usePetify } from "../contexts/PetifyContext";
import AnimalCard from "./AnimalCard";

export default function AnimalsPage() {
  const { animals, loading } = usePetify();

  const list = Array.isArray(animals) ? animals : [];

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
          Animales en adopción
        </h1>
        <p className="text-sm text-zinc-600">
          Buscá un nuevo integrante para tu familia.
        </p>
      </header>

      {loading && list.length === 0 ? (
        <p className="text-sm text-zinc-500">Cargando animales...</p>
      ) : list.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Todavía no hay animales publicados.
        </p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((animal) => (
            <AnimalCard key={animal._id} animal={animal} />
          ))}
        </section>
      )}
    </main>
  );
}
