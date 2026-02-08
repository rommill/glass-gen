interface EditorProps {
  blur: number;
  setBlur: (val: number) => void;
  opacity: number;
  setOpacity: (val: number) => void;
  color: string;
  setColor: (val: string) => void;
  onSave: () => void;
  hexToRgb: (hex: string) => string;
}

export const Editor = ({
  blur,
  setBlur,
  opacity,
  setOpacity,
  color,
  setColor,
  onSave,
  hexToRgb,
}: EditorProps) => {
  return (
    <div className="bg-slate-800/40 p-8 rounded-3xl flex flex-col md:flex-row gap-10 items-center border border-slate-700 backdrop-blur-md mb-16 shadow-2xl">
      <div className="flex flex-col gap-4 w-64">
        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Settings
        </label>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-500">Blur: {blur}px</span>
          <input
            type="range"
            min="0"
            max="25"
            value={blur}
            onChange={(e) => setBlur(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-500">Opacity: {opacity}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-500">Background Color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-2 border-slate-600 p-1"
          />
        </div>

        <button
          onClick={onSave}
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          Save to Cloud ☁️
        </button>
      </div>

      <div className="relative w-64 h-64 bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.3)] animate-pulse-slow">
        <div
          style={{
            backgroundColor: `rgba(${hexToRgb(color)}, ${opacity})`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
          className="w-48 h-48 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center font-bold tracking-tighter"
        >
          PREVIEW
        </div>
      </div>
    </div>
  );
};
