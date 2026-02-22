import { Heart } from "lucide-react";
import { ExportButtons } from "./ExportButtons";

interface CardActionsProps {
  preset: any;
  onLike: (e: React.MouseEvent, id: number) => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
  hexToRgb: (hex: string) => string;
}

export const CardActions = ({ preset, onLike, hexToRgb }: CardActionsProps) => {
  return (
    <div className="flex flex-col gap-3 w-full mt-4 border-t border-slate-700/50 pt-3">
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span>Blur: {preset.blur}px</span>
        <span>Op: {preset.opacity}</span>
      </div>

      <div className="flex gap-2">
        <ExportButtons preset={preset} hexToRgb={hexToRgb} />

        <button
          onClick={(e) => onLike(e, preset.id)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
            preset.isLiked
              ? "bg-pink-500/20 text-pink-500"
              : "bg-slate-700/50 hover:bg-pink-500/20"
          }`}
        >
          <Heart size={14} className={preset.isLiked ? "fill-current" : ""} />
          <span className="text-xs">{preset.likes || 0}</span>
        </button>
      </div>
    </div>
  );
};
