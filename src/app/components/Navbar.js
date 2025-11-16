import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="border-b border-orange-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/petifylogo.png"
            alt="Petify logo"
            width={70}
            height={70}
            className="object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold tracking-tight text-zinc-900">
              Petify
            </span>
            <span className="text-sm text-orange-600">
              Adoptar es conectar
            </span>
          </div>
        </Link>

        <nav className="hidden gap-10 text-sm text-zinc-700 sm:flex">
          <Link href="/" className="hover:text-orange-600 transition font-medium">
            Home
          </Link>
          <Link href="/animales" className="hover:text-orange-600 transition font-medium">
            Animales
          </Link>
          <button className="hover:text-orange-600 transition font-medium">
            Adoptantes
          </button>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <button className="hidden rounded-full border border-orange-300 px-5 py-2 text-zinc-700 font-medium hover:border-orange-500 hover:text-orange-600 transition sm:inline-flex">
            Iniciar sesión
          </button>

          <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-orange-400 transition">
            Crear cuenta
          </button>
        </div>

      </div>
    </header>
  );
}
