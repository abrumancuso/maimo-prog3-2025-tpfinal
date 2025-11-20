"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PetifyContext = createContext(null);

export function PetifyProvider({ children }) {
  const [animals, setAnimals] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnimals = useCallback(async () => {
    try {
      setError("");
      const res = await axios.get(`${API_URL}/animales`);
      setAnimals(res.data.animals || []);
    } catch (e) {
      setError("Error al cargar animales");
    }
  }, []);

  const fetchAdopters = useCallback(async () => {
    try {
      setError("");
      const res = await axios.get(`${API_URL}/adoptantes`);
      setAdopters(res.data.adoptantes || []);
    } catch (e) {
      setError("Error al cargar adoptantes");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchAnimals(), fetchAdopters()]).finally(() => {
      setLoading(false);
    });
  }, [fetchAnimals, fetchAdopters]);

  const getAnimalById = useCallback(async (id) => {
    try {
      setError("");
      const res = await axios.get(`${API_URL}/animales/${id}`);
      return res.data.animal || null;
    } catch (e) {
      setError("Hubo un error al buscar el animal");
      return null;
    }
  }, []);

  const getAdopterById = useCallback(async (id) => {
    try {
      setError("");
      const res = await axios.get(`${API_URL}/adoptantes/${id}`);
      return res.data.adoptante || null;
    } catch (e) {
      setError("Hubo un error al buscar el perfil");
      return null;
    }
  }, []);

  const createAnimal = useCallback(async (payload) => {
    try {
      setError("");
      const res = await axios.post(`${API_URL}/animales`, payload);
      const created = res.data.animal;
      if (created) {
        setAnimals((prev) => [created, ...prev]);
      }
      return { ok: true, animal: created };
    } catch (e) {
      setError("Hubo un problema al publicar el animal");
      return { ok: false };
    }
  }, []);

  const createAdopter = useCallback(async (payload) => {
    try {
      setError("");
      const res = await axios.post(`${API_URL}/adoptantes`, payload);
      const created = res.data.adoptante;
      if (created) {
        setAdopters((prev) => [created, ...prev]);
      }
      return { ok: true, adopter: created };
    } catch (e) {
      setError("Hubo un problema al guardar tu perfil");
      return { ok: false };
    }
  }, []);

  const value = {
    animals,
    adopters,
    loading,
    error,
    fetchAnimals,
    fetchAdopters,
    getAnimalById,
    getAdopterById,
    createAnimal,
    createAdopter,
  };

  return <PetifyContext.Provider value={value}>{children}</PetifyContext.Provider>;
}

export function usePetify() {
  const ctx = useContext(PetifyContext);
  if (!ctx) throw new Error("usePetify debe usarse dentro de PetifyProvider");
  return ctx;
}
