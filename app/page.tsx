"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { GlassCard } from "./components/GlassCard";
import { Editor } from "./components/Editor";
import Auth from "./components/Auth";

export default function Page() {
  const [blur, setBlur] = useState(14);
  const [opacity, setOpacity] = useState(0.52);
  const [color, setColor] = useState("#ffffff");
  const [savedPresets, setSavedPresets] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const fetchPresets = async () => {
    const { data, error } = await supabase
      .from("presets")
      .select("*")
      .order("likes", { ascending: false });
    if (!error && data) setSavedPresets(data);
  };

  useEffect(() => {
    fetchPresets();

    // ПРАВКА №1: Получаем юзера и следим за его состоянием
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ПРАВКА №2: Передаем user_id при сохранении
  const saveToCloud = async () => {
    if (!user) {
      alert("Please sign in to save your presets!");
      return;
    }

    const { error } = await supabase.from("presets").insert([
      {
        blur,
        opacity,
        color,
        likes: 0,
        user_id: user.id, // <--- Теперь RLS поймет, что это твой пресет
      },
    ]);

    if (!error) {
      fetchPresets();
    } else {
      alert("Error saving: " + error.message);
    }
  };

  const deletePreset = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const { error } = await supabase.from("presets").delete().eq("id", id);

    if (error) {
      // ПРАВКА: Если RLS запретит удаление, мы об этом узнаем
      alert("You can only delete your own presets!");
    } else {
      fetchPresets();
    }
  };

  const addLike = async (
    e: React.MouseEvent,
    id: number,
    currentLikes: number,
  ) => {
    e.stopPropagation();
    await supabase
      .from("presets")
      .update({ likes: currentLikes + 1 })
      .eq("id", id);
    fetchPresets();
  };

  const applyPreset = (p: any) => {
    setBlur(p.blur);
    setOpacity(p.opacity);
    setColor(p.color);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 flex flex-col items-center relative">
      {/* ПРАВКА №3: Добавляем компонент Auth на страницу */}
      <div className="absolute top-8 right-8 z-50">
        <Auth />
      </div>

      <h1 className="text-4xl font-black mb-10 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Glassmorphism Cloud
      </h1>

      <Editor
        blur={blur}
        setBlur={setBlur}
        opacity={opacity}
        setOpacity={setOpacity}
        color={color}
        setColor={setColor}
        onSave={saveToCloud}
        hexToRgb={hexToRgb}
      />

      <div className="w-full max-w-6xl mt-12">
        <h2 className="text-2xl font-bold mb-8 text-slate-300">
          Community Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedPresets.map((p) => (
            <GlassCard
              key={p.id}
              preset={p}
              onApply={applyPreset}
              onLike={addLike}
              onDelete={deletePreset}
              hexToRgb={hexToRgb}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
