"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdopterDetailPage() {
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
        setError("");
        setLoading(true);
        const res = await fetch(`${API_URL}/adoptantes/${id}`);
        if (!res.ok) {
          setError("Hubo un error al buscar el perfil");
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
      nombrePersona: "",
      email: "",
      telefono: "",
      nombreAnimal: "",
      especie: "",
      edadAnimal: "",
      tamanio: "",
      descripcionConvivencia: "",
      mensaje: "",
    },
    validate: values => {
      const errors = {};
      if (!values.nombrePersona) errors.nombrePersona = "Campo obligatorio";
      if (!values.email) errors.email = "Campo obligatorio";
      if (!values.nombreAnimal) errors.nombreAnimal = "Campo obligatorio";
      if (!values.especie) errors.especie = "Campo obligatorio";
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setError("");
        const res = await fetch(`${API_URL}/propuestas-adopcion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adoptanteId: id,
            adoptanteName: adoptante?.name,
            ...values,
          }),
        });

        if (!res.ok) {
          setError("Hubo un problema al enviar la propuesta");
          return;
        }

        resetForm();
        setShowForm(false);
        setShowModal(true);
      } catch (e) {
        setError("Hubo un problema al enviar la propuesta");
      }
    },
  });

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-zinc-500">Cargando perfil...</p>
      </main>
    );
  }

  if (error && !adoptante) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-red-500">
          {error || "Perfil no encontrado"}
        </p>
      </main>
    );
  }

  if (!adoptante) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-red-500">Perfil no encontrado</p>
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
              Tu propuesta para {adoptante.name} fue enviada. Si es un buen
              match, se pondrán en contacto con vos.
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

      <section className="relative overflow-hidden rounded-4xl border border-orange-200 bg-linear-to-br from-orange-50 via-white to-amber-50 p-8 shadow-lg">
        <div className="grid gap-8 md:grid-cols-[1.1fr,1.2fr] md:items-center">
          <div className="relative">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-orange-100 shadow-md flex items-center justify-center">
              {adoptante.image && (
                <Image
                  src={`/${adoptante.image}`}
                  alt={adoptante.name}
                  width={320}
                  height={240}
                  className="object-cover rounded-3xl"
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              Perfil de adoptante
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
              {adoptante.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600">
              {adoptante.age} años · {adoptante.household} ·{" "}
              {adoptante.housingType} · {adoptante.location}
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
              Contale sobre el animal que querés proponer
            </h2>
            <p className="mb-4 text-sm text-zinc-600">
              Completá los datos del animal y cómo sería la convivencia con{" "}
              {adoptante.name}.
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Tu nombre y apellido
                  </label>
                  <input
                    type="text"
                    name="nombrePersona"
                    value={formik.values.nombrePersona}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                  {formik.touched.nombrePersona &&
                    formik.errors.nombrePersona && (
                      <p className="text-xs text-red-500">
                        {formik.errors.nombrePersona}
                      </p>
                    )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Tu email de contacto
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-red-500">
                      {formik.errors.email}
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
                    name="telefono"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

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
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Especie
                  </label>
                  <input
                    type="text"
                    name="especie"
                    value={formik.values.especie}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Perro, gato, etc."
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                  {formik.touched.especie && formik.errors.especie && (
                    <p className="text-xs text-red-500">
                      {formik.errors.especie}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Edad aproximada
                  </label>
                  <input
                    type="text"
                    name="edadAnimal"
                    value={formik.values.edadAnimal}
                    onChange={formik.handleChange}
                    placeholder="Cachorro, adulto, 3 años, etc."
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Tamaño
                  </label>
                  <input
                    type="text"
                    name="tamanio"
                    value={formik.values.tamanio}
                    onChange={formik.handleChange}
                    placeholder="Chico, mediano, grande"
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  Cómo es la convivencia actual
                </label>
                <textarea
                  name="descripcionConvivencia"
                  rows={3}
                  value={formik.values.descripcionConvivencia}
                  onChange={formik.handleChange}
                  placeholder="Dónde vive ahora, con quién convive, rutinas, paseos, etc."
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  Mensaje para {adoptante.name}
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  value={formik.values.mensaje}
                  onChange={formik.handleChange}
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
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
