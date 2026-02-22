import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Preset } from "../constants";

export function usePresets(sortBy: string) {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [fetching, setFetching] = useState(true);

  const fetchPresets = async () => {
    setFetching(true);

    const { data, error } = await supabase
      .from("presets")
      .select(
        `
        *,
        likes:likes(count),
        my_like:likes(user_id)
      `,
      )
      .order(sortBy === "likes" ? "created_at" : sortBy, { ascending: false });

    if (!error && data) {
      const formattedData = data.map((p: any) => ({
        ...p,
        likes: p.likes[0]?.count || 0,
        isLiked: p.my_like?.length > 0,
      }));

      if (sortBy === "likes") {
        formattedData.sort((a, b) => b.likes - a.likes);
      }

      setPresets(formattedData);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchPresets();
  }, [sortBy]);

  const addLike = async (e: React.MouseEvent, presetId: number) => {
    e.stopPropagation();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Войдите, чтобы ставить лайки!");

    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", user.id)
      .eq("preset_id", presetId)
      .single();

    if (existingLike) {
      await supabase.from("likes").delete().eq("id", existingLike.id);
    } else {
      await supabase.from("likes").insert({
        user_id: user.id,
        preset_id: presetId,
      });
    }

    fetchPresets();
  };

  const deletePreset = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const { error } = await supabase.from("presets").delete().eq("id", id);
    if (!error) fetchPresets();
  };

  return { presets, fetching, fetchPresets, addLike, deletePreset };
}
