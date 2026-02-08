"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { GlassCard } from "./components/GlassCard";
import { Editor } from "./components/Editor";

export default function Page() {
  const [blur, setBlur] = useState(14);
  const [opacity, setOpacity] = useState(0.52);
  const [color, setColor] = useState("#ffffff");
  const [savedPresets, setSavedPresets] = useState<any[]>([]);

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
  }, []);

  const saveToCloud = async () => {
    const { error } = await supabase
      .from("presets")
      .insert([{ blur, opacity, color, likes: 0 }]);
    if (!error) fetchPresets();
  };

  const deletePreset = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    await supabase.from("presets").delete().eq("id", id);
    fetchPresets();
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
    <div className="min-h-screen bg-[#0f172a] text-white p-8 flex flex-col items-center">
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

      <div className="w-full max-w-6xl">
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
