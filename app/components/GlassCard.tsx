import { CardActions } from "./CardActions";
import { Trash2 } from "lucide-react";

export const GlassCard = ({
  preset,
  onApply,
  onLike,
  onDelete,
  hexToRgb,
}: any) => (
  <div
    onClick={() => onApply(preset)}
    className="group relative bg-slate-800/30 border border-slate-700 rounded-2xl p-4 cursor-pointer hover:border-indigo-500 transition-all hover:-translate-y-1 shadow-xl"
  >
    {/* delete button */}
    <button
      onClick={(e) => onDelete(e, preset.id)}
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-1 rounded-md transition-all z-10"
    >
      ✕
    </button>

    {/* preview */}
    <div className="h-28 bg-slate-900/50 rounded-xl mb-2 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
      <div
        style={{
          backgroundColor: `rgba(${hexToRgb(preset.color)}, ${preset.opacity})`,
          backdropFilter: `blur(${preset.blur}px)`,
          WebkitBackdropFilter: `blur(${preset.blur}px)`,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        className="w-14 h-14 rounded-lg shadow-2xl relative z-10"
      ></div>
    </div>

    <CardActions
      preset={preset}
      onLike={onLike}
      onDelete={onDelete}
      hexToRgb={hexToRgb}
    />
  </div>
);
