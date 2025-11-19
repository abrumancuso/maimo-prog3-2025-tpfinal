"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AnimalDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchAnimal() {
      try {
        const res = await fetch(`${API_URL}/animales/${id}`);
        if (!res.ok) {
          setError("No se pudo cargar el animal");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAnimal(data.animal || null);
      } catch (e) {
        setError("Hubo un error al buscar el animal");
      } finally {
        setLoading(false);
      }
    }

    fetchAnimal();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      nombrePersona: "",
      email: "",
      telefono: "",
      zona: "",
      tipoVivienda: "",
      conviveCon: "",
      otrasMascotas: "",
      mensaje: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.nombrePersona) errors.nombrePersona = "Campo obligatorio";
      if (!values.email) errors.email = "Campo obligatorio";
      if (!values.zona) errors.zona = "Campo obligatorio";
      if (!values.tipoVivienda) errors.tipoVivienda = "Campo obligatorio";
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(`${API_URL}/adoptions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            animalId: id,
            animalName: animal?.name,
            ...values,
          }),
        });

        if (!res.ok) {
          setError("Hubo un problema al enviar la solicitud");
          return;
        }

        resetForm();
        setShowModal(true);
        setShowForm(false);
      } catch (e) {
        setError("Hubo un problema al enviar la solicitud");
      }
    },
  });

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-zinc-500">Cargando animal...</p>
      </main>
    );
  }

  if (error || !animal) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-red-500">
          {error || "Animal no encontrado"}
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
              Solicitud enviada
            </h3>
            <p className="mb-4 text-sm text-zinc-600">
              Recibimos tus datos para adoptar a {animal.name}. Nos pondremos en
              contacto pronto.
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

<section className="relative overflow-hidden rounded-4xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-8 shadow-lg">
  <div className="grid gap-8 md:grid-cols-[1.1fr,1.2fr] md:items-center">
    <div className="relative">
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-orange-100 shadow-md">
        {animal.image && (
          <Image
            src={`/${animal.image}`}
            alt={animal.name}
            fill
            className="object-cover object-center"
            priority
          />
        )}
      </div>
    </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              En adopción
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
              {animal.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600">
              {animal.species} · {animal.age} · tamaño {animal.size} ·{" "}
              {animal.location}
            </p>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {animal.description}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-2 rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-orange-400"
            >
              Quiero adoptar a este animal
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-3xl self-center w-full">
        {showForm && (
          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              Información para la adopción
            </h2>
            <p className="mb-4 text-sm text-zinc-600">
              Contanos un poco sobre tu contexto para asegurarnos de que{" "}
              {animal.name} llegue al hogar adecuado.
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Nombre y apellido
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
                    Email de contacto
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
                    Zona donde vivís
                  </label>
                  <input
                    type="text"
                    name="zona"
                    value={formik.values.zona}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                  {formik.touched.zona && formik.errors.zona && (
                    <p className="text-xs text-red-500">
                      {formik.errors.zona}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Tipo de vivienda
                  </label>
                  <select
                    name="tipoVivienda"
                    value={formik.values.tipoVivienda}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  >
                    <option value="">Seleccionar</option>
                    <option value="departamento">Departamento</option>
                    <option value="casa_con_patio">Casa con patio</option>
                    <option value="casa_sin_patio">Casa sin patio</option>
                  </select>
                  {formik.touched.tipoVivienda &&
                    formik.errors.tipoVivienda && (
                      <p className="text-xs text-red-500">
                        {formik.errors.tipoVivienda}
                      </p>
                    )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    ¿Con quién vivís?
                  </label>
                  <input
                    type="text"
                    name="conviveCon"
                    value={formik.values.conviveCon}
                    onChange={formik.handleChange}
                    placeholder="Solo, pareja, familia, niñes, etc."
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  ¿Tenés otras mascotas?
                </label>
                <input
                  type="text"
                  name="otrasMascotas"
                  value={formik.values.otrasMascotas}
                  onChange={formik.handleChange}
                  placeholder="Perros, gatos u otros animales en casa"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  Contanos por qué querés adoptar a {animal.name}
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
                  Enviar solicitud
                </button>
              </div>
            </form>
          </div>
        )}

      </section>
    </main>
  );
}
