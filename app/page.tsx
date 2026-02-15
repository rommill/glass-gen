"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { GlassCard } from "./components/GlassCard";
import { Editor } from "./components/Editor";
import Auth from "./components/Auth";

export default function Page() {
  // --- 1. СТЕЙТЫ (Данные) ---
  const [blur, setBlur] = useState(14);
  const [opacity, setOpacity] = useState(0.52);
  const [color, setColor] = useState("#ffffff");
  const [savedPresets, setSavedPresets] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [filterMyOwn, setFilterMyOwn] = useState(false);
  const [fetching, setFetching] = useState(true); // По умолчанию true, чтобы сразу показать загрузку

  // --- 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const fetchPresets = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("presets")
      .select("*")
      .order("likes", { ascending: false });
    if (!error && data) setSavedPresets(data);
    setFetching(false);
  };

  // --- 3. ЭФФЕКТЫ (Слушатели событий) ---
  useEffect(() => {
    fetchPresets();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- 4. ВЫЧИСЛЕНИЯ (Переменные на основе стейтов) ---
  const displayedPresets = filterMyOwn
    ? savedPresets.filter((p) => p.user_id === user?.id)
    : savedPresets;

  // --- 5. ОБРАБОТЧИКИ СОБЫТИЙ (Клики, сохранения) ---
  const saveToCloud = async () => {
    if (!user) {
      alert("Please sign in to save your presets!");
      return;
    }
    const { error } = await supabase
      .from("presets")
      .insert([{ blur, opacity, color, likes: 0, user_id: user.id }]);
    if (!error) fetchPresets();
  };

  const deletePreset = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const { error } = await supabase.from("presets").delete().eq("id", id);
    if (error) alert("You can only delete your own presets!");
    else fetchPresets();
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

  // --- 6. РЕНДЕР (Визуальная часть) ---
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 flex flex-col items-center relative">
      {/* Авторизация */}
      <div className="w-full lg:absolute lg:top-8 lg:right-8 lg:w-auto z-50 p-4 lg:p-0">
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
        {/* Заголовок галереи и Фильтр */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-300">
            {filterMyOwn ? "My Presets" : "Community Gallery"}
          </h2>

          {user && (
            <button
              onClick={() => setFilterMyOwn(!filterMyOwn)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                filterMyOwn
                  ? "bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {filterMyOwn ? "Show All" : "Filter My Own"}
            </button>
          )}
        </div>

        {/* ГАЛЕРЕЯ (С логикой загрузки) */}
        {fetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-white/5 border border-white/10 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedPresets.map((p) => (
              <div key={p.id} className="relative group">
                {user && p.user_id === user.id && (
                  <span className="absolute -top-2 -left-2 bg-cyan-500 text-[10px] font-bold px-2 py-1 rounded-full z-20 shadow-lg uppercase">
                    You
                  </span>
                )}
                <GlassCard
                  preset={p}
                  onApply={applyPreset}
                  onLike={addLike}
                  onDelete={
                    user && p.user_id === user.id ? deletePreset : undefined
                  }
                  hexToRgb={hexToRgb}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
