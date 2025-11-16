import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* HERO */}
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
            cómo es su carácter y qué tipo de hogar necesita. La idea es
            construir un puente entre quienes buscan un compañero y quienes
            necesitan uno.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="rounded-full bg-orange-500 px-7 py-2 text-sm font-semibold text-white shadow-md hover:bg-orange-400 transition">
              Quiero adoptar
            </button>
            <button className="rounded-full border border-orange-200 bg-orange-50 px-7 py-2 text-sm font-semibold text-orange-600 hover:border-orange-400 hover:bg-white transition">
              Quiero publicar un animal
            </button>
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
    <p className="text-sm font-semibold text-zinc-900">Abril + Luna</p>
  </div>
</div>
    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
      “Luna apareció en mi barrio en pleno invierno. La publiqué en Petify con unas fotos
      y un poco de su historia. A los pocos días una familia de CABA se enamoró de ella
      y hoy duerme en una cama calentita.”
    </p>

    <div className="flex flex-wrap gap-2 text-[11px] text-zinc-700">
      <span className="rounded-full bg-orange-50 px-3 py-1">
        Perra mediana · 2 años
      </span>
      <span className="rounded-full bg-orange-50 px-3 py-1">
        Convive con otros perros
      </span>
    </div>
  </div>
</div>
      </section>

      {/* POR QUÉ EXISTE PETIFY */}
      <section className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
          ¿Por qué Petify y no otro portal más?
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Muchos sitios de adopción funcionan como catálogos fríos: fotos,
            edad, tamaño y poco más. Petify nace con otra idea: que cada
            publicación tenga contexto, historia y un tono cercano. La página
            está pensada para Argentina y para que personas particulares puedan
            publicar animales sin depender únicamente de refugios u
            organizaciones.
          </p>

          <div className="space-y-3 text-sm text-zinc-700">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
              <p className="text-xs font-semibold text-orange-600">
                Más que una ficha
              </p>
              <p className="text-xs mt-1">
                Cada publicación cuenta quién es el animal, cómo llegó hasta
                ahí y qué tipo de hogar le haría bien.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
              <p className="text-xs font-semibold text-orange-600">
                Personas en el centro
              </p>
              <p className="text-xs mt-1">
                El perfil del humano también importa: ubicación, rutinas,
                convivencia con otros animales o niños.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
              <p className="text-xs font-semibold text-orange-600">
                Puente, no catálogo
              </p>
              <p className="text-xs mt-1">
                La idea es que Petify sea un puente real entre historias, no
                solo una lista de anuncios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
          ¿Cómo funciona Petify?
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-600">
          El flujo está pensado para que sea simple tanto para quien publica
          como para quien adopta. Ahora lo ves como maqueta de diseño; más
          adelante estos pasos se conectan con la lógica del backend y la base
          de datos.
        </p>

        <div className="grid gap-5 sm:grid-cols-3">
          <article className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-orange-600 mb-1">
              Paso 1 · Crear tu perfil
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              La persona completa sus datos básicos, ubicación y algunas
              preguntas sobre su estilo de vida. Eso después vive como usuario
              en la base de datos.
            </p>
          </article>

          <article className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-orange-600 mb-1">
              Paso 2 · Publicar o buscar
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Quien publica carga la ficha del perro o gato con fotos, historia
              y datos clave. Quien busca puede filtrar por especie, edad,
              tamaño, ubicación y convivencia.
            </p>
          </article>

          <article className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-orange-600 mb-1">
              Paso 3 · Postularse para adoptar
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              La persona interesada completa un pequeño formulario y se genera
              un contacto responsable entre ambas partes para seguir el proceso
              por fuera de la plataforma.
            </p>
          </article>
        </div>
      </section>

      {/* HISTORIAS / TARJETAS EJEMPLO */}
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
            Historias que podrían vivir en Petify
          </h2>
          <p className="text-xs text-zinc-500">
            Estas tarjetas son solo ejemplos visuales. Más adelante se llenan
            con datos reales desde el backend.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-orange-100 bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition">
            <div className="mb-3 flex h-28 w-full items-center justify-center rounded-xl bg-orange-50 text-4xl">
              🐶
            </div>
            <span className="text-sm font-semibold text-zinc-900">
              Roma · Perra grande
            </span>
            <span className="text-xs text-zinc-500">Zona Sur · 4 años</span>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              Fue abandonada al mudarse su familia. Es tranquila y ya está
              castrada. Busca un hogar donde la dejen quedarse para siempre.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-zinc-700">
              <span className="rounded-full bg-orange-50 px-2 py-1">
                Perra
              </span>
              <span className="rounded-full bg-orange-50 px-2 py-1">
                Tamaño grande
              </span>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">
                Castrada
              </span>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-orange-100 bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition">
            <div className="mb-3 flex h-28 w-full items-center justify-center rounded-xl bg-orange-50 text-4xl">
              🐱
            </div>
            <span className="text-sm font-semibold text-zinc-900">
              Milo · Gato joven
            </span>
            <span className="text-xs text-zinc-500">CABA · 1 año</span>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              Lo encontraron en un balcón. Es curioso y juguetón, ideal para
              departamento y personas que disfruten del movimiento.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-zinc-700">
              <span className="rounded-full bg-orange-50 px-2 py-1">
                Gato
              </span>
              <span className="rounded-full bg-orange-50 px-2 py-1">
                Tamaño chico
              </span>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">
                Ideal depto
              </span>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-orange-100 bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition">
            <div className="mb-3 flex h-28 w-full items-center justify-center rounded-xl bg-orange-50 text-4xl">
              🐶
            </div>
            <span className="text-sm font-semibold text-zinc-900">
              Coco · Cachorro
            </span>
            <span className="text-xs text-zinc-500">Rosario · 8 meses</span>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              Lo rescataron de una caja en la calle. Tiene mucha energía y se
              lleva bien con niños. Necesita una familia que tenga ganas de
              educarlo.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-zinc-700">
              <span className="rounded-full bg-orange-50 px-2 py-1">
                Perro
              </span>
              <span className="rounded-full bg-orange-50 px-2 py-1">
                Cachorro
              </span>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">
                Convive con niños
              </span>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
