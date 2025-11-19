"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const res = await fetch(`${API_URL}/animales`);
        const data = await res.json();
        setAnimals(data.animals || []);
      } catch (e) {
        console.error("Error cargando animales");
      }
    }

    fetchAnimals();
  }, []);

  return (
    <div className="space-y-16">
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-orange-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Adopción responsable en Argentina
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
            Un espacio donde{" "}
            <span className="text-orange-500">personas y animales</span> se
            encuentran.
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-zinc-600 leading-relaxed">
            Petify no es solo un listado de perros y gatos. Es un lugar para
            publicar historias reales de adopción: de dónde viene cada animal,
            cómo es su carácter, qué rutinas tiene y qué tipo de hogar sería
            ideal.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/quiero-adoptar"
              className="rounded-full bg-orange-500 px-7 py-2 text-sm font-semibold text-white shadow-md hover:bg-orange-400 transition"
            >
              Quiero adoptar
            </Link>
            <Link
              href="/publicar-animal"
              className="rounded-full border border-orange-200 bg-orange-50 px-7 py-2 text-sm font-semibold text-orange-600 hover:border-orange-400 hover:bg-white transition"
            >
              Quiero publicar un animal
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-orange-200/40 via-orange-100/40 to-amber-100/60 blur-2xl" />
          <div className="relative h-72 w-full rounded-[28px] border border-orange-200 bg-white p-6 shadow-xl flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src="/luna.png"
                  alt="Luna"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="text-xs text-zinc-500">Historia en Petify</p>
                <p className="text-sm font-semibold text-zinc-900">
                  Abril + Luna
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
              “Luna apareció en mi barrio en pleno invierno. Una familia la vio
              en Petify, se animó a conocerla y hoy duerme en una cama
              calentita. Su historia empezó con un simple mensaje.”
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] text-zinc-700">
              <span className="rounded-full bg-orange-50 px-3 py-1">
                Perra mediana · 2 años
              </span>
              <span className="rounded-full bg-orange-50 px-3 py-1">
                Convive con otros perros
              </span>
              <span className="rounded-full bg-orange-50 px-3 py-1">
                Rescatada del barrio
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
          ¿Por qué Petify y no otro portal más?
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Muchos sitios de adopción funcionan como catálogos fríos, llenos de
            fichas iguales. En Petify queremos algo distinto: que puedas
            entender la historia de cada animal, quién lo cuida hoy, qué miedos
            tiene y qué cosas lo hacen feliz. También te mostramos quién está
            del otro lado: las personas que quieren adoptar y el tipo de hogar
            que ofrecen.
          </p>

          <div className="space-y-3 text-sm text-zinc-700">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
              <p className="text-xs font-semibold text-orange-600">
                Más que una ficha
              </p>
              <p className="text-xs mt-1">
                Cada perfil cuenta de dónde viene el animal, cómo es su
                personalidad y qué necesita para sentirse seguro y querido.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
              <p className="text-xs font-semibold text-orange-600">
                Personas en el centro
              </p>
              <p className="text-xs mt-1">
                El perfil del humano también importa: rutinas, tipo de hogar,
                experiencias previas y expectativas sobre la adopción.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
              <p className="text-xs font-semibold text-orange-600">
                Puente, no catálogo
              </p>
              <p className="text-xs mt-1">
                Petify busca hacer de puente entre historias reales: quien
                rescata, quien adopta y quien acompaña el proceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
          Cómo usar Petify
        </h2>

        <p className="max-w-2xl text-sm sm:text-base text-zinc-600">
          El flujo está pensado para que publicar o adoptar sea simple y
          transparente, sin formularios eternos ni letras chicas.
        </p>

        <div className="grid gap-5 sm:grid-cols-3">
          <article className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-orange-600 mb-1">
              Paso 1 · Crear tu perfil
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Contanos quién sos, cómo es tu día a día y qué tipo de convivencia
              podés ofrecerle a un animal.
            </p>
          </article>

          <article className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-orange-600 mb-1">
              Paso 2 · Publicar o buscar
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Subí la historia de un perro o gato que necesite hogar, o
              explorá perfiles ya publicados para encontrar el match ideal.
            </p>
          </article>

          <article className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-orange-600 mb-1">
              Paso 3 · Conectarse
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              A través de los formularios de contacto se inicia la charla entre
              quienes publican y quienes quieren adoptar, siempre con foco en el
              bienestar del animal.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
            Perros y gatos que buscan hogar
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {animals.slice(0, 3).map((a) => (
            <Link
              key={a._id}
              href={`/animales/${a._id}`}
              className="flex flex-col rounded-2xl border border-orange-100 bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="relative mb-3 h-28 w-full overflow-hidden rounded-xl bg-orange-50">
                <Image
                  src={`/${a.image}`}
                  alt={a.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              <span className="text-sm font-semibold text-zinc-900">
                {a.name} · {a.size}
              </span>
              <span className="text-xs text-zinc-500">
                {a.location} · {a.age}
              </span>

              <p className="mt-2 text-xs text-zinc-600 leading-relaxed line-clamp-3">
                {a.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-zinc-700">
                <span className="rounded-full bg-orange-50 px-2 py-1">
                  {a.species}
                </span>
                <span className="rounded-full bg-orange-50 px-2 py-1">
                  Tamaño {a.size}
                </span>
                <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">
                  En adopción
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
