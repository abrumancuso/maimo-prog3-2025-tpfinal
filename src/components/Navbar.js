"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) =>
    pathname === path ? "text-orange-500 font-semibold" : "text-zinc-700";

  return (
    <nav className="w-full border-b border-orange-100 bg-white py-4 px-6 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <img src="petifylogo.png" alt="Petify" className="h-7" />
        <span className="text-orange-500 text-xs font-semibold">
          Petify:
          Adoptar es conectar
        </span>
      </Link>

      <div className="flex items-center gap-8 text-sm">
        <Link href="/" className={isActive("/")}>
          Home
        </Link>

        <Link href="/animales" className={isActive("/animales")}>
          Animales
        </Link>

        <Link href="/adoptantes" className={isActive("/adoptantes")}>
          Adoptantes
        </Link>

        <Link href="/about" className={isActive("/about")}>
          About
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-full border px-4 py-1.5 text-sm">
          Iniciar sesión
        </button>
        <button className="rounded-full bg-orange-500 px-4 py-1.5 text-sm text-white">
          Crear cuenta
        </button>
      </div>
    </nav>
  );
}
