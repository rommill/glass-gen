import { toast } from "react-hot-toast";

interface ExportButtonsProps {
  preset: any;
  hexToRgb: (hex: string) => string;
}

export const ExportButtons = ({ preset, hexToRgb }: ExportButtonsProps) => {
  const cssStyles = `background: rgba(${hexToRgb(preset.color)}, ${preset.opacity});
backdrop-filter: blur(${preset.blur}px);
-webkit-backdrop-filter: blur(${preset.blur}px);
border: 1px solid rgba(255, 255, 255, 0.1);`;

  const copyCSS = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cssStyles);
    toast.success("Copied to clipboard!");
  };

  const downloadCSS = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullFileContent = `/* Glassmorphism Preset */
.glass-effect {
  ${cssStyles.split("\n").join("\n  ")}
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`;

    const blob = new Blob([fullFileContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `glass-preset-${preset.id}.css`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded!");
  };

  return (
    <div className="flex gap-2 flex-1">
      <button
        onClick={copyCSS}
        className="flex-1 bg-slate-700 hover:bg-indigo-600 text-[10px] font-bold py-1.5 rounded-lg transition-all uppercase"
      >
        Copy
      </button>
      <button
        onClick={downloadCSS}
        className="flex-1 bg-indigo-600/20 hover:bg-indigo-600 text-[10px] font-bold py-1.5 rounded-lg border border-indigo-500/30 transition-all uppercase"
      >
        Files
      </button>
    </div>
  );
};
