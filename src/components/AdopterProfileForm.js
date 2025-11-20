"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { usePetify } from "../contexts/PetifyContext";

export default function AdopterProfileForm() {
  const { createAdopter } = usePetify();
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      location: "",
      household: "",
      housingType: "",
      bio: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Campo obligatorio";
      if (!values.age) errors.age = "Campo obligatorio";
      if (!values.location) errors.location = "Campo obligatorio";
      if (!values.household) errors.household = "Campo obligatorio";
      if (!values.housingType) errors.housingType = "Campo obligatorio";
      if (!values.bio) errors.bio = "Campo obligatorio";
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setError("");
        await createAdopter(values);
        resetForm();
        setShowSuccess(true);
      } catch (e) {
        setError("Hubo un problema al guardar tu perfil");
      }
    },
  });

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-6 py-10">
      {showSuccess && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-zinc-900">
              Perfil guardado
            </h3>
            <p className="mb-4 text-sm text-zinc-600">
              Tus datos como adoptante se guardaron correctamente. Ahora tu
              perfil puede aparecer en la sección de adoptantes.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <section className="space-y-4">
        <header>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
            Crear mi perfil como adoptante
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600">
            Completá tus datos para que refugios y rescatistas puedan conocer
            qué tipo de hogar ofrecés.
          </p>
        </header>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-4 space-y-5 rounded-3xl border border-orange-100 bg-white p-6 shadow-md"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Nombre y apellido
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500">{formik.errors.name}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">Edad</label>
              <input
                type="number"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-xs text-red-500">{formik.errors.age}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700">
              Zona / ciudad
            </label>
            <input
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
            />
            {formik.touched.location && formik.errors.location && (
              <p className="text-xs text-red-500">{formik.errors.location}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Tipo de convivencia
              </label>
              <input
                type="text"
                name="household"
                placeholder="Solo, pareja, familia, etc."
                value={formik.values.household}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
              />
              {formik.touched.household && formik.errors.household && (
                <p className="text-xs text-red-500">
                  {formik.errors.household}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Tipo de vivienda
              </label>
              <input
                type="text"
                name="housingType"
                placeholder="Departamento, casa con patio, casa sin patio, etc."
                value={formik.values.housingType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
              />
              {formik.touched.housingType && formik.errors.housingType && (
                <p className="text-xs text-red-500">
                  {formik.errors.housingType}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700">
              Contanos sobre vos y qué tipo de animal estás buscando
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
            />
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-xs text-red-500">{formik.errors.bio}</p>
            )}
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-400"
            >
              Guardar mi perfil
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

