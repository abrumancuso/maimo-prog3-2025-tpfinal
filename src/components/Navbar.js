"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) =>
    pathname === path
      ? "text-orange-600 font-semibold"
      : "text-zinc-600 hover:text-orange-500";

  return (
    <header className="border-b border-orange-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3 group"
        >
          <div className="relative h-20 w-20">
            <Image
              src="/petifylogo.png"
              alt="Petify logo"
              fill
              className="object-contain transition-transform group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col leading-tight text-left">
            <span className="text-lg font-bold tracking-tight text-zinc-900 group-hover:text-orange-600 transition">
              Petify
            </span>
            <span className="text-xs text-orange-600">
              Adoptar es conectar
            </span>
          </div>
        </button>

        <nav className="hidden gap-8 text-sm sm:flex">
          <button
            onClick={() => router.push("/")}
            className={`${isActive(
              "/"
            )} transition-colors duration-200 font-medium`}
          >
            Home
          </button>

          <button
            onClick={() => router.push("/animales")}
            className={`${isActive(
              "/animales"
            )} transition-colors duration-200 font-medium`}
          >
            Animales
          </button>

          <button
            onClick={() => router.push("/adoptantes")}
            className={`${isActive(
              "/adoptantes"
            )} transition-colors duration-200 font-medium`}
          >
            Adoptantes
          </button>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <button className="hidden rounded-full border border-orange-200 px-4 py-1.5 text-zinc-700 font-medium transition-all hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 sm:inline-flex">
            Iniciar sesión
          </button>

          <button className="rounded-full bg-orange-500 px-5 py-1.5 text-xs font-semibold text-white shadow transition-all hover:bg-orange-400 hover:shadow-md">
            Crear cuenta
          </button>
        </div>
      </div>
    </header>
  );
}
