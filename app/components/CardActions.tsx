import { toast } from "react-hot-toast";
import { Copy, Heart } from "lucide-react";

interface CardActionsProps {
  preset: any;
  onLike: (e: React.MouseEvent, id: number, likes: number) => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
  hexToRgb: (hex: string) => string;
}

export const CardActions = ({
  preset,
  onLike,
  onDelete,
  hexToRgb,
}: CardActionsProps) => {
  const copyCSS = (e: React.MouseEvent) => {
    e.stopPropagation();
    const css = `background: rgba(${hexToRgb(preset.color)}, ${preset.opacity});\nbackdrop-filter: blur(${preset.blur}px); border: 1px solid rgba(255, 255, 255, 0.1);`;
    navigator.clipboard.writeText(css);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-4 border-t border-slate-700/50 pt-3">
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span>Blur: {preset.blur}px</span>
        <span>Op: {preset.opacity}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={copyCSS}
          className="flex-1 bg-slate-700 hover:bg-indigo-600 text-[11px] font-bold py-1.5 rounded-lg transition-all"
        >
          COPY CSS
        </button>

        <button
          onClick={(e) => onLike(e, preset.id, preset.likes || 0)}
          className="flex items-center gap-1.5 bg-slate-700/50 hover:bg-pink-500/20 hover:text-pink-500 px-3 py-1 rounded-lg transition-all"
        >
          ❤️ <span className="text-xs">{preset.likes || 0}</span>
        </button>
      </div>
    </div>
  );
};
