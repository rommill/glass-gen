interface GalleryHeaderProps {
  filterMyOwn: boolean;
  setFilterMyOwn: (val: boolean) => void;
  sortBy: "likes" | "created_at";
  setSortBy: (val: "likes" | "created_at") => void;
  user: any;
}

export const GalleryHeader = ({
  filterMyOwn,
  setFilterMyOwn,
  sortBy,
  setSortBy,
  user,
}: GalleryHeaderProps) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
    <div>
      <h2 className="text-2xl font-bold text-slate-300">
        {filterMyOwn ? "My Presets" : "Community Gallery"}
      </h2>
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setSortBy("likes")}
          className={`text-sm transition-colors ${sortBy === "likes" ? "text-cyan-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}
        >
          🔥 Popular
        </button>
        <button
          onClick={() => setSortBy("created_at")}
          className={`text-sm transition-colors ${sortBy === "created_at" ? "text-cyan-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}
        >
          🕒 Newest
        </button>
      </div>
    </div>

    {user && (
      <button
        onClick={() => setFilterMyOwn(!filterMyOwn)}
        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
          filterMyOwn
            ? "bg-cyan-500 border-cyan-400"
            : "bg-white/5 border-white/10"
        }`}
      >
        {filterMyOwn ? "Show All" : "Filter My Own"}
      </button>
    )}
  </div>
);
