const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAnimals() {
  const res = await fetch(`${API_URL}/animales`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.animals || [];
}

export default async function AnimalsPage() {
  const animals = await getAnimals();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
          Animales en adopción
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-600">
          Estos son algunos de los perros y gatos cargados en Petify. La
          información viene directamente desde la API, donde se guardan las
          publicaciones.
        </p>
      </header>

      {animals.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Todavía no hay animales cargados en la base de datos.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {animals.map((animal) => {
            const emoji = animal.species === "gato" ? "🐱" : "🐶";

            return (
              <article
                key={animal._id}
                className="flex flex-col rounded-2xl border border-orange-100 bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <div className="mb-3 flex h-28 w-full items-center justify-center rounded-xl bg-orange-50 text-4xl">
                  {emoji}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-zinc-900">
                    {animal.name}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {animal.location}
                  </span>
                </div>

                <p className="mt-1 text-xs text-zinc-500">
                  {animal.species} · {animal.age} · tamaño {animal.size}
                </p>

                <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                  {animal.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-zinc-700">
                  <span className="rounded-full bg-orange-50 px-2 py-1">
                    {animal.species === "gato" ? "Gato" : "Perro"}
                  </span>
                  <span className="rounded-full bg-orange-50 px-2 py-1">
                    Tamaño {animal.size}
                  </span>
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">
                    En adopción
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
