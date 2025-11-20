"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { usePetify } from "../contexts/PetifyContext";

export default function PublishAnimalForm() {
  const { createAnimal } = usePetify();
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      species: "",
      age: "",
      size: "",
      location: "",
      description: "",
      image: "", 
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Campo obligatorio";
      if (!values.species) errors.species = "Campo obligatorio";
      if (!values.age) errors.age = "Campo obligatorio";
      if (!values.size) errors.size = "Campo obligatorio";
      if (!values.location) errors.location = "Campo obligatorio";
      if (!values.description) errors.description = "Campo obligatorio";
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setError("");

        const payload = { ...values, image: "" };

        await createAnimal(payload);

        resetForm();
        setShowSuccess(true);
      } catch (e) {
        setError("Hubo un problema al publicar el animal");
      }
    },
  });

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-6 py-10">
      {showSuccess && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-zinc-900">
              Animal publicado
            </h3>
            <p className="mb-4 text-sm text-zinc-600">
              El perfil del animal se guardó correctamente y ahora puede
              aparecer en la sección de animales en adopción.
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
            Publicar un animal en adopción
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600">
            Completá los datos del animal para que posibles adoptantes puedan
            conocerlo.
          </p>
        </header>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-4 space-y-5 rounded-3xl border border-orange-100 bg-white p-6 shadow-md"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Nombre del animal
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
              <label className="text-xs font-medium text-zinc-700">
                Especie
              </label>
              <input
                type="text"
                name="species"
                placeholder="Perro, gato, etc."
                value={formik.values.species}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
              />
              {formik.touched.species && formik.errors.species && (
                <p className="text-xs text-red-500">{formik.errors.species}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Edad aproximada
              </label>
              <input
                type="text"
                name="age"
                placeholder="Cachorro, adulto, 3 años, etc."
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-xs text-red-500">{formik.errors.age}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Tamaño
              </label>
              <input
                type="text"
                name="size"
                placeholder="Chico, mediano, grande"
                value={formik.values.size}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
              />
              {formik.touched.size && formik.errors.size && (
                <p className="text-xs text-red-500">{formik.errors.size}</p>
              )}
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
                <p className="text-xs text-red-500">
                  {formik.errors.location}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700">
              Descripción del animal
            </label>
            <textarea
              name="description"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-xs text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>

          
          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-400"
            >
              Publicar animal
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
