"use client";

import { useFormik } from "formik";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PublicarAnimalPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      species: "",
      age: "",
      size: "",
      location: "",
      description: ""
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
      setError("");
      setSuccess("");

      try {
        const res = await fetch(`${API_URL}/animales`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            species: values.species,
            age: values.age,
            size: values.size,
            location: values.location,
            description: values.description
          })
        });

        if (!res.ok) {
          setError("Hubo un problema al publicar el animal");
          return;
        }

        resetForm();
        setSuccess("El animal se publicó en Petify.");
      } catch (e) {
        setError("No se pudo conectar con la API");
      }
    }
  });

  return (
    <main className="mx-auto min-h-[70vh] max-w-3xl px-6 py-10">
      <h1 className="mb-4 text-2xl font-semibold text-zinc-900">
        Quiero publicar un animal
      </h1>
      <p className="mb-6 text-sm text-zinc-600">
        Completá los datos para que las personas puedan conocer la historia del animal.
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-700">Nombre del animal</label>
          <input
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
          <label className="text-xs font-medium text-zinc-700">Especie</label>
          <select
            name="species"
            value={formik.values.species}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
          >
            <option value="">Seleccionar</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
          {formik.touched.species && formik.errors.species && (
            <p className="text-xs text-red-500">{formik.errors.species}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-700">Edad</label>
          <input
            name="age"
            placeholder="Cachorro, 2 años, adulto, etc."
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
          <label className="text-xs font-medium text-zinc-700">Tamaño</label>
          <select
            name="size"
            value={formik.values.size}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
          >
            <option value="">Seleccionar</option>
            <option value="chico">Chico</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
          {formik.touched.size && formik.errors.size && (
            <p className="text-xs text-red-500">{formik.errors.size}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-700">Ubicación</label>
          <input
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

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-700">
            Historia y carácter
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
            <p className="text-xs text-red-500">{formik.errors.description}</p>
          )}
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
        {success && <p className="text-xs text-emerald-600">{success}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-400"
          >
            Publicar animal
          </button>
        </div>
      </form>
    </main>
  );
}
