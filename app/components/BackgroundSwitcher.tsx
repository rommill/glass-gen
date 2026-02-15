import { BACKGROUNDS, BgType } from "../constants";

interface BackgroundSwitcherProps {
  bgType: BgType;
  setBgType: (type: BgType) => void;
}

export const BackgroundSwitcher = ({
  bgType,
  setBgType,
}: BackgroundSwitcherProps) => {
  return (
    <div className="flex gap-2 mb-10 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
      {(Object.keys(BACKGROUNDS) as Array<BgType>).map((type) => (
        <button
          key={type}
          onClick={() => setBgType(type)}
          className={`px-4 py-1 rounded-full text-xs capitalize transition-all ${
            bgType === type
              ? "bg-white/20 text-white shadow-lg"
              : "text-white/40 hover:text-white"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};
