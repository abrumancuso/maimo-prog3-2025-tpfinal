import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-orange-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 shadow-md">
            <span className="text-2xl text-white">🐾</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-zinc-900">
              Petify
            </span>
            <span className="text-xs text-orange-600">
              Adoptar es conectar
            </span>
          </div>
        </div>

        <nav className="hidden gap-8 text-sm text-zinc-600 sm:flex">
          <Link
            href="/animales"
            className="hover:text-orange-600 transition font-medium"
          >
            Animales
          </Link>
          <button className="hover:text-orange-600 transition font-medium">
            Adoptantes
          </button>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <button className="hidden rounded-full border border-orange-200 px-4 py-1.5 text-zinc-700 font-medium hover:border-orange-500 hover:text-orange-600 transition sm:inline-flex">
            Iniciar sesión
          </button>
          <button className="rounded-full bg-orange-500 px-5 py-1.5 text-xs font-semibold text-white shadow hover:bg-orange-400 transition">
            Crear cuenta
          </button>
        </div>
      </div>
    </header>
  );
}
