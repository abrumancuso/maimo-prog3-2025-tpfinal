"use client";

import Link from "next/link";
import { usePetify } from "../contexts/PetifyContext";
import AnimalCard from "./AnimalCard";
import AdopterCard from "./AdopterCard";

export default function HomePage() {
  const {
    animals,
    adopters,
    loadingAnimals,
    loadingAdopters,
    errorAnimals,
    errorAdopters,
  } = usePetify();

  const animalsArray = Array.isArray(animals) ? animals : [];
  const adoptersArray = Array.isArray(adopters) ? adopters : [];

  const animalsPreview = animalsArray.slice(0, 3);
  const adoptersPreview = adoptersArray.slice(0, 3);

  return (
    <main className="min-h-[70vh] bg-gradient-to-br from-orange-50/70 via-white to-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center lg:py-16">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600 ring-1 ring-orange-100">
            Adoptar es conectar
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl md:text-5xl">
              Encontrá el hogar perfecto
              <br />
              <span className="text-orange-500">
                para un animal que lo necesita
              </span>
            </h1>
            <p className="max-w-xl text-sm text-zinc-600 sm:text-base">
              Petify conecta personas que quieren adoptar con rescatistas y
              refugios. Contá quién sos o publicá un animal para que más
              humanos responsables puedan conocerlo.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/quiero-adoptar"
              className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-400"
            >
              Quiero adoptar
            </Link>
            <Link
              href="/publicar-animal"
              className="rounded-full border border-orange-200 bg-white px-6 py-2.5 text-sm font-semibold text-orange-600 transition hover:border-orange-400 hover:bg-orange-50"
            >
              Tengo un animal para dar en adopción
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="mx-auto max-w-md rounded-3xl bg-white p-5 shadow-[0_18px_70px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                  Un match posible
                </p>
                <p className="text-sm font-semibold text-zinc-900">
                  Olivia, mestiza mediana
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100">
  <img
    src="/petifylogo.png"
    alt="Petify logo"
    className="h-10 w-10 object-contain rounded-xl"
  />
</div>
            </div>

            <p className="mb-4 text-xs text-zinc-600">
              Vive en CABA, tiene 3 años y se lleva muy bien con otros perros.
              Busca una familia tranquila que tenga tiempo para pasearla y darle
              mucho amor.
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-2xl bg-orange-50 px-2 py-2">
                <p className="font-semibold text-zinc-900">3 años</p>
                <p className="text-[10px] text-zinc-500">Edad</p>
              </div>
              <div className="rounded-2xl bg-orange-50 px-2 py-2">
                <p className="font-semibold text-zinc-900">Mediana</p>
                <p className="text-[10px] text-zinc-500">Tamaño</p>
              </div>
              <div className="rounded-2xl bg-orange-50 px-2 py-2">
                <p className="font-semibold text-zinc-900">Castrada</p>
                <p className="text-[10px] text-zinc-500">Salud</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-4 max-w-6xl px-6 pb-14 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
                Animales publicados recientemente
              </h2>
              <p className="text-xs text-zinc-500 sm:text-sm">
                Conocé a quienes están buscando una familia responsable.
              </p>
            </div>
            <Link
              href="/animales"
              className="text-xs font-semibold text-orange-600 hover:text-orange-500 sm:text-sm"
            >
              Ver todos
            </Link>
          </div>

          {loadingAnimals ? (
            <p className="text-sm text-zinc-500">Cargando animales...</p>
          ) : errorAnimals ? (
            <p className="text-sm text-red-500">
              Hubo un problema al cargar los animales.
            </p>
          ) : animalsPreview.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Todavía no hay animales publicados.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {animalsPreview.map((animal) => (
                <AnimalCard key={animal._id} animal={animal} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
                Personas que buscan adoptar
              </h2>
              <p className="text-xs text-zinc-500 sm:text-sm">
                Encontrá el hogar ideal para el animal que querés dar en
                adopción.
              </p>
            </div>
            <Link
              href="/adoptantes"
              className="text-xs font-semibold text-orange-600 hover:text-orange-500 sm:text-sm"
            >
              Ver todos
            </Link>
          </div>

          {loadingAdopters ? (
            <p className="text-sm text-zinc-500">Cargando adoptantes...</p>
          ) : errorAdopters ? (
            <p className="text-sm text-red-500">
              Hubo un problema al cargar los adoptantes.
            </p>
          ) : adoptersPreview.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Todavía no hay perfiles de adoptantes publicados.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {adoptersPreview.map((adopter) => (
                <AdopterCard key={adopter._id} adopter={adopter} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
