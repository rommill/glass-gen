"use client";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";

export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Состояние для мобильного раскрытия

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) alert(error.message);
    else alert("Magic link sent! Check your email.");
    setLoading(false);
  };

  // 1. Состояние залогиненного пользователя (всегда компактно)
  if (user) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl w-full max-w-[320px] mx-auto lg:mx-0">
        <div className="flex items-center justify-between gap-4">
          <div className="overflow-hidden">
            <p className="text-[10px] uppercase tracking-wider opacity-50">
              Signed in
            </p>
            <p className="text-sm font-mono truncate">{user.email}</p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-lg transition-all text-xs"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  // 2. Состояние формы (сворачиваемая на мобилках)
  return (
    <div className="w-full max-w-[320px] mx-auto lg:mx-0">
      {!isOpen ? (
        // Кнопка-заглушка для мобилок
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-medium hover:bg-white/20 transition-all lg:hidden"
        >
          Sign In to Save
        </button>
      ) : null}

      <div
        className={`${!isOpen ? "hidden lg:block" : "block"} bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl w-full relative`}
      >
        {/* Кнопка закрытия для мобилок */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-3 text-white/40 hover:text-white lg:hidden"
          >
            ✕
          </button>
        )}

        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Sign In
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-purple-400 transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-sm transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
