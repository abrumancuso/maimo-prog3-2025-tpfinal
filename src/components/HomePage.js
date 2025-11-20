"use client";

import Link from "next/link";
import { usePetify } from "../contexts/PetifyContext";
import AnimalCard from "./AnimalCard";
import AdopterCard from "./AdopterCard";

export default function HomePage() {
  const { animals, adopters } = usePetify();

  const animalsList = Array.isArray(animals) ? animals : [];
  const adoptersList = Array.isArray(adopters) ? adopters : [];

  const animalsPreview = animalsList.slice(0, 3);
  const adoptersPreview = adoptersList.slice(0, 3);

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900">
          Adoptar es conectar
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto">
          Conectamos personas que buscan adoptar con rescatistas y refugios que
          buscan un hogar para sus animales.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/quiero-adoptar"
            className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-400"
          >
            Quiero adoptar
          </Link>
          <Link
            href="/publicar-animal"
            className="rounded-full border border-orange-500 px-6 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-50"
          >
            Tengo un animal para dar en adopción
          </Link>
        </div>
      </section>

      {/* Animales en adopción */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            Animales en adopción
          </h2>
          <Link
            href="/animales"
            className="text-xs sm:text-sm font-medium text-orange-500 hover:text-orange-400"
          >
            Ver todos
          </Link>
        </div>

        {animalsPreview.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Todavía no hay animales publicados.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {animalsPreview.map((animal) => (
              <AnimalCard key={animal._id} animal={animal} />
            ))}
          </div>
        )}
      </section>

      {/* Adoptantes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            Personas que buscan adoptar
          </h2>
          <Link
            href="/adoptantes"
            className="text-xs sm:text-sm font-medium text-orange-500 hover:text-orange-400"
          >
            Ver todos
          </Link>
        </div>

        {adoptersPreview.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Todavía no hay perfiles de adoptantes cargados.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adoptersPreview.map((adopter) => (
              <AdopterCard key={adopter._id} adopter={adopter} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
