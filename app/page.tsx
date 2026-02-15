"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { GlassCard } from "./components/GlassCard";
import { Editor } from "./components/Editor";
import Auth from "./components/Auth";
import { GalleryHeader } from "./components/GalleryHeader";
import { BackgroundSwitcher } from "./components/BackgroundSwitcher";
import { Preset, BACKGROUNDS, BgType, hexToRgb } from "./constants";
import { usePresets } from "./hooks/usePresets";
import { User } from "@supabase/supabase-js";

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [filterMyOwn, setFilterMyOwn] = useState(false);
  const [sortBy, setSortBy] = useState<"likes" | "created_at">("likes");
  const [bgType, setBgType] = useState<BgType>("dark");

  const [blur, setBlur] = useState(14);
  const [opacity, setOpacity] = useState(0.52);
  const [color, setColor] = useState("#ffffff");

  const { presets, fetching, fetchPresets, addLike, deletePreset } =
    usePresets(sortBy);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const saveToCloud = async () => {
    if (!user) return alert("Please sign in!");
    const { error } = await supabase
      .from("presets")
      .insert([{ blur, opacity, color, likes: 0, user_id: user.id }]);
    if (!error) fetchPresets();
  };

  const displayedPresets = filterMyOwn
    ? presets.filter((p) => p.user_id === user?.id)
    : presets;

  return (
    <div
      className={`min-h-screen ${BACKGROUNDS[bgType]} text-white p-8 flex flex-col items-center relative transition-all duration-700`}
    >
      <div className="w-full lg:absolute lg:top-8 lg:right-8 lg:w-auto z-50 p-4 lg:p-0">
        <Auth />
      </div>

      <h1 className="text-4xl font-black mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-center">
        Glassmorphism Cloud
      </h1>

      <BackgroundSwitcher bgType={bgType} setBgType={setBgType} />

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
        <GalleryHeader
          filterMyOwn={filterMyOwn}
          setFilterMyOwn={setFilterMyOwn}
          sortBy={sortBy}
          setSortBy={setSortBy}
          user={user}
        />

        {fetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-white/5 border border-white/10 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedPresets.map((p: Preset) => (
              <div key={p.id} className="relative group">
                {user && p.user_id === user.id && (
                  <span className="absolute -top-2 -left-2 bg-cyan-500 text-[10px] font-bold px-2 py-1 rounded-full z-20 shadow-lg uppercase">
                    You
                  </span>
                )}
                <GlassCard
                  preset={p}
                  onApply={(preset: Preset) => {
                    setBlur(preset.blur);
                    setOpacity(preset.opacity);
                    setColor(preset.color);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onLike={addLike}
                  hexToRgb={hexToRgb}
                  onDelete={
                    user && p.user_id === user.id ? deletePreset : undefined
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
