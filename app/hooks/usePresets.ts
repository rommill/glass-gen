import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function usePresets(sortBy: string, user: any) {
  const [presets, setPresets] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  const fetchPresets = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("presets")
      .select("*")
      .order(sortBy, { ascending: false });
    if (!error && data) setPresets(data);
    setFetching(false);
  };

  useEffect(() => {
    fetchPresets();
  }, [sortBy]);

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

  const deletePreset = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const { error } = await supabase.from("presets").delete().eq("id", id);
    if (!error) fetchPresets();
  };

  return { presets, fetching, fetchPresets, addLike, deletePreset };
}
