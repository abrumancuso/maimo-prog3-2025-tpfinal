"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdoptanteDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [adoptante, setAdoptante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchAdoptante() {
      try {
        const res = await fetch(`${API_URL}/adoptantes/${id}`);
        if (!res.ok) {
          setError("No se pudo cargar el perfil");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAdoptante(data.adoptante || null);
      } catch (e) {
        setError("Hubo un error al buscar el perfil");
      } finally {
        setLoading(false);
      }
    }

    fetchAdoptante();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      nombreContacto: "",
      emailContacto: "",
      telefonoContacto: "",
      nombreAnimal: "",
      especieAnimal: "",
      edadAnimal: "",
      tamanoAnimal: "",
      conviveConOtrosAnimales: "",
      ubicacionAnimal: "",
      descripcionAnimal: ""
    },
    validate: (values) => {
      const errors = {};
      if (!values.nombreContacto) errors.nombreContacto = "Campo obligatorio";
      if (!values.emailContacto) errors.emailContacto = "Campo obligatorio";
      if (!values.nombreAnimal) errors.nombreAnimal = "Campo obligatorio";
      if (!values.especieAnimal) errors.especieAnimal = "Campo obligatorio";
      if (!values.descripcionAnimal)
        errors.descripcionAnimal = "Contanos un poco sobre el animal";
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(`${API_URL}/propuestas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adoptanteId: id,
            adoptanteName: adoptante?.name,
            ...values
          })
        });

        if (!res.ok) {
          setError("Hubo un problema al enviar la propuesta");
          return;
        }

        resetForm();
        setShowModal(true);
        setShowForm(false);
      } catch (e) {
        setError("Hubo un problema al enviar la propuesta");
      }
    }
  });

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-zinc-500">Cargando perfil...</p>
      </main>
    );
  }

  if (error || !adoptante) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-red-500">
          {error || "Perfil no encontrado"}
        </p>
      </main>
    );
  }

  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col gap-10 px-6 py-10">
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-zinc-900">
              Propuesta enviada
            </h3>
            <p className="mb-4 text-sm text-zinc-600">
              Le acercamos tu propuesta a {adoptante.name}. Si le encaja tu
              animal, se pondrán en contacto con vos.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden rounded-[32px] border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-8 shadow-lg">
        <div className="grid gap-8 md:grid-cols-[1.1fr,1.2fr] md:items-center">
          <div className="relative">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-orange-100 shadow-md">
              {adoptante.image && (
                <Image
                  src={`/${adoptante.image}`}
                  alt={adoptante.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              Perfil adoptante
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
              {adoptante.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600">
              {adoptante.age} años · {adoptante.location} ·{" "}
              {adoptante.household} · {adoptante.housingType}
            </p>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {adoptante.bio}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-2 rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-orange-400"
            >
              Tengo un animal para vos
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-3xl self-center w-full">
        {showForm && (
          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              Contale qué animal tenés para ofrecer
            </h2>
            <p className="mb-4 text-sm text-zinc-600">
              Completá los datos del animal y tu contacto para ver si encaja con
              lo que {adoptante.name} está buscando.
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    name="nombreContacto"
                    value={formik.values.nombreContacto}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                  {formik.touched.nombreContacto &&
                    formik.errors.nombreContacto && (
                      <p className="text-xs text-red-500">
                        {formik.errors.nombreContacto}
                      </p>
                    )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="emailContacto"
                    value={formik.values.emailContacto}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                  {formik.touched.emailContacto &&
                    formik.errors.emailContacto && (
                      <p className="text-xs text-red-500">
                        {formik.errors.emailContacto}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="telefonoContacto"
                    value={formik.values.telefonoContacto}
                    onChange={formik.handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Ubicación del animal
                  </label>
                  <input
                    type="text"
                    name="ubicacionAnimal"
                    value={formik.values.ubicacionAnimal}
                    onChange={formik.handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Nombre del animal
                  </label>
                  <input
                    type="text"
                    name="nombreAnimal"
                    value={formik.values.nombreAnimal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                  {formik.touched.nombreAnimal &&
                    formik.errors.nombreAnimal && (
                      <p className="text-xs text-red-500">
                        {formik.errors.nombreAnimal}
                      </p>
                    )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Especie
                  </label>
                  <select
                    name="especieAnimal"
                    value={formik.values.especieAnimal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  >
                    <option value="">Seleccionar</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="otro">Otro</option>
                  </select>
                  {formik.touched.especieAnimal &&
                    formik.errors.especieAnimal && (
                      <p className="text-xs text-red-500">
                        {formik.errors.especieAnimal}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Edad aprox.
                  </label>
                  <input
                    type="text"
                    name="edadAnimal"
                    value={formik.values.edadAnimal}
                    onChange={formik.handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Tamaño
                  </label>
                  <select
                    name="tamanoAnimal"
                    value={formik.values.tamanoAnimal}
                    onChange={formik.handleChange}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  >
                    <option value="">Seleccionar</option>
                    <option value="chico">Chico</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    ¿Convive con otros animales?
                  </label>
                  <select
                    name="conviveConOtrosAnimales"
                    value={formik.values.conviveConOtrosAnimales}
                    onChange={formik.handleChange}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  >
                    <option value="">Seleccionar</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                    <option value="no_sabe">No sabe</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  Descripción del animal
                </label>
                <textarea
                  name="descripcionAnimal"
                  rows={4}
                  value={formik.values.descripcionAnimal}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
                {formik.touched.descripcionAnimal &&
                  formik.errors.descripcionAnimal && (
                    <p className="text-xs text-red-500">
                      {formik.errors.descripcionAnimal}
                    </p>
                  )}
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-600 hover:border-zinc-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-400"
                >
                  Enviar propuesta
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
