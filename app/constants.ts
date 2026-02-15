export const BACKGROUNDS = {
  dark: "bg-[#0f172a]",
  mesh: "bg-[radial-gradient(at_top_left,_#3b82f6,_#1e1b4b,_#0f172a)]",
  image:
    "bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center bg-fixed",
};

export type BgType = keyof typeof BACKGROUNDS;

export const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};
