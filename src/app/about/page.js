export default function AboutPage() {
    return (
      <main className="mx-auto min-h-[80vh] max-w-5xl px-6 py-14">
        <section className="rounded-4xl border border-orange-200 bg-orange-50/40 px-10 py-14 shadow-lg">
          <div className="flex items-center gap-4 mb-10">
            <img
              src="/petifylogo.png"
              alt="Petify logo"
              className="w-14 h-14 rounded-2xl shadow-sm"
            />
            <div>
              <h1 className="text-3xl font-semibold text-zinc-900">Sobre Petify</h1>
              <p className="text-sm text-orange-500">Adoptar es conectar</p>
            </div>
          </div>
  
          <p className="text-zinc-700 leading-relaxed mb-6">
            Petify nace como un puente entre personas que desean adoptar y quienes
            rescatan, cuidan o buscan un nuevo hogar para un animal. Creemos en un
            proceso de adopción responsable, humano y transparente, donde cada match
            tenga sentido.
          </p>
  
          <p className="text-zinc-700 leading-relaxed mb-6">
            Nuestro objetivo es facilitar la conexión: que los rescatistas puedan
            publicar animales de manera rápida y clara, y que los adoptantes
            encuentren información honesta y perfiles reales para tomar una buena
            decisión.
          </p>
  
          <p className="text-zinc-700 leading-relaxed mb-10">
            La adopción responsable transforma vidas. Petify quiere ser parte de ese
            cambio, creando un espacio amigable, seguro y lleno de empatía.
          </p>
  
          <div className="grid gap-6 md:grid-cols-2 mt-10">
            <div className="rounded-3xl border border-orange-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                Nuestra misión
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Promover adopciones responsables mediante perfiles claros,
                formularios seguros y un entorno digital accesible.
              </p>
            </div>
  
            <div className="rounded-3xl border border-orange-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                Qué buscamos
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Más hogares felices, menos abandonos y más información para que cada
                persona encuentre al animal ideal para su estilo de vida.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16 rounded-[32px] border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-10 shadow-[0_18px_70px_rgba(0,0,0,0.06)]">
  <div className="flex flex-col md:flex-row items-center gap-10">

    {/* FOTO CUADRADA */}
    <div className="w-full max-w-xs overflow-hidden rounded-3xl shadow-lg">
      <img
        src="/abru.jpg"
        alt="Abril Mancuso"
        className="w-full h-72 object-cover"
      />
    </div>

    {/* TEXTO */}
    <div className="flex-1 text-center md:text-left space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
        Creadora de Petify
      </p>

      <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
        Abril Mancuso
      </h3>

      <p className="text-sm text-zinc-700 leading-relaxed max-w-xl">
        Soy estudiante de <span className="font-medium">Tecnología Multimedial</span> en la
        <span className="font-medium"> Universidad Maimónides</span>.  
        Siempre tuve una conexión especial con los animales, y este proyecto fue una oportunidad perfecta para unir diseño, tecnología y una causa que me importa mucho: impulsar la 
        <span className="font-medium"> adopción responsable</span>.
      </p>

      <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
          Diseño + Tecnología
        </span>
        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
          Adopción Responsable
        </span>
        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
          Proyecto Universitario
        </span>
      </div>

    </div>

  </div>
</div>




      </main>
    );
  }
  