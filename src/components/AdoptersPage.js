"use client";

import { usePetify } from "../contexts/PetifyContext";
import AdopterCard from "./AdopterCard";

export default function AdoptersPage() {
  const { adopters, loading } = usePetify();

  const list = Array.isArray(adopters) ? adopters : [];

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
          Personas que buscan adoptar
        </h1>
        <p className="text-sm text-zinc-600">
          Encontrá a la persona ideal para el animal que querés dar en adopción.
        </p>
      </header>

      {loading && list.length === 0 ? (
        <p className="text-sm text-zinc-500">Cargando perfiles...</p>
      ) : list.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Todavía no hay perfiles de adoptantes cargados.
        </p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((adopter) => (
            <AdopterCard key={adopter._id} adopter={adopter} />
          ))}
        </section>
      )}
    </main>
  );
}
